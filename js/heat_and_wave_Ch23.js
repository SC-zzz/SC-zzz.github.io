var myReq_HW;
var slower_HW = 1;
var param_HW = 1/(60 * slower_HW); // speeding
var T_HW = 0;
var x_start_HW = 0;
var x_fin_HW = Math.PI;
var dx_HW = 0.01;
var N_HW = Math.ceil((x_fin_HW - x_start_HW)/dx_HW +1);
var xArray_HW = Array.from(Array(N_HW), (_, j) => x_start_HW + j * dx_HW);
var uHeatArray = [];
var uWaveArray = [];
var sel_HW;
var sel_h_HW;

function mySeriesOneStep(n, x) {
  if (n % 2 == 0) {
    return 0;
  }
  else if (n % 4 == 1) {
    return 8/((Math.PI * n)**2) * Math.sin(n * x);
  }
  else {
    return -8/((Math.PI * n)**2) * Math.sin(n * x);
  }
}

function myHeat(N, t, x) {
 let sum = 0;
 for (i = 1; i<= N; i ++) {
   sum = sum + Math.exp(- (i**2) * t) * mySeriesOneStep(i, x);
 }
 return sum;
}

function myWave(sel_h, N, t, x) {
 let sum = 0;
 for (i = 1; i<= N; i ++) {
   sum = sum + myHeatCoeff(sel_h, i, t) * mySeriesOneStep(i, x);
 }
 return sum;
}


function myHeatCoeff(sel_h, n, t) {
  if (sel_h == 0) { // h = 0
    return Math.cos(n*t);
  }
  else if (sel_h == 1) { // h = 1
    if (n % 2 == 0) {
      return Math.cos(n*t);
    }
    else {
      return Math.cos(n*t) + ((2/Math.PI)**2) / n * Math.sin(n*t);
    }
  }
  else if (sel_h == 2) { // h = 2
    if (n % 2 == 0) {
      return Math.cos(n*t);
    }
    else {
      return Math.cos(n*t) + 2 * ((2/Math.PI)**2) / n * Math.sin(n*t);
    }
  }
  else if (sel_h == 3) { // h = 3
    if (n % 2 == 0) {
      return Math.cos(n*t);
    }
    else {
      return Math.cos(n*t) + 3 * ((2/Math.PI)**2) / n * Math.sin(n*t);
    }
  }

}



function HW_setup(){
  stopHWAnimation(); 
  sel_HW= parseFloat(document.getElementById("IC").value);
  sel_h_HW= parseFloat(document.getElementById("ICh").value);
  
  uHeatArray = [];
  uWaveArray = [];
  T_HW = 0;
  document.getElementById("time_HW").innerHTML = Math.floor(T_HW * slower_HW)/slower_HW;
   

  if (sel_HW == 0) { // f(x) = sin(x)
	for (let i = 0; i< N_HW; i ++){
	  uHeatArray[i] = Math.exp(- T_HW) * Math.sin(xArray_HW[i]);
	  uWaveArray[i] = myHeatCoeff(sel_h_HW, 1, T_HW) * Math.sin(xArray_HW[i]);
	}
  } 
  else if (sel_HW == 1) { // f(x) = sin(2 x)
	for (let i = 0; i< N_HW; i ++){
	  uHeatArray[i] = Math.exp(- 4 * T_HW) * Math.sin(2 * xArray_HW[i]);
	  uWaveArray[i] = myHeatCoeff(sel_h_HW, 2, T_HW) * Math.sin(2 * xArray_HW[i]);
	}
  }   
  else if (sel_HW == 2) { // f(x) = 0.3 sin(x) + 0.7 sin(3x)
	for (let i = 0; i< N_HW; i ++){
	  uHeatArray[i] = 0.3 * Math.exp(- T_HW) * Math.sin(xArray_HW[i]) 
		+ 0.7 * Math.exp(- 9 * T_HW) * Math.sin(3 * xArray_HW[i]);
	  uWaveArray[i] = 0.3 * myHeatCoeff(sel_h_HW, 1, T_HW) * Math.sin(xArray_HW[i])
		+ 0.7 * myHeatCoeff(sel_h_HW, 3, T_HW) * Math.sin(3 * xArray_HW[i]);
	}
  }  
  else if (sel_HW == 3) { // f(x) = 0.3 sin(x) - 0.5 sin(2x) + 0.2 sin(3x) + 0.4 sin(9x)
	for (let i = 0; i< N_HW; i ++){
	  uHeatArray[i] = 0.3 * Math.exp(- T_HW) * Math.sin(xArray_HW[i]) 
		- 0.5 * Math.exp(- 4 * T_HW) * Math.sin(2 * xArray_HW[i]) 
		+ 0.2 * Math.exp(- 9 * T_HW) * Math.sin(3 * xArray_HW[i])
		+ 0.4 * Math.exp(- 81 * T_HW) * Math.sin(9 * xArray_HW[i]);
	
	  uWaveArray[i] = 0.3 * myHeatCoeff(sel_h_HW, 1, T_HW) * Math.sin(xArray_HW[i])
		- 0.5 * myHeatCoeff(sel_h_HW, 2, T_HW) * Math.sin(2 * xArray_HW[i])
		+ 0.2 * myHeatCoeff(sel_h_HW, 3, T_HW) * Math.sin(3 * xArray_HW[i]) 
		+ 0.4 * myHeatCoeff(sel_h_HW, 9, T_HW) * Math.sin(9 * xArray_HW[i]);
	}
  } 
  else if (sel_HW == 4) { // f(x) = 0.2 sin(x) - 0.5 sin(4x) + 0.4 sin(10x) + 0.1 sin(13x)
	for (let i = 0; i< N_HW; i ++){
	  uHeatArray[i] = 0.2 * Math.exp(- T_HW) * Math.sin(xArray_HW[i]) 
		- 0.5 * Math.exp(- 16 * T_HW) * Math.sin(4 * xArray_HW[i]) 
		+ 0.4 * Math.exp(- 100 * T_HW) * Math.sin(10 * xArray_HW[i])
		+ 0.1 * Math.exp(- 169 * T_HW) * Math.sin(13 * xArray_HW[i]);
	
	  uWaveArray[i] = 0.2 * myHeatCoeff(1, T_HW) * Math.sin(xArray_HW[i])
		- 0.5 * myHeatCoeff(sel_h_HW, 4, T_HW) * Math.sin(4 * xArray_HW[i])
		+ 0.4 * myHeatCoeff(sel_h_HW, 9, T_HW) * Math.sin(10 * xArray_HW[i]) 
		+ 0.1 * myHeatCoeff(sel_h_HW, 13, T_HW) * Math.sin(13 * xArray_HW[i]);
	}
  }
  else if (sel_HW == 5) { // triangle wave
	for (let i = 0; i< N_HW; i ++){
	  uHeatArray[i] = myHeat(60, T_HW, xArray_HW[i]);
	
	  uWaveArray[i] = myWave(sel_h_HW, 60, T_HW, xArray_HW[i]);
	}
  }        







Plotly.newPlot('myHW', [{
  x: xArray_HW,
  y: uHeatArray,
  mode: 'lines', name: 'u_heat',
  line: {color: 'dodgerblue'}
},
{
  x: xArray_HW,
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
  xaxis: {range: [x_start_HW, (x_fin_HW)+0.1], title: "x"},
  yaxis: {range: [-1.6,1.6]}
});
}



function update_HW() {
  T_HW = T_HW + param_HW;
  
  document.getElementById("time_HW").innerHTML = Math.floor(T_HW * slower_HW)/slower_HW;  
  
  if (sel_HW == 0) { // f(x) = sin(x)
	for (let i = 0; i< N_HW; i ++){
	  uHeatArray[i] = Math.exp(- T_HW) * Math.sin(xArray_HW[i]);
	  uWaveArray[i] = myHeatCoeff(sel_h_HW, 1, T_HW) * Math.sin(xArray_HW[i]);
	}
  } 
  else if (sel_HW == 1) { // f(x) = sin(2 x)
	for (let i = 0; i< N_HW; i ++){
	  uHeatArray[i] = Math.exp(- 4 * T_HW) * Math.sin(2 * xArray_HW[i]);
	  uWaveArray[i] = myHeatCoeff(sel_h_HW, 2, T_HW) * Math.sin(2 * xArray_HW[i]);
	}
  }   
  else if (sel_HW == 2) { // f(x) = 0.3 sin(x) + 0.7 sin(3x)
	for (let i = 0; i< N_HW; i ++){
	  uHeatArray[i] = 0.3 * Math.exp(- T_HW) * Math.sin(xArray_HW[i]) 
		+ 0.7 * Math.exp(- 9 * T_HW) * Math.sin(3 * xArray_HW[i]);
	  uWaveArray[i] = 0.3 * myHeatCoeff(sel_h_HW, 1, T_HW) * Math.sin(xArray_HW[i])
		+ 0.7 * myHeatCoeff(sel_h_HW, 3, T_HW) * Math.sin(3 * xArray_HW[i]);
	}
  }  
  else if (sel_HW == 3) { // f(x) = 0.3 sin(x) - 0.5 sin(2x) + 0.2 sin(3x) + 0.4 sin(9x)
	for (let i = 0; i< N_HW; i ++){
	  uHeatArray[i] = 0.3 * Math.exp(- T_HW) * Math.sin(xArray_HW[i]) 
		- 0.5 * Math.exp(- 4 * T_HW) * Math.sin(2 * xArray_HW[i]) 
		+ 0.2 * Math.exp(- 9 * T_HW) * Math.sin(3 * xArray_HW[i])
		+ 0.4 * Math.exp(- 81 * T_HW) * Math.sin(9 * xArray_HW[i]);
	
	  uWaveArray[i] = 0.3 * myHeatCoeff(sel_h_HW, 1, T_HW) * Math.sin(xArray_HW[i])
		- 0.5 * myHeatCoeff(sel_h_HW, 2, T_HW) * Math.sin(2 * xArray_HW[i])
		+ 0.2 * myHeatCoeff(sel_h_HW, 3, T_HW) * Math.sin(3 * xArray_HW[i]) 
		+ 0.4 * myHeatCoeff(sel_h_HW, 9, T_HW) * Math.sin(9 * xArray_HW[i]);
	}
  } 
  else if (sel_HW == 4) { // f(x) = 0.2 sin(x) - 0.5 sin(4x) + 0.4 sin(10x) + 0.1 sin(13x)
	for (let i = 0; i< N_HW; i ++){
	  uHeatArray[i] = 0.2 * Math.exp(- T_HW) * Math.sin(xArray_HW[i]) 
		- 0.5 * Math.exp(- 16 * T_HW) * Math.sin(4 * xArray_HW[i]) 
		+ 0.4 * Math.exp(- 100 * T_HW) * Math.sin(10 * xArray_HW[i])
		+ 0.1 * Math.exp(- 169 * T_HW) * Math.sin(13 * xArray_HW[i]);
	
	  uWaveArray[i] = 0.2 * myHeatCoeff(1, T_HW) * Math.sin(xArray_HW[i])
		- 0.5 * myHeatCoeff(sel_h_HW, 4, T_HW) * Math.sin(4 * xArray_HW[i])
		+ 0.4 * myHeatCoeff(sel_h_HW, 9, T_HW) * Math.sin(10 * xArray_HW[i]) 
		+ 0.1 * myHeatCoeff(sel_h_HW, 13, T_HW) * Math.sin(13 * xArray_HW[i]);
	}
  }
  else if (sel_HW == 5) { // triangle wave
	for (let i = 0; i< N_HW; i ++){
	  uHeatArray[i] = myHeat(60, T_HW, xArray_HW[i]);
	
	  uWaveArray[i] = myWave(sel_h_HW, 60, T_HW, xArray_HW[i]);
	}
  }        


  Plotly.animate('myHW', {
    data: [{x: xArray_HW, y: uHeatArray}, {x: xArray_HW, y: uWaveArray}]
  }, {
    transition: {
      duration: 0
    },
    frame: {
      duration: 0,
      redraw: false
    }
  });
  myReq_HW =requestAnimationFrame(update_HW);
}





function stopHWAnimation(){
  window.cancelAnimationFrame(myReq_HW);
}

function continueHWAnimation(){
  stopHWAnimation();
  myReq_HW = window.requestAnimationFrame(update_HW);

}

function changeHWSpeed(){
  stopHWAnimation();
  if (document.getElementById("normal").checked) {
    slower_HW = 1;
  }
  else if (document.getElementById("x1/5").checked) {
    slower_HW = 5;
  }
  else if (document.getElementById("x1/10").checked) {
    slower_HW = 10;
  }
  else if (document.getElementById("x1/2").checked) {
    slower_HW = 2;
  }
    
  param_HW = 1/(60 * slower_HW);
  
  myReq_HW = window.requestAnimationFrame(update_HW);

}


function newHW() {
  //stopHWAnimation(); 
  //sel_HW= parseFloat(document.getElementById("IC").value);  

  if (document.getElementById("normal").checked) {
    slower_HW = 1;
  }
  else if (document.getElementById("x1/5").checked) {
    slower_HW = 5;
  }
  else if (document.getElementById("x1/10").checked) {
    slower_HW = 10;
  }
  else if (document.getElementById("x1/2").checked) {
    slower_HW = 2;
  }
     
  param_HW = 1/(60 * slower_HW);
    
  
  HW_setup();
  myReq_HW = window.requestAnimationFrame(update_HW);
}

HW_setup();
