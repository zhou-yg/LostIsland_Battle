module.exports =
  add:(req,res)->
    sid = req.socket.id

    console.log 's&u:',sid

    res.json {
      'sid':sid
    }
  match:(req,res)->
    sid = req.socket.id

    battleMapList.match(sid)

    res.json {
      result:true
      data:'waiting'
    }
