function new_function() { 
  var C = parseFloat(document.getElementById("C").value);  
  var omega = parseFloat(document.getElementById("omega").value);
  if (omega != 0) {
    document.getElementById("period").innerHTML = 2*Math.PI/Math.abs(omega);
    var diff = Math.asin(omega/Math.sqrt(4+(omega**2)))/omega;
    document.getElementById("diff").innerHTML = diff;
    var vertical = {
      type: 'line',
      x0: diff,
      y0: -1.1,
      x1: diff,
      y1: 1.1,
      line: {
        color: 'gray',
        width: 3
      }
    };
    var text = {
      x: [diff/2],
      y: [1.2],
      showlegend: false,
      text: ['&#966;/&#969;'],
      mode: 'text'
    };
  }
  else {
    document.getElementById("period").innerHTML = "infinity";
    document.getElementById("diff").innerHTML = "NaN";
    var vertical = null;
    var text ={};
  }
  document.getElementById("phase").innerHTML = Math.asin(omega/Math.sqrt(4+(omega**2)));
  
  

// (e^(-2 t) (a + 4 C + a^2 C - a e^(2 t) cos(a t) + 2 e^(2 t) sin(a t)))/(4 + a^2)

  var t_start = -0.15;
  var t_fin = 10;
  var tArray = math.range(t_start, t_fin, 0.01).toArray();
  var yArray = tArray.map(function (t) {return math.exp(-2*t) * 
    (omega + 4*C + (omega**2)*C - omega * math.exp(2*t)* Math.cos(omega*t) + 
    2*math.exp(2*t)*Math.sin(omega*t))/(4+(omega**2))}); 
  var sinArray = tArray.map(function (t) {return Math.sin(omega*t)}); 
  var trigPartArray = tArray.map(function (t) 
    {return (2*Math.sin(omega*t)- omega * Math.cos(omega*t))/Math.sqrt(4+(omega**2))});
   
  // Define Data
  var data = [text,
  	{
	x:tArray,
	y:sinArray,
	mode:"lines",
	name: 'sin('+ omega + 't)',
	line: {color: 'orange', width: 2}
	},
	{
	x:tArray,
	y:trigPartArray,
	mode:"lines",
	name: 'sin('+ omega + 't -&#966;)',
	line: {color: 'violet', width: 2}
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
			  + C + ", &#969;=" + omega + ")",
	  shapes: [vertical]		  
	};

    // Display using Plotly
  Plotly.newPlot("myPlot", data, layout);
}

new_function();