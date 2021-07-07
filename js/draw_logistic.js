//var graphcolor = 'RGB(52, 94, 101)'
//var taylorcolor = 'RGB(70, 170, 185)'


var canvasdiv = document.getElementById('canvasdiv');
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// plotting range: -1<= x <=6, -1<= y <= 6
// some plotting parameters
var grid = {
	gridcolor: "gray",
	gridwidth: "1",
	axiscolor: "black",
	axiswidth: "2",
	labelcolor: "#888",
	labelsize: "18",
	plotcolor: "dodgerblue",
	plotwidth: "4",
	stationarycolor: "cyan",
	stationarywidth: "3",
	//vectorcolor: "#8080ff",
	//vectorcolor: "RGB(70, 170, 185)",	
	vectorcolor: "hsl(250,80%,70%)",
	vectorwidth: "2",
	aspect: 8/7, 
	paddingleft: 20,	
	paddingright: 20,
	wd: Math.max(300, Math.min(canvasdiv.offsetWidth, 7/8.5 * window.innerHeight))	  
	    // get width according to window size
}
	
    
var ht = (grid.wd-grid.paddingleft-grid.paddingright)*grid.aspect;
canvas.width = grid.wd;
canvas.height = ht;	  



// convert from graph coordinates to canvas pixels
var scaling_factor_x = (canvas.width-grid.paddingleft-grid.paddingright)/7;
var scaling_factor_y = canvas.height/8;


function y_px(y_coord){
  return 7*canvas.height/8 - scaling_factor_y * y_coord;
}

function x_px(x_coord){
  return grid.paddingleft + canvas.width/7 + scaling_factor_x * x_coord;
}

// draw underlying grids
function drawGrid() {
    for (let i =0; i<6; i++) {           
		ctx.beginPath();
		ctx.moveTo(x_px(i), y_px(-1));
		ctx.lineTo(x_px(i), y_px(6));
		ctx.strokeStyle = grid.gridcolor;
		ctx.lineWidth = grid.gridwidth;
		ctx.stroke();
    }
    for (let j =0; j<6; j++) {          
		ctx.beginPath();
		ctx.moveTo(x_px(-1), y_px(j));
		ctx.lineTo(x_px(6), y_px(j));
		ctx.strokeStyle = grid.gridcolor;
		ctx.lineWidth = grid.gridwidth;
		ctx.stroke();
    }    
} 

function drawAxis() {
    // x-axis
    ctx.beginPath();
	ctx.moveTo(x_px(-1), y_px(0));
	ctx.lineTo(x_px(6), y_px(0));
	ctx.strokeStyle = grid.axiscolor;
	ctx.lineWidth = grid.axiswidth;
	ctx.stroke();
	ctx.font = "18px Arial";
	ctx.textAlign = "right";
	ctx.textBaseline = "top";
	ctx.fillText("t", x_px(6),y_px(-0.05));
	for (let i = 1; i<6; i=i+2) { 
	    ctx.font = "16px Arial";
	    ctx.textAlign = "center";
	    ctx.textBaseline = "top";
	    ctx.fillText(i, x_px(i),y_px(-0.05));
	}
	
	// y-axis
    ctx.beginPath();
	ctx.moveTo(x_px(0), y_px(-1));
	ctx.lineTo(x_px(0), y_px(6));
	ctx.strokeStyle = grid.axiscolor;
	ctx.lineWidth = grid.axiswidth;
	ctx.stroke();
	ctx.font = "18px Arial";
	ctx.textAlign = "right";
	ctx.textBaseline = "top";
	ctx.fillText("y", x_px(-0.05),y_px(6));
	for (let j = 1; j<6; j=j+2) { 
	    ctx.font = "16px Arial";
	    ctx.textAlign = "right";
	    ctx.textBaseline = "middle";
	    ctx.fillText(j, x_px(-0.05),y_px(j));
	}
}



// draw direction field or slope field. 
// 1= unit direction field, 
// 2 = slope field
function draw_direction_field(option, r, K, Y0, density, colorize){
	var xDF = math.range(-1, 6, 1/density).toArray();
	var yDF = math.range(-1, 6, 1/density).toArray();
	var scaling = 0.8/density;
	var dyDF = yDF.map(function (y) {
		 return math.evaluate('r*y*(1-y/K)', {y:y, r:r, K:K, Y0:Y0})
		   });
	var lengths = dyDF.map(function (y) {
		 return math.evaluate('sqrt(1+y^2)', {y:y})
		   }); 
	var vxs_normalized = dyDF.map(function (y) {
		 return scaling*math.evaluate('1/sqrt(1+y^2)', {y:y})
		   });  
	var vys_normalized = dyDF.map(function (y) {
		 return scaling*math.evaluate('y/sqrt(1+y^2)', {y:y})}); 
	//var colors = new Array(yDF.length);	
	//for  (let j =0; j < yDF.length; j++) {
	//if colorize {
	   //let angle = Math.atan2(dyDF[j], 1);
	    //color[j] = 'hsl(' + (240*math.abs(angle/(math.PI/2))) % 360 + ', 100%, 70%)';
	//    colors[j] = grid.vectorcolor;
	//} else { 
	//    colors[j] = grid.vectorcolor;
	//}	
	//} 	       
	if (option == 1) {
		for (let i =0; i < xDF.length; i++) {
			for (let j =0; j < yDF.length; j++) {
			    if (colorize==true) {
			        let angleInDeg = Math.atan2(dyDF[j], 1)* 180 / Math.PI;
			        let color = "hsl(" + (250 + Math.abs(Math.ceil(angleInDeg))) + ", 100%, 70%)";
			        canvas_add_arrow(ctx, x_px(xDF[i]), y_px(yDF[j]), 
				        x_px(xDF[i]+vxs_normalized[j]), y_px(yDF[j]+vys_normalized[j]), 
				        color, grid.vectorwidth, 5);
			    }
				else {canvas_add_arrow(ctx, x_px(xDF[i]), y_px(yDF[j]), 
				    x_px(xDF[i]+vxs_normalized[j]), y_px(yDF[j]+vys_normalized[j]), 
				    grid.vectorcolor, grid.vectorwidth, 5);
				}    
			}
		}
	}
	if (option == 2) {
		for (let i =0; i < xDF.length; i++) {
			for (let j =0; j < yDF.length; j++) {
			    if (colorize==true) {
			        let angleInDeg = Math.atan2(dyDF[j], 1)* 180 / Math.PI;
			        var color = "hsl(" + (250 + Math.abs(Math.ceil(angleInDeg))) + ", 100%, 70%)";
			    }    
			    else {
			        var color = grid.vectorcolor;
			    }    
				ctx.beginPath();
				ctx.moveTo(x_px(xDF[i]), y_px(yDF[j]));
				ctx.lineTo(x_px(xDF[i]+vxs_normalized[j]), y_px(yDF[j]+vys_normalized[j]));
				ctx.strokeStyle = color;
				ctx.lineWidth = grid.vectorwidth;
				ctx.stroke();
			}
		}
	}
} 





function new_function() { 
    ctx.clearRect(0, 0, canvasdiv.offsetWidth, canvasdiv.offsetHeight);
    drawGrid();
    drawAxis();
    var r = parseFloat(document.getElementById("r").value);  
    var K = parseFloat(document.getElementById("K").value);
    var Y0 = parseFloat(document.getElementById("Y0").value); 
    var density = parseFloat(document.getElementById("density").value); 
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("The logistic model", x_px(3),y_px(7));
    let str = "(with r= " + r + ", K=" + K + ", y_0 =" + Y0 +")";
    ctx.fillText(str, x_px(3),y_px(6.5));
    
    var colorize = document.getElementById("colorize").checked;
    
    // draw direction field
    if (document.getElementById("UDF").checked) {
        draw_direction_field(option=1, r, K, Y0, density, colorize);
    }
    else if (document.getElementById("slope").checked) {
        draw_direction_field(option=2, r, K, Y0, density, colorize);
    }
    
    // draw stationary solutions
    if (document.getElementById("showStationary").checked) {
        ctx.beginPath();
	    ctx.moveTo(x_px(-1), y_px(0));
	    ctx.lineTo(x_px(6), y_px(0));
        ctx.strokeStyle = "green";
	    ctx.lineWidth = grid.stationarywidth;
	    ctx.stroke();
	    
	    ctx.beginPath();
	    ctx.moveTo(x_px(-1), y_px(K));
	    ctx.lineTo(x_px(6), y_px(K));
        ctx.strokeStyle = "red";
	    ctx.lineWidth = grid.stationarywidth;
	    ctx.stroke();
    }
    
    
    if (Y0 > K) {
    let t_break = Math.log(-(K-Y0)/Y0)/r;
    let t_start = math.max(t_break+0.001, -1);
    var xArray = math.range(t_start, 6, 0.01).toArray();
    var yArray = xArray.map(function (x) {
         return math.evaluate('(K * Y0)/(Y0 +(K-Y0)*exp(-r*x))', {x: x, r:r, K:K, Y0:Y0})
           });
 } 
  else{
    var xArray = math.range(-1, 6, 0.01).toArray();
    if (Y0 == 0) {
      var yArray = new Array(xArray.length);
      for (let j=0; j < xArray.length; ++j) yArray[j] = 0;
     } 
    else {
     var yArray = xArray.map(function (x) {
         return math.evaluate('(K * Y0)/(Y0 +(K-Y0)*exp(-r*x))', {x: x, r:r, K:K, Y0:Y0})
           });
     }
 }
  for (let i=0; i < xArray.length-1; i++) {
    ctx.beginPath();
	ctx.moveTo(x_px(xArray[i]), y_px(yArray[i]));
	ctx.lineTo(x_px(xArray[i+1]), y_px(yArray[i+1]));
	ctx.strokeStyle = grid.plotcolor;
	ctx.lineWidth = grid.plotwidth;
	ctx.stroke();
  }
}
 
new_function();

document.getElementById('r').oninput = function (event) {
  event.preventDefault();
    new_function();
  }
document.getElementById('K').oninput = function (event) {
  event.preventDefault();
    new_function();
  }
document.getElementById('Y0').oninput = function (event) {
  event.preventDefault();
    new_function();
  } 
  

