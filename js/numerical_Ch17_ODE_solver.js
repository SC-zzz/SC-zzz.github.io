function new_ODE_solver() { 

  let ODE = String(document.getElementById("ODE").value);
  let h = parseFloat(document.getElementById("h_ODE").value);  

  let y_0 = parseFloat(document.getElementById("y_0").value);  
  
  let t_0 = parseFloat(document.getElementById("t_0").value);  
  let t_1 = parseFloat(document.getElementById("t_1").value);  
  
  document.getElementById("interval_warning").style.display = "none";
  document.getElementById("y0_warning").style.display = "none";
  document.getElementById("h_warning").style.display = "none";
  
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
  
  let N = Math.ceil((t_1-t_0)/h +1);
  let tArray = Array.from(Array(N), (_, k) => t_0 + k * h);
 
  function f(t, y) {
    return math.evaluate(ODE, {t:t, y:y});
  } 
 
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
  //let y2Array = ode_auto_Heun(N, h, f, y_0);  
  //let y3Array = ode_auto_RK4(N, h, f, y_0);   
  
  let y4Array = (ode_midpoint(t_0, t_1, h, f, y_0))[1];
  let y5Array = (ode_Heun(t_0, t_1, h, f, y_0))[1];
  let y6Array = (ode_RK4(t_0, t_1, h, f, y_0))[1]; 
  
   
  //
  //function fd(v) {
  //  return 1;
  //} 

  //let y1Array = ode_auto_Euler(N, h, f, y_0);
  //let y2Array = ode_auto_Euler_implicit_1d(N, h, f, y_0, limit, fd);
  //let y3Array = ode_auto_trapezoidal_1d(N, h, f, y_0, limit, fd);



   
  // Define Data
  var data = [
  	{
	x:tArray,
	y:y1Array,
	mode:"lines",
	name: 'explicit Euler',
	line: {color: 'green', width: 2}
	},
// 	{
// 	x:tArray,
// 	y:y2Array,
// 	mode:"lines",
// 	name: 'implicit',
// 	line: {color: 'purple', width: 2}
// 	},
// 	{
// 	x:tArray,
// 	y:y3Array,
// 	mode:"lines",
// 	name: 'trapezoidal',
// 	line: {color: 'red', width: 2}
// 	},
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
	line: {color: 'gold', width: 2}
	},
	{
	x:tArray,
	y:y6Array,
	mode:"lines",
	name: 'RK4',
	line: {color: 'MediumAquaMarine', width: 2}
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
	xaxis: {range: [t_0, t_1], title: "t"},
	yaxis: {autorange: true, title: "y"},  
	//title: "aaa",
	showlegend: true,
	legend: {"orientation": "h", yanchor: 'top', y:-0.2},
	margin: {
    l: 50,
    r: 50,
    b: 100,
    t: 50,
    pad: 4
  },
	}; 

    // Display using Plotly
  Plotly.newPlot("ODEPlot", data, layout);
}





//new_ODE_solver();