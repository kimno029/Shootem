// USE ctx.drawImage(KN.Assets.Player,
// Formats as references to images by loading img elements to homepage
KN.createModule("Assets", {
	// Replaces all objects with Image() objects, 
	// retains src as was initialized
	afterLoad: function () {
		for(var k in this ) {
			if (typeof this[k] === "object" && this.hasOwnProperty(k) ) {
				var src = this[k].src;
				this[k] = new Image();
				this[k].src = src;
			}
		}
	},
	backdrop:{
		src:'img/backdrop.png'
	},
	background:{
		src:'img/background_2.png'
	},
	player:{
		src:'img/angst.png'
	},
	stage:{
		src:'img/stage.png'
	}
});
