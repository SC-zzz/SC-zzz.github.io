JXG.Options.text.useMathJax = true;

var board;
var levelset;

  let xMin = -7;
  let xMax = 7;
  let yMin = -6;
  let yMax = 6;
  
  
function new_bead() { 
  
  let omega = parseFloat(document.getElementById("omega").value);
  let density = parseFloat(document.getElementById("density_2").value); 
  //let c = parseFloat(document.getElementById("E").value);
  let scaling = 0.8/density;
  let colorize = document.getElementById("colorize_2").checked;
  let color;
  let N = 6000;
  let dt = 0.002;
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
        let myArrow = board.create('arrow', [v,[v[0]+w[0], v[1]+w[1]]],{fixed:true, strokeWidth: 1.5, strokeColor:color});
        myArrow.hasPoint = function() { return false;};
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

  
  
  
  var p = board.create('point', [4,3], {size: 6, strokeColor:'dodgerblue', fillColor:'dodgerblue', name:'Drag me'});
 

  var sol = ode_auto_RK4(N, dt, g, [p.X(),p.Y()]);
  var x1Array = [];
  var x2Array = [];  
  for (let i = 0; i< sol.length; i ++) {
    x1Array[i] = sol[i][0];
    x2Array[i] = sol[i][1];
  }
  
  var myCurve = board.create('curve', [x1Array, x2Array], {strokeColor:'dodgerblue', strokeWidth: 3.5});
  
  myCurve.updateDataArray = function() {
        let temp = ode_auto_RK4(N, dt, g, [p.X(),p.Y()]);
        this.dataX = [];
        this.dataY = [];
        for(let i=0; i< temp.length; i++) {
            this.dataX[i] = temp[i][0];
            this.dataY[i] = temp[i][1];
        }
    };
  

  new_level_set();


}

function new_level_set(){
  let omega = parseFloat(document.getElementById("omega").value);
  let c = parseFloat(document.getElementById("E").value);
  let energy = function energy (x, y) {
    return 1/2*y**2 -(Math.cos(x)) + 1/2* (omega*Math.cos(x))**2 - omega**2/4 - c;
  };
  levelset = implicit(board, energy, {
    xMin: xMin,
    xMax: xMax,
    yMin: yMin,
    yMax: yMax,
    xInitialSteps: 80,
    yInitialSteps: 80, 
    segmentSteps: 1,
    fill: {
      fillColor: "none",
      strokeColor: "none"
    }
  });
}


new_bead();