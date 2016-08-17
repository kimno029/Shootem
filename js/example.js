KN.createModule("Example",{
	afterLoad: function(){
		console.log("scoreboard loaded");
		KN.Engine.addObject(this); // add to engine, hooks to activate doTick, paintMe
	},
	doTick: function(){
		// gamelogic
	},
	paintMe: function(ctx){
		// Paint to canvas
	}
});