var TopDownGame = TopDownGame || {};

TopDownGame.Boot = function () {};

TopDownGame.Boot.prototype = {
	preload: function() {
		this.load.image('preload', 'images/preload.png');
	},
	create: function() {
		this.game.stage.backgroundColor = '#000';
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.state.start('Preload');
	}
};