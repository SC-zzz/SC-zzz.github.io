function new_convolution_ex2() { 
// f = triangular bump
  let L = parseFloat(document.getElementById("L_ex2").value);  
  let h = 0.01;
  let t_start = -3;
  let t_fin = 3;
  let N = Math.ceil((t_fin-t_start)/h +1);
  let tArray = Array.from(Array(N), (_, k) => t_start + k * h);

  // original function
  let uLArray = tArray.map(function(t) {
    if (Math.abs(t) > 1/(2*L)) {return 0;}
    else {return L;}
    });
  
  // original function
  let fArray = tArray.map(function(t) {
    if (Math.abs(t) > 1) {return 0;}
    else {return 1 - Math.abs(t);}
    });
  
  // convolution
  let gArray = tArray.map(function(t) {
    if (t <= -1 - 1/(2 * L) || t >= 1 + 1/(2 * L)) {
      return 0;}
    else if (t <= - 1/(2 * L)){
      return L*(t + 1/(2 * L) + 1/2 * (t + 1/(2 * L))**2 
        - (Math.max(-1, t - 1/(2 * L))) - 1/2 * (Math.max(-1, t - 1/(2 * L)))**2);
    } 
    else if (t <= - 1/(2 * L) + 1 && t <= 1/(2 * L)){  
      return L*(t + 1/(2 * L) - 1/2 * (t + 1/(2 * L))**2 
        - (Math.max(-1, t - 1/(2 * L))) - 1/2 * (Math.max(-1, t - 1/(2 * L)))**2);        
    }
    else if (t <= - 1/(2 * L) + 1 && t > 1/(2 * L)){  
      return L*(t + 1/(2 * L) - 1/2 * (t + 1/(2 * L))**2 
        - (t - 1/(2 * L) - 1/2 * (t - 1/(2 * L))**2));        
    }   
    else if (t > - 1/(2 * L) + 1 && t <= 1/(2 * L)){  
      return L*(1/2 - (Math.max(-1, t - 1/(2 * L))) - 1/2 * (Math.max(-1, t - 1/(2 * L)))**2);         
    }  
    else if (t > - 1/(2 * L) + 1 && t > 1/(2 * L)){  
      return L*(1/2 
        - (t - 1/(2 * L) - 1/2 * (t - 1/(2 * L))**2));        
    }     
    });
      

   
  //
  //function fd(v) {
  //  return 1;
  //} 

  //let y1Array = ode_auto_Euler(N, h, f, y_0);
  //let y2Array = ode_auto_Euler_implicit_1d(N, h, f, y_0, limit, fd);
  //let y3Array = ode_auto_trapezoidal_1d(N, h, f, y_0, limit, fd);


   
  // Define Data
  if (document.getElementById("hideUL_ex2").checked) {
    var data = [{
		x:tArray,
		y:fArray,
		mode:"lines",
		name: 'f',
		line: {color: 'dodgerblue', width: 3}
		}, 
		{
		x:tArray,
		y:gArray,
		mode:"lines",
		name: 'f * u<sub>L</sub>',
		line: {color: 'green', width: 3}
		}
		];
	}
  else {
    var data = [
		  {
		x:tArray,
		y:uLArray,
		mode:"lines",
		name: 'u<sub>L</sub>',
		line: {color: 'red', width: 2}
		}, 
		{
		x:tArray,
		y:fArray,
		mode:"lines",
		name: 'f',
		line: {color: 'dodgerblue', width: 3}
		}, 
		{
		x:tArray,
		y:gArray,
		mode:"lines",
		name: 'f * u<sub>L</sub>',
		line: {color: 'green', width: 3}
		}
		];  
  }

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
  Plotly.newPlot("convEx2Plot", data, layout);
}





new_convolution_ex2();