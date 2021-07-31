JXG.Options.text.useMathJax = true;

function func1(v) {
    return [(v[0]**2-1)/2, v[1]];
}

function func2(v) {
    return [(v[0]**2-1)/2, v[1]];
}

function gd_ex_1(id) {
  let xMin = -2;
  let xMax = 2;
  let yMin = -2;
  let yMax = 2;
  
  let density = 4; 
  let scaling = 0.8/density;
  let colorize = false;
  let color;  


  let N = 6000;
  let dt = 0.1;
  
  
  function g(v) {
    return [(v[0]**2-1)/2, v[1]];
  }
  
  function g_rev(v) {
    return [-g(v)[0], -g(v)[1]];
  }      

  
  let board = JXG.JSXGraph.initBoard(id,     
    {boundingbox: [xMin, yMax, xMax, yMin], 
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


  energy = function (x, y) {
    return 1/6*(x**3-3*x) +1/2*(y**2);
  };  
  
  let h = 0.1; 
  let xyEnergy =[];
  let xlen = Math.ceil((xMax-xMin)/h+1);
  let ylen = Math.ceil((yMax-yMin)/h+1);
  let xCoord = Array.from(Array(xlen), (_, k) => k * h + xMin);
  let yCoord = Array.from(Array(ylen), (_, k) => k * h + yMin);
  for (let i=0; i< xlen; i ++) {
    xyEnergy[i] = [];
    for (let j=0; j< ylen; j ++) {
      xyEnergy[i][j] = energy(xMin+i*h, yMin+j*h);    
    }
  }

  createMyHeatMap(board, xCoord, yCoord, xyEnergy, xlen, ylen, h); 


  // draw arrows
  for (let i = xMin; i<=xMax; i= i+1/density){
    for (let j = yMin; j<=yMax; j= j+1/density){
      var v = [i,j];
      let length = math.norm(g(v));
      if (length != 0) {
        let w = [scaling*g(v)[0]/length, scaling*g(v)[1]/length];
        if (colorize==true) {
		  color = "hsl(" + (360- (length*19 % 360)) + ", 100%, 75%)";
		}    
		else {
		  color = 'hsl(0, 0%, 50%)';
		}
        let myArrow = board.create('arrow', [v,[v[0]+w[0], v[1]+w[1]]],{fixed:true, strokeWidth: 1.5, strokeColor:color});
        myArrow.hasPoint = function() { return false;};
      }
   
    }
  }
  
  // stationary points
  board.create('point', [1,0], {size: 5, strokeColor:'red', fillColor:'red', name:'', fixed:true});
  board.create('point', [-1,0], {size: 5, strokeColor:'red', fillColor:'red', name:'', fixed:true});

  var p = board.create('point', [1,1], {size: 6, strokeColor:'dodgerblue', fillColor:'dodgerblue', name:'Drag me'});
 

  var sol = ode_auto_RK4(N, dt, g_rev, [p.X(),p.Y()]);
  var x1Array = [];
  var x2Array = [];  
  for (let i = 0; i< sol.length; i ++) {
    x1Array[i] = sol[i][0];
    x2Array[i] = sol[i][1];
  }
  
  var myCurve = board.create('curve', [x1Array, x2Array], {strokeColor:'dodgerblue', strokeWidth: 3.5});
  myCurve.hasPoint = function() { return false;};
  myCurve.updateDataArray = function() {
        let temp = ode_auto_RK4(N, dt, g_rev, [p.X(),p.Y()]);
        this.dataX = [];
        this.dataY = [];
        for(let i=0; i< temp.length; i++) {
            this.dataX[i] = temp[i][0];
            this.dataY[i] = temp[i][1];
        }
    };


//   let c = parseFloat(document.getElementById("E").value);
 let constant = [0,0.5,1,1.5,2];
  for (let i=0; i< constant.length; i++) {
  let levelsetfunc = function levelsetfunc (x, y) {
    return energy(x,y) - constant[i];
  };
  implicit(board, levelsetfunc, {
    xMin: xMin,
    xMax: xMax,
    yMin: yMin,
    yMax: yMax,
    xInitialSteps: 80,
    yInitialSteps: 80, 
    segmentSteps: 1,
    fill: {
      fillColor: "none",
      strokeColor: "none"
    },
    border: {
            dash: 0,
            strokeWidth: 1,
            strokeColor: "#000000",
            highlight: false
        },
  });

  }
  
   
}


	
gd_ex_1("gd_ex_box_1");



function gd_ex_2(id) {
  let xMin = -2;
  let xMax = 2;
  let yMin = -2;
  let yMax = 2;
  
  let density = 4; 
  let scaling = 0.8/density;
  let colorize = false;
  let color;  


  let N = 6000;
  let dt = 0.1;
  
  
  function g(v) {
    return [-v[0], 2*v[1]];
  }
  
  function g_rev(v) {
    return [-g(v)[0], -g(v)[1]];
  }      

  
  let board = JXG.JSXGraph.initBoard(id,     
    {boundingbox: [xMin, yMax, xMax, yMin], 
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


  energy = function (x, y) {
    return -1/2*(x**2) +(y**2);
  };  
  
  let h = 0.1; 
  let xyEnergy =[];
  let xlen = Math.ceil((xMax-xMin)/h+1);
  let ylen = Math.ceil((yMax-yMin)/h+1);
  let xCoord = Array.from(Array(xlen), (_, k) => k * h + xMin);
  let yCoord = Array.from(Array(ylen), (_, k) => k * h + yMin);
  for (let i=0; i< xlen; i ++) {
    xyEnergy[i] = [];
    for (let j=0; j< ylen; j ++) {
      xyEnergy[i][j] = energy(xMin+i*h, yMin+j*h);    
    }
  }

  createMyHeatMap(board, xCoord, yCoord, xyEnergy, xlen, ylen, h); 


  // draw arrows
  for (let i = xMin; i<=xMax; i= i+1/density){
    for (let j = yMin; j<=yMax; j= j+1/density){
      var v = [i,j];
      let length = math.norm(g(v));
      if (length != 0) {
        let w = [scaling*g(v)[0]/length, scaling*g(v)[1]/length];
        if (colorize==true) {
		  color = "hsl(" + (360- (length*19 % 360)) + ", 100%, 75%)";
		}    
		else {
		  color = 'hsl(0, 0%, 50%)';
		}
        let myArrow = board.create('arrow', [v,[v[0]+w[0], v[1]+w[1]]],{fixed:true, strokeWidth: 1.5, strokeColor:color});
        myArrow.hasPoint = function() { return false;};
      }
   
    }
  }
  
  // stationary points
  board.create('point', [0,0], {size: 5, strokeColor:'red', fillColor:'red', name:'', fixed:true});
  

  var p = board.create('point', [1,1], {size: 6, strokeColor:'dodgerblue', fillColor:'dodgerblue', name:'Drag me'});
 

  var sol = ode_auto_RK4(N, dt, g_rev, [p.X(),p.Y()]);
  var x1Array = [];
  var x2Array = [];  
  for (let i = 0; i< sol.length; i ++) {
    x1Array[i] = sol[i][0];
    x2Array[i] = sol[i][1];
  }
  
  var myCurve = board.create('curve', [x1Array, x2Array], {strokeColor:'dodgerblue', strokeWidth: 3.5});
  myCurve.hasPoint = function() { return false;};
  myCurve.updateDataArray = function() {
        let temp = ode_auto_RK4(N, dt, g_rev, [p.X(),p.Y()]);
        this.dataX = [];
        this.dataY = [];
        for(let i=0; i< temp.length; i++) {
            this.dataX[i] = temp[i][0];
            this.dataY[i] = temp[i][1];
        }
    };


//   let c = parseFloat(document.getElementById("E").value);
 let constant = [-0.5,0,0.5,1,1.5,2];
  for (let i=0; i< constant.length; i++) {
  let levelsetfunc = function levelsetfunc (x, y) {
    return energy(x,y) - constant[i];
  };
  implicit(board, levelsetfunc, {
    xMin: xMin,
    xMax: xMax,
    yMin: yMin,
    yMax: yMax,
    xInitialSteps: 80,
    yInitialSteps: 80, 
    segmentSteps: 1,
    fill: {
      fillColor: "none",
      strokeColor: "none"
    },
    border: {
            dash: 0,
            strokeWidth: 1,
            strokeColor: "#000000",
            highlight: false
        },
  });

  }
  
   
}


gd_ex_2("gd_ex_box_2");
