module.exports = {
  fight: function(req, res) {
    var chessI, fightResult, uid;
    uid = req.parameter.uid;
    chessI = req.parameter.chessI;
    fightResult = battleMapList.fight(uid, chessI);
    return res.json({
      result: false,
      data: 'waiting'
    });
  }
};

//# sourceMappingURL=BattleController.js.map
