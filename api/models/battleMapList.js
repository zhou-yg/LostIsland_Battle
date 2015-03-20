var BattleMapOne, battleMapList, matchFn, recordIndex;

BattleMapOne = (function() {
  function BattleMapOne() {}

  BattleMapOne.prototype.construct = function(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    return this.recordId = recordIndex++;
  };

  return BattleMapOne;

})();

matchFn = function(player) {
  var rivalPlayer;
  rivalPlayer = playerWaitList.get();
  if (rivalPlayer) {
    return rivalPlayer;
  } else {
    return playerWaitList.add(player);
  }
};

recordIndex = 0;

battleMapList = [];

module.exports = {
  match: function(sid) {
    var battleRecord, player, rivalPlayer;
    player = userOnlineList.getPlayer(sid);
    rivalPlayer = matchFn(player);
    if (rivalPlayer) {
      battleRecord = new BattleMapOne(player, rivalPlayer);
      return battleMapList.push(battleRecord);
    }
  },
  remove: function(recordIndex) {
    var i, recordMap, _i, _len;
    for (i = _i = 0, _len = battleMapList.length; _i < _len; i = ++_i) {
      recordMap = battleMapList[i];
      if (recordMap.recordId === recordIndex) {
        break;
      }
    }
    if (i !== void 0) {
      return battleMapList.splice(i, 1);
    }
  }
};

//# sourceMappingURL=battleMapList.js.map
