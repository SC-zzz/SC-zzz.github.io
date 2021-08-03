function new_stiff() { 
// x' = x, x(0) = 1
  let h = parseFloat(document.getElementById("h_stiff").value);  
  let lambda = parseFloat(document.getElementById("lambda_stiff").value);  
  document.getElementById("2/lambda").innerHTML = (2/lambda).toFixed(4);
  let y_0 = 1; 
  
  let t_start = 0;
  let t_fin = 5;
  let N = Math.ceil(t_fin/h +1);
  let tArray = Array.from(Array(N), (_, k) => t_start + k * h);
  
  let h_exact = 0.01;
  let N_exact = Math.ceil(t_fin/h_exact +1);
  let tArray_exact = Array.from(Array(N_exact), (_, k) => t_start + k * h_exact);
  let yArray_exact = [];
  for (let i = 0; i< N_exact; i ++){
    yArray_exact[i] = Math.exp(-lambda * tArray_exact[i]);
  }

  
  let y1Array = Array(N).fill(y_0); 
  let y2Array = Array(N).fill(y_0); 
  let y3Array = Array(N).fill(y_0); 
      
  for (let i = 0; i< N; i ++){
    y1Array[i+1] = (1-lambda*h) * y1Array[i];
    y2Array[i+1] = y2Array[i]/(1+lambda*h);
    y3Array[i+1] = y3Array[i]*(1-lambda*h/2)/(1+lambda*h/2);
  }  
  


  function f(v) {
    return -lambda*v;
  }
  
  let y4Array = ode_auto_midpoint(N, h, f, y_0);  
  let y5Array = ode_auto_Heun(N, h, f, y_0);  
  let y6Array = ode_auto_RK4(N, h, f, y_0);   
   
  //
  //function fd(v) {
  //  return 1;
  //} 

  //let y1Array = ode_auto_Euler(N, h, f, y_0);
  //let y2Array = ode_auto_Euler_implicit_1d(N, h, f, y_0, limit, fd);
  //let y3Array = ode_auto_trapezoidal_1d(N, h, f, y_0, limit, fd);


  if (document.getElementById("showMore").checked) {
    var y4data = {
	  x:tArray,
	  y:y4Array,
	  mode:"lines",
	  name: 'midpoint',
	  line: {color: 'pink', width: 2}
	  };
    var y5data = {
	  x:tArray,
	  y:y5Array,
	  mode:"lines",
	  name: 'Heun',
	  line: {color: 'gold', width: 2}
	  };
    var y6data = {
	  x:tArray,
	  y:y6Array,
	  mode:"lines",
	  name: 'RK4',
	  line: {color: 'brown', width: 2}
	  };	  
  }
  else {
    var y4data = {};
    var y5data = {};
    var y6data = {};
    }

   
  // Define Data
  var data = [
    {
	x:tArray_exact,
	y:yArray_exact,
	mode:"lines",
	name: 'exact soln',
	line: {color: 'dodgerblue', width: 3}
	}, 
  	{
	x:tArray,
	y:y1Array,
	mode:"lines",
	name: 'explicit',
	line: {color: 'darkorange', width: 2}
	},
	{
	x:tArray,
	y:y2Array,
	mode:"lines",
	name: 'implicit',
	line: {color: 'purple', width: 2}
	},
	{
	x:tArray,
	y:y3Array,
	mode:"lines",
	name: 'trapezoidal',
	line: {color: 'red', width: 2}
	}, y4data, y5data, y6data
// 	{
// 	x:tArray,
// 	y:y4Array,
// 	mode:"lines",
// 	name: 'midpoint',
// 	line: {color: 'pink', width: 2}
// 	},
// 	{
// 	x:tArray,
// 	y:y5Array,
// 	mode:"lines",
// 	name: 'Heun',
// 	line: {color: 'gold', width: 2}
// 	},
// 	{
// 	x:tArray,
// 	y:y6Array,
// 	mode:"lines",
// 	name: 'RK4',
// 	line: {color: 'brown', width: 2}
// 	}
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
	xaxis: {range: [t_start, t_fin], title: "t"},
	yaxis: {autorange: true, title: "x"},  
	//title: "aaa",
	showlegend: true,
	legend: {"orientation": "h", yanchor: 'top', y:-0.2},
	margin: {
    l: 30,
    r: 30,
    b: 100,
    t: 30,
    pad: 4
  },
	}; 

    // Display using Plotly
  Plotly.newPlot("stiffPlot", data, layout);
}

new_stiff();