var Player, PlayerBox, name;

name = 'userReadyStack';

Player = (function() {
  function Player() {}

  return Player;

})();

PlayerBox = (function() {
  function PlayerBox(name) {
    this.name = name;
  }

  PlayerBox.prototype.add = function(_uid) {};

  return PlayerBox;

})();

module.exports = {
  getName: function() {
    return name;
  }
};

//# sourceMappingURL=userReadyStack.js.map
