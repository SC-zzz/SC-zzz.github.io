function new_function() { 
  var C = parseFloat(document.getElementById("C").value);  
  var omega = parseFloat(document.getElementById("omega").value);
  if (omega != 0) {
    document.getElementById("period").innerHTML = 2*Math.PI/Math.abs(omega);
  }
  else {document.getElementById("period").innerHTML = "infinity";}

// (e^(-5 t) (a + 25 C + a^2 C - a e^(5 t) cos(a t) + 5 e^(5 t) sin(a t)))/(25 + a^2)

  var t_start = -0.15;
  var t_fin = 15;
  var tArray = math.range(t_start, t_fin, 0.01).toArray();
  var yArray = tArray.map(function (t) {return math.exp(-5*t) * 
    (omega + 25*C + (omega**2)*C - omega * math.exp(5*t)* math.cos(omega*t) + 
    5*math.exp(5*t)*math.sin(omega*t))/(25+(omega**2))}); 
  var sinArray = tArray.map(function (t) {return math.sin(omega*t)}); 

   
  // Define Data
  var data = [
  	{
	x:tArray,
	y:sinArray,
	mode:"lines",
	name: 'sin('+ omega + 't)',
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
	title: "The solution curve y(t) (with C=" 
			  + C + ", omega=" + omega + ")",
	};

    // Display using Plotly
  Plotly.newPlot("myPlot", data, layout);
}

new_function();