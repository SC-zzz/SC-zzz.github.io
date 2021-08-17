var myReq;
var param = 1/60; // speeding
var T = 0;
var x_start = -5;
var x_fin = 5;
var dx = 0.01;
var N = Math.ceil((x_fin-x_start)/dx +1);
var xArray_TW = Array.from(Array(N), (_, j) => x_start + j * dx);
var urArray = [];
var ulArray = [];
var k;

function TW_setup(k){
  for (let i = 0; i< N; i ++){
    urArray[i] = Math.sin(xArray_TW[i] - Math.sqrt(k)*T);
    ulArray[i] = Math.sin(xArray_TW[i] + Math.sqrt(k)*T);
  }


Plotly.newPlot('myTW', [{
  x: xArray_TW,
  y: urArray,
  mode: 'lines', name: 'u_r',
  line: {color: 'dodgerblue'}
},
{
  x: xArray_TW,
  y: urArray,
  mode: 'lines', name: 'u_l',
  line: {color: 'orange'}
}
], {legend: {"orientation": "h",yanchor: 'top', y:-0.2}, title: "Traveling waves",  margin: {
    l: 50,
    r: 50,
    b: 100,
    t: 100,
    pad: 4
  },
  xaxis: {range: [x_start, x_fin], title: "x"},
  yaxis: {range: [-1.1, 1.1], title: "u"}
});
}



function update() {
  T = T + param;
  document.getElementById("time_TW").innerHTML = Math.floor(T);
  for (let i = 0; i< N; i ++){
    urArray[i] = Math.sin(xArray_TW[i] - Math.sqrt(k)*T);
    ulArray[i] = Math.sin(xArray_TW[i] + Math.sqrt(k)*T);
  }

  Plotly.animate('myTW', {
    data: [{x: xArray_TW, y: urArray}, {x: xArray_TW, y: ulArray}],
    layout: [{title: "Traveling waves"}]
  },
  {
    transition: {
      duration: 0
    },
    frame: {
      duration: 0,
      redraw: false
    }
  });
  myReq =requestAnimationFrame(update);
}





function stopTWAnimation(){
  window.cancelAnimationFrame(myReq);
}

function continueTWAnimation(){
  stopTWAnimation();
  myReq = window.requestAnimationFrame(update);

}


function newTW() {
  k = parseFloat(document.getElementById("k_TW").value);
  T = 0;
  document.getElementById("time_TW").innerHTML = Math.floor(T);
  stopTWAnimation();  
  TW_setup(k);
  myReq = window.requestAnimationFrame(update);
}

function new_c() {
  c = Math.sqrt(parseFloat(document.getElementById("k_TW").value));
  document.getElementById("showC").innerHTML = c;
}