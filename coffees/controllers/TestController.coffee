module.exports =
  test:(_req,_res)->
    uid = _req.param 'uid'

    _res.json {
      res:'test'
    }
  display:(req,res)->
    console.log userOnlineList.display()
    console.log playerWaitList.display()
    console.log battleMapList.display()

    res.json {
      a:userOnlineList.display()
      b:playerWaitList.display()
      c:battleMapList.display()
    }
