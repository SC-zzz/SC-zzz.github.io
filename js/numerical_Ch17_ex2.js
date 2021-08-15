function setup_numerical_2() { 
// x' = x^2-4, x(0) = 1
  let h = parseFloat(document.getElementById("h2").value);  
  let y_0 = 1; 
  
  let t_start = 0;
  let t_fin = 3;
  let N = Math.ceil((t_fin-t_start)/h +1);
  let tArray = Array.from(Array(N), (_, k) => t_start + k * h);
  
  let h_exact = 0.01;
  let N_exact = Math.ceil(t_fin/h_exact +1);
  let tArray_exact = Array.from(Array(N_exact), (_, k) => t_start + k * h_exact);
  let yArray_exact = [];
  for (let i = 0; i< N_exact; i ++){
    yArray_exact[i] = (6-2*Math.exp(4*tArray_exact[i]))/(Math.exp(4*tArray_exact[i])+3);
  }

  
  let y1Array = Array(N).fill(y_0); 
  let y2Array = Array(N).fill(y_0); 
  let y3Array = Array(N).fill(y_0); 
      
  for (let i = 0; i< N; i ++){
    y1Array[i+1] = y1Array[i] + h * ((y1Array[i])**2 - 4);
    y2Array[i+1] = (1- Math.sqrt(1+16*h**2 - 4*h*y2Array[i]))/(2*h);
    y3Array[i+1] = (1- Math.sqrt(1 - 2*h* (y2Array[i] +h/2*(y2Array[i]**2-8))))/(h);
  }  
  

  function f(v) {
    return v**2-4;
  }
  
  let y4Array = ode_auto_midpoint(N, h, f, y_0);  
  let y5Array = ode_auto_Heun(N, h, f, y_0);  
  let y6Array = ode_auto_RK4(N, h, f, y_0);   

   
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

  // Define Layout
  var layout = {
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
  Plotly.newPlot("numericalPlot2", data, layout);
}

function new_numerical_2() { 
// x' = x^2-4, x(0) = 1
  let h = parseFloat(document.getElementById("h2").value);  
  let y_0 = 1; 
  
  let t_start = 0;
  let t_fin = 3;
  let N = Math.ceil((t_fin-t_start)/h +1);
  let tArray = Array.from(Array(N), (_, k) => t_start + k * h);

  
  let y1Array = Array(N).fill(y_0); 
  let y2Array = Array(N).fill(y_0); 
  let y3Array = Array(N).fill(y_0); 
      
  for (let i = 0; i< N; i ++){
    y1Array[i+1] = y1Array[i] + h * ((y1Array[i])**2 - 4);
    y2Array[i+1] = (1- Math.sqrt(1+16*h**2 - 4*h*y2Array[i]))/(2*h);
    y3Array[i+1] = (1- Math.sqrt(1 - 2*h* (y2Array[i] +h/2*(y2Array[i]**2-8))))/(h);
  }  
  

  function f(v) {
    return v**2-4;
  }
  
  let y4Array = ode_auto_midpoint(N, h, f, y_0);  
  let y5Array = ode_auto_Heun(N, h, f, y_0);  
  let y6Array = ode_auto_RK4(N, h, f, y_0);   

   
  // update
  var data_1 = 	{x:[tArray], y:[y1Array]};
  var data_2 = 	{x:[tArray], y:[y2Array]};
  var data_3 =  {x:[tArray], y:[y3Array]};
  var data_4 = 	{x:[tArray], y:[y4Array]};
  var data_5 = 	{x:[tArray], y:[y5Array]};
  var data_6 =  {x:[tArray], y:[y6Array]};  

  // Display using Plotly
  Plotly.restyle("numericalPlot2", data_1, 1);
  Plotly.restyle("numericalPlot2", data_2, 2);
  Plotly.restyle("numericalPlot2", data_3, 3);
  Plotly.restyle("numericalPlot2", data_4, 4);
  Plotly.restyle("numericalPlot2", data_5, 5);
  Plotly.restyle("numericalPlot2", data_6, 6);  
}





setup_numerical_2();