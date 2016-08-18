KN.createModule("Gamescreen",{
	requires: [
		'Engine',
		'Assets'
	],
	paintArray: [],
	angst: {
		x: 280,
		y: 100,
		z: 9999,
		jumpX: 5,
		jumpTime: 300,
		w: 31,
		h: 86,
		image: "player"
	},
	backdrop: {
		x: 200,
		y: 50,
		z: 1,
		image: "backdrop"
	},
	background: {
		x:0,
		y:0,
		z:0,
		image: "background"
	},
	stage: {
		x:200,
		y:150,
		z:2,
		image: "stage"
	},
	afterLoad: function(){
		console.log("Gamescreen loaded");
		KN.Engine.addObject(this); // add to engine, hooks to activate doTick, paintMe
		KN.addClickListener(this);

		// 
		this.paintArray.push(this.angst);
		this.paintArray.push(this.backdrop);
		this.paintArray.push(this.background);
		this.paintArray.push(this.stage);
		this.sortPaintArray();

		// 
		this.setImageFromAssets();
	},
	sortPaintArray: function() {
		this.paintArray.sort(function(a,b){
			if (a.z < b.z) return -1;
			if (a.z > b.z) return 1;
			return 0;
		});
	},
	// Needed to be done after KN.Assets... objects have become Image objects
	setImageFromAssets: function () {
		this.paintArray.forEach(function(i){
			i.image = KN.Assets[i.image];
		});
	},
	doTick: function(){
		// gamelogic
	},
	paintMe: function(ctx){
		var me = this;
		this.paintArray.forEach(function(actor){
			me.paintActor(ctx, actor);
		});
	},
	paintActor: function(ctx, actor) {
		ctx.drawImage(
			actor.image,
			actor.x,
			actor.y
			// actor.w,
			// actor.h
		);
	},
	onClick: function(ev) {
		// console.log("Gamescreen", ev);
		this.angstJump();
	},
	angstJump: function (){
		var me = this;
		KN.Scoreboard.increaseScore();
		if (!this.angst.jumpEv) {
			this.angst.jump = true;
			this.angst.y -= this.angst.jumpX
			this.angst.jumpEv = setTimeout(
				function () {
					me.angst.y += me.angst.jumpX;
					me.angst.jumpEv = false;
				}, 
				this.angst.jumpTime
			);
		}
	}
});