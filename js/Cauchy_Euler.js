function new_Cauchy_Euler() { 
  var a = parseFloat(document.getElementById("a_CE").value);  
  var b = parseFloat(document.getElementById("b_CE").value);
    //var y0 = parseFloat(document.getElementById("Y0").value);  
    //var dy0 = parseFloat(document.getElementById("dY0").value);
  var y0 = 1;
  var dy0 = 0;

   // convert to first-order systems
   // y' =z, z'=-py-q
   function f(t, v)  {
       return [v[1],-a/t*v[1]-b/(t**2)*v[0]];
   }


  var left_lim = 0.1;
  var right_lim = 10;
    // use midpoint method to solve
  //var sol = ode_RK4(left_lim, right_lim, 0.005, f, [y0, dy0]);
  //var tArray = sol[0];
   // var yArray = new Array(tArray.length).fill(0);
   // for (let i = 0; i < tArray.length; i++) {
   //    yArray[i] = sol[1][i][0];
   //}
  
  let h = 0.005;
  let N = Math.ceil((right_lim-left_lim)/h +1);
  let tArray = Array.from(Array(N), (_, k) => left_lim + k * h);       

    
  var delta = (1-a)**2 - 4*b;
  if (delta > 0) {   
    var r_plus = (1-a+math.sqrt(delta))/2; 
    var r_minus = (1-a-math.sqrt(delta))/2; 
        //var A = [[1,1],[lambda1,lambda2]]; 

	document.getElementById("case1").style.display = 'block'; 
	document.getElementById("case2").style.display = 'none';    
	document.getElementById("case3").style.display = 'none';  
	document.getElementById("r+").innerHTML =  r_plus.toFixed(3);
	document.getElementById("r-").innerHTML =  r_minus.toFixed(3);	
    var y1Array = tArray.map(function (t) {return math.exp(Math.log(t)*r_plus)});
    var y2Array = tArray.map(function (t) {return math.exp(Math.log(t)*r_minus)});         
  }
  else if (delta < 0) {
    var c1 = (1-a)/2;
    var c2 = math.sqrt(-delta)/2; 
    //var A = [[1,0],[r0,s0]];

	document.getElementById("case1").style.display = 'none'; 
	document.getElementById("case2").style.display = 'block';    
	document.getElementById("case3").style.display = 'none';  
	document.getElementById("c1").innerHTML =  c1.toFixed(3);
	document.getElementById("c2").innerHTML =  c2.toFixed(3);		        
        var y1Array = tArray.map(function (t) 
          {return math.exp(Math.log(t)*c1)*math.cos(c2*Math.log(t))});
        var y2Array = tArray.map(function (t) 
          {return math.exp(Math.log(t)*c1)*math.sin(c2*Math.log(t))});
    }
  else{
    var r = (1-a)/2;
        //var A = [[1,0],[lambda1,1]];

	document.getElementById("case1").style.display = 'none'; 
	document.getElementById("case2").style.display = 'none';    
	document.getElementById("case3").style.display = 'block';  
	document.getElementById("r").innerHTML =  r.toFixed(3);	  
    var y1Array = tArray.map(function (t) {return math.exp(Math.log(t)*r)});
    var y2Array = tArray.map(function (t) {return Math.log(t)*math.exp(Math.log(t)*r)});          
  }    
    
    
    

//     var coeff = math.multiply(math.inv(A), [y0,dy0]);
//     document.getElementById("c1").innerHTML =  math.format(coeff[0],{precision: 3});
//     if (coeff[1] >= 0) {
//         document.getElementById("plusc2").style.display = 'initial'; 
//         document.getElementById("minusc2").style.display = 'none'; 
//         document.getElementById("c2").innerHTML =  math.format(coeff[1],{precision: 3});
//     }
//     else {
//         document.getElementById("plusc2").style.display = 'none'; 
//         document.getElementById("minusc2").style.display = 'initial'; 
//         document.getElementById("c2").innerHTML =  math.format(-coeff[1],{precision: 3});
//     }
        
    //if (document.getElementById("showIS").checked) {
        var y1data = {
			x: tArray,
			y: y1Array,
			mode:"lines",
			name: 'y_1(t)',
			line: {color: 'hsl(0, 100%, 70%)'}
			};
		var y2data = {
			x: tArray,
			y: y2Array,
			mode:"lines",
			name: 'y_2(t)',
			line: {color: 'hsl(270, 100%, 70%)'}
			};	
    //}
    //else {
   //     var y1data = {};
   //     var y2data ={};
   // }
    
    //if (document.getElementById("linear").checked) {
        var plotscale = "linear";
   // }
   // else {
   //     var plotscale = "log";
   // }
   
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
// 	{
// 	x:tArray,
// 	y:yArray,
// 	mode:"lines",
// 	name: 'y(t)',
// 	line: {color: 'dodgerblue', width: 3}
// 	}
	];

	// Define Layout
	var layout = {
	   xaxis: {range: [0, right_lim], title: "time t"},
	   yaxis: {autorange: true, title: "y", type: plotscale},  
	   title: "The two independent solutions",
	};

    // Display using Plotly
    Plotly.newPlot("CEPlot", data, layout);
}

new_Cauchy_Euler();



