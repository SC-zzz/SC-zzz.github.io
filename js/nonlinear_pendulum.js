JXG.Options.text.useMathJax = true;

var m = 10;  
function new_pendulum() {
  let density = parseFloat(document.getElementById("density").value); 
  let scaling = 0.8/density;
  let colorize = document.getElementById("colorize").checked;
  let color;  
  let gamma = parseFloat(document.getElementById("gamma").value);
  let T = 6;
  let Tbackwards = 5;
  if (0 < gamma && gamma <= 1) {
    T = 5 + 5/gamma;
    Tbackwards = 5 + 1/gamma;
  }
  else if (1 < gamma && gamma < 2) {
    T = 5 + 5/gamma;
    Tbackwards = 3;
  }  
  else if (gamma >= 2) {
    Tbackwards = 1.2;
  }
  else if (gamma ==0) {
    T = 14;
  }
  


  
  let xMin = -7;
  let xMax = 7;
  let yMin = -6;
  let yMax = 6;  
  let h = 0.05;
  let N = math.ceil(T/h);
  let Nbackwards = math.ceil(Tbackwards/h);
  
  function g(v) {
    return [v[1], -Math.sin(v[0]) - gamma*v[1]];
  }
  
  
  let brd = JXG.JSXGraph.initBoard('pendulumbox', {
    boundingbox: [xMin, yMax, xMax, yMin], 
    axis: true, grid: true, keepAspectRatio: true,
    defaultAxes: {
    x : {
    name: '$x$',
    withLabel: true,
    label: {
        position: 'rt',
      offset: [-10, 15]
    }
  },
  y : {
    withLabel:true,
    name: '$y$',
      label: {
        position: 'rt',
        offset: [10, -10]
      }
    }
  }});
  
  // arrows 
  for (let i = xMin; i<=xMax; i= i+1/density){
    for (let j = yMin; j<=yMax; j= j+1/density){
      let v = [i,j];
      let length = math.norm(g(v));
      if (length != 0) {
        let w = [scaling*g(v)[0]/length, scaling*g(v)[1]/length];
          if (colorize==true) {
            color = "hsl(" + (360- (length*19 % 360)) + ", 100%, 75%)";
          }    
          else {
            color = 'hsl(0, 0%, 60%)';
          }
        brd.create('arrow', [v,[v[0]+w[0], v[1]+w[1]]],{fixed:true, strokeWidth: 1.5, strokeColor:color});
      }
   
    }
  }  
  
  
  
  
  // stationary points
  for (let k = -1; k<= 1; k ++) {
    brd.create('point', [2*k*Math.PI, 0], {size: 5, name:'', fixed: true, 
      strokeColor: 'red', fillColor: 'red'});
    brd.create('point', [(2*k+1)*Math.PI, 0], {size: 5, name:'', fixed: true, 
        strokeColor: 'green', fillColor: 'green'});   
  }

  if (gamma == 0 || gamma >= 1) {
    for (let k = -1; k<= 1; k ++) {
      //brd.create('point', [2*k*Math.PI, 0], {size: 5, name:'', fixed: true, 
      //  strokeColor: 'red', fillColor: 'red'});
      for (let j= 0; j<= m; j++) {
        let y0 = -m/2 + j;
        let sol1 = ode_auto_RK4(N, h, g, [2*k*Math.PI, y0]);
        let sol2 = ode_auto_RK4(Nbackwards, -h, g, [2*k*Math.PI, y0]);
        let xArray = [];
        let yArray = [];  
        let xArrayBackwards = [];  
        let yArrayBackwards = []; 
        for (let i = 0; i< sol1.length; i ++) {
          xArray[i] = sol1[i][0];
          yArray[i] = sol1[i][1];
        }
        for (let i = 0; i< sol2.length; i ++) {
          xArrayBackwards[i] = sol2[i][0];
          yArrayBackwards[i] = sol2[i][1];
        }    
        brd.create('curve', [xArray, yArray], {strokeColor:'gray', strokeWidth: 2});
        brd.create('curve', [xArrayBackwards, yArrayBackwards], {strokeColor:'gray', strokeWidth: 2});
      }
    }       
  }

  else {
    for (let j= 0; j<= 2*m; j++) {
      let y0 = -m + j;
      let sol1 = ode_auto_RK4(N, h, g, [0, y0]);
      let sol2 = ode_auto_RK4(Nbackwards, -h, g, [0, y0]);
      let xArray = [];
      let yArray = [];  
      let xArrayBackwards = [];  
      let yArrayBackwards = []; 
      for (let i = 0; i< sol1.length; i ++) {
        xArray[i] = sol1[i][0];
        yArray[i] = sol1[i][1];
      }
      for (let i = 0; i< sol2.length; i ++) {
        xArrayBackwards[i] = sol2[i][0];
        yArrayBackwards[i] = sol2[i][1];
      }    
      brd.create('curve', [xArray, yArray], {strokeColor:'gray', strokeWidth: 2});
      brd.create('curve', [xArrayBackwards, yArrayBackwards], {strokeColor:'gray', strokeWidth: 2});
   }
  
     // curves around unstable points
      for (let k = -1; k<= 0; k ++) {
      for (let j= 0; j<= 1; j++) {
        let y0 = -0.5 + j;
        let sol1 = ode_auto_RK4(N, h, g, [(2*k+1)*Math.PI, y0]);
        let sol2 = ode_auto_RK4(Nbackwards, -h, g, [(2*k+1)*Math.PI, y0]);
        let xArray = [];
        let yArray = [];  
        let xArrayBackwards = [];  
        let yArrayBackwards = []; 
        for (let i = 0; i< sol1.length; i ++) {
          xArray[i] = sol1[i][0];
          yArray[i] = sol1[i][1];
        }
        for (let i = 0; i< sol2.length; i ++) {
          xArrayBackwards[i] = sol2[i][0];
          yArrayBackwards[i] = sol2[i][1];
        }    
        brd.create('curve', [xArray, yArray], {strokeColor:'gray', strokeWidth: 2});
        brd.create('curve', [xArrayBackwards, yArrayBackwards], {strokeColor:'gray', strokeWidth: 2});
      }      
    }
    
  }
    


  // curves around unstable points
  if (gamma >=2) {    
    for (let k = -1; k<= 0; k ++) {
      for (let j= 0; j<= m; j++) {
        let y0 = -m/2 + j;
        let sol1 = ode_auto_RK4(N, h, g, [(2*k+1)*Math.PI, y0]);
        let sol2 = ode_auto_RK4(Nbackwards, -h, g, [(2*k+1)*Math.PI, y0]);
        let xArray = [];
        let yArray = [];  
        let xArrayBackwards = [];  
        let yArrayBackwards = []; 
        for (let i = 0; i< sol1.length; i ++) {
          xArray[i] = sol1[i][0];
          yArray[i] = sol1[i][1];
        }
        for (let i = 0; i< sol2.length; i ++) {
          xArrayBackwards[i] = sol2[i][0];
          yArrayBackwards[i] = sol2[i][1];
        }    
        brd.create('curve', [xArray, yArray], {strokeColor:'gray', strokeWidth: 2});
        brd.create('curve', [xArrayBackwards, yArrayBackwards], {strokeColor:'gray', strokeWidth: 2});
      }      
    }    
  }
  else if (gamma >=1.2) {
    for (let k = -1; k<= 0; k ++) {
      for (let j= 0; j<= m; j++) {
        let y0 = -m/2 + j;
        let sol1 = ode_auto_RK4(N, h, g, [(2*k+1)*Math.PI, y0]);
        let sol2 = ode_auto_RK4(Nbackwards, -h, g, [(2*k+1)*Math.PI, y0]);
        let xArray = [];
        let yArray = [];  
        let xArrayBackwards = [];  
        let yArrayBackwards = []; 
        for (let i = 0; i< sol1.length; i ++) {
          xArray[i] = sol1[i][0];
          yArray[i] = sol1[i][1];
        }
        for (let i = 0; i< sol2.length; i ++) {
          xArrayBackwards[i] = sol2[i][0];
          yArrayBackwards[i] = sol2[i][1];
        }    
        brd.create('curve', [xArray, yArray], {strokeColor:'gray', strokeWidth: 2});
        brd.create('curve', [xArrayBackwards, yArrayBackwards], {strokeColor:'gray', strokeWidth: 2});
      }      
    }
  }



  // draggable point
  let p = brd.create('point', [2,3], {size: 6, strokeColor:'dodgerblue', fillColor:'dodgerblue', name:'Drag me'});
 
  let sol = ode_auto_RK4(N, h, g, [p.X(),p.Y()]);
  let x1Array = [];
  let x2Array = [];  
  for (let i = 0; i< sol.length; i ++) {
    x1Array[i] = sol[i][0];
    x2Array[i] = sol[i][1];
  }
  
  var myCurve = brd.create('curve', [x1Array, x2Array], {strokeColor:'dodgerblue', strokeWidth: 3.5});
  
  myCurve.updateDataArray = function() {
        let temp = ode_auto_RK4(N, h, g, [p.X(),p.Y()]);
        this.dataX = [];
        this.dataY = [];
        for(let i=0; i< temp.length; i++) {
            this.dataX[i] = temp[i][0];
            this.dataY[i] = temp[i][1];
        }
    };

 
}



new_pendulum();
