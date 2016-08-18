KN.createModule("Save", {
	requires:["Scoreboard"],
	saveKey: 'nekrokraft',
	save: function() {
		var sobj = {
			score: KN.Scoreboard.currentScore
		};
		this.saveToLocalStorate(sobj);
	},
	load: function() {
		var sobj = this.loadFromLocalStorage() || {};
		console.log(sobj);
		KN.Scoreboard.currentScore = sobj.score || 0;
	},
	clear: function () {
		this.clearLocalStorage();
	},
	saveToLocalStorate: function (sobj) {
		localStorage.setItem( this.saveKey, JSON.stringify(sobj) );
		
	},
	loadFromLocalStorage: function() {
		return JSON.parse( localStorage.getItem( this.saveKey ));
	},
	clearLocalStorage: function () {
		localStorage.removeItem(this.saveKey);
	}
});