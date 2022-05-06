function new_ODE_solver() {

  let ODE = String(document.getElementById("ODE").value);
  let h = parseFloat(document.getElementById("h_ODE").value);
  let limit = 20;
  let y_0 = parseFloat(document.getElementById("y_0").value);

  let t_0 = parseFloat(document.getElementById("t_0").value);
  let t_1 = parseFloat(document.getElementById("t_1").value);

  document.getElementById("interval_warning").style.display = "none";
  document.getElementById("y0_warning").style.display = "none";
  document.getElementById("h_warning").style.display = "none";
  document.getElementById("instruction").style.display = "none";

  if (t_1 <= t_0 || isNaN(t_0) || isNaN(t_1)) {
    document.getElementById("interval_warning").style.display = "initial";
    return;
  }

  if (isNaN(y_0)) {
    document.getElementById("y0_warning").style.display = "initial";
    return;
  }

  if (h <= 0 || isNaN(h)) {
    document.getElementById("h_warning").style.display = "initial";
    return;
  }

  if (Math.ceil((t_1 - t_0)/h) - (t_1 - t_0)/h < 0.0000001) {
    var N = Math.ceil((t_1 - t_0)/h) + 1;
   } 
   else {
     var N = Math.floor((t_1 - t_0)/h) + 1;
   }
  let tArray = Array.from(Array(N), (_, k) => t_0 + k * h);

  // derivatives
  //let temp = math.parse(ODE);
  let ODE_d = String(math.derivative(ODE, 'y'));
  //let ODE_dd = String(math.derivative(ODE_d, 'y'));



  function f(t, y) {
    return math.evaluate(ODE, {t:t, y:y});
  }

  // derivative of f
  function fd(t, y) {
    return math.evaluate(ODE_d, {t:t, y:y});
  }

  // second derivative of f
//   function fdd(t, y) {
//     return math.evaluate(ODE_dd, {t:t, y:y});
//   }

//
//   let y1Array = Array(N).fill(y_0);
//   let y2Array = Array(N).fill(y_0);
//   let y3Array = Array(N).fill(y_0);
//
//   for (let i = 0; i< N; i ++){
//     y1Array[i+1] = (1-lambda*h) * y1Array[i];
//     y2Array[i+1] = y2Array[i]/(1+lambda*h);
//     y3Array[i+1] = y3Array[i]*(1-lambda*h/2)/(1+lambda*h/2);
//   }
//


  let y1Array = (ode_Euler(t_0, t_1, h, f, y_0))[1];
  let y2Array = (ode_Euler_implicit_1d(t_0, t_1, h, f, y_0, limit, fd))[1];
  let y3Array = (ode_trapezoidal_1d(t_0, t_1, h, f, y_0, limit, fd))[1];

  let y4Array = (ode_midpoint(t_0, t_1, h, f, y_0))[1];
  let y5Array = (ode_Heun(t_0, t_1, h, f, y_0))[1];
  let y6Array = (ode_RK4(t_0, t_1, h, f, y_0))[1];


  // Define Data
  var data = [
  	{
	x:tArray,
	y:y1Array,
	mode:"lines",
	name: 'explicit Euler',
	line: {color: 'green', width: 2}
	},
	{
	x:tArray,
	y:y2Array,
	mode:"lines",
	name: 'implicit Euler',
	line: {color: 'gold', width: 2}
	},
	{
	x:tArray,
	y:y3Array,
	mode:"lines",
	name: 'trapezoidal',
	line: {color: 'red', width: 2}
	},
	{
	x:tArray,
	y:y4Array,
	mode:"lines",
	name: 'midpoint',
	line: {color: 'pink', width: 2}
	},
	{
	x:tArray,
	y:y5Array,
	mode:"lines",
	name: 'Heun',
	line: {color: 'peru', width: 2}
	},
	{
	x:tArray,
	y:y6Array,
	mode:"lines",
	name: 'RK4',
	line: {color: 'purple', width: 2}
	}
	];



//     if (document.getElementById("linear").checked) {
//         var plotscale = "linear";
//     }
//     else {
//         var plotscale = "log";
//     }


  // Define Layout
  var layout = {
	//xaxis: {range: [t_start, t_fin], title: "t", type: plotscale},
	//xaxis: {range: [t_0, t_1+0.05*(t_1-t_0)], title: "t"},
	//xaxis: {range: [t_0, t_1], title: "t"},
	//yaxis: {autorange: true, title: "y"},
	xaxis: {range: [t_0, t_1]},
	yaxis: {autorange: true},
	//title: "aaa",
	showlegend: true,
	legend: {"orientation": "h", yanchor: 'top', y:-0.2, itemdoubleclick: false},
	//hoverlabel: {font: {size: 12}},
	margin: {
    l: 50,
    r: 50,
    b: 50,
    t: 50,
    pad: 4
  },
	};

    // Display using Plotly
  Plotly.newPlot("ODEPlot", data, layout);

  var myPlot = document.getElementById("ODEPlot");
  var hoverInfo = document.getElementById('hoverinfo');

  myPlot.on('plotly_hover', function(data){
    var infotext = data.points.map(function(d){
        return (d.data.name+': t= ' + parseFloat(d.x.toFixed(7))
          + ',  y= ' + parseFloat(d.y.toFixed(4)));
    });
    hoverInfo.innerHTML = infotext.join('<br/>');
    })
    .on('plotly_unhover', function(data){
    hoverInfo.innerHTML = '';
    });


//   myPlot.on('plotly_legendclick', function(data){
//     if (data.points[curveNumber].visible == true) {
//       var update = {visible: "lengendonly"};
//     }
//     else if (data.points[curveNumber].visible == "lengendonly") {
//       var update = {visible: true};
//     }
//
//     Plotly.restyle("ODEPlot", update,[data.curveNumber]);
//
//     return false;
//   });

//   myPlot.on('plotly_legenddoubleclick', function(data){
//
// //     var update = {visible: "legendonly"};
// //     Plotly.restyle("ODEPlot", update);
// //
// //     var update2 = {visible: true};
// //     Plotly.restyle("ODEPlot", update2,[data.curveNumber]);
//     return false;
//   });

  document.getElementById("instruction").style.display = "initial";
}





//new_ODE_solver();
