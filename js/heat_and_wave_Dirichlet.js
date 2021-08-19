var myReq_DBC;
var param_DBC = 1/600; // speeding
var T_DBC = 0;
var x_start_DBC = 0;
var x_fin_DBC = 1;
var dx_DBC = 0.01;
var N_DBC = Math.ceil((x_fin_DBC - x_start_DBC)/dx_DBC +1);
var xArray_DBC = Array.from(Array(N_DBC), (_, j) => x_start_DBC + j * dx_DBC);
var uHeatArray = [];
var uWaveArray = [];
var L;
var omega;

function DBC_setup(){
  for (let i = 0; i< N_DBC; i ++){
    uHeatArray[i] = Math.exp(- (omega**2) * T_DBC) * Math.sin(omega * xArray_DBC[i]);
    uWaveArray[i] = Math.cos(omega * T_DBC) * Math.sin(omega * xArray_DBC[i]);
  }


Plotly.newPlot('myDBC', [{
  x: xArray_DBC,
  y: uHeatArray,
  mode: 'lines', name: 'u_heat',
  line: {color: 'dodgerblue'}
},
{
  x: xArray_DBC,
  y: uWaveArray,
  mode: 'lines', name: 'u_wave',
  line: {color: 'orange'}
}
], {legend: {"orientation": "h",yanchor: 'top', y:-0.2}, title: "Heat and wave equations",  margin: {
    l: 50,
    r: 50,
    b: 100,
    t: 100,
    pad: 4
  },
  xaxis: {range: [x_start_DBC, (x_fin_DBC)*1.05], title: "x"},
  yaxis: {range: [-1.1, 1.1], title: "u"}
});
}



function update_DBC() {
  T_DBC = T_DBC + param_DBC;
  document.getElementById("time_DBC").innerHTML = Math.floor(T_DBC*10)/10;  
  for (let i = 0; i< N_DBC; i ++){
    uHeatArray[i] = Math.exp(- (omega**2) * T_DBC) * Math.sin(omega * xArray_DBC[i]);
    uWaveArray[i] = Math.cos(omega * T_DBC) * Math.sin(omega * xArray_DBC[i]);
  }

  Plotly.animate('myDBC', {
    data: [{x: xArray_DBC, y: uHeatArray}, {x: xArray_DBC, y: uWaveArray}]
  }, {
    transition: {
      duration: 0
    },
    frame: {
      duration: 0,
      redraw: false
    }
  });
  myReq_DBC =requestAnimationFrame(update_DBC);
}





function stopDBCAnimation(){
  window.cancelAnimationFrame(myReq_DBC);
}

function continueDBCAnimation(){
  stopDBCAnimation();
  myReq_DBC = window.requestAnimationFrame(update_DBC);

}


function newDBC() {
  stopDBCAnimation(); 
  L = parseFloat(document.getElementById("L").value);
  omega = Math.PI/L;
  x_fin_DBC = L;
  N_DBC = Math.ceil((x_fin_DBC - x_start_DBC)/dx_DBC +1);
  xArray_DBC = Array.from(Array(N_DBC), (_, j) => x_start_DBC + j * dx_DBC);
  uHeatArray = [];
  uWaveArray = [];
  T_DBC = 0;
 
  document.getElementById("time_DBC").innerHTML = Math.floor(T_DBC*10)/10;  
  
  DBC_setup();
  myReq_DBC = window.requestAnimationFrame(update_DBC);
}

function new_omega() {
  document.getElementById("showOmega").innerHTML = 
    Math.PI/(parseFloat(document.getElementById("L").value));
}