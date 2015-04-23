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
    var find, i, p, _i, _len;
    find = false;
    for (i = _i = 0, _len = playerWaitList.length; _i < _len; i = ++_i) {
      p = playerWaitList[i];
      if (player === p) {
        find = true;
        break;
      }
    }
    if (find) {
      find = playerWaitList.splice(i, 1);
    }
    return find;
  },
  display: function() {
    return playerWaitList;
  }
};

//# sourceMappingURL=playerWaitList.js.map
