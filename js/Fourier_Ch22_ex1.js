function squareWaveM(m, x) {
  return 2/(Math.PI*(2*m+1)) * Math.sin((2*m+1)*x);
}

function squareWavePartialSum(M, x) {
  let sum = 1/2;
  for (let m=0; m<= M; m++) {
    sum = sum + squareWaveM(m, x);
  }
  return sum;
}

function new_Fourier_1() { 
  let M = parseFloat(document.getElementById("M_1").value);  
  let h = 0.01;
  let t_start = -2*Math.PI;
  let t_fin = 2*Math.PI;
  let K = Math.ceil((t_fin-t_start)/h +1);
  let tArray = Array.from(Array(K), (_, k) => t_start + k * h);
  

  let yArray_exact = [];
  for (let i = 0; i< Math.ceil(K/4); i ++){
    yArray_exact[i] = 1;
  }
  for (let i = Math.ceil(K/4); i< Math.ceil(K/2); i ++){
    yArray_exact[i] = 0;
  }
  for (let i = Math.ceil(K/2); i< Math.ceil(3*K/4); i ++){
    yArray_exact[i] = 1;
  }
  for (let i = Math.ceil(3*K/4); i< K; i ++){
    yArray_exact[i] = 0;
  }  
    
  let yArray = [];
  
  for (let i = 0; i< K; i ++){
    yArray[i+1] = squareWavePartialSum(M, tArray[i]);
  }  
  
   
  // Define Data
  var data = [
    {
	x:tArray,
	y:yArray_exact,
	mode:"lines",
	name: 'step function',
	line: {color: 'dodgerblue', width: 3}
	}, 
  	{
	x:tArray,
	y:yArray,
	mode:"lines",
	name: 'F_' + M,
	line: {color: 'green', width: 2}
	}
	];

  // Define Layout
  var layout = {
	xaxis: {range: [t_start, t_fin], title: "t"},
	yaxis: {autorange: true, title: "x"},  
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
  Plotly.newPlot("FourierPlot1", data, layout);
}




new_Fourier_1();