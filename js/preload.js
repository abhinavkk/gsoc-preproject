 var TopDownGame = TopDownGame || {};

TopDownGame.Preload = function() {};

TopDownGame.Preload.prototype = {
	preload: function() {
		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preload');
		this.preloadBar.anchor.setTo(0.5);

		this.load.setPreloadSprite(this.preloadBar);

		this.load.tilemap('mazemap', 'tilemap/maze.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('gameTiles', 'images/tiles.png');
		this.load.image('player', 'images/player.png');
		this.load.image('diamond', 'images/diamond.png');	
	},
	create: function() {
		this.state.start('Game');
	}
};
