module.exports =
  sendUid:(_req,_res)->
    uid = _req.param 'uid'


    _res.text 'nihao'
