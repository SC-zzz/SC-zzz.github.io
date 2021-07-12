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
    var dyArray = new Array(tArray.length).fill(0);
    for (let i = 0; i < tArray.length; i++) {
       yArray[i] = sol[1][i][0];
       dyArray[i] = sol[1][i][1];
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
        var dy1Array = tArray.map(function (x) {return lambda1*math.exp(x*lambda1)});
        var y2Array = tArray.map(function (x) {return math.exp(x*lambda2)});   
        var dy2Array = tArray.map(function (x) {return lambda2*math.exp(x*lambda2)});         
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
        var dy1Array = tArray.map(function (x) {return lambda1*math.exp(x*lambda1)});
        var y2Array = tArray.map(function (x) {return x*math.exp(x*lambda1)});      
        var dy2Array = tArray.map(function (x) 
            {return math.exp(x*lambda1)+lambda1*x*math.exp(x*lambda1)});     
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
        var dy1Array = tArray.map(function (x) 
            {return r0*math.exp(x*r0)*math.cos(s0*x) - s0*math.exp(x*r0)*math.sin(s0*x)});
        var y2Array = tArray.map(function (x) {return math.exp(x*r0)*math.sin(s0*x)});
        var dy2Array = tArray.map(function (x) 
            {return r0*math.exp(x*r0)*math.sin(s0*x) + s0*math.exp(x*r0)*math.cos(s0*x)});
    }



    var parametric3d ={
	x:tArray,
	y:yArray,
	z: dyArray,
	type: 'scatter3d',
    mode: 'lines',
    name: 'y(t)',
    line: {color: 'dodgerblue', width: 3}
	};

	var parametric3d_y1 ={
		x:tArray,
		y:y1Array,
		z: dy1Array,
		type: 'scatter3d',
		mode: 'lines',
		name: 'y_1(t)',
		line: {color: 'hsl(0, 100%, 80%)'}
		};	
	var parametric3d_y2 ={
		x:tArray,
		y:y2Array,
		z: dy2Array,
		type: 'scatter3d',
		mode: 'lines',
		name: 'y_2(t)',
		line: {color: 'hsl(270, 100%, 80%)'}
		};	


    if (document.getElementById("showIS").checked) {
        var y1data = {
			x: tArray,
			y: y1Array,
			xaxis: 'x',
            yaxis: 'y',
			mode:"lines",
			name: 'y_1(t)',
			line: {color: 'hsl(0, 100%, 80%)'}
			};
		var y2data = {
			x: tArray,
			y: y2Array,
			xaxis: 'x',
            yaxis: 'y',
			mode:"lines",
			name: 'y_2(t)',
			line: {color: 'hsl(270, 100%, 80%)'}
			};	
		var y1dy_plot = 	{
			x:y1Array,
			y:dy1Array,
			xaxis: 'x2',
			yaxis: 'y2',
			mode:"lines",
			name: 'y_1(t)',
			line: {color: 'hsl(0, 100%, 80%)'}
			};
		var y2dy_plot = 	{
			x:y2Array,
			y:dy2Array,
			xaxis: 'x2',
			yaxis: 'y2',
			mode:"lines",
			name: 'y_2(t)',
			line: {color: 'hsl(270, 100%, 80%)'}
			};
		
		var data2 = [parametric3d, parametric3d_y1, parametric3d_y2];	
			
    }
    else {
        var y1data = {};
        var y2data ={};
        var y1dy_plot={};
        var y2dy_plot={};
		var data2 = [parametric3d];
    }
    
    //if (document.getElementById("linear").checked) {
    //    var plotscale = "linear";
    //}
    //else {
    //    var plotscale = "log";
    //}
    var plotscale = "-";
   

	
	var ydy_plot = 	{
	x:yArray,
	y:dyArray,
    xaxis: 'x2',
    yaxis: 'y2',
	mode:"lines",
	name: 'y(t)',
	line: {color: 'dodgerblue', width: 3}
	};
   
	// Define Data
	var data = [	
    //parametric_3d,
	{
	x:tArray,
	y:yArray,
    xaxis: 'x',
    yaxis: 'y',
	mode:"lines",
	name: 'y(t)',
	line: {color: 'dodgerblue', width: 3}
	},	y1data, y2data, ydy_plot, y1dy_plot, y2dy_plot
	];

	// Define Layout
	var layout = { 
	   	//scene: {domain: {x: [0.25, 0.75], y: [0, 0.5]}, 
	   //	 xaxis: {title: 't'},
        // yaxis: {title: 'y(t)'},
       //  zaxis: {title: 'y\'(t)'}
		//	 },   
	    xaxis: {range: [0, right_lim], title: "t"},
	    yaxis: {autorange: true, title: "y", type: plotscale},  
	    xaxis2: {title: "y(t)"},
	    yaxis2: {title: "y\'(t)"}, 	    
	   title: "The solution curve y(t) (with p=" 
			  + p + ", q=" + q + ", y(0)=" + y0 + ", y'(0)=" + dy0 + ")",
		grid: {rows: 1, columns: 2, pattern: 'independent'},  
	};

    // Display using Plotly
    Plotly.newPlot("myPlot", data, layout);
    
    

	// Define Layout
	var layout2 = { 
	   	scene: {
	   	 xaxis: {title: 't', autorange: "reversed"},
         yaxis: {title: 'y(t)'},
         zaxis: {title: 'y\'(t)'},
         //camera:{projection:{type: "orthographic"}}
         camera:{eye:{x: 1.5, y:1.5, z: 1.5}, projection:{type: "perspective"}}
			 },  
		 margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0
        }, 
        showlegend: false
	};
    
    
    Plotly.newPlot("myPlot3d", data2, layout2);
}

new_function();



