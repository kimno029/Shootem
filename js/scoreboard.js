KN.createModule("Scoreboard",{
	require:[
		"Engine"
	],
	START_SCORE: 0,
	currentScore: 0,
	pos: {
		x:150,
		y:150
	},
	font: '30px serif',
	textColor: '#f00',
	el: null,
	afterLoad: function(){
		console.log("scoreboard loaded");
		KN.Engine.addObject(this);
		this.el = document.getElementById('scoretext');
	},
	doTick: function(){
		// this.currentScore++;
	},
	paintMe: function(ctx){
		// ctx.fillStyle = this.textColor;
		// ctx.font = this.font;
		// ctx.fillText(
		// 	this.currentScore, 
		// 	this.pos.x,
		// 	this.pos.y
		// );
		this.el.innerHTML=this.currentScore;
	},
	increaseScore(increase){
		increase = increase | 1;
		this.currentScore += increase;	
	}
});