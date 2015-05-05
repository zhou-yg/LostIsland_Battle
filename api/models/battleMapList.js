var BattleMapOne, battleMapList, matchFn, recordIndex, turnMax, windDotsMax;

recordIndex = 0;

battleMapList = [];

windDotsMax = 3;

turnMax = 5;

BattleMapOne = (function() {
  function BattleMapOne(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.recordId = recordIndex++;
    this.recordPre = 'u';
    this.p1.recordId = this.p2.recordId = this.recordId;
    this.windDotsMax = windDotsMax;
    this.p1WinDots = this.p2WinDots = 0;
    this.chessRecordArr = [];
    this.chessRecordArr.state = 0;
  }

  BattleMapOne.prototype.checkUid = function(uid) {
    return this.p1.uid === uid || this.p2.uid === uid;
  };

  BattleMapOne.prototype.checkResult = function() {
    var battleResult, chessRecordArr, fightResult, latestRecordObj, p1ChessI, p2ChessI;
    battleResult = false;
    chessRecordArr = this.chessRecordArr;
    latestRecordObj = chessRecordArr[chessRecordArr.length - 1];
    p1ChessI = latestRecordObj[this.recordPre + this.p1.uid];
    p2ChessI = latestRecordObj[this.recordPre + this.p2.uid];
    fightResult = chessBattleCenter.fightByChessI(p1ChessI, p2ChessI);
    console.log('battleResult:', battleResult);
    if (fightResult === -1) {
      this.p2WinDots++;
    } else if (fightResult === 1) {
      this.p1WinDots++;
    } else if (fightResult === 0) {
      this.windDotsMax++;
      this.p1WinDots++;
      this.p2WinDots++;
    }
    console.log('------------------------');
    console.log('windDotsMax:', windDotsMax);
    console.log('@p1WinDots:', this.p1WinDots);
    console.log('@p2WinDots:', this.p2WinDots);
    if (this.p1WinDots === this.windDotsMax) {
      battleResult = ['p1', 'p2'];
    } else if (this.p2WinDots === this.windDotsMax) {
      battleResult = ['p2', 'p1'];
    } else if (chessRecordArr.length === turnMax) {
      if (this.p1WinDots > this.p2WinDots) {
        battleResult = ['p1', 'p2'];
      } else if (this.p1WinDots < this.p2WinDots) {
        battleResult = ['p2', 'p1'];
      } else {
        battleResult = 'equal';
      }
    }
    return battleResult;
  };

  BattleMapOne.prototype.pushChess = function(uid, chessI) {
    var checkResult, chessRecordArr, key, pushResult, recordObj;
    pushResult = false;
    if (this.checkUid(uid)) {
      chessRecordArr = this.chessRecordArr;
      key = this.recordPre + uid;
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
          checkResult = this.checkResult();
          console.log('checkResult:', checkResult);
          if (checkResult) {
            recordObj.end = true;
            if (checkResult === 'equal') {
              recordObj.win = false;
            } else {
              console.log('@[checkResult[0]]:', this[checkResult[0]]);
              recordObj.win = this[checkResult[0]].uid;
              recordObj.lose = this[checkResult[1]].uid;
            }
          }
          pushResult = recordObj;
        }
      }
    }
    return pushResult;
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
    var fightResult, playersArr, pushResult, recordMap;
    fightResult = false;
    recordMap = this.getRecordByUid(uid);
    pushResult = recordMap.pushChess(uid, chessI);
    playersArr = recordMap.getPlayers(uid);
    console.log('pushResult:', pushResult);
    if (pushResult) {
      if (pushResult.end) {
        sails.sockets.emit(playersArr[0].sid, 'fightResult', {
          record: pushResult
        });
        sails.sockets.emit(playersArr[1].sid, 'fightResult', {
          record: pushResult
        });
      } else {
        sails.sockets.emit(playersArr[0].sid, 'fight', {
          record: pushResult
        });
        sails.sockets.emit(playersArr[1].sid, 'fight', {
          record: pushResult
        });
      }
      fightResult = true;
    }
    return fightResult;
  },
  getRecordByRid: function(recordIndex) {
    var find, i, recordMap, _i, _len;
    find = false;
    for (i = _i = 0, _len = battleMapList.length; _i < _len; i = ++_i) {
      recordMap = battleMapList[i];
      if (recordMap.recordId === recordIndex) {
        find = true;
        break;
      }
    }
    if (find) {
      find = battleMapList[i];
    }
    return find;
  },
  getRecordByUid: function(uid) {
    var find, i, recordMap, _i, _len;
    find = [];
    for (i = _i = 0, _len = battleMapList.length; _i < _len; i = ++_i) {
      recordMap = battleMapList[i];
      if (recordMap.checkUid(uid)) {
        find.push(recordMap);
      }
    }
    if (find.length > 0) {
      find = find.pop();
    } else {
      find = false;
    }
    return find;
  },
  removeRecordByUid: function(uid) {
    var find, i, recordMap, _i, _len;
    find = false;
    for (i = _i = 0, _len = battleMapList.length; _i < _len; i = ++_i) {
      recordMap = battleMapList[i];
      if (recordMap.checkUid(uid)) {
        find = true;
        break;
      }
    }
    if (find) {
      find = battleMapList.splice(i, 1);
    }
    return find;
  },
  removeRecordByRid: function(recordIndex) {
    var find, i, recordMap, _i, _len;
    find = false;
    for (i = _i = 0, _len = battleMapList.length; _i < _len; i = ++_i) {
      recordMap = battleMapList[i];
      if (recordMap.recordId === recordIndex) {
        find = true;
        break;
      }
    }
    if (find) {
      find = battleMapList.splice(i, 1);
    }
    return find;
  },
  display: function() {
    return battleMapList;
  }
};

//# sourceMappingURL=battleMapList.js.map
