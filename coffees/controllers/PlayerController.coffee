module.exports =
  #socket
  add:(req,res)->
    sid = req.socket.id
    uid = req.param('uid')

    userOnlineList.addPlayer(sid,uid)

    res.json {
      'sid':sid
      'uid':uid
    }
  #http
  match:(req,res)->
    uid = req.parameter.uid
    rivalPlayer = battleMapList.match(uid)
    #匹配
    if rivalPlayer.sid
      sails.sockets.emit(rivalPlayer.sid,'match',{
        uid:userOnlineList.getPlayerByUid(uid).uid
      })

    returnData = {
      result:!!rivalPlayer
      data:if rivalPlayer.uid then { uid:rivalPlayer.uid } else rivalPlayer
    }

    res.json returnData
