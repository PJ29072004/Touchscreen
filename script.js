r = 3
var can = document.getElementById('sketchpad');
c = can.getContext('2d');
c.lineWidth = 2*r
function drawDot(c,x,y,size) {
    c.beginPath();
    c.arc(x, y, size, 0, Math.PI*2, true);
    c.closePath();
    c.fill();
}
var X,Y,md=false;
can.onmousedown = function(e) {
    md=true;
    getPos(e)
    c.beginPath()
    c.moveTo(X,Y)
}
window.onmouseup = function(){
    md=false;
    c.stroke()
}
can.onmousemove= function(e){ 
    getPos(e);
    if (md) { 
        c.lineTo(X,Y) 
        c.stroke()
        c.beginPath()
        c.moveTo(X,Y)
    }
}

//Touch

var pathX,pathY
can.ontouchstart = function(e) {
    pathX=[];
    pathY=[];
    getPos(e);
    drawDot(c,X,Y,r);
    pathX.push(X)
    pathY.push(Y)
    e.preventDefault();
}
can.ontouchmove = function(e) { 
    getPos(e);
    drawDot(c,X,Y,r); 
    pathX.push(X)
    pathY.push(Y)
    e.preventDefault();
}
window.ontouchend = function(){
    let l = pathX.length
    if(l===0){return;}
    c.beginPath()
    c.moveTo(pathX[0],pathY[0])
    for(var i=1;i<l;i++){
        c.lineTo(pathX[i],pathY[i])
    }
    c.stroke()
}
function getPos(e) {
    if (e.touches) {
        if (e.touches.length == 1) { // Only deal with one finger
            var touch = e.touches[0]; // Get the information for finger #1
            X=touch.pageX-touch.target.offsetLeft;
            Y=touch.pageY-touch.target.offsetTop;
        }
    }
    else if (e.offsetX) {
        X = e.offsetX;
        Y = e.offsetY;
    }
    else if (e.layerX) {
        X = e.layerX;
        Y = e.layerY;
    }
}