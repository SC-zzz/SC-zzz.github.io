function new_function() { 
  var r_1 = parseFloat(document.getElementById("r_1").value);  
  var r_2 = parseFloat(document.getElementById("r_2").value);   
  var K_1 = parseFloat(document.getElementById("K_1").value);  
  var K_2 = parseFloat(document.getElementById("K_2").value);   
  var k_12 = parseFloat(document.getElementById("k_12").value);  
  var k_21 = parseFloat(document.getElementById("k_21").value);   
  var density = parseFloat(document.getElementById("density").value); 
  var scaling = 0.8/density;
  var colorize = document.getElementById("colorize").checked;
  
  var t_start = 0;
  var t_fin = 6;
  var dt = 0.004;
 
  function f(t,v) {
    return [r_1*v[0]*(1-(v[0]+k_12*v[1])/K_1), r_2*v[1]*(1-(v[1]+k_21*v[0])/K_2)];
  } 
  
   function g(v) {
    return [r_1*v[0]*(1-(v[0]+k_12*v[1])/K_1), r_2*v[1]*(1-(v[1]+k_21*v[0])/K_2)];
  }
 
  brd = JXG.JSXGraph.initBoard('box', {boundingbox: [-0.5, 6, 6, -0.5], axis: true, grid: false});
  
  for (let i = 0; i<=6.5; i= i+1/density){
    for (let j = 0; j<=6.5; j= j+1/density){
      var v = [i,j];
      let length = math.norm(g(v));
      if (length != 0) {
        let w = [scaling*g(v)[0]/length, scaling*g(v)[1]/length];
        if (colorize==true) {
		  var color = "hsl(" + (360- (length % 360)) + ", 100%, 75%)";
		}    
		else {
		  var color = 'gray';
		}
        brd.create('arrow', [v,[v[0]+w[0], v[1]+w[1]]],{fixed:true, strokeColor:color});
      }
   
    }
  }




  brd.create('point', [K_1, 0],{size: 5, visible:true,fixed:true, name:''});  
  brd.create('point', [0, K_2],{size: 5, visible:true,fixed:true, name:''});  
  brd.create('point', [0, 0],{size: 5, visible:true,fixed:true, name:''});  

  let det = 1 - k_12 * k_21;
  if (det != 0) {
    var sp = [(K_1 - k_12* K_2)/det, (K_2 - k_21* K_1)/det];
    brd.create('point', sp, {size: 5, visible:true,fixed:true, name:''});
  //x_curve = brd.create('curve', [x1Array, x2Array], {strokeColor:'blue', strokeWidth:'3px'});
  //var s1 = brd.create('point', [K_1, 0], {fixed:true, visible:true, color:red});
  //var s2 = brd.create('point', [0, K_2], {fixed:true, visible:true, color:red});
    }
  
  var p = brd.create('point', [2,3], {size: 6, fixed:false, strokeColor:'dodgerblue', fillColor:'dodgerblue', name:'Drag me'});
 
  
  var sol = ode_RK4(t_start, t_fin, dt, f, [p.X(),p.Y()]);
  var tArray = sol[0];
  var x1Array = [];
  var x2Array = [];  
  for (let i = 0; i< tArray.length; i ++) {
    x1Array[i] = sol[1][i][0];
    x2Array[i] = sol[1][i][1];
  }
  
  var myCurve = brd.create('curve', [x1Array, x2Array], {strokeColor:'dodgerblue', strokeWidth: 3.5});
  myCurve.updateDataArray = function() {
        let temp = ode_RK4(t_start, t_fin, dt, f, [p.X(),p.Y()]);
        this.dataX = [];
        this.dataY = [];
        for(let i=0; i< temp[0].length; i++) {
            this.dataX[i] = temp[1][i][0];
            this.dataY[i] = temp[1][i][1];
        }
    };
  

}

new_function();