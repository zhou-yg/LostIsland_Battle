var BattleMapOne, battleMapList, matchFn, recordIndex;

BattleMapOne = (function() {
  function BattleMapOne(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.recordId = recordIndex++;
  }

  return BattleMapOne;

})();

matchFn = function(player) {
  var rivalPlayer;
  rivalPlayer = playerWaitList.get(player);
  if (rivalPlayer) {
    return rivalPlayer;
  } else {
    playerWaitList.add(player);
    return null;
  }
};

recordIndex = 0;

battleMapList = [];

module.exports = {
  match: function(uid) {
    var battleRecord, player, rivalPlayer;
    player = userOnlineList.getPlayerByUid(uid);
    if (player.state === player.constructor.WAIT_STATE) {
      return 'already wait';
    }
    rivalPlayer = matchFn(player);
    if (rivalPlayer) {
      player.play();
      rivalPlayer.play();
      battleRecord = new BattleMapOne(player, rivalPlayer);
      battleMapList.push(battleRecord);
      sails.sockets.emit(player.sid, 'match', {
        uid: userOnlineList.getPlayerByUid(uid).uid
      });
      sails.sockets.emit(rivalPlayer.sid, 'match', {
        uid: userOnlineList.getPlayerByUid(uid).uid
      });
      return rivalPlayer;
    } else {
      player.wait();
      return 'wait';
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
  },
  display: function() {
    return battleMapList;
  }
};

//# sourceMappingURL=battleMapList.js.map
