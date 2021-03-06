JXG.Options.text.useMathJax = true;
var x_dot_bead = 4;
var y_dot_bead = 3;

function new_bead() {
  let omega = parseFloat(document.getElementById("omega").value);
  let density = parseFloat(document.getElementById("density_2").value);
  let scaling = 0.8/density;
  let colorize = document.getElementById("colorize_2").checked;
  let color;
  let N = 6000;
  let dt = 0.002;
  let xMin = -7;
  let xMax = 7;
  let yMin = -6;
  let yMax = 6;


  function g(v) {
    return [v[1], -Math.sin(v[0]) + omega**2 * Math.sin(v[0]) * Math.cos(v[0])];
  }


  board = JXG.JSXGraph.initBoard('beadbox',
    {boundingbox: [xMin, yMax, xMax, yMin],
    axis: true, grid: true, keepAspectRatio: true,
    defaultAxes: {
    x : {
    name: '$\\phi$',
    withLabel: true,
    label: {
        position: 'rt',
      offset: [-10, 15]
    }
  },
  y : {
    withLabel:true,
    name: '$w$',
      label: {
        position: 'rt',
        offset: [10, -10]
      }
    }
  }});

    // draw arrows
  for (let i = xMin; i<=xMax; i= i+1/density){
    for (let j = yMin; j<=yMax; j= j+1/density){
      var v = [i,j];
      let length = math.norm(g(v));
      if (length != 0) {
        let w = [scaling*g(v)[0]/length, scaling*g(v)[1]/length];
        if (colorize==true) {
		  color = "hsl(" + (360- (length*19 % 360)) + ", 100%, 75%)";
		}
		else {
		  color = 'hsl(0, 0%, 60%)';
		}
        board.create('arrow', [v,[v[0]+w[0], v[1]+w[1]]],{fixed:true, strokeWidth: 1.5, strokeColor:color});
      }

    }
  }

  // stationary points
  for (let k = -1; k<= 1; k ++) {
    board.create('point', [(2*k)*Math.PI, 0], {size: 5, name:'', fixed: true,
        strokeColor: 'red', fillColor: 'red'});
    board.create('point', [(2*k+1)*Math.PI, 0], {size: 5, name:'', fixed: true,
        strokeColor: 'green', fillColor: 'green'});
    if (omega > 1) {
      x0 = Math.acos(1/omega**2);
      board.create('point', [(2*k)*Math.PI + x0, 0], {size: 5, name:'', fixed: true,
        strokeColor: 'blue', fillColor: 'blue'});
      board.create('point', [(2*k)*Math.PI - x0, 0], {size: 5, name:'', fixed: true,
        strokeColor: 'blue', fillColor: 'blue'});
    }
  }




  var p = board.create('point', [x_dot_bead,y_dot_bead], {size: 6, strokeColor:'dodgerblue', fillColor:'dodgerblue', name:'Drag me'});


  var sol = ode_auto_midpoint(N, dt, g, [p.X(),p.Y()]);
  var x1Array = [];
  var x2Array = [];
  for (let i = 0; i< sol.length; i ++) {
    x1Array[i] = sol[i][0];
    x2Array[i] = sol[i][1];
  }

  var myCurve = board.create('curve', [x1Array, x2Array], {strokeColor:'dodgerblue', strokeWidth: 3.5});

  myCurve.updateDataArray = function() {
        x_dot_bead = p.X();
        y_dot_bead = p.Y();
        let temp = ode_auto_midpoint(N, dt, g, [p.X(),p.Y()]);
        this.dataX = [];
        this.dataY = [];
        for(let i=0; i< temp.length; i++) {
            this.dataX[i] = temp[i][0];
            this.dataY[i] = temp[i][1];
        }
    };


}

new_bead();
