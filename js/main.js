var KN = {
	scriptsToLoad: [], // path names.
	scriptRoot: 'js/',
	doLoader: [],
    noToLoad: 0,
    noLoaded: 0,
	addScript: function(path, hasLoader){
		this.scriptsToLoad.push(path);
        this.noToLoad++;
	},
	loadScripts: function(){
		var head = document.getElementsByTagName('head')[0];
		var path = this.scriptRoot;
		this.scriptsToLoad.forEach(function(i){
			var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src= path +i;
			head.appendChild(s);
		});
		
	},
	afterScriptsLoaded: function(){
		console.log("afterLoad");
        this.Engine.addObject(cube);
		this.doLoader.forEach(function(i){
			i.afterLoad();
		});
        this.Engine.pause();
	},
    isLoaded: function(){ // Replace with smarter strategy?
        if( --this.noToLoad <= 0) {
            this.afterScriptsLoaded();
        }
    },
    createModule: function(name, moduleObject){
    	this[name] = moduleObject;
    	if (moduleObject.require) {
    		moduleObject.require.forEach(function(r){
    			console.log(name," Requires ", r);
    		})
    	}
    	this[name].afterLoad();
    	if (++this.noLoaded >= this.scriptsToLoad.length) {
    		this.afterScriptsLoaded();
    	}
    }
};
function initFunction(){
	cnx = document.getElementById('cnx');
	var r = cnx.getBoundingClientRect();
	offsets.x = -r.left;
	offsets.y = -r.top;
	KN.addScript('engine.js');
	KN.addScript('scoreboard.js');
    KN.loadScripts();
    // KN.afterScriptsLoaded()
    document.getElementById('cnx').addEventListener('mousedown',doPause);
}



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
	color: '#a1b1c1',
    paintMe: function(ctx){
        ctx.fillStyle = this.color;
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fill();
    },
    doTick: function(){
        this.x += this.xMove;
        this.y += this.yMove;
    }
}
var click = {
	x: 0,
	y: 0
}

var offsets = {
	x: 0,
	y: 0
}


function doPause(evt) {
    click.x = evt.x + offsets.x;
    click.y = evt.y + offsets.y;
    setCourse(cube, evt.x,evt.y);
    KN.Engine.pause();
	// // console.log(evt);
	//  if (evtHolder) {
	//  	// clearInterval(evtHolder);
	//  	// evtHolder=null;
	//  } else {
	// 	evtHolder = setInterval(drawCube, 20);

	//  }
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
