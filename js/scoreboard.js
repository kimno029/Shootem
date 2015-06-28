KN.createModule("Scoreboard",{
	require:[
		"Engine"
	],
	START_SCORE: 0,
	currentScore: 330,
	pos: {
		x:150,
		y:150
	},
	font: '30px serif',
	textColor: '#f00',
	afterLoad: function(){
		console.log("scoreboard loaded");
		KN.Engine.addObject(this);
	},
	doTick: function(){
		this.currentScore++;
	},
	paintMe: function(ctx){
		ctx.fillStyle = this.textColor;
		ctx.font = this.font;
		ctx.fillText(
			this.currentScore, 
			this.pos.x,
			this.pos.y
		);
	}
});