function new_guessing_graph() { 
  var omega = parseFloat(document.getElementById("omega_2").value);
  if (omega != 0) {
    document.getElementById("period_2").innerHTML = 2*Math.PI/Math.abs(omega);
  }
  else {document.getElementById("period_2").innerHTML = "infinity";}


  let t_start = 0;
  let t_fin = 18;
  let tArray = math.range(t_start, t_fin, 0.01).toArray();
  let sinArray = tArray.map(function(t) {return math.sin(omega*t)});
  
  if (omega == 0) {
    var yArray = tArray.map(function (t) {return 0}); 
    }
  else if (omega0 == 0) {
  var yArray = tArray.map(function(t) {return (t*omega - math.sin(omega*t))/(omega**2)}); 
  }     
  else if (omega0 == omega || omega0 == - omega) {
    var yArray = tArray.map(function(t) 
      {return (math.sin(t*omega) - t*omega*math.cos(t*omega))/(2*omega**2)}); 
  }  
  else {
    var yArray = tArray.map(function(t) 
      {return (math.sin(t*omega) - omega*math.sin(t*omega0)/omega0)
      /(omega0**2 - omega**2)}); 
  }
  if (document.getElementById("show").checked){
    var guess = parseFloat(document.getElementById("guess").value);
  
    if ((guess == omega || guess == - omega) && guess > 0) {
      var gArray = tArray.map(function(t) 
        {return (math.sin(t*omega) - t*omega*math.cos(t*omega))/(2*omega**2)}); 
    }  
    else if (guess > 0) {
      var gArray = tArray.map(function(t) 
        {return (math.sin(t*omega) - omega*math.sin(t*guess)/guess)
        /(guess**2 - omega**2)}); 
    }
    else {
      var gArray = new Array(tArray.length);
    }
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
	},
		{
	x:tArray,
	y:gArray,
	mode:"lines",
	name: 'guess',
	line: {color: 'red', width: 2}
	}
	];
  }
  else {
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
	}

  // Define Layout
  let layout = {
	xaxis: {range: [t_start, t_fin], title: "t"},
	yaxis: {autorange: true, title: "y"},  
	title: "The solution curve y(t) (with omega=" + omega + ")",
	};

    // Display using Plotly
  Plotly.newPlot("myPlot_2", data, layout);
}

new_guessing_graph();