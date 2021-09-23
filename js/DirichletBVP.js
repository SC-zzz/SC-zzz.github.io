function new_DBVP_1() {
  let a = parseFloat(document.getElementById("a_D1").value);
  let b = parseFloat(document.getElementById("b_D1").value);
  let lambda = parseFloat(document.getElementById("lambda_D1").value);
  let L = parseFloat(document.getElementById("L_D1").value);
  let sl = Math.sqrt(Math.abs(lambda));

  let x_start = 0;
  let x_fin = L;
  let dx = 0.01;
  let N = Math.ceil((x_fin-x_start)/dx +1);
  let xArray = Array.from(Array(N), (_, j) => x_start + j * dx);
  let yabArray = [];
  let ya0Array = [];
  let y0bArray = [];

  if (lambda > 0) {
    for (let i = 0; i< N; i++) {
      let x = xArray[i];
      yabArray[i] = a * (Math.exp(sl*(L-x)) - Math.exp(-sl*(L-x)))/(Math.exp(sl*L) - Math.exp(-sl*L))
        + b * (Math.exp(sl*(x)) - Math.exp(-sl*(x)))/(Math.exp(sl*L) - Math.exp(-sl*L));
      ya0Array[i] = a * (Math.exp(sl*(L-x)) - Math.exp(-sl*(L-x)))/(Math.exp(sl*L) - Math.exp(-sl*L));
      y0bArray[i] = b * (Math.exp(sl*(x)) - Math.exp(-sl*(x)))/(Math.exp(sl*L) - Math.exp(-sl*L));
    }
  }
  else if (lambda == 0) {
    for (let i = 0; i< N; i++) {
      yabArray[i] = (b-a)/L * xArray[i] + a;
      ya0Array[i] = (-a)/L * xArray[i] + a;
      y0bArray[i] = (b)/L * xArray[i];
    }
  }
  else {
    for (let i = 0; i< N; i++) {
      let x = xArray[i];
      yabArray[i] = a * (Math.cos(sl*x) - Math.cos(sl*L)/Math.sin(sl*L)*Math.sin(sl*x))
        + b * Math.sin(sl*x) / Math.sin(sl*L);
      ya0Array[i] = a * (Math.cos(sl*x) - Math.cos(sl*L)/Math.sin(sl*L)*Math.sin(sl*x));
      y0bArray[i] = b * Math.sin(sl*x) / Math.sin(sl*L);
    }
  }


  let data = [{
    x: xArray,
    y: ya0Array,
    mode: 'lines', name: 'X<sub>a,0</sub>',
    line: {color: 'orange'}
   },
   {
    x: xArray,
    y: y0bArray,
    mode: 'lines', name: 'X<sub>0,b</sub>',
    line: {color: 'green'}
   },
   {
    x: xArray,
    y: yabArray,
    mode: 'lines', name: 'X<sub>a,b</sub>',
    line: {color: 'dodgerblue'}
   }
   ];



  Plotly.newPlot('DBVP1', data,
    {legend: {"orientation": "h",yanchor: 'top', y:-0.2}, title: "Dirichlet BVP",  margin: {
      l: 50,
      r: 50,
      b: 100,
      t: 100,
      pad: 4
    },
    xaxis: {range: [x_start, (x_fin)*1.05], title: "x"},
    yaxis: {title: "X"}
    });

}

new_DBVP_1();



function new_DBVP_2() {
  let a = parseFloat(document.getElementById("a_D2").value);
  let n = parseFloat(document.getElementById("n_D2").value);
  //let L = parseFloat(document.getElementById("L_D2").value);
  let L = Math.PI;
  let A = parseFloat(document.getElementById("A_D2").value);
  let omega = n * Math.PI/L;

  let x_start = 0;
  let x_fin = L;
  let dx = 0.01;
  let N = Math.ceil((x_fin-x_start)/dx +1);
  let xArray = Array.from(Array(N), (_, j) => x_start + j * dx);
  let yArray = [];


  for (let i = 0; i< N; i++) {
    yArray[i] = A * Math.sin(omega * xArray[i]) + a * Math.cos(omega * xArray[i]);
  }


  let data = [
   {
    x: xArray,
    y: yArray,
    mode: 'lines', name: 'X',
    line: {color: 'dodgerblue'}
   }
   ];



  Plotly.newPlot('DBVP2', data,
    {legend: {"orientation": "h",yanchor: 'top', y:-0.2}, title: "Dirichlet BVP",  margin: {
      l: 50,
      r: 50,
      b: 100,
      t: 100,
      pad: 4
    },
    xaxis: {range: [x_start, (x_fin)*1.05], title: "x"},
    yaxis: {range: [-4.5, 4.5], title: "X"}
    });

}

new_DBVP_2();



// function new_DBVP_3() {
//   let a = parseFloat(document.getElementById("a_D3").value);
//   let b = parseFloat(document.getElementById("b_D3").value);
//   let L = Math.PI;
//   let lambda = parseFloat(document.getElementById("lambda_D3").value);
//   let sl = Math.sqrt(Math.abs(lambda));
//
//   let x_start = 0;
//   let x_fin = L;
//   let dx = 0.01;
//   let N = Math.ceil((x_fin-x_start)/dx +1);
//   let xArray = Array.from(Array(N), (_, j) => x_start + j * dx);
//   let yArray = [];
//
//
//   for (let i = 0; i< N; i++) {
//     let x = xArray[i];
//     yArray[i] = a * (Math.cos(sl*x) - Math.cos(sl*L)/Math.sin(sl*L)*Math.sin(sl*x))
//         + b * Math.sin(sl*x) / Math.sin(sl*L);
//   }
//
//
//   let data = [
//    {
//     x: xArray,
//     y: yArray,
//     mode: 'lines', name: 'X',
//     line: {color: 'dodgerblue'}
//    }
//    ];
//
//
//
//   Plotly.newPlot('DBVP3', data,
//     {legend: {"orientation": "h",yanchor: 'top', y:-0.2}, title: "Dirichlet BVP",  margin: {
//       l: 50,
//       r: 50,
//       b: 100,
//       t: 100,
//       pad: 4
//     },
//     xaxis: {range: [x_start, (x_fin)*1.05], title: "x"},
//     yaxis: {title: "X"}
//     });
//
// }
//
// new_DBVP_3();
