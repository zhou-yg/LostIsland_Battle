chessConfigObjList = {
  chess1: {name: "xiang", img: "chess/xiang.png", level: 10,},
  chess2: {name: "ju", img: "chess/che.png", level: 20,},
  chess3: {name: "bing", img: "chess/bing.png", level: 100,},
  chess4: {name: "jiang", img: "chess/jiang.png", level: 1,},
  chess5: {name: "pao", img: "chess/pao.png", level: 40,},
  chess6: {name: "ma", img: "chess/ma.png", level: 30,},
};
chessImgPre = "http://lostisland/Public/images/";

module.exports =
  #对战
  fightByChessI:(chessI1,chessI2)->
    # 0平手，-1负，1胜
    battleResult = undefined

    console.log 'chessI1:',chessI1
    console.log 'chessI2:',chessI2
    if chessI1 and chessI2
      chessObj1 = chessConfigObjList[chessI1]
      chessObj2 = chessConfigObjList[chessI2]

      if chessObj1 and chessObj2
        level1 = chessObj1.level
        level2 = chessObj2.level

        if level1 is level2
          battleResult = 0
        else
          specialArr = [1,100]
          result = level1 < level2

          if level1 in specialArr and level2 in specialArr
            battleResult =  if result then -1 else 1
          else
            battleResult =  if result then 1 else -1

    return battleResult
