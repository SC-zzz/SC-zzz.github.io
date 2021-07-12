function new_function() { 
    var p = parseFloat(document.getElementById("p").value);  
    var q = parseFloat(document.getElementById("q").value);
    var y0 = parseFloat(document.getElementById("Y0").value);  
    var dy0 = parseFloat(document.getElementById("dY0").value);


   // convert to first-order systems
   // y' =z, z'=-py-q
   function f(t, v)  {
       return [v[1],-p*v[1]-q*v[0]];
   }
     
    var right_lim = 10;
    // use midpoint method to solve
    var sol = ode_midpoint(0, right_lim, 0.005, f, [y0, dy0]);
    var tArray = sol[0];
    var yArray = new Array(tArray.length).fill(0);
    for (let i = 0; i < tArray.length; i++) {
       yArray[i] = sol[1][i][0];
   }
       
    if (p >= 0) {
        document.getElementById("p_term").innerHTML = "+"+p;
    }
    else {
        document.getElementById("p_term").innerHTML = "-"+(-p);
    }
    
    if (q >= 0) {
        document.getElementById("q_term").innerHTML = "+"+q;
    }
    else {
        document.getElementById("q_term").innerHTML = "-"+(-q);
    }
    
    
    // correction factor
    var cf = 10    
    var delta = ((p*cf)**2 - 4 * q*cf*cf)/(cf*cf);
    if (delta > 0) {   
        var lambda1 = (-p+math.sqrt(delta))/2; 
        var lambda2 = (-p-math.sqrt(delta))/2;  
        document.getElementById("type_of_roots").innerHTML = 
          "It has two distinct real roots.";
        document.getElementById("lambda1").innerHTML =  lambda1;
        document.getElementById("lambda2").innerHTML =  lambda2; 
        document.getElementById("case1").style.display = 'block'; 
        document.getElementById("case2").style.display = 'none';    
        document.getElementById("case3").style.display = 'none';  
        var y1Array = tArray.map(function (x) {return math.exp(x*lambda1)});
        var y2Array = tArray.map(function (x) {return math.exp(x*lambda2)});         
    }
    else if (delta == 0) {
        var lambda1 = -p/2; 
        document.getElementById("type_of_roots").innerHTML = 
            "It has two equal real roots.";
        document.getElementById("lambda1").innerHTML =  -p/2;
        document.getElementById("lambda2").innerHTML =  -p/2; 
        document.getElementById("case1").style.display = 'none'; 
        document.getElementById("case2").style.display = 'block';    
        document.getElementById("case3").style.display = 'none';    
        var y1Array = tArray.map(function (x) {return math.exp(x*lambda1)});
        var y2Array = tArray.map(function (x) {return x*math.exp(x*lambda1)});          
    }
    else {
        var lambda1 = math.add(-p/2, math.sqrt(delta/4));
        var lambda2 = math.subtract(-p/2, math.sqrt(delta/4)); 
        var r0 =  -p/2;
        var s0 = math.sqrt(-delta/4);
        document.getElementById("type_of_roots").innerHTML = 
          "It has two conjugate complex roots.";
        document.getElementById("lambda1").innerHTML =  lambda1;
        document.getElementById("lambda2").innerHTML =  lambda2;
        document.getElementById("case1").style.display = 'none'; 
        document.getElementById("case2").style.display = 'none';    
        document.getElementById("case3").style.display = 'block';          
        var y1Array = tArray.map(function (x) {return math.exp(x*r0)*math.cos(s0*x)});
        var y2Array = tArray.map(function (x) {return math.exp(x*r0)*math.sin(s0*x)});
    }

    if (document.getElementById("showIS").checked) {
        var y1data = {
			x: tArray,
			y: y1Array,
			mode:"lines",
			name: 'y_1(t)',
			line: {color: 'hsl(0, 100%, 80%)'}
			};
		var y2data = {
			x: tArray,
			y: y2Array,
			mode:"lines",
			name: 'y_2(t)',
			line: {color: 'hsl(270, 100%, 80%)'}
			};	
    }
    else {
        var y1data = {};
        var y2data ={};
    }
    
    if (document.getElementById("linear").checked) {
        var plotscale = "linear";
    }
    else {
        var plotscale = "log";
    }
   
	// Define Data
	var data = [
	y1data, y2data,
// 	{
// 	x:[0,right_lim],
// 	y:[y0, y0+ dy0* right_lim],
// 	mode:"lines",
// 	name: "tangent line through (0, y(0)) with slope = y\'(0)",
// 	line: {dash: 'dot', color: 'orange'}
// 	},
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
	   xaxis: {range: [0, right_lim], title: "time t"},
	   yaxis: {autorange: true, title: "y", type: plotscale},  
	   title: "The solution curve y(t) (with p=" 
			  + p + ", q=" + q + ", y(0)=" + y0 + ", y'(0)=" + dy0 + ")",
	};

    // Display using Plotly
    Plotly.newPlot("myPlot", data, layout);
}

new_function();



