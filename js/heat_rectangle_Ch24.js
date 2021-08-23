// heat eqn, Dirichlet BC, rectangle
var myReq_HDRec; 
var slower_HDRec = 1;
var param_HDRec = 1/(60 * slower_HDRec); // speeding
var T_HDRec = 0;
var L1_HDRec = 1;
var L2_HDRec = 1;
var n1_HDRec = 1;
var n2_HDRec = 1;
var dx_HDRec = 0.01;
var dy_HDRec = 0.01;
var Nx_HDRec = Math.ceil((L1_HDRec)/dx_HDRec +1);
var Ny_HDRec = Math.ceil((L2_HDRec)/dy_HDRec +1);
var xArray_HDRec = Array.from(Array(Nx_HDRec), (_, j) => j * dx_HDRec);
var yArray_HDRec = Array.from(Array(Ny_HDRec), (_, j) => j * dy_HDRec);
var a1_HDRec = n1_HDRec/L1_HDRec;
var a2_HDRec = n2_HDRec/L2_HDRec;

var uHeatDRec = [];




function HDRec_setup(){
  stopAnimation_HDRec(); 

  L1_HDRec = parseFloat(document.getElementById("L1_HDRec").value);
  L2_HDRec = parseFloat(document.getElementById("L2_HDRec").value);
  
  n1_HDRec = parseFloat(document.getElementById("n1_HDRec").value);
  n2_HDRec = parseFloat(document.getElementById("n2_HDRec").value);

  a1_HDRec = n1_HDRec/L1_HDRec;
  a2_HDRec = n2_HDRec/L2_HDRec;

  Nx_HDRec = Math.ceil((L1_HDRec)/dx_HDRec +1);
  Ny_HDRec = Math.ceil((L2_HDRec)/dy_HDRec +1);
  xArray_HDRec = Array.from(Array(Nx_HDRec), (_, j) => j * dx_HDRec);
  yArray_HDRec = Array.from(Array(Ny_HDRec), (_, j) => j * dy_HDRec);
  
  uHeatDRec = [];

  T_HDRec = 0;
  document.getElementById("time_HDRec").innerHTML = 
    Math.floor(T_HDRec * slower_HDRec * 10)/(10 * slower_HDRec);

   
  // i corresponds to y and j corresponds to x 
  for (let i = 0; i < Ny_HDRec; i ++ ) {
    uHeatDRec[i] = [];
    for (let j = 0; j < Nx_HDRec; j ++ ) {
      uHeatDRec[i][j] = Math.exp(-(a1_HDRec**2 + a2_HDRec**2) * (Math.PI**2)*T_HDRec) 
        * Math.sin(a1_HDRec * Math.PI * xArray_HDRec[j])
        * Math.sin(a2_HDRec * Math.PI * yArray_HDRec[i]);  
    }  
  }
  




Plotly.newPlot('myHDRec', [{
  x: xArray_HDRec,
  y: yArray_HDRec,
  z: uHeatDRec,
  type: 'heatmap',
  colorscale: 'Hot',
  zmax: 1,
  zmin: -1
}
], {legend: {"orientation": "h",yanchor: 'top', y:-0.2}, title: "Heat map plots", margin: {
    l: 50,
    r: 20,
    b: 50,
    t: 50,
    pad: 4
  },
  width: 600,
  height: 550,
  xaxis: {range: [0, L1_HDRec], title: "x"},
  yaxis: {range: [0, L2_HDRec], title: "y"}
});

// Plotly.newPlot('myHDRec2', [{
//   x: xArray_HDRec,
//   y: yArray_HDRec,
//   z: uHeatDRec,
//   type: 'surface',
//   contours: {
//     z: {
//       show:true,
//       usecolormap: true,
//       highlightcolor:"#42f462",
//       project:{z: true}
//     }
//   }
// }
// ], {legend: {"orientation": "h",yanchor: 'top', y:-0.2}, margin: {
//     l: 20,
//     r: 20,
//     b: 50,
//     t: 50,
//     pad: 4
//   },
//   xaxis: {range: [0, L1_HDRec], title: "x"},
//   yaxis: {range: [0, L2_HDRec], title: "y"},
//   zaxis: {range: [-1, 1], title: "z"}
// });



}





function update_HDRec() {
  T_HDRec = T_HDRec + param_HDRec;
  
  document.getElementById("time_HDRec").innerHTML = 
    Math.floor(T_HDRec * slower_HDRec * 10)/(10 * slower_HDRec);
  
 
   
  for (let i = 0; i < Ny_HDRec; i ++ ) {
    for (let j = 0; j < Nx_HDRec; j ++ ) {
//       uHeatDRec[i][j] = Math.exp(-(a1**2 + a2**2) * (Math.PI**2)*T_HDRec) 
//         * Math.sin(a1 * Math.PI * xArray_HDRec[j])
//         * Math.sin(a2 * Math.PI * yArray_HDRec[i]); 
        uHeatDRec[i][j] = uHeatDRec[i][j] * Math.exp(-(a1_HDRec**2 + a2_HDRec**2) * (Math.PI**2) * param_HDRec);
    }  
  }
  
  

  Plotly.animate('myHDRec', {
    data: [{z:uHeatDRec}]
  }, {
    transition: {
      duration: 0
    },
    frame: {
      duration: 0,
      //redraw: false
    }
  });
  
//   Plotly.animate('myHDRec2', {
//     data: [{z:uHeatDRec}]
//   }, {
//     transition: {
//       duration: 0
//     },
//     frame: {
//       duration: 0,
//       //redraw: false
//     }
//   });
  
  myReq_HDRec =requestAnimationFrame(update_HDRec);
}





function stopAnimation_HDRec(){
  window.cancelAnimationFrame(myReq_HDRec);
}

function continueAnimation_HDRec(){
  stopHWAnimation_HDRec();
  myReq_HDRec = window.requestAnimationFrame(update_HDRec);

}

function changeSpeed_HDRec(){
  //stopAnimation_HDRec();
  if (document.getElementById("normal").checked) {
    slower_HDRec = 1;
  }
  else if (document.getElementById("x1/5").checked) {
    slower_HDRec = 5;
  }
//   else if (document.getElementById("x1/10").checked) {
//     slower_HDRec = 10;
//   }
  else if (document.getElementById("x1/20").checked) {
    slower_HDRec = 20;
  }
  else if (document.getElementById("x1/50").checked) {
    slower_HDRec = 50;
  }      
  param_HDRec = 1/(60 * slower_HDRec);
  
  //myReq_HDRec = window.requestAnimationFrame(update_HDRec);

}


function newHDRec() {
  HDRec_setup();
  //stopHWAnimation(); 
  //sel_f_HDRec= parseFloat(document.getElementById("IC").value);  

  if (document.getElementById("normal").checked) {
    slower_HDRec = 1;
  }
  else if (document.getElementById("x1/5").checked) {
    slower_HDRec = 5;
  }
//   else if (document.getElementById("x1/10").checked) {
//     slower_HDRec = 10;
//   }
  else if (document.getElementById("x1/20").checked) {
    slower_HDRec = 20;
  }
  else if (document.getElementById("x1/50").checked) {
    slower_HDRec = 50;
  }  
     
  param_HDRec = 1/(60 * slower_HDRec);
    
  
  
  myReq_HDRec = window.requestAnimationFrame(update_HDRec);
}

HDRec_setup();
