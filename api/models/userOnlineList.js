var Player, playerOnlineList, redis, redisClient;

redis = require('redis');

redisClient = redis.createClient();

redisClient.on('connect', function(err, data) {
  if (err) {
    return console.log(err);
  } else {
    return console.log('redis:connected');
  }
});

Player = (function() {
  function Player() {}

  Player.prototype.construct = function(sid) {
    this.sid = sid;
    return this.state = 'waiting';
  };

  Player.prototype.normal = function() {
    return this.state = 'online';
  };

  Player.prototype.wait = function() {
    return this.state = 'waiting';
  };

  Player.prototype.play = function() {
    return this.state = 'playing';
  };

  return Player;

})();

Player.PLAY_STATE = 'online';

Player.WAIT_STATE = 'waiting';

Player.PLAY_STATE = 'playing';

playerOnlineList = [];

module.exports = {
  addPlayer: function(sid) {
    var player;
    player = new Player(sid);
    return playerOnlineList.push(player);
  },
  getPlayer: function(sid) {
    var i, p, _i, _len;
    for (i = _i = 0, _len = playerOnlineList.length; _i < _len; i = ++_i) {
      p = playerOnlineList[i];
      if (p.sid === sid) {
        break;
      }
    }
    return p;
  },
  removePlayer: function(sid) {
    var i, p, _i, _len;
    for (i = _i = 0, _len = playerOnlineList.length; _i < _len; i = ++_i) {
      p = playerOnlineList[i];
      if (p.sid === sid) {
        break;
      }
    }
    if (i !== void 0) {
      return playerOnlineList.splice(i, 1);
    }
  }
};

//# sourceMappingURL=userOnlineList.js.map
