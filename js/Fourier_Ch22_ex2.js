function sawtoothCos(m, x) {
  return 2/(Math.PI*((2*m+1)**2)) * Math.cos((2*m+1)*x);
}

function sawtoothSin(n, x) {
  return -1/n * Math.sin(n*x);
}

function sawtoothPartialSum(M, N, x) {
  let sum = Math.PI/4;
  for (let m=0; m<= M; m++) {
    sum = sum + sawtoothCos(m, x);
  }
  for (let n=1; n<= N; n++) {
    sum = sum + sawtoothSin(n, x);
  }
  return sum;
}

function new_Fourier_2() {
  let M = parseFloat(document.getElementById("M_2").value);
  let N = parseFloat(document.getElementById("N_2").value);
  let h = 0.01;
  let t_start = -2*Math.PI;
  let t_fin = 2*Math.PI;
  let K = Math.ceil((t_fin-t_start)/h +1);
  let tArray = Array.from(Array(K), (_, k) => t_start + k * h);


  let yArray_exact = [];
  for (let i = 0; i< Math.ceil(K/4); i ++){
    yArray_exact[i] = 0;
  }
  for (let i = Math.ceil(K/4); i< Math.ceil(K/2); i ++){
    yArray_exact[i] = tArray[i] + Math.PI;
  }
  for (let i = Math.ceil(K/2); i< Math.ceil(3*K/4); i ++){
    yArray_exact[i] = 0;
  }
  for (let i = Math.ceil(3*K/4); i< K; i ++){
    yArray_exact[i] = tArray[i] - Math.PI;
  }

  let yArray = [];

  for (let i = 0; i< K; i ++){
    yArray[i+1] = sawtoothPartialSum(M, N, tArray[i]);
  }


  // Define Data
  var data = [
    {
	x:tArray,
	y:yArray_exact,
	mode:"lines",
	name: 'sawtooth function',
	line: {color: 'dodgerblue', width: 3}
	},
  	{
	x:tArray,
	y:yArray,
	mode:"lines",
	name: 'F<sub>' + M + ', ' + N + '</sub>',
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
  Plotly.newPlot("FourierPlot2", data, layout);
}




new_Fourier_2();
