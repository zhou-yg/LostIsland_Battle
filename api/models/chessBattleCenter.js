var chessConfigObjList, chessImgPre,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

chessConfigObjList = {
  chess1: {
    name: "xiang",
    img: "chess/xiang.png",
    level: 10
  },
  chess2: {
    name: "ju",
    img: "chess/che.png",
    level: 20
  },
  chess3: {
    name: "bing",
    img: "chess/bing.png",
    level: 100
  },
  chess4: {
    name: "jiang",
    img: "chess/jiang.png",
    level: 1
  },
  chess5: {
    name: "pao",
    img: "chess/pao.png",
    level: 40
  },
  chess6: {
    name: "ma",
    img: "chess/ma.png",
    level: 30
  }
};

chessImgPre = "http://lostisland/Public/images/";

module.exports = {
  fightByChessI: function(chessI1, chessI2) {
    var battleResult, chessObj1, chessObj2, level1, level2, result, specialArr;
    battleResult = void 0;
    console.log('chessI1:', chessI1);
    console.log('chessI2:', chessI2);
    if (chessI1 && chessI2) {
      chessObj1 = chessConfigObjList[chessI1];
      chessObj2 = chessConfigObjList[chessI2];
      if (chessObj1 && chessObj2) {
        level1 = chessObj1.level;
        level2 = chessObj2.level;
        if (level1 === level2) {
          battleResult = 0;
        } else {
          specialArr = [1, 100];
          result = level1 < level2;
          if (__indexOf.call(specialArr, level1) >= 0 && __indexOf.call(specialArr, level2) >= 0) {
            battleResult = result ? -1 : 1;
          } else {
            battleResult = result ? 1 : -1;
          }
        }
      }
    }
    return battleResult;
  }
};

//# sourceMappingURL=chessBattleCenter.js.map
