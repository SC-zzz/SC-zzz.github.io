// plotting range: -1<= x <=6, -1<= y <= 6
JXG.Options.text.useMathJax = true;
function new_function() { 
  var canvasdiv = document.getElementById('canvasdiv');
  // for eigenlines
  var r_lim =12;
  var l_lim = -r_lim;
  const m =8;

    
  var a = parseFloat(document.getElementById("a").value);  
  var b = parseFloat(document.getElementById("b").value);
  var c = parseFloat(document.getElementById("c").value);
  var d = parseFloat(document.getElementById("d").value);    

  var k = parseFloat(document.getElementById("k").value);    


  // let v1_x = [];
  // let v1_y = [];
  // let v2_x = [];
  // let v2_y = []; 
  // for (let j=0; j< 10; j++) {
  //   let M = [[a/j + 1,b/j], [c/j,d/j + 1]]; 
  //   let Aj = math.pow(M, j);
  //   v1_x[j] = Aj[0][0];
  //   v1_y[j] = Aj[1][0];    
  //   v2_x[j] = Aj[0][1];
  //   v2_y[j] = Aj[1][1];        
  // } 
  
  let M = [[a/k + 1,b/k], [c/k,d/k + 1]]; 
  let Ak = math.pow(M, k);
  
  // poly lambda^2 - tr * lambda + det      
  var tr = a + d;
  var det = a * d - b * c;
  var delta = tr**2 - 4 * det;

  let A = [[a,b], [c,d]];   

// 
//   if (delta == 0) {
//       
//   }
// 
//   var w = [0,0];  //storing eigenvalues
//   var v = new Array(2);
//   // WARNING: Do no use ans.vectors to get the eigenvectors! It gives wrong answers!
// 	
//   if (c == 0) {
// 	w = [a,d];
// 	v[0] = [1,0];
// 	if (b != 0){		        
// 	  let temp = [Math.sign(b)*b, Math.sign(b)*(-a+d)];
// 	  let len = Math.sqrt((temp[0])**2+ (temp[1])**2);
// 	  v[1] = [temp[0]/len, temp[1]/len];
// 	} 
// 	else {
// 	  v[1] = [0,1];
// 	}
//   }
//   else if (b == 0){
// 	w = [a,d];
// 	let temp = [Math.sign(d-a)*(d-a), -Math.sign(d-a)*c];
// 	let len = Math.sqrt((temp[0])**2+ (temp[1])**2);
// 	v[0] = [1,0];
// 	v[1] = [0,1];
//   } 
//   else {		        
// 	w = [math.add(tr/2, math.sqrt(delta/4)), 
// 		 math.subtract(tr/2, math.sqrt(delta/4))];
// 	let temp1 = [Math.sign(b)*b, 
// 				 math.multiply(Math.sign(b), math.add(-a,w[0]))];
// 	let len1 = math.norm(temp1);
// 	v[0] = math.divide(temp1, len1);
// 	let temp2 = [Math.sign(b)*b, 
// 				 math.multiply(Math.sign(b), math.add(-a,w[1]))];
// 	let len2 = math.norm(temp2);
// 	v[1] = math.divide(temp2, len2);
//   }
// 	                
// 







  
  // visualize the columns of exp(tA)
  let c1_x = [];
  let c1_y = [];
  let c2_x = [];
  let c2_y = [];    

  let h = 0.01;
  let N = Math.ceil(1/h +1);
  let tArray = Array.from(Array(N), (_, k) => k * h);
 
  for (let i = 0; i< N; i++) {
    let exptA = math.expm(math.multiply(tArray[i], A));
    let temp = exptA._data;
    c1_x[i] = temp[0][0];  
    c1_y[i] = temp[1][0];   
    c2_x[i] = temp[0][1];  
    c2_y[i] = temp[1][1];     
  }
   
   let x_min = math.min(math.min(c1_x),math.min(c2_x));
   let x_max = math.max(math.max(c1_x),math.max(c2_x));
   let x_span = x_max - x_min;

   let y_min = math.min(math.min(c1_y),math.min(c2_y));
   let y_max = math.max(math.max(c1_y),math.max(c2_y));
   let y_span = y_max - y_min;

  //var brd = JXG.JSXGraph.initBoard('box',{axis: true,boundingbox: [-5, 5, 5, -5], keepaspectratio: true});

  //brd.create('curve', [c1_x, c1_y], {strokeColor: "black",strokeWidth:3});  
  //brd.create('curve', [c2_x, c2_y], {strokeColor: "black",strokeWidth:3});  


  Plotly.newPlot('myMatExp', [
   {
    x: c1_x,
    y: c1_y,
    mode: 'lines', 
    //name: 'first column of e^{tA}',
    name: 'e<sup>tA</sup><b>e</b><sub>1</sub>',
    line: {color: 'dodgerblue', width: 3}
  }, 
      {
    x: [1],
    y: [0],
    type: "scatter",
    mode: "markers",
    name: "t=0",
    marker: {color: 'dodgerblue', size: 10, symbol: "x-dot"}
   }, 
      {
    x: [c1_x[N-1]],
    y: [c1_y[N-1]],
    type: "scatter",
    mode: "markers",
    name: "t=1",
    marker: {color: 'dodgerblue', size: 10, symbol: "square"}
   },   
    {
    x: [Ak[0][0]],
    y: [Ak[1][0]],
    type: "scatter",
    mode: "markers",
    //name: "first column of A_k",
    name: 'A<sub>k</sub><b>e</b><sub>1</sub>',    
    marker: {color: 'green', size: 12}
  },
  {
    x: c2_x,
    y: c2_y,
    mode: 'lines', 
    //name: 'second column of e^{tA}',
    name: 'e<sup>tA</sup><b>e</b><sub>2</sub>',    
    line: {color: 'orange', width: 3}
  },
      {
    x: [0],
    y: [1],
    type: "scatter",
    mode: "markers",
    name: "t=0",
    marker: {color: 'orange', size: 10, symbol: "x-dot"}
   },  
         {
    x: [c2_x[N-1]],
    y: [c2_y[N-1]],
    type: "scatter",
    mode: "markers",
    name: "t=1",
    marker: {color: 'orange', size: 10, symbol: "square"}
   },  
//   {
//     x: v1_x,
//     y: v1_y,
//     type: "scatter",
//     mode: "markers"
//   },
  {
    x: [Ak[0][1]],
    y: [Ak[1][1]],
    type: "scatter",
    mode: "markers",
    //name: "second column of A_k",
    name: 'A<sub>k</sub><b>e</b><sub>2</sub>',     
    marker: {color: 'red', size: 12}
  }, 
     
  ], 
  {
    xaxis: {range: [x_min - 0.1*x_span, x_max + 0.1*x_span]},
    yaxis: {autorange: false, range: [y_min - 0.1*y_span, y_max + 0.1*y_span]},  
    legend: {"orientation": "h",yanchor: 'top', y:-0.2}, 
    title: "Matrix exponential",  
    margin: {
      l: 40,
      r: 40,
      b: 80,
      t: 80,
      pad: 4
    },
    width: 600,
    height: 600
  });
  	 

}

new_function();



