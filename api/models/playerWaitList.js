var playerWaitList;

playerWaitList = [];

module.exports = {
  len: function() {
    return playerWaitList.length;
  },
  add: function(player) {
    playerWaitList.push(player);
    return this.len();
  },
  get: function() {
    if (playerWaitList.length) {
      return playerWaitList.shift();
    }
  }
};

//# sourceMappingURL=playerWaitList.js.map
