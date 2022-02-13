function new_ODE_solver() {

  let ODE_x = String(document.getElementById("ODE_x").value);
  let ODE_y = String(document.getElementById("ODE_y").value);
  let h = parseFloat(document.getElementById("h_ODE").value);
  let limit = 20;
  let x_0 = parseFloat(document.getElementById("x_0").value);
  let y_0 = parseFloat(document.getElementById("y_0").value);

  let t_0 = parseFloat(document.getElementById("t_0").value);
  let t_1 = parseFloat(document.getElementById("t_1").value);

  document.getElementById("interval_warning").style.display = "none";
  document.getElementById("IC_warning").style.display = "none";
  document.getElementById("h_warning").style.display = "none";
  document.getElementById("instruction").style.display = "none";

  if (t_1 <= t_0 || isNaN(t_0) || isNaN(t_1)) {
    document.getElementById("interval_warning").style.display = "initial";
    return;
  }

  if (isNaN(x_0) || isNaN(y_0)) {
    document.getElementById("IC_warning").style.display = "initial";
    return;
  }

  if (h <= 0 || isNaN(h)) {
    document.getElementById("h_warning").style.display = "initial";
    return;
  }

  let N = Math.ceil((t_1-t_0)/h +1);
  //let tArray = Array.from(Array(N), (_, k) => t_0 + k * h);

  let tArrayRound = Array(N).fill(0);
  for (let i = 0; i< N; i++){
    tArrayRound[i] = (t_0 + i * h).toPrecision(5);
  }

  // derivatives
  //let temp = math.parse(ODE);
  //let ODE_d = String(math.derivative(ODE, 'y'));
  //let ODE_dd = String(math.derivative(ODE_d, 'y'));



  function f(t, v) {
    return [math.evaluate(ODE_x, {t:t, x:v[0], y:v[1]}), math.evaluate(ODE_y, {t:t, x:v[0], y:v[1]})];
  }

  // derivative of f
  //function fd(t, v) {
  //  return math.evaluate(ODE_d, {t:t, x:v[0], y:v[1]});
  //  }

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


  let xy1Array = (ode_Euler(t_0, t_1, h, f, [x_0,y_0]))[1];
  //let y2Array = (ode_Euler_implicit_1d(t_0, t_1, h, f, y_0, limit, fd))[1];
  //let y3Array = (ode_trapezoidal_1d(t_0, t_1, h, f, y_0, limit, fd))[1];

  let xy4Array = (ode_midpoint(t_0, t_1, h, f, [x_0,y_0]))[1];
  let xy5Array = (ode_Heun(t_0, t_1, h, f, [x_0,y_0]))[1];
  let xy6Array = (ode_RK4(t_0, t_1, h, f, [x_0,y_0]))[1];

  let x1Array = Array(N).fill(0);
  let x4Array = Array(N).fill(0);
  let x5Array = Array(N).fill(0);
  let x6Array = Array(N).fill(0);
  let y1Array = Array(N).fill(0);
  let y4Array = Array(N).fill(0);
  let y5Array = Array(N).fill(0);
  let y6Array = Array(N).fill(0);

  for (let i = 0; i< N; i++){
    x1Array[i] = xy1Array[i][0];
    x4Array[i] = xy4Array[i][0];
    x5Array[i] = xy5Array[i][0];
    x6Array[i] = xy6Array[i][0];

    y1Array[i] = xy1Array[i][1];
    y4Array[i] = xy4Array[i][1];
    y5Array[i] = xy5Array[i][1];
    y6Array[i] = xy6Array[i][1];
  }

  // Define Data
  var data = [
    {
    x: [x_0],
    y: [y_0],
    type: "scatter",
    mode: "markers",
    name: "initial condition",
    marker: {color: 'dodgerblue', size: 10, symbol: "x-dot"},
    hovertemplate:"(%{x:.5f}, %{y:.5f})"
    },
  	{
	x:x1Array,
	y:y1Array,
	mode:"lines",
	name: 'explicit Euler',
	line: {color: 'green', width: 2},
  hovertemplate:"t = %{text}, x = %{x:.5f}, y = %{y:.5f}",
  text: tArrayRound
	},
	// {
	// x:tArray,
	// y:y2Array,
	// mode:"lines",
	// name: 'implicit Euler',
	// line: {color: 'gold', width: 2}
	// },
	// {
	// x:tArray,
	// y:y3Array,
	// mode:"lines",
	// name: 'trapezoidal',
	// line: {color: 'red', width: 2}
	// },
	{
	x:x4Array,
	y:y4Array,
	mode:"lines",
	name: 'midpoint',
	line: {color: 'pink', width: 2},
  hovertemplate:"t = %{text}, x = %{x:.5f}, y = %{y:.5f}",
  text: tArrayRound
	},
	{
	x:x5Array,
	y:y5Array,
	mode:"lines",
	name: 'Heun',
	line: {color: 'peru', width: 2},
  hovertemplate:"t = %{text}, x = %{x:.5f}, y = %{y:.5f}",
  text: tArrayRound
	},
	{
	x:x6Array,
	y:y6Array,
	mode:"lines",
	name: 'RK4',
	line: {color: 'purple', width: 2},
  hovertemplate:"t = %{text}, x = %{x:.5f}, y = %{y:.5f}",
  text: tArrayRound
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
	xaxis: {autorange: true, title: "x"},
	yaxis: {autorange: true, title: "y"},
	//title: "aaa",
  hovermode: "closest",
  hoverdistance: 25,
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
        return (d.data.name+': t= ' + parseFloat(d.text)
          + ',  x= ' + parseFloat(d.x.toFixed(5))
          + ',  y= ' + parseFloat(d.y.toFixed(5)));
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
