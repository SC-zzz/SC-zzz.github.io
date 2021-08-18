JXG.Options.text.useMathJax = true;
function new_orthogonal_2() { 
  let t_start = 0;
  let t_fin = 2;
  let h = 0.01;
  let N = Math.ceil((t_fin-t_start)/h +1);
  let tArray = Array.from(Array(N), (_, k) => t_start + k * h);
  
  brd = JXG.JSXGraph.initBoard('thetabox_2', {boundingbox: [-1.2, 1.2, 1.2, -1.2], keepAspectRatio: true, 
    axis: true, grid: false});
  brd.create('text',[-1,1, 'Drag $P$:'],{fontsize: 14});  
  var p0 = brd.create('point',[0,0],{fixed:true,visible:false});
  var p1 = brd.create('point',[1,0],{name:'',visible:false,fixed:true});
  var c = brd.create('circle',[p0,p1],{strokeWidth:2,strokeColor:'rgb(150, 150, 150)'});
  var p2 = brd.create('glider',[0.4,1.0,c],{name:'\\[P = e^{i&theta;}\\]',withLabel:true, size: 6});
  var theta = brd.create('angle', [p1,p0,p2], {type:'sector', orthoType:'square', orthoSensitivity:2, radius:0.3, name: "$&theta;$"});
  var p3 = brd.create('point',[function(){return p2.X();},0.0],{visible:false,name:'',withLabel:false});
  var p4 = brd.create('point',[0.0,function(){return p2.Y();}],{visible:false,name:'',withLabel:false});

  var theta = brd.create('angle', [p1,p0,p2], {type:'sector', orthoType:'square', orthoSensitivity:2, radius:0.3, name: "$&theta;$"});

  brd.create('line',[p0,p2],{straightFirst:false,straightLast:false,strokeColor:'rgb(30, 144, 255)'});   // Hypotenuse
  brd.create('line',[p2,p3],{straightFirst:false,straightLast:false,strokeColor:'rgb(255,30,144)'});     // sin
  brd.create('line',[p2,p4],{straightFirst:false,straightLast:false,strokeColor:'rgb(255,144,30)'});     // cos

  brd.create('text',[
        function(){return (p2.X()+p4.X())*0.3;},
        function(){return (p2.Y()+p4.Y())*0.5+0.05;},
        'cos'],{fontsize: 14});

  brd.create('text',[
        function(){return (p2.X()+p3.X())*0.5;},
        function(){return (p2.Y()+p3.Y())*0.5;},
        'sin'],{fontsize: 14});  


  var upd = function() {
    document.getElementById("cos2").innerHTML = math.format(p2.X(),{precision: 2});
    document.getElementById("sin2").innerHTML = math.format(p2.Y(),{precision: 2});

    var theta_dec = (Math.atan2(p2.Y(),p2.X()) + 2* Math.PI) % (2 * Math.PI);
    var theta_pi = theta_dec / Math.PI;
    //document.getElementById("theta_dec").innerHTML = math.format(theta_dec,{precision: 2});
    document.getElementById("theta2_pi").innerHTML = math.format(theta_pi,{precision: 2});
    var F1Array = tArray.map(function(t) 
      {return p2.X() * (Math.sqrt(3/52) * (5*t-8)) + p2.Y() * (Math.sqrt(7)/8 * (t**3)); 
      });
    var F2Array = tArray.map(function(t) 
      {return -p2.Y() * (Math.sqrt(3/52) * (5*t-8)) + p2.X() * (Math.sqrt(7)/8 * (t**3)); 
      });            
    let data = [
      {
        x: tArray,
        y: F1Array,
        mode: 'lines', name: 'G_{&#952;}',
        line: {color: 'dodgerblue', width: 3}
      },
      {
        x: tArray,
        y: F2Array,
        mode: 'lines', name: 'G_{&#952; + &#960;/2}',
        line: {color: 'orange', width: 3}
      },      
      ];
      
    let layout = {   
	  xaxis: {range: [t_start, t_fin], title: "x"},
	  yaxis: {range: [-3, 3],},
	  title: "Orthogonality: Example II"   
	  };  
    Plotly.newPlot("orthogPlot2", data, layout);
  }

  upd();

  p2.on("drag",function(){ 
    upd();
  });



}



new_orthogonal_2();