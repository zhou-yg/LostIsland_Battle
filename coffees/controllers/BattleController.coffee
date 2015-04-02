module.exports =
  #http
  fight:(req,res)->
    uid = req.parameter.uid
    chessI = req.parameter.chessI

    fightResult = battleMapList.fight uid,chessI

    res.json {
      result:false
      data:'waiting'
    }
