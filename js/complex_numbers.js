JXG.Options.text.useMathJax = true;

function new_Eulers_formula() {
var brd = JXG.JSXGraph.initBoard('Eulerbox', {axis:true, boundingbox: [-1.5, 1.5, 1.5, -1.5]});
//var ax = brd.create('line',[[0,0],[1,0]],{visible:true});
//var ay = brd.create('line',[[0,0],[0,1]],{visible:true});
brd.create('text',[-1.2,1, 'Drag $P$:'],{fontsize: 16});
var p0 = brd.create('point',[0,0],{fixed:true,visible:false});
var p1 = brd.create('point',[1,0],{name:'',visible:false,fixed:true});
var c = brd.create('circle',[p0,p1],{strokeWidth:2,strokeColor:'rgb(150, 150, 150)'});
var p2 = brd.create('glider',[0.4,1.0,c],{name:'\\[P = e^{i&theta;}\\]',withLabel:true, size: 6});
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

brd.create('text',[
        1.3,
        -0.08,
        'Re'],{fontsize: 14,fixed:true});

brd.create('text',[
        -0.1,
        1.4,
        'Im'],{fontsize: 14,fixed:true});

var updtxt = function() {
document.getElementById("x_coord").innerHTML = math.format(p2.X(),{precision: 3});
document.getElementById("x_coord2").innerHTML = math.format(p2.X(),{precision: 3});
document.getElementById("y_coord").innerHTML = math.format(p2.Y(),{precision: 3});
if (p2.Y()<0){
    document.getElementById("plus").style.display= "none";
    document.getElementById("minus").style.display= "inline";
    document.getElementById("y_coord2").innerHTML = (-math.format(p2.Y(),{precision: 3}));
  }
  else {
    document.getElementById("plus").style.display= "inline";
    document.getElementById("minus").style.display= "none";
    document.getElementById("y_coord2").innerHTML = math.format(p2.Y(),{precision: 3});
  }
var theta_dec = (Math.atan2(p2.Y(),p2.X()) + 2* Math.PI) % (2 * Math.PI);
var theta_pi = theta_dec / Math.PI;
document.getElementById("theta_dec").innerHTML = math.format(theta_dec,{precision: 3});
document.getElementById("theta_pi").innerHTML = math.format(theta_pi,{precision: 3});
}

updtxt();

  p2.on("drag",function(){ 
    updtxt();
  });

}




function new_complex_mult() {
  var brd = JXG.JSXGraph.initBoard('multbox', {axis:true, boundingbox: [-3.5, 3.5, 3.5, -3.5]});
//var ax = brd.create('line',[[0,0],[1,0]],{visible:true});
//var ay = brd.create('line',[[0,0],[0,1]],{visible:true});
brd.create('text',[-3.2,3, 'Drag $z_1,z_2$:'],{fontsize: 16});
var p0 = brd.create('point',[0,0],{fixed:true,visible:false});
var p1 = brd.create('point',[1.5,0],{name:'',visible:false,fixed:true});
var c1 = brd.create('circle',[p0,p1],{strokeWidth:2,strokeColor:'rgb(150, 150, 150)'});
var p_02 = brd.create('point',[2,0],{name:'',visible:false,fixed:true});
var c2 = brd.create('circle',[p0,p_02],{strokeWidth:2,strokeColor:'rgb(150, 150, 150)'});
var p_03 = brd.create('point',[3,0],{name:'',visible:false,fixed:true});
var c3 = brd.create('circle',[p0,p_03],{strokeWidth:2,strokeColor:'rgb(150, 150, 150)'});
var point1 = brd.create('glider',[0.4,1.0,c1],{name:'\\[z_1 = 1.5e^{i&theta;_1}\\]',withLabel:true, size: 6});
var point2 = brd.create('glider',[-0.6,1.0,c2],{name:'\\[z_2 = 2e^{i&theta;_2}\\]',withLabel:true, size: 6});

var point3 = brd.create('point',
  [function(){return point1.X()*point2.X()-point1.Y()*point2.Y();},
   function(){return point1.X()*point2.Y()+point1.Y()*point2.X();}],
  {name:'\\[z_3 = 3e^{i&theta;_3}\\]',withLabel:true, size: 5, fillColor:'rgb(255,0,128)', strokeColor:'rgb(255,0,128)'});
  
//var p3 = brd.create('point',[function(){return point1.X();},0.0],{visible:false,name:'',withLabel:false});
//var p4 = brd.create('point',[0.0,function(){return point1.Y();}],{visible:false,name:'',withLabel:false});

var theta1 = brd.create('angle', [p1,p0,point1], {type:'sector', orthoType:'square', orthoSensitivity:2, radius:0.3, name: "$&theta;_1$"});
var theta2 = brd.create('angle', [p1,p0,point2], {type:'sector', orthoType:'square', orthoSensitivity:2, radius:0.6, name: "$&theta;_2$"});
var theta3 = brd.create('angle', [p1,p0,point3], {type:'sector', orthoType:'square', orthoSensitivity:2, radius:0.9, name: "$&theta;_3$"});


brd.create('line',[p0,point1],{straightFirst:false,straightLast:false,strokeColor:'rgb(30, 144, 255)'});   // Hypotenuse
//brd.create('line',[point1,p3],{straightFirst:false,straightLast:false,strokeColor:'rgb(255,30,144)'});     // sin
//brd.create('line',[point1,p4],{straightFirst:false,straightLast:false,strokeColor:'rgb(255,144,30)'});     // cos


brd.create('line',[p0,point2],{straightFirst:false,straightLast:false,strokeColor:'rgb(30, 144, 255)'});   // Hypotenuse
//brd.create('line',[point1,p3],{straightFirst:false,straightLast:false,strokeColor:'rgb(255,30,144)'});     // sin
//brd.create('line',[point1,p4],{straightFirst:false,straightLast:false,strokeColor:'rgb(255,144,30)'});     // cos

brd.create('line',[p0,point3],{straightFirst:false,straightLast:false,strokeColor:'rgb(255,128,0)'});   // Hypotenuse


//brd.create('text',[
//        function(){return (point1.X()+p4.X())*0.3;},
//        function(){return (point1.Y()+p4.Y())*0.5+0.05;},
//        'cos'],{fontsize: 14});

//brd.create('text',[
//        function(){return (point1.X()+p3.X())*0.5;},
//        function(){return (point1.Y()+p3.Y())*0.5;},
//        'sin'],{fontsize: 14});

brd.create('text',[
        3.2,
        -0.1,
        'Re'],{fontsize: 14,fixed:true});

brd.create('text',[
        -0.2,
        3.3,
        'Im'],{fontsize: 14,fixed:true});


var updtxt1 = function() {
  let theta1_dec = (Math.atan2(point1.Y(),point1.X()) + 2* Math.PI) % (2 * Math.PI);
  let theta1_pi = theta1_dec / Math.PI;
  document.getElementById("x1_mult").innerHTML = math.format(point1.X(),{precision: 3});
  document.getElementById("y1_mult").innerHTML = math.format(point1.Y(),{precision: 3});
  document.getElementById("t1pi_mult").innerHTML = math.format(theta1_pi,{precision: 3});
}
var updtxt2 = function() {
  let theta2_dec = (Math.atan2(point2.Y(),point2.X()) + 2* Math.PI) % (2 * Math.PI);
  let theta2_pi = theta2_dec / Math.PI;
  document.getElementById("x2_mult").innerHTML = math.format(point2.X(),{precision: 3});
  document.getElementById("y2_mult").innerHTML = math.format(point2.Y(),{precision: 3});
  document.getElementById("t2pi_mult").innerHTML = math.format(theta2_pi,{precision: 3});
}
var updtxt3 = function() {
  let theta3_dec = (Math.atan2(point3.Y(),point3.X()) + 2* Math.PI) % (2 * Math.PI);
  let theta3_pi = theta3_dec / Math.PI;
  document.getElementById("x3_mult").innerHTML = math.format(point3.X(),{precision: 3});
  document.getElementById("y3_mult").innerHTML = math.format(point3.Y(),{precision: 3});
  document.getElementById("t3pi_mult").innerHTML = math.format(theta3_pi,{precision: 3});
}

updtxt1();
updtxt2();
updtxt3();

point1.on("drag",function(){ 
    updtxt1();
    updtxt3();
  });

point2.on("drag",function(){ 
    updtxt2();
    updtxt3();
  });


}



function new_complex_conj() {
  var brd = JXG.JSXGraph.initBoard('conjbox', {axis:true, boundingbox: [-2.5, 2.5, 2.5, -2.5]});
//var ax = brd.create('line',[[0,0],[1,0]],{visible:true});
//var ay = brd.create('line',[[0,0],[0,1]],{visible:true});
brd.create('text',[-2.2,2, 'Drag $z$:'],{fontsize: 16});
var p0 = brd.create('point',[0,0],{fixed:true,visible:false});
var p1 = brd.create('point',[2,0],{name:'',visible:false,fixed:true});
var c1 = brd.create('circle',[p0,p1],{strokeWidth:2,strokeColor:'rgb(150, 150, 150)'});
var p2 = brd.create('point',[0.5,0],{name:'',visible:false,fixed:true});
var c2 = brd.create('circle',[p0,p2],{strokeWidth:2,strokeColor:'rgb(150, 150, 150)'});
var point1 = brd.create('glider',[0.4,1.0,c1],{name:'\\[z = 2e^{i&theta;}\\]',withLabel:true, size: 6});

// conjugation
var point2 = brd.create('point',
  [function(){return point1.X();},
   function(){return -point1.Y();}],
  {name:'\\[\\overline{z} = 2e^{-i&theta;}\\]',withLabel:true, size: 5, fillColor:'rgb(255,0,128)', strokeColor:'rgb(255,0,128)'});

// inversion
var point3 = brd.create('point',
  [function(){return point1.X()/4;},
   function(){return -point1.Y()/4;}],
  {name:'\\[1/z = 0.5e^{-i&theta;}\\]',withLabel:true, size: 5, fillColor:'rgb(255,0,128)', strokeColor:'rgb(255,0,128)'});
  

var theta1 = brd.create('angle', [p1,p0,point1], {type:'sector', orthoType:'square', orthoSensitivity:2, radius:0.3, name: "$&theta;$"});
//var theta2 = brd.create('angle', [p1,p0,point2], {type:'sector', orthoType:'square', orthoSensitivity:2, radius:0.6, name: "$&theta;_2$"});
//var theta3 = brd.create('angle', [p1,p0,point3], {type:'sector', orthoType:'square', orthoSensitivity:2, radius:0.9, name: "$&theta;_3$"});


brd.create('line',[p0,point1],{straightFirst:false,straightLast:false,strokeColor:'rgb(30, 144, 255)'});   // Hypotenuse

brd.create('line',[p0,point2],{straightFirst:false,straightLast:false,strokeColor:'rgb(30, 144, 255)'});   // Hypotenuse



//brd.create('text',[
//        function(){return (point1.X()+p4.X())*0.3;},
//        function(){return (point1.Y()+p4.Y())*0.5+0.05;},
//        'cos'],{fontsize: 14});

//brd.create('text',[
//        function(){return (point1.X()+p3.X())*0.5;},
//        function(){return (point1.Y()+p3.Y())*0.5;},
//        'sin'],{fontsize: 14});

brd.create('text',[
        2.2,
        -0.1,
        'Re'],{fontsize: 14,fixed:true});

brd.create('text',[
        -0.2,
        2.3,
        'Im'],{fontsize: 14,fixed:true});


var updtxt1 = function() {
  let theta1_dec = (Math.atan2(point1.Y(),point1.X()) + 2* Math.PI) % (2 * Math.PI);
  let theta1_pi = theta1_dec / Math.PI;
  document.getElementById("x1_conj").innerHTML = math.format(point1.X(),{precision: 3});
  document.getElementById("y1_conj").innerHTML = math.format(point1.Y(),{precision: 3});
  document.getElementById("t1pi_conj").innerHTML = math.format(theta1_pi,{precision: 3});
}
var updtxt2 = function() {
  document.getElementById("x2_conj").innerHTML = math.format(point2.X(),{precision: 3});
  document.getElementById("y2_conj").innerHTML = math.format(point2.Y(),{precision: 3});
  //document.getElementById("t2pi_mult").innerHTML = math.format(theta2_pi,{precision: 3});
}
var updtxt3 = function() {
  document.getElementById("x3_conj").innerHTML = math.format(point3.X(),{precision: 3});
  document.getElementById("y3_conj").innerHTML = math.format(point3.Y(),{precision: 3});
 // document.getElementById("t3pi_mult").innerHTML = math.format(theta3_pi,{precision: 3});
}

updtxt1();
updtxt2();
updtxt3();

point1.on("drag",function(){ 
    updtxt1();
    updtxt2();
    updtxt3();
  });


}





new_Eulers_formula();
new_complex_mult();
new_complex_conj();