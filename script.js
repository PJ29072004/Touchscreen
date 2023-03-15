r = 3
var canvas = document.getElementById('sketchpad');
canvas.width = innerWidth
canvas.height = innerHeight
if (canvas.getContext){
    var c = canvas.getContext('2d');
    c.lineWidth = 2*r
}
function drawDot(c,x,y,size) {
    c.beginPath();
    c.arc(x, y, size, 0, Math.PI*2, true);
    c.closePath();
    c.fill();
}
var mouseX,mouseY,mouseDown=0;
function sketchpad_mouseDown(e) {
    mouseDown=1;
    getMousePos(e)
    c.beginPath()
    c.moveTo(mouseX,mouseY)
}
function sketchpad_mouseUp() {
    mouseDown=0;
    c.stroke()
}
function sketchpad_mouseMove(e) { 
    getMousePos(e);
    if (mouseDown==1) { 
        c.lineTo(mouseX,mouseY) 
        c.stroke()
        c.beginPath()
        c.moveTo(mouseX,mouseY)
    }
}
function getMousePos(e) {
    if (e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if (e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
}
canvas.addEventListener('mousedown', sketchpad_mouseDown);
canvas.addEventListener('mousemove', sketchpad_mouseMove);
window.addEventListener('mouseup', sketchpad_mouseUp);

//Touch

var touchX,touchY;
var pathX,pathY
function sketchpad_touchStart(e) {
    pathX=[];
    pathY=[];
    getTouchPos(e);
    drawDot(c,touchX,touchY,r);
    pathX.push(touchX)
    pathY.push(touchY)
    e.preventDefault();
}
function sketchpad_touchMove(e) { 
    getTouchPos(e);
    drawDot(c,touchX,touchY,r); 
    pathX.push(touchX)
    pathY.push(touchY)
    e.preventDefault();
}
function sketchpad_touchEnd(){
    let l = pathX.length
    if(l===0){return;}
    c.beginPath()
    c.moveTo(pathX[0],pathY[0])
    for(var i=1;i<l;i++){
        c.lineTo(pathX[i],pathY[i])
    }
    c.stroke()
}
function getTouchPos(e) {
    if (e.touches) {
        if (e.touches.length == 1) { // Only deal with one finger
            var touch = e.touches[0]; // Get the information for finger #1
            touchX=touch.pageX-touch.target.offsetLeft;
            touchY=touch.pageY-touch.target.offsetTop;
        }
    }
}

canvas.addEventListener('touchstart',sketchpad_touchStart)
canvas.addEventListener('touchmove', sketchpad_touchMove ) 
canvas.addEventListener('touchend', sketchpad_touchEnd )