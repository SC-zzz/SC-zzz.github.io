function new_FT_indicator() { 
// x' = x, x(0) = 1
  let a = parseFloat(document.getElementById("a_ind").value);  
  let y_0 = 1; 
  let h = 0.01;
  let t_start = -15;
  let t_fin = 15;
  let N = Math.ceil((t_fin-t_start)/h +1);
  let tArray = Array.from(Array(N), (_, k) => t_start + k * h);
  
  // original function
  let fArray = tArray.map(function(t) {
    if (Math.abs(t) > a) {return 0;}
    else {return 1;}
    });
  
  // Fourier transform
  let gArray = tArray.map(function(t) {
    if (t != 0) {return 2 * Math.sin(t * a) / t;}
    else {return 2 * a;}
    });
      

   
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
	y:fArray,
	mode:"lines",
	name: 'original function',
	line: {color: 'dodgerblue', width: 3}
	}, 
  	{
	x:tArray,
	y:gArray,
	mode:"lines",
	name: 'Fourier transform',
	line: {color: 'green', width: 3}
	}
	];

  // Define Layout
  var layout = {
	xaxis: {range: [t_start, t_fin]},
	yaxis: {autorange: true},  
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
  Plotly.newPlot("indicatorPlot", data, layout);
}





new_FT_indicator();