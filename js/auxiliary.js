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