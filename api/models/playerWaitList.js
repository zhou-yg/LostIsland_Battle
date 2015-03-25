var playerWaitList;

playerWaitList = [];

module.exports = {
  len: function() {
    return playerWaitList.length;
  },
  add: function(player) {
    if (playerWaitList.indexOf(player) === -1) {
      playerWaitList.push(player);
    }
    return this.len();
  },
  get: function(player) {
    if (playerWaitList.length) {
      return playerWaitList.shift();
    }
  },
  remove: function(player) {
    var i, p, _i, _len;
    for (i = _i = 0, _len = playerWaitList.length; _i < _len; i = ++_i) {
      p = playerWaitList[i];
      if (player === p) {
        break;
      }
    }
    if (i !== void 0) {
      return playerWaitList.splice(i, 1);
    }
  },
  display: function() {
    return playerWaitList;
  }
};

//# sourceMappingURL=playerWaitList.js.map
