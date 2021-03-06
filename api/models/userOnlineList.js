
/*
redis = require 'redis'
redisClient = redis.createClient()
redisClient.on 'connect',(err,data)->
  if err
    console.log err
  else
    console.log 'redis:connected'
 */
var Player, playerOnlineList;

Player = (function() {
  function Player(sid, uid) {
    this.sid = sid;
    this.uid = uid;
    this.state = 'online';
  }

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
  addPlayer: function(sid, uid) {
    var player;
    player = new Player(sid, uid);
    return playerOnlineList.push(player);
  },
  getPlayerBySid: function(sid) {
    var find, i, p, _i, _len;
    find = false;
    for (i = _i = 0, _len = playerOnlineList.length; _i < _len; i = ++_i) {
      p = playerOnlineList[i];
      if (p.sid === sid) {
        find = true;
        break;
      }
    }
    if (find) {
      find = p;
    }
    return find;
  },
  getPlayerByUid: function(uid) {
    var find, p, _i, _len;
    find = false;
    for (_i = 0, _len = playerOnlineList.length; _i < _len; _i++) {
      p = playerOnlineList[_i];
      if (p.uid === uid) {
        find = true;
        break;
      }
    }
    if (find) {
      find = p;
    }
    return find;
  },
  removePlayer: function(sid) {
    var find, i, p, _i, _len;
    find = false;
    for (i = _i = 0, _len = playerOnlineList.length; _i < _len; i = ++_i) {
      p = playerOnlineList[i];
      if (p.sid === sid) {
        find = true;
        break;
      }
    }
    if (find) {
      find = playerOnlineList.splice(i, 1);
      playerWaitList.remove(p);
    }
    return find;
  },
  showList: function() {
    return console.log(playerOnlineList);
  },
  display: function() {
    return playerOnlineList;
  }
};

//# sourceMappingURL=userOnlineList.js.map
