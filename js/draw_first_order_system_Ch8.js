var canvasdiv = document.getElementById('canvasdiv');


// for eigenlines
var r_lim = 8;
var l_lim = -r_lim;
const m = 8;

JXG.Options.text.useMathJax = true;
  
function new_function() { 
  canvasdiv.style.display = 'initial'; 
  var lname=[];  
  var lambda1 = parseFloat(document.getElementById("lambda1").value);  
  var lambda2 = parseFloat(document.getElementById("lambda2").value);  



  if (lambda1 == lambda2){
    canvasdiv.style.display = 'none';
    document.getElementById("repeatedRootsGraph").style.display = "initial";
    return;
  }
  
  if (lambda1  == 0 || lambda2 == 0){
    canvasdiv.style.display = 'none';
    document.getElementById("zeroEv").style.display = "initial";
    return;
  }
  
  
  document.getElementById("repeatedRootsGraph").style.display = "none";
  document.getElementById("zeroEv").style.display = "none";
  
  var brd = JXG.JSXGraph.initBoard('box',
					    {axis: true,boundingbox: [-5, 5, 5, -5],keepaspectratio: true});	
  				    
  brd.create('text',[-4.5,4, 'Drag $v_2$ to your desired position:'],{fontsize: 16});				
  var p0 = brd.create('point',[0,0],{fixed:true,visible:false});
  var pneg1 = brd.create('point',[-1,0],{visible:false,fixed:true});
  var p1 = brd.create('point',[1,0],{name:'\\[v_1\\]',fixed:true, size: 5});
  var semicircle = brd.create('semicircle',[pneg1,p1],{strokeWidth:2,strokeColor:'gray', dash:2});
  var p2 = brd.create('glider',[0,1.0,semicircle],
    {strokeColor: "dodgerblue", fillColor: "dodgerblue", name:'\\[v_2\\]',withLabel:true, size: 5});
  document.getElementById("v2_x").innerHTML = "0";
  document.getElementById("v2_y").innerHTML = "1"; 
  
  var t_rlim = 2, t_llim = -2;
  if (lambda1 <= 0 && lambda2 <= 0) {
    t_rlim = 5;
  }
  else if (lambda1 >= 0 && lambda2 >= 0) {
    t_llim = -5;
  }
  else if (Math.abs(lambda1) <= 1 && Math.abs(lambda2) <= 1) {
    t_rlim = 2.5;
    t_llim = -2.5;
  }
 
  var scale = Math.max(Math.abs(lambda1), Math.abs(lambda2));
  //if (math.det(VMatrix) != 0) {
    for (let k=0; k< m/2; k++){
	  for (let i=0; i<= 4; i++) {
	    let j = 2*i + 2;
		let coeff = [j*Math.sin(2*Math.PI*(2*k+1)/m), j*Math.cos(2*Math.PI*(2*k+1)/m)];
		  brd.create('curve',[
			function(t){return coeff[0]*Math.exp(lambda1*t) + coeff[1]*Math.exp(lambda2*t)*p2.X()},
			function(t){return coeff[1]*Math.exp(lambda2*t)*p2.Y()},
			t_llim, t_rlim],
			{strokeColor:'gray',strokeWidth:2}, 
			);
		  // add arrow
		  brd.create('curve', [
			function(t){return coeff[0]*Math.exp(lambda1*t) + coeff[1]*Math.exp(lambda2*t)*p2.X()},
			function(t){return coeff[1]*Math.exp(lambda2*t)*p2.Y()},
			-0.3/scale, 0.3/scale], {strokeColor:'gray', strokeWidth: 2, lastArrow: true});
      }
	}   
 

  p2.on('drag', function() {
    for (let i = 0; i<=r_lim; i++) {
       document.getElementById("v2_x").innerHTML = math.format(p2.X(),{precision: 2});
       document.getElementById("v2_y").innerHTML = math.format(p2.Y(),{precision: 2});
    }
  });

  
  
  if (lambda1 > 0) {
    lname[0] = "$&lambda;_1$ = " + lambda1 + " > 0";
	for (let i = 0; i< r_lim; i ++){
      brd.create('arrow', [[i,0], [i+1,0]], {color: "black", fixed: true});
      brd.create('arrow', [[-i,0], [-i-1,0]], {color: "black", fixed: true});
    }
  }
  else {
    lname[0] = "$&lambda;_1$ = " + lambda1 + " < 0";
	for (let i = 0; i < r_lim; i ++){
      brd.create('arrow', [[i+1,0], [i,0]], {color: "black", fixed: true});
      brd.create('arrow', [[-i-1,0], [-i,0]], {color: "black", fixed: true});
    }
  }

  if (lambda2 > 0) {
    lname[1] = "$&lambda;_2$ = " + lambda2 + " > 0";
	for (let i = 0; i< r_lim; i ++){
      brd.create('curve', [
        function(t){return t*p2.X()},
	    function(t){return t*p2.Y()},
			i,i+1
        ], {lastArrow: true, color: "black",strokeWidth:2});
      brd.create('curve', [
        function(t){return t*p2.X()},
	    function(t){return t*p2.Y()},
			-i,-i-1
        ], {lastArrow: true, color: "black",strokeWidth:2});
    }
  }
  else{
    lname[1] = "$&lambda;_2$ = " + lambda2 + " < 0";
	for (let i = 0; i < r_lim; i ++){
	  brd.create('curve', [
        function(t){return t*p2.X()},
	    function(t){return t*p2.Y()},
			i+1,i
        ], {lastArrow: true, color: "black",strokeWidth:2});
      brd.create('curve', [
        function(t){return t*p2.X()},
	    function(t){return t*p2.Y()},
			-i-1,-i
        ], {lastArrow: true, color: "black",strokeWidth:2});
    }
  }


  var l1 = brd.create('line', [p0,p1], {strokeColor:'black',strokeWidth:3});
  brd.create('text',[3,-0.5, lname[0]],{fontsize: 16, fixed:true});	
  var l2 = brd.create('line', [p0,p2], {strokeColor:'black',strokeWidth:3});
  brd.create('text',[0, 4, lname[1]],{fontsize: 16, fixed:true});	  
 
  
  //x(t) = k1*exp(lambda1*t)v1 + k2*exp(lambda2*t)v2





}

new_function();



