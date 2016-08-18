var scriptsToLoad = [
	"save.js",
	"engine.js",
	"scoreboard.js",
	"assets.js",
	"gamescreen.js"
];
var KN = {
	scriptsToLoad: scriptsToLoad, // path names.
	m: [],
	scriptRoot: 'js/',
	doLoader: [],
    noToLoad: 0,
    noLoaded: 0,
    clickListeners: [],
	addScript: function(path, hasLoader){
		this.scriptsToLoad.push(path);
        this.noToLoad++;
	},
	// To load one at a time, the createModule calls the next itteration
	loadScripts: function(){
		var head = document.getElementsByTagName('head')[0];
		var path = this.scriptRoot;
		var i = this.scriptsToLoad[this.noLoaded];
		if (undefined === i ) return;
		var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src= path +i;
		head.appendChild(s);
		this.noLoaded++;
	},
	afterScriptsLoaded: function(){
		console.log("afterLoad");
        // this.Engine.addObject(cube);
		this.m.forEach(function(i){
			if (i.afterLoad) {
				i.afterLoad();
			}
		});
		KN.Save.load();
        this.Engine.pause();

	},
    isLoaded: function(){ // Replace with smarter strategy?
        return ( this.m.length === this.scriptsToLoad.length );
    },
    createModule: function(name, moduleObject){
    	if (this[name]) {
    		console.log("repeated createModule: " + name);
    		return;
    	}
    	this[name] = moduleObject;
    	this.m.push(this[name]);
    	if (moduleObject.require) {
    		//TODO: check if in scriptsToLoad, else error
    		moduleObject.require.forEach(function(r){
    			// console.log(name," Requires ", r);
    		})
    	}
    	if (this.isLoaded()) {
    		this.afterScriptsLoaded();
    	}
    	this.loadScripts();
    },
    addClickListener(obj) {
    	this.clickListeners.push(obj);
    },
    onClick: function (ev) {
    	if (KN.Engine.isPause) return;
    	this.clickPreventDefault = false;
    	KN.clickListeners.forEach(function(r){
    		r.onClick(ev);
    	});
		ev.stopPropagation();
    },
    onDoubleClick: function (ev) {
    	ev.stopPropagation();
    },
    onClickQuit: function (ev) {
    	KN.Engine.pause();
    	KN.Save.save();
    	var body = document.getElementsByTagName("BODY")[0];
    	body.innerHTML = "";
    	body.className = "all-black";
    }
};
function initFunction(){
	cnx = document.getElementById('cnx');
	var r = cnx.getBoundingClientRect();
	// offsets.x = -r.left;
	// offsets.y = -r.top;
	// KN.addScript('engine.js');
	// KN.addScript('scoreboard.js');
    KN.loadScripts();
    // KN.afterScriptsLoaded()
    document.getElementById('cnx').addEventListener('click', KN.onClick);
    document.getElementById('cnx').addEventListener('dblclick', KN.onDoubleClick);
    document.getElementById('quitbutton').addEventListener('click', KN.onClickQuit);

}



var cnx;
var evtHolder = null;
function doPause(evt) {
    KN.Engine.pause();
}

window.addEventListener('load',initFunction);
