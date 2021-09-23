// heat eqn, Gaussian
var myReq_HG;
var slower_HG = 1;
var param_HG = 1/(60 * slower_HG); // speeding
var alpha = 0.5;
var T_HG = 0;
var x_start = -10;
var x_fin = 10;
var la_start = -10;
var la_fin = 10;
var dx_HG = 0.01;
var dla_HG = 0.01;
var Nx_HG = Math.ceil((x_fin - x_start)/dx_HG +1);
var Nla_HG = Math.ceil((la_fin - la_start)/dla_HG +1);
var xArray_HG = Array.from(Array(Nx_HG), (_, j) => x_start + j * dx_HG);
var laArray_HG = Array.from(Array(Nla_HG), (_, j) => la_start + j * dla_HG);


var uHeat = [];
var uFourier = [];

function HG_setup(){
  stopAnimation_HG();

  alpha = parseFloat(document.getElementById("alpha_heat").value);

  uHeat = [];
  uFourier = [];

  T_HG = 0;
  document.getElementById("time_HG").innerHTML =
    Math.floor(T_HG * slower_HG)/(slower_HG);


  // solution
  uHeat = xArray_HG.map(function(x) {
      return 1/Math.sqrt(1+ 4 * alpha * T_HG) * Math.exp(- (x**2)/(1+4*alpha * T_HG));
    });

  // Fourier transform
  uFourier = laArray_HG.map(function(la) {
    return Math.sqrt(Math.PI) * Math.exp(- (1+4*alpha * T_HG) * (la**2) /4);
    });




Plotly.newPlot('GaussianHeatPlot', [
{
  x: laArray_HG,
  y: uFourier,
  mode: 'lines', name: "Fourier transform",
  line: {color: 'red', width: 3}
},
{
  x: xArray_HG,
  y: uHeat,
  mode: 'lines', name: "solution",
  line: {color: 'dodgerblue', width: 3}
},
], {legend: {"orientation": "h",yanchor: 'top', y:-0.2}, title: "Solution and its Fourier Transform", margin: {
    l: 50,
    r: 20,
    b: 50,
    t: 60,
    pad: 4
  }
});





}





function update_HG() {
  T_HG = T_HG + param_HG;

  document.getElementById("time_HG").innerHTML =
    Math.floor(T_HG * slower_HG)/(slower_HG);


  // solution
  uHeat = xArray_HG.map(function(x) {
      return 1/Math.sqrt(1+ 4 * alpha * T_HG) * Math.exp(- (x**2)/(1+4*alpha * T_HG));
    });

  // Fourier transform
  uFourier = laArray_HG.map(function(la) {
    return Math.sqrt(Math.PI) * Math.exp(- (1+4*alpha * T_HG) * (la**2) /4);
    });


  Plotly.animate('GaussianHeatPlot', {
    data: [{x: laArray_HG, y: uFourier}, {x: xArray_HG, y: uHeat}]
  }, {
    transition: {
      duration: 0
    },
    frame: {
      duration: 0,
      redraw: false
    }
  });


  myReq_HG =requestAnimationFrame(update_HG);
}





function stopAnimation_HG(){
  window.cancelAnimationFrame(myReq_HG);
}

function continueAnimation_HG(){
  stopHWAnimation_HG();
  myReq_HG = window.requestAnimationFrame(update_HG);

}

function changeSpeed_HG(){
  //stopAnimation_HG();
  if (document.getElementById("normal").checked) {
    slower_HG = 1;
  }
  else if (document.getElementById("x1/2").checked) {
    slower_HG = 2;
  }
//   else if (document.getElementById("x1/10").checked) {
//     slower_HG = 10;
//   }
  else if (document.getElementById("x1/4").checked) {
    slower_HG = 4;
  }

  param_HG = 1/(60 * slower_HG);

  //myReq_HG = window.requestAnimationFrame(update_HG);

}


function newHG() {
  HG_setup();


  if (document.getElementById("normal").checked) {
    slower_HG = 1;
  }
  else if (document.getElementById("x1/2").checked) {
    slower_HG = 2;
  }
  else if (document.getElementById("x1/5").checked) {
    slower_HG = 5;
  }
  else if (document.getElementById("x1/10").checked) {
    slower_HG = 10;
  }

  param_HG = 1/(60 * slower_HG);



  myReq_HG = window.requestAnimationFrame(update_HG);
}

HG_setup();
