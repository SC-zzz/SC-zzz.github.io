// plotting range: -1<= x <=6, -1<= y <= 6
JXG.Options.text.useMathJax = true;
function new_function() { 
  var canvasdiv = document.getElementById('canvasdiv');
  // for eigenlines
  var r_lim =12;
  var l_lim = -r_lim;
  const m =8;

    canvasdiv.style.display = 'initial'; 
    document.getElementById("repeatedRootsGraph").style.display = 'none'; 
    document.getElementById("zeroDetGraph").style.display = 'none';
    
    var a = parseFloat(document.getElementById("a").value);  
    var b = parseFloat(document.getElementById("b").value);
    var c = parseFloat(document.getElementById("c").value);
    var d = parseFloat(document.getElementById("d").value);    


    // correction factor
    var cf = 10;
    
    var tr = (a*cf + d*cf)/cf ;
    var det = ((a*cf)*(d*cf) - (b*cf)*(c*cf))/(cf*cf);
    var delta = ((tr * cf)**2 - 4 * det * cf * cf)/(cf*cf);
    
    document.getElementById("det_term").innerHTML = det;  
    
    if (det == 0) {
        document.getElementById("detIs0").style.display = 'block'; 
        document.getElementById("detNot0").style.display = 'none';
        canvasdiv.style.display = 'none'; 
        document.getElementById("zeroDetGraph").style.display = 'block';
        return;    
    }
    else {
		document.getElementById("detIs0").style.display = 'none'; 
		document.getElementById("detNot0").style.display = 'block';          
	
		if (delta == 0) {
		    document.getElementById("type_of_roots").innerHTML = 
 					"It has two equal real roots.";
			document.getElementById("repeatedRoots").style.display = 'block'; 
			document.getElementById("distinctRoots").style.display = 'none'; 
			canvasdiv.style.display = 'none'; 
			document.getElementById("repeatedRootsGraph").style.display = 'block'; 
			return;    
		}
		else {
			document.getElementById("repeatedRoots").style.display = 'none'; 
			document.getElementById("distinctRoots").style.display = 'block';          
		    
	  
		   // convert to first-order systems
		   // y' =z, z'=-py-q
		   function f(t, v)  {
			   return [a*v[0]+b*v[1],c*v[0]+d*v[1]];
		   }
	 
			var right_lim = 10;
	 
			// poly lambda^2 - tr * lambda + det   
			if (tr >= 0) {
				document.getElementById("p_term").innerHTML = "-"+tr;
			}
			else {
				document.getElementById("p_term").innerHTML = "+"+(-tr);
			}
	
			if (det >= 0) {
				document.getElementById("q_term").innerHTML = "+"+det;
			}
			else {
				document.getElementById("q_term").innerHTML = "-"+(-det);
			}
	
			var w = [0,0];  //storing eigenvalues
			var v = new Array(2);
			// WARNING: Do no use ans.vectors to get the eigenvectors! It gives wrong answers!
		    
		    if (c == 0) {
		        w = [a,d];
		        v[0] = [1,0];
		        if (b != 0){		        
		            let temp = [Math.sign(b)*b, Math.sign(b)*(-a+d)];
		            let len = Math.sqrt((temp[0])**2+ (temp[1])**2);
		            v[1] = [temp[0]/len, temp[1]/len];
		        } else {
		            v[1] = [0,1];
		        }
		    }
		    else {
		        if (b == 0){
		            w = [a,d];
		            let temp = [Math.sign(d-a)*(d-a), -Math.sign(d-a)*c];
		            let len = Math.sqrt((temp[0])**2+ (temp[1])**2);
		            v[0] = [1,0];
		            v[1] = [0,1];
		        } 
		        else {		        
		            w = [math.add(tr/2, math.sqrt(delta/4)), 
		                 math.subtract(tr/2, math.sqrt(delta/4))];
		            let temp1 = [Math.sign(b)*b, 
		                         math.multiply(Math.sign(b), math.add(-a,w[0]))];
		            let len1 = math.norm(temp1);
		            v[0] = math.divide(temp1, len1);
		            let temp2 = [Math.sign(b)*b, 
		                         math.multiply(Math.sign(b), math.add(-a,w[1]))];
		            let len2 = math.norm(temp2);
		            v[1] = math.divide(temp2, len2);
		        }		                
		    }
	
	        // two real eigenvalues
			if (delta > 0) {   
				document.getElementById("type_of_roots").innerHTML = 
				  "It has two distinct real roots.";
				document.getElementById("lambda1").innerHTML = math.format(w[0],{precision: 4});
				document.getElementById("lambda2").innerHTML = math.format(w[1],{precision: 4}); 
				document.getElementById("v1").innerHTML = 
					math.format(v[0][0],4) +", " + math.format(v[0][1],4);
				document.getElementById("v2").innerHTML = 
					math.format(v[1][0],4) +", " + math.format(v[1][1],4);    


				var brd = JXG.JSXGraph.initBoard('box',{axis: true,boundingbox: [-5, 5, 5, -5], keepaspectratio: true});
				var p1 = brd.create('point', v[0],
				         {withLabel: true, name: "$\\mathbf{v}_1$", size: 6, fixed: true});
				var p2 = brd.create('point', v[1],
				         {withLabel: true, name: "$\\mathbf{v}_2$", size: 6, fixed: true});
			    //p1.label.content.setProperty({fontSize:60}); 
			    //p2.label.content.setProperty({fontSize:60}); 
                
                // draw eigenline arrows
                var lname = new Array(2);
                for (let j=0; j<= 1; j ++) {
				if (w[j] > 0) {
				    lname[j] = "$&lambda;_" + (j+1) + " = " + math.format(w[j],{precision: 4}) + " > 0$";
				    for (let i = 0; i< r_lim; i ++){
                        brd.create('arrow', [[i*v[j][0],i*v[j][1]], [(i+1)*v[j][0],(i+1)*v[j][1]]], {color: "black", fixed: true});
                        brd.create('arrow', [[-i*v[j][0],-i*v[j][1]], [-(i+1)*v[j][0],-(i+1)*v[j][1]]], {color: "black", fixed: true});
                    }
				}
				else {
				    lname[j] = "$&lambda;_" + (j+1) + " = " + math.format(w[j],{precision: 4}) + " < 0$";
				    for (let i = 1; i<= r_lim; i ++){
                        brd.create('arrow', [[i*v[j][0],i*v[j][1]], [(i-1)*v[j][0],(i-1)*v[j][1]]], {color: "black", fixed: true});
                        brd.create('arrow', [[-i*v[j][0],-i*v[j][1]], [-(i-1)*v[j][0],-(i-1)*v[j][1]]], {color: "black", fixed: true});
                    }			    
				}
				}
				
				// draw other curves			
				for (let k=0; k< m/2; k++){
				    for (let j=2; j<= 14; j =j+2) {
				        let coeff = [j*Math.sin(2*Math.PI*(2*k+1)/m), j*Math.cos(2*Math.PI*(2*k+1)/m)];
						brd.create('curve',[
						function(t){return coeff[0]*Math.exp(w[0]*t)*v[0][0]+coeff[1]*Math.exp(w[1]*t)*v[1][0]},
						function(t){return coeff[0]*Math.exp(w[0]*t)*v[0][1]+coeff[1]*Math.exp(w[1]*t)*v[1][1]},
						l_lim, r_lim],
						{strokeColor:'gray',strokeWidth:2}, 
						);
						for (let i= -1; i<=1; i++) {
						    let t = i;
						    //let dt = 0.05;
							let dt = Math.min(0.1, Math.log(1+0.15/Math.exp(w[0]*t))/Math.abs(w[0]), 
							   Math.log(1+0.15/Math.exp(w[1]*t))/Math.abs(w[1]));
							let x_0 = coeff[0]*Math.exp(w[0]*t)*v[0][0]+coeff[1]*Math.exp(w[1]*t)*v[1][0];
							let y_0 = coeff[0]*Math.exp(w[0]*t)*v[0][1]+coeff[1]*Math.exp(w[1]*t)*v[1][1];
							let x_1 = coeff[0]*Math.exp(w[0]*(t+dt))*v[0][0]+coeff[1]*Math.exp(w[1]*(t+dt))*v[1][0];
							let y_1 = coeff[0]*Math.exp(w[0]*(t+dt))*v[0][1]+coeff[1]*Math.exp(w[1]*(t+dt))*v[1][1];				    
							brd.create('arrow', [[x_0,y_0], [x_1,y_1]], {color: "gray", strokeWidth:2, fixed: true}); 
						}
                    }
				}
				// draw eigenlines
				var l1 = brd.create('curve',[
                    function(t){return v[0][0]*t},
                    function(t){return v[0][1]*t},
                    l_lim, r_lim],
                    {withLabel: true, name: lname[0], strokeColor:'black',strokeWidth:3, 
                     label:{autoPosition: true, offset:[10, 10], position: 'bot'}
                     }, 
                    );
               	var l2 = brd.create('curve',[
                    function(t){return v[1][0]*t},
                    function(t){return v[1][1]*t},
                    l_lim, r_lim],
                    {withLabel: true, name: lname[1], strokeColor:'black',strokeWidth:3, 
                     label:{autoPosition: true, offset:[10, 10], position: 'bot'}
                    });  
               //var title = brd.create('text',[0,4,"Phase portrait and eigenlines"]);     
                       
			}
        
           // complex eigenvalues
			else {
				var r0 =  tr/2;
				var s0 = math.sqrt(-delta/4);
				var v_re = math.re(v[0]);
				var v_im = math.im(v[0]);
				document.getElementById("type_of_roots").innerHTML = 
				  "It has two conjugate complex roots.";
				document.getElementById("lambda1").innerHTML = math.format(w[0],{precision: 4});
				document.getElementById("lambda2").innerHTML = math.format(w[1],{precision: 4}); 
				document.getElementById("v1").innerHTML = 
					math.format(v[0][0],4) +", " + math.format(v[0][1],4);
				document.getElementById("v2").innerHTML = 
					math.format(v[1][0],4) +", " + math.format(v[1][1],4);  

				
				// ellipse
				if (tr == 0){
					var brd = JXG.JSXGraph.initBoard('box',
					    {axis: true,boundingbox: [-5, 5, 5, -5], keepaspectratio: true});    
					var c1 = brd.create('curve',[
						function(t){return math.re(math.multiply(math.exp(math.multiply(w[0],t)), v[0][0]))},
						function(t){return math.re(math.multiply(math.exp(math.multiply(w[0],t)), v[0][1]))},
						0, 2*Math.PI/Math.abs(s0)],{strokeColor:'black',strokeWidth:3});
					for (let i = 0; i< 4; i ++) {
					    let t = i* Math.PI/(2*Math.abs(s0));
					    let dt = 0.2 * Math.PI/(2*Math.abs(s0));
					    let x_0 = math.re(math.multiply(math.exp(math.multiply(w[0],t)), v[0][0]));
					    let y_0 = math.re(math.multiply(math.exp(math.multiply(w[0],t)), v[0][1]));
					    let x_1 = math.re(math.multiply(math.exp(math.multiply(w[0],t+dt)), v[0][0]));
					    let y_1 = math.re(math.multiply(math.exp(math.multiply(w[0],t+dt)), v[0][1]));					    
                        brd.create('arrow', [[x_0,y_0], [x_1,y_1]], {color: "black", fixed: true});              
                    }	
                    
                    // other curves
                    for (let j = 2; j< 20; j ++) {
						brd.create('curve',[
							function(t){return j*math.re(math.multiply(math.exp(math.multiply(w[0],t)), v[0][0]))},
							function(t){return j*math.re(math.multiply(math.exp(math.multiply(w[0],t)), v[0][1]))},
							0, 2*Math.PI/Math.abs(s0)],{strokeColor:'gray',strokeWidth:2});
						for (let i = 0; i< 4; i ++) {
							let t = i* Math.PI/(2*Math.abs(s0));
							let dt = 0.25 * Math.PI/(2*Math.abs(s0)*j);
							let x_0 = j*math.re(math.multiply(math.exp(math.multiply(w[0],t)), v[0][0]));
							let y_0 = j*math.re(math.multiply(math.exp(math.multiply(w[0],t)), v[0][1]));
							let x_1 = j*math.re(math.multiply(math.exp(math.multiply(w[0],t+dt)), v[0][0]));
							let y_1 = j*math.re(math.multiply(math.exp(math.multiply(w[0],t+dt)), v[0][1]));					    
							brd.create('arrow', [[x_0,y_0], [x_1,y_1]], {color: "gray", strokeWidth:2, fixed: true});              
						}
                    }
				}  
				// spiral
				else {      //-8*Math.PI/Math.abs(s0) 
					var brd = JXG.JSXGraph.initBoard('box',
					    {axis: true,boundingbox: [-5, 5, 5, -5],keepaspectratio: true});
					// draw arrows
					if (r0 > 0) {
					    var t_start = -4*Math.PI/Math.abs(s0);   
					    var t_fin = Math.max(Math.log(30)/Math.abs(r0),8*Math.PI/Math.abs(s0));	
					    				    
// 					    for (let i = 0.5; i< 8; i =i+1) {
// 
// 							let t = i* Math.PI/(2*Math.abs(s0));
// 							let dt = Math.min(0.3 * Math.PI/(2*Math.abs(s0)), Math.log(1+0.3/Math.exp(r0*t))/r0);
// 							let x_0 = math.re(math.multiply(math.exp(math.multiply(w[0],t)), v[0][0]));
// 							let y_0 = math.re(math.multiply(math.exp(math.multiply(w[0],t)), v[0][1]));
// 							let x_1 = math.re(math.multiply(math.exp(math.multiply(w[0],t+dt)), v[0][0]));
// 							let y_1 = math.re(math.multiply(math.exp(math.multiply(w[0],t+dt)), v[0][1]));					    
// 							brd.create('arrow', [[x_0,y_0], [x_1,y_1]], {color: "black", fixed: true}); 
// 							
// 							let x2_0 = math.im(math.multiply(math.exp(math.multiply(w[0],t)), v[0][0]));
// 							let y2_0 = math.im(math.multiply(math.exp(math.multiply(w[0],t)), v[0][1]));
// 							let x2_1 = math.im(math.multiply(math.exp(math.multiply(w[0],t+dt)), v[0][0]));
// 							let y2_1 = math.im(math.multiply(math.exp(math.multiply(w[0],t+dt)), v[0][1]));					    
// 							brd.create('arrow', [[x2_0,y2_0], [x2_1,y2_1]], {color: "black", fixed: true});              
//                         }
					}
					else {
					    var t_start = Math.min(-Math.log(30)/Math.abs(r0),-8*Math.PI/Math.abs(s0));   
					    var t_fin = 4*Math.PI/Math.abs(s0);
// 					    for (let i = -7.5; i <= 0; i =i+1) {
// 
// 							let t = i* Math.PI/(2*Math.abs(s0));
// 							let dt = Math.min(0.3 * Math.PI/(2*Math.abs(s0)), -Math.log(1+0.3/Math.exp(r0*t))/r0);
// 							let x_0 = math.re(math.multiply(math.exp(math.multiply(w[0],t)), v[0][0]));
// 							let y_0 = math.re(math.multiply(math.exp(math.multiply(w[0],t)), v[0][1]));
// 							let x_1 = math.re(math.multiply(math.exp(math.multiply(w[0],t+dt)), v[0][0]));
// 							let y_1 = math.re(math.multiply(math.exp(math.multiply(w[0],t+dt)), v[0][1]));					    
// 							brd.create('arrow', [[x_0,y_0], [x_1,y_1]], {color: "black", fixed: true}); 
// 							
// 							let x2_0 = math.im(math.multiply(math.exp(math.multiply(w[0],t)), v[0][0]));
// 							let y2_0 = math.im(math.multiply(math.exp(math.multiply(w[0],t)), v[0][1]));
// 							let x2_1 = math.im(math.multiply(math.exp(math.multiply(w[0],t+dt)), v[0][0]));
// 							let y2_1 = math.im(math.multiply(math.exp(math.multiply(w[0],t+dt)), v[0][1]));					    
// 							brd.create('arrow', [[x2_0,y2_0], [x2_1,y2_1]], {color: "black", fixed: true});              
//                         }					    
					}

				    for (let k=0; k< m/2; k++){
				        let coeff = [Math.sin(2*Math.PI*(2*k+1)/m), Math.cos(2*Math.PI*(2*k+1)/m)];
						brd.create('curve',[
						function(t){
						    return coeff[0]*math.re(math.multiply(math.exp(math.multiply(w[0],t)), v[0][0]))
						           +coeff[1]*math.im(math.multiply(math.exp(math.multiply(w[0],t)), v[0][0])) 
						    },
						function(t){						    
						    return coeff[0]*math.re(math.multiply(math.exp(math.multiply(w[0],t)), v[0][1]))
						           +coeff[1]*math.im(math.multiply(math.exp(math.multiply(w[0],t)), v[0][1])) 
						    },
						t_start, t_fin], {strokeColor:'gray',strokeWidth:2});
						// add arrows
						brd.create('curve',[
						function(t){
						    return coeff[0]*math.re(math.multiply(math.exp(math.multiply(w[0],t)), v[0][0]))
						           +coeff[1]*math.im(math.multiply(math.exp(math.multiply(w[0],t)), v[0][0])) 
						    },
						function(t){						    
						    return coeff[0]*math.re(math.multiply(math.exp(math.multiply(w[0],t)), v[0][1]))
						           +coeff[1]*math.im(math.multiply(math.exp(math.multiply(w[0],t)), v[0][1])) 
						    },
						t_start, 0.4*Math.PI/(2*Math.abs(s0))], {strokeColor:'gray',strokeWidth:2,lastArrow: true});
// 						for (let i= -1; i<=1; i++) {
// 							let t = i* Math.PI/(2*Math.abs(s0));
// 							let dt = Math.min(0.2 * Math.PI/(2*Math.abs(s0)), -Math.log(1+0.1/Math.exp(r0*t))/r0);
// 							let x_0 = c[0]*Math.exp(w[0]*t)*v[0][0]+c[1]*Math.exp(w[1]*t)*v[1][0];
// 							let y_0 = c[0]*Math.exp(w[0]*t)*v[0][1]+c[1]*Math.exp(w[1]*t)*v[1][1];
// 							let x_1 = c[0]*Math.exp(w[0]*(t+dt))*v[0][0]+c[1]*Math.exp(w[1]*(t+dt))*v[1][0];
// 							let y_1 = c[0]*Math.exp(w[0]*(t+dt))*v[0][1]+c[1]*Math.exp(w[1]*(t+dt))*v[1][1];				    
// 							brd.create('arrow', [[x_0,y_0], [x_1,y_1]], {color: "gray", strokeWidth:2, fixed: true}); 
// 						}
				    }
				    // add arrows
					brd.create('curve',[
						function(t){return math.re(math.multiply(math.exp(math.multiply(w[0],t)), v[0][0]))},
						function(t){return math.re(math.multiply(math.exp(math.multiply(w[0],t)), v[0][1]))},
						t_start, 0.4*Math.PI/(2*Math.abs(s0))],{strokeColor:'black',strokeWidth:2,lastArrow: true});	
					brd.create('curve',[
						function(t){return math.im(math.multiply(math.exp(math.multiply(w[0],t)), v[0][0]))},
						function(t){return math.im(math.multiply(math.exp(math.multiply(w[0],t)), v[0][1]))},
						t_start, 0.4*Math.PI/(2*Math.abs(s0))],{strokeColor:'black',strokeWidth:2,lastArrow: true});  
					var c1 = brd.create('curve',[
						function(t){return math.re(math.multiply(math.exp(math.multiply(w[0],t)), v[0][0]))},
						function(t){return math.re(math.multiply(math.exp(math.multiply(w[0],t)), v[0][1]))},
						t_start, t_fin],{strokeColor:'black',strokeWidth:3});
					var c2 = brd.create('curve',[
						function(t){return math.im(math.multiply(math.exp(math.multiply(w[0],t)), v[0][0]))},
						function(t){return math.im(math.multiply(math.exp(math.multiply(w[0],t)), v[0][1]))},
						t_start, t_fin],{strokeColor:'black',strokeWidth:3});   
	 
                }
			}

		
		}
	}
}

new_function();



