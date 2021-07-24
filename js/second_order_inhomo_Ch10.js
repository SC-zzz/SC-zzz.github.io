function new_function() { 
  var a = 2*parseFloat(document.getElementById("zeta").value);  
  var omega = parseFloat(document.getElementById("omega").value);
  if (omega != 0) {
    document.getElementById("period").innerHTML = 2*Math.PI/Math.abs(omega);
  }
  else {document.getElementById("period").innerHTML = "infinity";}


  var t_start = 0;
  var t_fin = 30;
  
    
  function f(t,v) {
    return [v[1], -a*v[1] - v[0] + math.cos(omega*t)];
  }
  

  
  
  var sol = ode_RK4(t_start, t_fin, 0.005, f, [0,0]);
  var tArray = sol[0];
  var yArray = [];
  for (let i = 0; i< tArray.length; i ++) {
    yArray[i] = sol[1][i][0];
  }
  var cosArray = tArray.map(function (t) {return math.cos(omega*t)}); 

   
  // Define Data
  var data = [
  	{
	x:tArray,
	y:cosArray,
	mode:"lines",
	name: 'cos('+ omega + 't)',
	line: {color: 'orange', width: 2}
	},
	{
	x:tArray,
	y:yArray,
	mode:"lines",
	name: 'y(t)',
	line: {color: 'dodgerblue', width: 3}
	}
	];

  // Define Layout
  var layout = {
	xaxis: {range: [t_start, t_fin], title: "t"},
	yaxis: {autorange: true, title: "y"},  
	title: "The solution curve y(t) (with &#950;=" 
			  + a/2 + ", &#969;=" + omega + ")",
	}; //&#950; = zeta, &#969; = omega

    // Display using Plotly
  Plotly.newPlot("myPlot", data, layout);
}

new_function();