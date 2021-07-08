/**
* Auxiliary functions to be used.
*/


/**
 * Add an arrow on canvas.
 * @param {CanvasRenderingContext2D} ctx: The context to be drawn on.
 * @param {Float} fromx: The x position of the tail, in pixels.
 * @param {Float} fromx: The y position of the tail, in pixels.
 * @param {Float} tox: The x position of the head, in pixels.  
 * @param {Float} toy: The y position of the head, in pixels.  
 * @param {String} color: The color for the arrow.
 * @param {Float} width: The width of the arrow.
 * @param {Float} headlen: The length of the arrowhead, in pixels.
 * @returns void
 */
function canvas_add_arrow(ctx, fromx, fromy, tox, toy, color, width, headlen = 5) {
  //var headlen = 5; // length of head in pixels
  var dx = tox - fromx;
  var dy = toy -  fromy;
  var angle = Math.atan2(dy, dx);
  ctx.beginPath();
  ctx.moveTo(fromx, fromy);
  ctx.lineTo(tox, toy);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(tox, toy);  
  ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
  
  ctx.beginPath();  
  ctx.moveTo(tox, toy);
  ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
}

/**
 * Draw a grid on canvas.
 * @param {CanvasRenderingContext2D} ctx: The context to be drawn on.
 * @param {Float} startx: The starting x position, in pixels. 
 * @param {Float} endx: The ending x position, in pixels.  
 * @param {Int} numstepx: The number of grids, in pixels. 
 * @param {Float} starty: The starting y position, in pixels.
 
 * @param {Float} endy: The y position of the head, in pixels.  
 * @param {String} color: The color for the arrow.
 * @param {Float} width: The width of the arrow.
 * @param {Float} headlen: The length of the arrowhead, in pixels.
 * @returns void

function drawGrid(ctx, startx, endx, numstepx, starty, endy, numstepy, color, width) {
    let ste
    for (let i =0; i<6; i++) {           
            ctx.beginPath();
	        ctx.moveTo(x_px(i), y_px(-1));
	        ctx.lineTo(x_px(i), y_px(6));
	        ctx.strokeStyle = color;
	        ctx.lineWidth = width;
	        ctx.stroke();
    }
    for (let j =0; j<6; j++) {          
            ctx.beginPath();
	        ctx.moveTo(x_px(-1), y_px(j));
	        ctx.lineTo(x_px(6), y_px(j));
	        ctx.strokeStyle = color;
	        ctx.lineWidth = width;
	        ctx.stroke();
    }    
} 
 */
 
 

/**
 * Solve a system of first-order ODE y' = f(t,y) numerically using Euler's method.
 * @param {Float} t_0: The starting time.
 * @param {Float} t_1: The ending time.
 * @param {Float} h: The stepsize.
 * @param {function} f: The function.  
 * @param {Float} or {Array} y_0: The initial value. Float for 1d case, Array for higher dim
 * @returns {Array} [ts, ys]: ts is an Array storing the time steps
                              ys is an Array storing the function values
 */
function ode_Euler(t_0, t_1, h, f, y_0) {
	const N = Math.floor((t_1 - t_0)/h) + 1;
	var ts = Array.from(Array(N), (_, k) => k * h + t_0);
	var ys = Array(N).fill(y_0);  //initialize the array for the results

	for (let i = 0; i < N-1; i++) {
	  ys[i + 1] =  math.add(ys[i], math.multiply(f(ts[i], ys[i]), h));
	}
	return [ts, ys];
}


/**
 * Solve a system of first-order ODE y' = f(t,y) numerically using the midpoint method.
 * @param {Float} t_0: The starting time.
 * @param {Float} t_1: The ending time.
 * @param {Float} h: The stepsize.
 * @param {function} f: The function.  
 * @param {Float} or {Array} y_0: The initial value. Float for 1d case, Array for higher dim
 * @returns {Array} [ts, ys]: ts is an Array storing the time steps
                              ys is an Array storing the function values
 */
 
function ode_midpoint(t_0, t_1, h, f, y_0) {
	const N = Math.floor((t_1 - t_0)/h) + 1;
	var ts = Array.from(Array(N), (_, k) => k * h + t_0);
	var ys = Array(N).fill(y_0);  //initialize the array for the results

	for (let i = 0; i < N-1; i++) {
	  const k1 = f(ts[i], ys[i]);
	  const s = math.add(ys[i], math.multiply(k1, h/2));
	  const k2 = f(ts[i] + h/2, s);
	  ys[i + 1] =  math.add(ys[i], math.multiply(k2, h));
	}
	return [ts, ys];
}


/**
 * Solve a system of first-order ODE y' = f(t,y) numerically using the Runge Kutta 4th 
 * order method.
 * @param {Float} t_0: The starting time.
 * @param {Float} t_1: The ending time.
 * @param {Float} h: The stepsize.
 * @param {function} f: The function.  
 * @param {Float} or {Array} y_0: The initial value. Float for 1d case, Array for higher dim
 * @returns {Array} [ts, ys]: ts is an Array storing the time steps
                              ys is an Array storing the function values
 */
function ode_RK4(t_0, t_1, h, f, y_0) {
	const N = Math.floor((t_1 - t_0)/h) + 1;
	var ts = Array.from(Array(N), (_, k) => k * h + t_0);
	var ys = Array(N).fill(y_0);  //initialize the array for the results

	for (let i = 0; i < N-1; i++) {
	  const k1 = f(ts[i], ys[i]);
	  const s1 = math.add(ys[i], math.multiply(k1, h/2));
	  const k2 = f(ts[i] + h/2, s1);
	  const s2 = math.add(ys[i], math.multiply(k2, h/2));
	  const k3 = f(ts[i] + h/2, s2);
	  const s3 = math.add(ys[i], math.multiply(k2, h));	
      const k4 = f(ts[i] + h, s3); // f(t + h, y_n + k3*h)	
      const k_new =  math.multiply(math.add(math.add(math.add(math.multiply(k1, 1/2), k2), 
          k3), math.multiply(k4, 1/2)), 1/3); // k1/6 + k2/3 + k3/3 + k4/6
	  ys[i + 1] =  math.add(ys[i], math.multiply(k_new, h));
	}
	return [ts, ys];
}
