JXG.Options.text.useMathJax = true;


function new_graph() { 
  var board;
  var levelset;

  let xMin = -6;
  let xMax = 6;
  let yMin = -6;
  let yMax = 6;
  
  let gamma = parseFloat(document.getElementById("gamma_damp").value);
  let density = parseFloat(document.getElementById("density_2").value); 
  //let c = parseFloat(document.getElementById("E").value);
  let scaling = 0.8/density;
  let colorize = document.getElementById("colorize_2").checked;
  let color;
  let N = 5000;
  let dt = 0.01;
  
  let tArray = Array.from(Array(N), (_, k) => k * dt);
  
  function g(v) {
    return [v[1], -v[0] - gamma*v[1]];
  }
  
  // gradient descent
  function gd(v) {
    return [-v[0]/gamma, 0];
  }
 
 
  board = JXG.JSXGraph.initBoard('gdbox',     
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
		  color = "hsl(" + (360- (length*2 % 360)) + ", 100%, 75%)";
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
  board.create('point', [0, 0], {size: 5, name:'', fixed: true, 
        strokeColor: 'red', fillColor: 'red'}); 

  
 
 
  let lambda1 = (-gamma + math.sqrt(gamma**2-4))/2;  //one eigenvalue
  let v1 = [1/2*(-gamma - math.sqrt(gamma**2-4)), 1];
  board.create('line', [[0,0],v1], {strokeWidth:2, strokeColor:'gray'});
    
  let lambda2 = (-gamma + math.sqrt(gamma**2-4))/2;  //one eigenvalue
  let v2 = [1/2*(-gamma + math.sqrt(gamma**2-4)), 1];
  board.create('line', [[0,0],v2], {strokeWidth:2, strokeColor:'gray'});
 


 
 
 
  
  
  var p = board.create('point', [4,3], {size: 6, strokeColor:'dodgerblue', fillColor:'dodgerblue', name:'Drag me'});
 

  var sol = ode_auto_midpoint(N, dt, g, [p.X(),p.Y()]);
  var x1Array = [];
  var x2Array = [];  
  for (let i = 0; i< sol.length; i ++) {
    x1Array[i] = sol[i][0];
    x2Array[i] = sol[i][1];
  }
 
  var sol2 = ode_auto_midpoint(N, dt, gd, [p.X(),p.Y()]);
  var x1Array2 = [];
  //var x2Array2 = [];  
  for (let i = 0; i< sol2.length; i ++) {
    x1Array2[i] = sol2[i][0];
    //x2Array2[i] = sol2[i][1];
  } 
   
  new_plot();
 


  
  var myCurve = board.create('curve', [x1Array, x2Array], {strokeColor:'dodgerblue', strokeWidth: 3.5});
  
  myCurve.updateDataArray = function() {
        sol = ode_auto_midpoint(N, dt, g, [p.X(),p.Y()]);
        sol2 = ode_auto_midpoint(N, dt, gd, [p.X(),p.Y()]);
        this.dataX = [];
        this.dataY = [];
        for(let i=0; i< sol.length; i++) {
          x1Array[i] = sol[i][0];
          //x2Array[i] = sol[i][1];
          x1Array2[i] = sol2[i][0];
          //x2Array2[i] = sol2[i][1];          
          this.dataX[i] = sol[i][0];
          this.dataY[i] = sol[i][1];
        }
        new_plot();
    };


function new_plot(){
// Define Data
  var data = [	
	{
	x:tArray,
	y:x1Array,
    xaxis: 't',
	mode:"lines",
	name: 'x(t)',
	line: {color: 'dodgerblue', width: 3}
	},
	{
	x:tArray,
	y:x1Array2,
    xaxis: 't',
	mode:"lines",
	name: 'gradient descent approximation',
	line: {color: 'orange', width: 3}
	}
    ];

  //Define Layout
  var layout = {   
	xaxis: {autorange: true},
	yaxis: {autorange: true},
    showlegend: true,
	legend: {"orientation": "h"},
	margin: {
    l: 20,
    r: 5,
    b: 100,
    t: 20,
    pad: 4
  },
	};

  // Display using Plotly
  Plotly.newPlot("approxPlot", data, layout);

}


}



new_graph();