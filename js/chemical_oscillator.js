JXG.Options.text.useMathJax = true;
function new_chem_osc() { 
  //var x1_0 = parseFloat(document.getElementById("x_1(0)").value);  
  //var x2_0 = parseFloat(document.getElementById("x_2(0)").value); 
  var k1 = parseFloat(document.getElementById("k1").value);  
  var k2 = parseFloat(document.getElementById("k2").value);    
  var density = parseFloat(document.getElementById("density_chem").value); 
  var scaling = 0.8/density;
  var colorize = document.getElementById("colorize_chem").checked;
  var color;
  let a = k1/5;
  
  var N = 3000;
  var dt = 0.005;
  
   function g(v) {
    return [k1 - v[0]*(1 + 4*v[1]/(1+(v[0])**2)), k2 * v[0]*(1 - v[1]/(1+(v[0])**2))];
  }
 
  var lim = 10;
  
  board = JXG.JSXGraph.initBoard('chemicalbox', {boundingbox: [-0.5, lim+0.5, lim+0.5, -0.5], axis: true, grid: false});
  
  kbrd = JXG.JSXGraph.initBoard('krangebox', {boundingbox: [-1, 10.4, 14, -1], 
    axis: true, grid: true, keepAspectRatio: true,
    defaultAxes: {
    x : {
    name: '$k_1$',
    withLabel: true,
    label: {
        position: 'rt',
      offset: [-10, 15]
    }
  },
  y : {
    withLabel:true,
    name: '$k_2$',
      label: {
        position: 'rt',
        offset: [10, -10]
      }
    }
  }});
  var k_curve = kbrd.create('functiongraph', [function(x){return 3*x/5 - 25/x;},0,25]);
  var ineq = kbrd.create('inequality', [k_curve]);
  kbrd.create('point', [k1,k2], {size: 5, strokeColor:'dodgerblue', fillColor:'dodgerblue', fixed:true,name:'chosen'});

  
  for (let i = -1; i<= 11; i= i+1/density){
    for (let j = -1; j<= 11; j= j+1/density){
      var v = [i,j];
      let length = math.norm(g(v));
      if (length != 0) {
        let w = [scaling*g(v)[0]/length, scaling*g(v)[1]/length];
        if (colorize==true) {
		  color = "hsl(" + (360- (3*length % 360)) + ", 100%, 75%)";
		}    
		else {
		  color = 'gray';
		}
        board.create('arrow', [v,[v[0]+w[0], v[1]+w[1]]],{fixed:true, strokeColor:color});
      }
   
    }
  }
  
  
  var p = board.create('point', [4,3], {size: 6, strokeColor:'dodgerblue', fillColor:'dodgerblue', name:'Drag me'});
  var stationary = board.create('point', [a,1+a**2], {size: 5, strokeColor:'red', fillColor:'red', fixed:true,name:''});

  var sol = ode_auto_RK4(N, dt, g, [p.X(),p.Y()]);
  var x1Array = [];
  var x2Array = [];  
  for (let i = 0; i< sol.length; i ++) {
    x1Array[i] = sol[i][0];
    x2Array[i] = sol[i][1];
  }
  
  var myCurve = board.create('curve', [x1Array, x2Array], {strokeColor:'dodgerblue', strokeWidth: 3.5});
  
  myCurve.updateDataArray = function() {
        let temp = ode_auto_Euler(N, dt, g, [p.X(),p.Y()]);
        this.dataX = [];
        this.dataY = [];
        for(let i=0; i< temp.length; i++) {
            this.dataX[i] = temp[i][0];
            this.dataY[i] = temp[i][1];
        }
    };
  

}

new_chem_osc();