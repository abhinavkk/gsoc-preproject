var TopDownGame = TopDownGame || {};

TopDownGame.Game = function() {};

TopDownGame.Game.prototype = {
	create: function() {
		this.map = this.game.add.tilemap('mazemap');
		this.map.addTilesetImage('tiles', 'gameTiles');
		this.blockedLayer = this.map.createLayer('blockedLayer');
		this.map.setCollisionBetween(1, 250, true, 'blockedLayer');
		this.blockedLayer.resizeWorld();
		this.createItems(); 

		var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer')
		this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
		this.game.physics.arcade.enable(this.player);
		this.player.body.collideWorldBounds = true;
		this.game.camera.follow(this.player);

		this.cursors = this.game.input.keyboard.createCursorKeys();
	},
	createItems: function() {
		this.items = this.game.add.group();
		this.items.enableBody = true;
		var item;
		result = this.findObjectsByType('item', this.map, 'objectsLayer');
		result.forEach(function(element){
			this.createFromTiledObject(element, this.items);
		}, this);
	},
	findObjectsByType: function(type, map, layer) {
		var result = new Array();
		map.objects[layer].forEach(function(element) {
			if(element.properties.type === type) {
				element.y -= map.tileHeight;
				result.push(element);
			}			
		});
		return result;
	},
	createFromTiledObject: function(element, group) {
		var sprite = group.create(element.x, element.y, element.properties.sprite);
		Object.keys(element.properties).forEach(function(key){
			sprite[key] = element.properties[key];
		});
	},
	update: function() {
		this.game.physics.arcade.collide(this.player, this.blockedLayer);
		this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);

		this.player.body.velocity.y = 0;
		this.player.body.velocity.x = 0;

		if(this.cursors.up.isDown) {
			this.player.body.velocity.y -= 150;
		}
		else if(this.cursors.down.isDown) {
			this.player.body.velocity.y += 150;
		}
		if(this.cursors.left.isDown) {
			this.player.body.velocity.x -= 150;
		}
		else if(this.cursors.right.isDown) {
			this.player.body.velocity.x += 150;
		}
	},
	collect: function(player, collectable) {
		collectable.destroy();
		setTimeout(function(){alert('You Win!')},500);
	},
	render: function() {

	}
};

