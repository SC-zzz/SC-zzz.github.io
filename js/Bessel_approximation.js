function Jn_term(n, k, t)  {
  if (k % 2 == 0) {
    return (t**(2*k+n))/((2**(2*k+n))*(math.factorial(k)*math.factorial(k+n)));
  }
  else {
    return -(t**(2*k+n))/((2**(2*k+n))*(math.factorial(k)*math.factorial(k+n)));
  }
}

function Jn_truncate(n, m, t)  {
  let sum = 0;
  for (let k=0; k<= m; k++) {
    sum = sum + Jn_term(n, k, t);
  }
  return sum;
}


function new_Jn() { 
  var n = parseFloat(document.getElementById("n").value);  
  var m = parseFloat(document.getElementById("m").value);  
  
  var left_lim = 0;
  var right_lim = 20;

  
  let h = 0.005;
  let N = Math.ceil((right_lim-left_lim)/h +1);
  let tArray = Array.from(Array(N), (_, k) => left_lim + k * h);       

    
  let approxArray = tArray.map(function (t) {return Jn_truncate(n, m, t)});


  let tArray_2 = Array.from(Array(N-1), (_, k) => left_lim + k * h + h); 
  let testArray;         
  if (n % 4 == 0) {
    testArray = tArray_2.map(function (t) {return math.sqrt(2/(Math.PI*t))*Math.cos(t-Math.PI/4)});       
  }
  else if (n % 4 == 2){
    testArray = tArray_2.map(function (t) {return -math.sqrt(2/(Math.PI*t))*Math.cos(t-Math.PI/4)});
  } 
  else if (n % 4 == 1){
    testArray = tArray_2.map(function (t) {return math.sqrt(2/(Math.PI*t))*Math.sin(t-Math.PI/4)});
  } 
  else {
    testArray = tArray_2.map(function (t) {return -math.sqrt(2/(Math.PI*t))*Math.sin(t-Math.PI/4)});
  } 
    

  if (document.getElementById("showAs").checked) {
  // Define Data
    var data = [
		{
		x: tArray_2,
		y: testArray,
		mode:"lines",
		name: 'Asymptotic behavior',
		line: {color: 'red', width: 2}
		},
		{
		x: tArray,
		y: approxArray,
		mode:"lines",
		name: 'J_{' + n + ','+(2*m + n) +'}',
		line: {color: 'darkorange'}
		}
	   ];
  }
  else {
    var data = [
		{
		x: tArray,
		y: approxArray,
		mode:"lines",
		name: 'J_{' + n + ','+(2*m + n) +'}',
		line: {color: 'darkorange'}
		}
		];
  }
	// Define Layout
  var layout = {
	   xaxis: {range: [left_lim, right_lim], title: "t"},
	   yaxis: {autorange: true, title: "y"},  
	   title: "Approximation of J_" + n,
	   showlegend: true,
	   legend: {"orientation": "h", yanchor: 'top', y:-0.2},
// 	   margin: {
//        l: 30,
//        r: 30,
//        b: 100,
//        t: 100,
//        pad: 4
//      },
	};

    // Display using Plotly
    Plotly.newPlot("JnPlot", data, layout);
}

new_Jn();



