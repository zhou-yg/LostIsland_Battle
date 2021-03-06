module.exports =
  #http
  add:(req,res)->
    sid = req.socket.id
    uid = req.param('uid')

    userOnlineList.addPlayer(sid,uid)

    res.json {
      'sid':sid
      'uid':uid
    }
  #socket
  match:(req,res)->
    uid = req.parameter.uid
    rivalPlayer = battleMapList.match(uid)

    returnData = {
      result:!!rivalPlayer.uid
    }

    res.json returnData
