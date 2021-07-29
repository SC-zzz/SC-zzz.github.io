function new_bounded_trajectory() { 
  //var x1_0 = parseFloat(document.getElementById("x_1(0)").value);  
  //var x2_0 = parseFloat(document.getElementById("x_2(0)").value); 
  var a = parseFloat(document.getElementById("a").value);  
  var b = parseFloat(document.getElementById("b").value);   
  var c = parseFloat(document.getElementById("c").value);  
  var d = parseFloat(document.getElementById("d").value);   
  var density = parseFloat(document.getElementById("density_2").value); 
  var scaling = 0.8/density;
  var colorize = document.getElementById("colorize_2").checked;
  var color;
  var N = 3000;
  var dt = 0.005;
  
   function g(v) {
    return [-Math.pow(v[0], 3) + a*v[0] + b*v[1], -Math.pow(v[1], 3) + c*v[0] + d*v[1]];
  }
 
 
  board = JXG.JSXGraph.initBoard('box2', {boundingbox: [-5, 5, 5, -5], axis: true, grid: false});
  for (let i = -5; i<=6; i= i+1/density){
    for (let j = -5; j<=6; j= j+1/density){
      var v = [i,j];
      let length = math.norm(g(v));
      if (length != 0) {
        let w = [scaling*g(v)[0]/length, scaling*g(v)[1]/length];
        if (colorize==true) {
		  color = "hsl(" + (360- (length % 360)) + ", 100%, 75%)";
		}    
		else {
		  color = 'gray';
		}
        board.create('arrow', [v,[v[0]+w[0], v[1]+w[1]]],{fixed:true, strokeColor:color});
      }
   
    }
  }
  
  
  var p = board.create('point', [4,3], {size: 6, strokeColor:'dodgerblue', fillColor:'dodgerblue', name:'Drag me'});
 

  var sol = ode_auto_RK4(N, dt, g, [p.X(),p.Y()]);
  var x1Array = [];
  var x2Array = [];  
  for (let i = 0; i< sol.length; i ++) {
    x1Array[i] = sol[i][0];
    x2Array[i] = sol[i][1];
  }
  
  var myCurve = board.create('curve', [x1Array, x2Array], {strokeColor:'dodgerblue', strokeWidth: 3.5});
  
  myCurve.updateDataArray = function() {
        let temp = ode_auto_RK4(N, dt, g, [p.X(),p.Y()]);
        this.dataX = [];
        this.dataY = [];
        for(let i=0; i< temp.length; i++) {
            this.dataX[i] = temp[i][0];
            this.dataY[i] = temp[i][1];
        }
    };
  

}

new_bounded_trajectory();