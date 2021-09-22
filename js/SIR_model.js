JXG.Options.text.useMathJax = true;
var s0 = 0.9;
var i0 = 0.1;
var r0 = 1-s0-i0;
var brd;
var sicurve; // the trajectory of (s,i)

function new_IC() {
  var tau = parseFloat(document.getElementById("tau").value);
  var gamma = parseFloat(document.getElementById("gamma").value);
  document.getElementById("R0").innerHTML = (tau/gamma).toFixed(2);

  brd = JXG.JSXGraph.initBoard('rangebox', {boundingbox: [-0.1, 1.1, 1.1, -0.1],
    axis: true, grid: true, keepAspectRatio: true,
    defaultAxes: {
    x : {
    name: '$s$',
    withLabel: true,
    label: {
        position: 'rt',
      offset: [-10, 15]
    }
  },
  y : {
    withLabel:true,
    name: '$i$',
      label: {
        position: 'rt',
        offset: [10, -10]
      }
    }
  }});

  var bdrycurve = brd.create('functiongraph', [function(x){return -x+1},0,1]);
  brd.create('text',[0.1, 1, "Choose IC within the shaded region"],{fontsize: 14, fixed:true});
  var xaxis = brd.create('functiongraph', [function(x){return 0},0,1],{visible:false});
  var yaxis = brd.create('line', [[0,0],[0,1]],{visible:false});
  //var ineq = brd.create('inequality', [k_curve]);
  // 3. step: plot a filled curve which starts at (0,0), contains all points of 'sqrt(x^2-1)'
  // and is closed by adding (0,0) at the end.

  var curve = brd.create('curve', [[], []], {strokeWidth:2, fillColor:'lightblue', fillOpacity: 0.2});
  curve.updateDataArray = function() {
    // Start with (0, 0)
    this.dataX = [0];
    this.dataY = [0];

    // Copy all points from curve2
    this.dataX = this.dataX.concat( bdrycurve.points.map( p => p.usrCoords[1] ) );
    this.dataY = this.dataY.concat( bdrycurve.points.map( p => p.usrCoords[2] ) );

    // Close the curve by adding (0,0)
    this.dataX.push(0);
    this.dataY.push(0);
  };

  brd.update();



  var p = brd.create('point', [0.9,0.1], {name:'$(s(0), i(0))$', size:4, strokeColor:"purple",
    fillColor:"purple",
    attractors: [bdrycurve], attractorDistance:0.05, snatchDistance: 0.1});
  brd.create('text',[0.6, 0.9, function() {
     return '$s(0)= ' + p.X().toFixed(2)+'$,';}
     ],{fontsize: 12, fixed:true});
  brd.create('text',[0.6, 0.8, function() {
     return '$i(0)= ' + p.Y().toFixed(2)+'$,';}
     ],{fontsize: 12, fixed:true});
  brd.create('text',[0.6, 0.7, function() {
     return '$r(0)= ' + (1-p.X()-p.Y()).toFixed(2)+'$,';}
     ],{fontsize: 12, fixed:true});

  s0 = p.X();
  i0 = p.Y();
  r0 = 1-s0-i0;
  sicurve = brd.create('curve', [p.X(), p.Y()], {strokeColor:'purple', strokeWidth: 2});

 // dashed line s0 = 1/R0
  brd.create('curve', [[gamma/tau, gamma/tau], [0,1-gamma/tau]], {dash: 2, strokeWidth: 2});
  brd.create('text',[gamma/tau +0.02, 0.1, '$s_0 = 1/R_0$'], {fontsize: 12, fixed:true});


  new_SIR();



  brd.on('move', function() {
    brd.suspendUpdate();
    s0 = Math.max(0, p.X());
    i0 = Math.max(0, p.Y());
    r0 = 1-s0-i0;
    p.moveTo([s0,i0]);
    brd.unsuspendUpdate();
    new_SIR();
 });

}





function new_SIR() {
  var tau = parseFloat(document.getElementById("tau").value);
  var gamma = parseFloat(document.getElementById("gamma").value);
  //var s0 = parseFloat(document.getElementById("s0").value);


  document.getElementById("warning").style.display = "none";
  document.getElementById("SIRdiv").style.display = "initial";
  if (s0<0 || s0>1 || i0<0 || i0 >1 || s0+i0 >1) {
    document.getElementById("warning").style.display = "initial";
    document.getElementById("SIRdiv").style.display = "none";
    //update trajectory
    sicurve.updateDataArray = function() {
      this.dataX = [];
      this.dataY = [];
      };
    brd.update();
    return;
  }

  // ODE system
  function f(t,v)  {
    let s = v[0], i = v[1], r = v[2];
    return [-tau*s*i, tau*s*i - gamma*i, gamma*i];
  }

  var T = Math.max(60, 5/gamma + 5/tau);
  var sol = ode_RK4(0, T, 0.04, f, [s0,i0,r0])
  var tArray = sol[0];
  var sArray = new Array(tArray.length).fill(0);
  var iArray = new Array(tArray.length).fill(0);
  var rArray = new Array(tArray.length).fill(0);
  for (let i = 0; i < tArray.length; i++) {
    sArray[i] = sol[1][i][0];
    iArray[i] = sol[1][i][1];
    rArray[i] = sol[1][i][2];
   }

  //update trajectory
  sicurve.updateDataArray = function() {
    this.dataX = sArray;
    this.dataY = iArray;
    };
  brd.update();

  // Define Data
  let data = [
	{
	x:tArray,
	y:sArray,
    xaxis: 't',
	mode:"lines",
	name: 's(t)',
	line: {color: 'dodgerblue', width: 3}
	},
	{
	x:tArray,
	y:iArray,
    xaxis: 't',
	mode:"lines",
	name: 'i(t)',
	line: {color: 'red', width: 3}
	},
	{
	x:tArray,
	y:rArray,
    xaxis: 't',
	mode:"lines",
	name: 'r(t)',
	line: {color: 'green', width: 3}
	}
    ];

  // Define Layout
  let layout = {
	xaxis: {range: [0, 60], title: "t"},
	yaxis: {autorange: true},
	title: "The SIR model"
	};

  // Display using Plotly
  Plotly.newPlot("mySIR", data, layout);
}


new_IC();
//new_SIR();
