var BattleMapOne, battleMapList, matchFn, recordIndex;

BattleMapOne = (function() {
  function BattleMapOne(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.recordId = recordIndex++;
    this.p1.recordId = this.p2.recordId = this.recordId;
    this.chessRecordArr = [];
    this.chessRecordArr.state = 0;
  }

  BattleMapOne.prototype.checkUid = function(uid) {
    return this.p1.uid === uid || this.p2.uid === uid;
  };

  BattleMapOne.prototype.pushChess = function(uid, chessI) {
    var chessRecordArr, key, recordObj;
    if (!this.checkUid(uid)) {
      return false;
    }
    chessRecordArr = this.chessRecordArr;
    key = 'u' + uid;
    if (chessRecordArr.state === 0) {
      recordObj = {};
      recordObj[key] = chessI;
      chessRecordArr.push(recordObj);
      chessRecordArr.state = 1;
    } else if (chessRecordArr.state === 1) {
      recordObj = chessRecordArr[chessRecordArr.length - 1];
      if (!recordObj[key]) {
        recordObj[key] = chessI;
        chessRecordArr.state = 0;
        return recordObj;
      }
    }
    return false;
  };

  BattleMapOne.prototype.getPlayers = function(uid) {
    if (this.p1.uid === uid) {
      return [this.p1, this.p2];
    } else if (this.p2.uid === uid) {
      return [this.p2, this.p1];
    }
    return false;
  };

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
        uid: rivalPlayer.uid
      });
      sails.sockets.emit(rivalPlayer.sid, 'match', {
        uid: uid
      });
      return rivalPlayer;
    } else {
      player.wait();
      return 'wait';
    }
  },
  fight: function(uid, chessI) {
    var playersArr, pushResult, recordMap;
    recordMap = this.getRecordByUid(uid);
    pushResult = recordMap.pushChess(uid, chessI);
    playersArr = recordMap.getPlayers(uid);
    console.log(pushResult);
    if (pushResult) {
      sails.sockets.emit(playersArr[0].sid, 'fight', {
        record: pushResult
      });
      sails.sockets.emit(playersArr[1].sid, 'fight', {
        record: pushResult
      });
      return true;
    } else {
      return false;
    }
  },
  getRecordByRid: function(recordIndex) {
    var i, recordMap, _i, _len;
    for (i = _i = 0, _len = battleMapList.length; _i < _len; i = ++_i) {
      recordMap = battleMapList[i];
      if (recordMap.recordId === recordIndex) {
        break;
      }
    }
    if (i !== void 0) {
      return battleMapList[i];
    }
    return false;
  },
  getRecordByUid: function(uid) {
    var i, recordMap, _i, _len;
    for (i = _i = 0, _len = battleMapList.length; _i < _len; i = ++_i) {
      recordMap = battleMapList[i];
      if (recordMap.checkUid(uid)) {
        break;
      }
    }
    if (i !== void 0) {
      return battleMapList[i];
    }
    return false;
  },
  removeRecordByUid: function(uid) {
    var i, recordMap, _i, _len;
    for (i = _i = 0, _len = battleMapList.length; _i < _len; i = ++_i) {
      recordMap = battleMapList[i];
      if (recordMap.checkUid(uid)) {
        break;
      }
    }
    if (i !== void 0) {
      return battleMapList.splice(i, 1);
    }
    return false;
  },
  removeRecordByRid: function(recordIndex) {
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
    return false;
  },
  display: function() {
    return battleMapList;
  }
};

//# sourceMappingURL=battleMapList.js.map
