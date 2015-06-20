var cnx;
var evtHolder = null;
var cube = {
	x: 10,
	y: 30,
	w: 20,
	h: 20,
	xMove: 5,
	yMove: 3,
	spd: 4,
	color: '#a1b1c1'
}
var click = {
	x: 0,
	y: 0
}

var offsets = {
	x: 0,
	y: 0
}

function initFunction(){
	cnx = document.getElementById('cnx');
	var r = cnx.getBoundingClientRect();
	offsets.x = -r.left;
	offsets.y = -r.top;
	cnx.addEventListener('mousedown',doPause);
}

function doPause(evt) {
	click.x = evt.x + offsets.x;
	click.y = evt.y + offsets.y;
	setCourse(cube, evt.x,evt.y);
	// console.log(evt);
	 if (evtHolder) {
	 	clearInterval(evtHolder);
	 	evtHolder=null;
	 } else {
		evtHolder = setInterval(drawCube, 20);

	 }
}
function setCourse(obj, x, y){
	var dx =  Math.abs(x - obj.x);
	var dy =  Math.abs(y - obj.y);
	var dxf = dx / (dx+dy);
	obj.xMove = dxf * obj.spd;
	obj.yMove =  obj.spd - obj.xMove;
	if(x < obj.x) obj.xMove = -Math.abs(obj.xMove);
	if(y < obj.y) obj.yMove = -Math.abs(obj.yMove);
	// console.log("setCourse", obj);
}
function moveTick(){
	cube.x += cube.xMove;
	cube.y += cube.yMove;
}
function drawCube(){
	moveTick();
	var ctx=cnx.getContext('2d');
	// ctx.
	ctx.fillStyle = cube.color;
	ctx.rect(cube.x, cube.y, cube.w, cube.h);
	ctx.closePath();
	ctx.fill();
	ctx.fillStyle = 'red';
	ctx.rect(click.x-1, click.y-1, 3, 3);
	ctx.fill();
}


window.addEventListener('load',initFunction);
