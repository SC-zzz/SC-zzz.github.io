var myReq_wave;
var slower_wave = 1;
var param_wave = 1/(60 * slower_wave); // speeding
var T_wave = 0;
var x_start_wave = 0;
var x_fin_wave = Math.PI;
var dx_wave = 0.01;
var N_wave = Math.ceil((x_fin_wave - x_start_wave)/dx_wave +1);
var xArray_wave = Array.from(Array(N_wave), (_, j) => x_start_wave + j * dx_wave);
var uDampedArray = [];
var uUndampedArray = [];
var sel_f_wave;
var sel_h_wave;
var k = 2;

function myOmega(n) {
  return Math.sqrt(n**2 - (k/2)**2);
}

function triangleSeriesOneStep2(n, x) {
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

function triangleDamped(sel_h, N, t, x) {
 let sum = 0;
 for (let i = 1; i<= N; i ++) {
   sum = sum + Math.exp(-k/2 * t) * (myDampedCoeffAnPart(i, T_wave) * triangleSeriesOneStep2(i, x) + myDampedCoeffBnPrime(sel_h, i, t) * Math.sin(i * x));
 }
 return sum;
}

function triangleUndamped(sel_h, N, t, x) {
 let sum = 0;
 for (let i = 1; i<= N; i ++) {
   sum = sum + Math.cos(i*t) * triangleSeriesOneStep2(i, x) + myUndampedCoeffBn(sel_h, i, t) * Math.sin(i * x);
 }
 return sum;
}


function myUndampedCoeffBn(sel_h, n, t) {
//B_n = \frac{2}{n \pi} \int_0^L h(x) \sin((n\pi/L)x) \, dx 
  if (sel_h == 0) { // h = 0
    return 0;
  }
  else if (sel_h == 1) { // h = sin(x)
    if (n == 1) {
      return Math.sin(n*t);
    }
    else {
      return 0;
    }
  }

}


function myDampedCoeffBnPrime(sel_h, n, t) { 
//B_n' = \frac{2}{L\omega_n} \int_0^L h(x) \sin((n\pi/L)x) \, dx 
//     = \frac{2}{\pi \omega_n} \int_0^{\pi} h(x) \sin(n x) \, dx 
  if (sel_h == 0) { // h = 0
    return 0;
  }
  else if (sel_h == 1) { // h = sin(x)
    if (n == 1) {
      return Math.sin(myOmega(n) * t) / myOmega(n);
    }
    else {
      return 0;
    }
  }

}

function myDampedCoeffAnPart(n, t) { 
 //  cos(w_n t) + k/(2w_n) * sin(w_n t)
  return Math.cos(myOmega(n) * t) + k/(2 * myOmega(n)) * Math.sin(myOmega(n) * t);
}





function wave_setup(){
  stopWaveAnimation(); 
  k = parseFloat(document.getElementById("k").value);
  sel_f_wave= parseFloat(document.getElementById("ICf2").value);
  sel_h_wave= parseFloat(document.getElementById("ICh2").value);
  
  uDampedArray = [];
  uUndampedArray = [];
  T_wave = 0;
  document.getElementById("time_wave").innerHTML = Math.floor(T_wave * slower_wave)/slower_wave;
   

 if (sel_f_wave == 0) { // f(x) = sin(x)
	for (let i = 0; i< N_HW; i ++){
	  uDampedArray[i] = Math.exp(-k/2 * T_wave) * (myDampedCoeffAnPart(1, T_wave) + myDampedCoeffBnPrime(sel_h_wave, 1, T_wave)) * Math.sin(xArray_HW[i]);
	  
	  uUndampedArray[i] = (Math.cos(T_wave) + myDampedCoeffBnPrime(sel_h_wave, 1, T_wave)) * Math.sin(xArray_HW[i]);
	}
  } 
  else if (sel_f_wave == 1) { // f(x) = sin(2 x)
	for (let i = 0; i< N_HW; i ++){
	  uDampedArray[i] = Math.exp(-k/2 * T_wave) * (myDampedCoeffAnPart(2, T_wave) + myDampedCoeffBnPrime(sel_h_wave, 2, T_wave)) * Math.sin(2 * xArray_HW[i]);
	  
	  uUndampedArray[i] = (Math.cos(2*T_wave) + myUndampedCoeffBn(sel_h_wave, 2, T_wave)) * Math.sin(2 * xArray_HW[i]);
	}
  }   
  else if (sel_f_wave == 2) { // f(x) = 0.3 sin(x) + 0.7 sin(3x)
	for (let i = 0; i< N_HW; i ++){
	  uDampedArray[i] = Math.exp(-k/2 * T_wave) * ((0.3 * myDampedCoeffAnPart(1, T_wave) + myDampedCoeffBnPrime(sel_h_wave, 1, T_wave)) * Math.sin(xArray_HW[i])
		+ (0.7 * myDampedCoeffAnPart(3, T_wave) + myDampedCoeffBnPrime(sel_h_wave, 3, T_wave)) * Math.sin(3 * xArray_HW[i]));
		
	  uUndampedArray[i] = (0.3 * Math.cos(T_wave) + myUndampedCoeffBn(sel_h_wave, 1, T_wave)) * Math.sin(xArray_HW[i])
		+ (0.7 * Math.cos(3*T_wave) + myUndampedCoeffBn(sel_h_wave, 3, T_wave)) * Math.sin(3 * xArray_HW[i]);
	}
  }  
  else if (sel_f_wave == 3) { // f(x) = 0.3 sin(x) - 0.5 sin(2x) + 0.2 sin(3x) + 0.4 sin(9x)
	for (let i = 0; i< N_HW; i ++){
	  uDampedArray[i] = Math.exp(-k/2 * T_wave) * 
	   ((0.3 * myDampedCoeffAnPart(1, T_wave) + myDampedCoeffBnPrime(sel_h_wave, 1, T_wave)) * Math.sin(xArray_HW[i])
		+ (-0.5 * myDampedCoeffAnPart(2, T_wave) + myDampedCoeffBnPrime(sel_h_wave, 2, T_wave)) * Math.sin(2 * xArray_HW[i])
		+ (0.2 * myDampedCoeffAnPart(3, T_wave) + myDampedCoeffBnPrime(sel_h_wave, 3, T_wave)) * Math.sin(3 * xArray_HW[i]) 
		+ (0.4 * myDampedCoeffAnPart(9, T_wave) + myDampedCoeffBnPrime(sel_h_wave, 9, T_wave)) * Math.sin(9 * xArray_HW[i]));
	
	  uUndampedArray[i] = (0.3 * Math.cos(T_wave) + myUndampedCoeffBn(sel_h_wave, 1, T_wave)) * Math.sin(xArray_HW[i])
		+ (-0.5 * Math.cos(2*T_wave) + myUndampedCoeffBn(sel_h_wave, 2, T_wave)) * Math.sin(2 * xArray_HW[i])
		+ (0.2 * Math.cos(3*T_wave) + myUndampedCoeffBn(sel_h_wave, 3, T_wave)) * Math.sin(3 * xArray_HW[i]) 
		+ (0.4 * Math.cos(9*T_wave) + myUndampedCoeffBn(sel_h_wave, 9, T_wave)) * Math.sin(9 * xArray_HW[i]);
	}
  } 
  else if (sel_f_wave == 4) { // f(x) = 0.2 sin(x) - 0.5 sin(4x) + 0.4 sin(10x) + 0.1 sin(13x)
	for (let i = 0; i< N_HW; i ++){
	  uDampedArray[i] = Math.exp(-k/2 * T_wave) * 
	   ((0.2 * myDampedCoeffAnPart(1, T_wave) + myDampedCoeffBnPrime(sel_h_wave, 1, T_wave)) * Math.sin(xArray_HW[i])
		+ (-0.5 * myDampedCoeffAnPart(4, T_wave) + myDampedCoeffBnPrime(sel_h_wave, 4, T_wave)) * Math.sin(4 * xArray_HW[i])
		+ (0.4 * myDampedCoeffAnPart(10, T_wave) + myDampedCoeffBnPrime(sel_h_wave, 10, T_wave)) * Math.sin(10 * xArray_HW[i]) 
		+ (0.1 * myDampedCoeffAnPart(13, T_wave) + myDampedCoeffBnPrime(sel_h_wave, 13, T_wave)) * Math.sin(13 * xArray_HW[i]));
	
	  uUndampedArray[i] = (0.2 * Math.cos(T_wave) + myUndampedCoeffBn(sel_h_wave, 1, T_wave)) * Math.sin(xArray_HW[i])
		+ (-0.5 * Math.cos(4*T_wave) + myUndampedCoeffBn(sel_h_wave, 4, T_wave)) * Math.sin(4 * xArray_HW[i])
		+ (0.4 * Math.cos(10*T_wave) + myUndampedCoeffBn(sel_h_wave, 10, T_wave)) * Math.sin(10 * xArray_HW[i]) 
		+ (0.1 * Math.cos(13*T_wave) + myUndampedCoeffBn(sel_h_wave, 13, T_wave)) * Math.sin(13 * xArray_HW[i]);
	}
  }
  else if (sel_f_wave == 5) { // triangle wave
	for (let i = 0; i< N_HW; i ++){
	  uDampedArray[i] = triangleDamped(sel_h_wave, 60, T_wave, xArray_HW[i]);
	
	  uUndampedArray[i] = triangleUndamped(sel_h_wave, 60, T_wave, xArray_HW[i]);
	}
  }        






Plotly.newPlot('myWave', [{
  x: xArray_wave,
  y: uDampedArray,
  mode: 'lines', name: 'u_damped',
  line: {color: 'dodgerblue'}
},
{
  x: xArray_wave,
  y: uUndampedArray,
  mode: 'lines', name: 'u_undamped',
  line: {color: 'orange'}
}
], {legend: {"orientation": "h",yanchor: 'top', y:-0.2}, title: "Damped and undamped wave equations",  margin: {
    l: 50,
    r: 50,
    b: 100,
    t: 100,
    pad: 4
  },
  xaxis: {range: [x_start_wave, (x_fin_wave)+0.1], title: "x"},
  yaxis: {range: [-1.8,1.8]}
});
}



function update_wave() {
  T_wave = T_wave + param_wave;
  
  document.getElementById("time_wave").innerHTML = Math.floor(T_wave * slower_wave)/slower_wave;  
  
 if (sel_f_wave == 0) { // f(x) = sin(x)
	for (let i = 0; i< N_HW; i ++){
	  uDampedArray[i] = Math.exp(-k/2 * T_wave) * (myDampedCoeffAnPart(1, T_wave) + myDampedCoeffBnPrime(sel_h_wave, 1, T_wave)) * Math.sin(xArray_HW[i]);
	  
	  uUndampedArray[i] = (Math.cos(T_wave) + myDampedCoeffBnPrime(sel_h_wave, 1, T_wave)) * Math.sin(xArray_HW[i]);
	}
  } 
  else if (sel_f_wave == 1) { // f(x) = sin(2 x)
	for (let i = 0; i< N_HW; i ++){
	  uDampedArray[i] = Math.exp(-k/2 * T_wave) * (myDampedCoeffAnPart(2, T_wave) + myDampedCoeffBnPrime(sel_h_wave, 2, T_wave)) * Math.sin(2 * xArray_HW[i]);
	  
	  uUndampedArray[i] = (Math.cos(2*T_wave) + myUndampedCoeffBn(sel_h_wave, 2, T_wave)) * Math.sin(2 * xArray_HW[i]);
	}
  }   
  else if (sel_f_wave == 2) { // f(x) = 0.3 sin(x) + 0.7 sin(3x)
	for (let i = 0; i< N_HW; i ++){
	  uDampedArray[i] = Math.exp(-k/2 * T_wave) * ((0.3 * myDampedCoeffAnPart(1, T_wave) + myDampedCoeffBnPrime(sel_h_wave, 1, T_wave)) * Math.sin(xArray_HW[i])
		+ (0.7 * myDampedCoeffAnPart(3, T_wave) + myDampedCoeffBnPrime(sel_h_wave, 3, T_wave)) * Math.sin(3 * xArray_HW[i]));
		
	  uUndampedArray[i] = (0.3 * Math.cos(T_wave) + myUndampedCoeffBn(sel_h_wave, 1, T_wave)) * Math.sin(xArray_HW[i])
		+ (0.7 * Math.cos(3*T_wave) + myUndampedCoeffBn(sel_h_wave, 3, T_wave)) * Math.sin(3 * xArray_HW[i]);
	}
  }  
  else if (sel_f_wave == 3) { // f(x) = 0.3 sin(x) - 0.5 sin(2x) + 0.2 sin(3x) + 0.4 sin(9x)
	for (let i = 0; i< N_HW; i ++){
	  uDampedArray[i] = Math.exp(-k/2 * T_wave) * 
	   ((0.3 * myDampedCoeffAnPart(1, T_wave) + myDampedCoeffBnPrime(sel_h_wave, 1, T_wave)) * Math.sin(xArray_HW[i])
		+ (-0.5 * myDampedCoeffAnPart(2, T_wave) + myDampedCoeffBnPrime(sel_h_wave, 2, T_wave)) * Math.sin(2 * xArray_HW[i])
		+ (0.2 * myDampedCoeffAnPart(3, T_wave) + myDampedCoeffBnPrime(sel_h_wave, 3, T_wave)) * Math.sin(3 * xArray_HW[i]) 
		+ (0.4 * myDampedCoeffAnPart(9, T_wave) + myDampedCoeffBnPrime(sel_h_wave, 9, T_wave)) * Math.sin(9 * xArray_HW[i]));
	
	  uUndampedArray[i] = (0.3 * Math.cos(T_wave) + myUndampedCoeffBn(sel_h_wave, 1, T_wave)) * Math.sin(xArray_HW[i])
		+ (-0.5 * Math.cos(2*T_wave) + myUndampedCoeffBn(sel_h_wave, 2, T_wave)) * Math.sin(2 * xArray_HW[i])
		+ (0.2 * Math.cos(3*T_wave) + myUndampedCoeffBn(sel_h_wave, 3, T_wave)) * Math.sin(3 * xArray_HW[i]) 
		+ (0.4 * Math.cos(9*T_wave) + myUndampedCoeffBn(sel_h_wave, 9, T_wave)) * Math.sin(9 * xArray_HW[i]);
	}
  } 
  else if (sel_f_wave == 4) { // f(x) = 0.2 sin(x) - 0.5 sin(4x) + 0.4 sin(10x) + 0.1 sin(13x)
	for (let i = 0; i< N_HW; i ++){
	  uDampedArray[i] = Math.exp(-k/2 * T_wave) * 
	   ((0.2 * myDampedCoeffAnPart(1, T_wave) + myDampedCoeffBnPrime(sel_h_wave, 1, T_wave)) * Math.sin(xArray_HW[i])
		+ (-0.5 * myDampedCoeffAnPart(4, T_wave) + myDampedCoeffBnPrime(sel_h_wave, 4, T_wave)) * Math.sin(4 * xArray_HW[i])
		+ (0.4 * myDampedCoeffAnPart(10, T_wave) + myDampedCoeffBnPrime(sel_h_wave, 10, T_wave)) * Math.sin(10 * xArray_HW[i]) 
		+ (0.1 * myDampedCoeffAnPart(13, T_wave) + myDampedCoeffBnPrime(sel_h_wave, 13, T_wave)) * Math.sin(13 * xArray_HW[i]));
	
	  uUndampedArray[i] = (0.2 * Math.cos(T_wave) + myUndampedCoeffBn(sel_h_wave, 1, T_wave)) * Math.sin(xArray_HW[i])
		+ (-0.5 * Math.cos(4*T_wave) + myUndampedCoeffBn(sel_h_wave, 4, T_wave)) * Math.sin(4 * xArray_HW[i])
		+ (0.4 * Math.cos(10*T_wave) + myUndampedCoeffBn(sel_h_wave, 10, T_wave)) * Math.sin(10 * xArray_HW[i]) 
		+ (0.1 * Math.cos(13*T_wave) + myUndampedCoeffBn(sel_h_wave, 13, T_wave)) * Math.sin(13 * xArray_HW[i]);
	}
  }
  else if (sel_f_wave == 5) { // triangle wave
	for (let i = 0; i< N_HW; i ++){
	  uDampedArray[i] = triangleDamped(sel_h_wave, 60, T_wave, xArray_HW[i]);
	
	  uUndampedArray[i] = triangleUndamped(sel_h_wave, 60, T_wave, xArray_HW[i]);
	}
  }       



  Plotly.animate('myWave', {
    data: [{x: xArray_wave, y: uDampedArray}, {x: xArray_wave, y: uUndampedArray}]
  }, {
    transition: {
      duration: 0
    },
    frame: {
      duration: 0,
      redraw: false
    }
  });
  myReq_wave =requestAnimationFrame(update_wave);
}





function stopWaveAnimation(){
  window.cancelAnimationFrame(myReq_wave);
}

function continueWaveAnimation(){
  stopWaveAnimation();
  myReq_wave = window.requestAnimationFrame(update_wave);

}

function changeWaveSpeed(){
  stopWaveAnimation();
  if (document.getElementById("normal_wave").checked) {
    slower_wave = 1;
  }
  else if (document.getElementById("x1/5_wave").checked) {
    slower_wave = 5;
  }
  else if (document.getElementById("x1/10_wave").checked) {
    slower_wave = 10;
  }
  else if (document.getElementById("x1/2_wave").checked) {
    slower_wave = 2;
  }
    
  param_wave = 1/(60 * slower_wave);
  
  myReq_wave = window.requestAnimationFrame(update_wave);

}


function newWave() {
  //stopWaveAnimation(); 
  //sel_f_wave= parseFloat(document.getElementById("IC").value);  

  if (document.getElementById("normal_wave").checked) {
    slower_wave = 1;
  }
  else if (document.getElementById("x1/5_wave").checked) {
    slower_wave = 5;
  }
  else if (document.getElementById("x1/10_wave").checked) {
    slower_wave = 10;
  }
  else if (document.getElementById("x1/2_wave").checked) {
    slower_wave = 2;
  }
     
  param_wave = 1/(60 * slower_wave);
    
  
  wave_setup();
  myReq_wave = window.requestAnimationFrame(update_wave);
}

wave_setup();
