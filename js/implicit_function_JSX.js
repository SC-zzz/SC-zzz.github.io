// plot implicit function
function implicit (board, equation, parameters) {
    var implicitFun, segmentSteps, maxRecursion, angleThreshold;
    var interiorX, interiorY, borderX, borderY;

    if (parameters === undefined) {
        parameters = {};
    }

    // default settings
    var param = {
        xMin: board.getBoundingBox()[0],
        xMax: board.getBoundingBox()[2],
        yMin: board.getBoundingBox()[3],
        yMax: board.getBoundingBox()[1],
        xInitialSteps: 1,
        yInitialSteps: 1,
        xValues: [], // user can specify guaranteed values for the quadtree
        yValues: [],
        segmentSteps: 1, // number of segments for isosegment
        maxRecursion: 1, // newton's method
        angleThreshold: 30, // degree measure to detect sharp corner
        border: {
            dash: 0,
            strokeWidth: 3,
            fixed: true,
            strokeColor: "#000000",
            highlight: false
        },
        fill: {
            layer: 1,
            fixed: true,
            highlight: false,
            strokeWidth: 1,
            strokeColor: "yellow",
            strokeOpacity: 1.0,
            fillColor: "yellow",
            fillOpacity: 1.0
        }
    };
    
    //jQuery.extend(true, param, parameters);
    //for ( var prop in parameters ) {
    //    if ( Object.prototype.hasOwnProperty.call( parameters, prop ) ) {
    //        param[prop] = parameters[prop]; // does not allow deep merge
    //    }
    //}
    param = JXG.deepCopy(param, parameters);

    // slightly expand bounds
    // this greatly reduces chances of encountering multiple 0s on vertices
    // 1009, 1013, 1019, and 1021 are primes
    param.xMin -= (param.xMax - param.xMin) / 1009;
    param.xMax += (param.xMax - param.xMin) / 1013;
    param.yMin -= (param.yMax - param.yMin) / 1019;
    param.yMax += (param.yMax - param.yMin) / 1021;

    segmentSteps = param.segmentSteps;
    maxRecursion = param.maxRecursion;
    angleThreshold = param.angleThreshold * Math.PI/180; // radians

    implicitFun = function (x, y) {
        var out = equation(x, y);
        if (Array.isArray(out)) {
            return Math.min.apply(null, out);
        } else {
            return out;
        }
    };

    interiorX = [];
    interiorY = [];

    borderX = [];
    borderY = [];

    // skip specified x and y values if they are outside of the requested rectangle
    param.xValues = param.xValues.filter(function (val) {
        return param.xMin < val && val < param.xMax;
    });
    param.yValues = param.yValues.filter(function (val) {
        return param.yMin < val && val < param.yMax;
    });

    // construct the necessary x and y values for the quadtree
    var i, j, v;
    for (i = 0; i <= param.xInitialSteps; i++) {
        v = param.xMin + i/param.xInitialSteps * (param.xMax - param.xMin);
        param.xValues.push(v);
    }
    for (j = 0; j <= param.yInitialSteps; j++) {
        v = param.yMin + j/param.yInitialSteps * (param.yMax - param.yMin);
        param.yValues.push(v);
    }
    param.xValues = param.xValues.sort(function (a, b) {return a-b;});
    param.yValues = param.yValues.sort(function (a, b) {return a-b;});

    // loop through the quadtree
    var west, east, south, north;
    var NW, NE, SE, SW;
    for (i = 0; i < param.xValues.length - 1; i++) {
        west = param.xValues[i];
        east = param.xValues[i+1];
        for (j = 0; j < param.yValues.length - 1; j++) {
            south = param.yValues[j];
            north = param.yValues[j+1];

            NW = implicitFun(west, north);
            NE = implicitFun(east, north);
            SE = implicitFun(east, south);
            SW = implicitFun(west, south);

            // triangles are much easier to work with than rectangles
            triangle([[west, north, NW], [east, north, NE], [west, south, SW]]);
            triangle([[east, north, NE], [east, south, SE], [west, south, SW]]);

    }}


    var border = board.create("curve", [borderX, borderY], param.border);
    var shaded = board.create("curve", [interiorX, interiorY], param.fill);

    board.update(); // takes care of canvas layer bug
    return [border, shaded];


// helper functions
// placed in the overarching function to avoid globals
function gradient (x, y) {
    var fx = JXG.Math.Numerics.D(function (t) {return implicitFun(t, y);})(x);
    var fy = JXG.Math.Numerics.D(function (t) {return implicitFun(x, t);})(y);
    return [fx, fy];
}

// variation of marching squares called marching triangles
function triangle (data) {
    // [[x1, y1, value1], [x2, y2, value2], [x3, y3, value3]]

    // sort by value from smallest to largest
    data.sort(function (a, b) {
        return a[2] - b[2];
    });

    var x1 = data[0][0];
    var y1 = data[0][1];
    var v1 = data[0][2];
    var x2 = data[1][0];
    var y2 = data[1][1];
    var v2 = data[1][2];
    var x3 = data[2][0];
    var y3 = data[2][1];
    var v3 = data[2][2];

    if (!isFinite(v1) || !isFinite(v2) || !isFinite(v3)) {
        console.warn("Not intended to handle NaN or Infinity results.");
        return;
    }

    // 0 treated as positive for conditionals

    // +++
    if (v1 >= 0) {
        interiorX.push(x1, x2, x3, NaN);
        interiorY.push(y1, y2, y3, NaN);
        return;
    }

    // ---
    if (v3 < 0) {
        return;
    }

    var xArray = [];
    var yArray = [];
    var mid1;
    var mid2;
    var results;
	
    // --+
    if (v2 < 0 && v3 >= 0) {
        mid1 = weightedAverage([[x1, y1, v1], [x3, y3, v3]], maxRecursion);
        mid2 = weightedAverage([[x2, y2, v2], [x3, y3, v3]], maxRecursion);
        results = makeIsoSegment(mid1, mid2);
        xArray = results[0];
        yArray = results[1];
        interiorX = interiorX.concat([x3], xArray, [x3, NaN]);
        interiorY = interiorY.concat([y3], yArray, [y3, NaN]);
        borderX = borderX.concat(xArray, [NaN]);
        borderY = borderY.concat(yArray, [NaN]);
    }

    // -++
    if (v1 < 0 && v2 >= 0) {
        mid1 = weightedAverage([[x1, y1, v1], [x2, y2, v2]], maxRecursion);
        mid2 = weightedAverage([[x1, y1, v1], [x3, y3, v3]], maxRecursion);
        results = makeIsoSegment(mid1, mid2);
        xArray = results[0];
        yArray = results[1];
        interiorX = interiorX.concat([x2], xArray, [x3, x2, NaN]);
        interiorY = interiorY.concat([y2], yArray, [y3, y2, NaN]);
        borderX = borderX.concat(xArray, [NaN]);
        borderY = borderY.concat(yArray, [NaN]);
    }

}

// takes two endpoints and makes segment on the isocurve
function makeIsoSegment (pointA, pointB) {

    var steps = segmentSteps;

    var xArray = new Array(steps + 1);
    var yArray = new Array(steps + 1);

    var out;
    var myx;
    var myy;
    for (var i = 0; i <= steps; i++) {
        myx = pointB[0]*i/steps + pointA[0]*(1 - i/steps);
        myy = pointB[1]*i/steps + pointA[1]*(1 - i/steps);
        out = newtonsMethod2D([myx, myy], maxRecursion);
        xArray[i] = out[0];
        yArray[i] = out[1];
    }

    // sharpen
    var grad1 = gradient(xArray[0], yArray[0]);
    var grad2;
    var angle;
    var grad1Mag, grad2Mag;
    var c1, c2, det;
    var xNew, yNew;
    var threshold = angleThreshold;
    for (i = 1; i < xArray.length; i++) {
        grad2 = gradient(xArray[i], yArray[i]);
        grad1Mag = Math.sqrt(grad1[0]*grad1[0] + grad1[1]*grad1[1]);
        grad2Mag = Math.sqrt(grad2[0]*grad2[0] + grad2[1]*grad2[1]);
        angle = Math.acos( (grad1[0]*grad2[0] + grad1[1]*grad2[1]) / (grad1Mag*grad2Mag) );

        if (threshold < angle && angle < Math.PI - threshold) {
            // cramer's rule
            c1 = grad1[0]*xArray[i-1] + grad1[1]*yArray[i-1];
            c2 = grad2[0]*xArray[i] + grad2[1]*yArray[i];
            det = grad1[0] * grad2[1] - grad2[0] * grad1[1];
            xNew = (c1 * grad2[1] - c2 * grad1[1]) / det;
            yNew = (grad1[0] * c2 - grad2[0] * c1) / det;
            xArray.splice(i, 0, xNew);
            yArray.splice(i, 0, yNew);

            i++; // because we added a point
        }


        grad1 = grad2;
    }

    return [xArray, yArray];
}

function newtonsMethod2D (point, recursion) {
    var out = [point[0], point[1]];
    var grad = gradient(point[0], point[1]);
    var value = implicitFun(point[0], point[1]);
    var localRecursion = recursion;
    var L2 = grad[0]*grad[0] + grad[1]*grad[1];

    if (localRecursion <= 0 || value*L2 === 0) {
        return out;
    }

    out[0] -= value * grad[0] / L2;
    out[1] -= value * grad[1] / L2;

    return newtonsMethod2D(out, --localRecursion);
}

function weightedAverage (data, recursion) {
    // [[x1, y1, value1], [x2, y2, value2]]
    var x1 = data[0][0];
    var y1 = data[0][1];
    var v1 = data[0][2];
    var x2 = data[1][0];
    var y2 = data[1][1];
    var v2 = data[1][2];

    var localRecursion = recursion;

    if (v1 === 0) {
        return [x1, y1];
    }

    if (v2 === 0 || v1*v2 > 0) {
        return [x2, y2];
    }

    var scale = Math.abs(v1) / Math.abs(v2 - v1);
    var out = [x1*(1-scale) + x2*scale, y1*(1-scale) + y2*scale];
    var outWeight = implicitFun(out[0], out[1]);

    // recursion for edges
    if (localRecursion <= 0 || Math.abs(outWeight) <= 1e-15) {
        return out;
    } else if (outWeight * v1 < 0) {
        return weightedAverage([[x1, y1, v1], [out[0], out[1], outWeight]], --localRecursion);
    } else if (outWeight * v2 < 0) {
        return weightedAverage([[x2, y2, v2], [out[0], out[1], outWeight]], --localRecursion);
    }
    return out;
}

}