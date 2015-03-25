module.exports = {
  add: function(req, res) {
    var sid, uid;
    sid = req.socket.id;
    uid = req.param('uid');
    userOnlineList.addPlayer(sid, uid);
    return res.json({
      'sid': sid,
      'uid': uid
    });
  },
  match: function(req, res) {
    var returnData, rivalPlayer, uid;
    uid = req.parameter.uid;
    rivalPlayer = battleMapList.match(uid);
    if (rivalPlayer.sid) {
      sails.sockets.emit(rivalPlayer.sid, 'match', {
        uid: userOnlineList.getPlayerByUid(uid).uid
      });
    }
    returnData = {
      result: !!rivalPlayer,
      data: rivalPlayer.uid ? {
        uid: rivalPlayer.uid
      } : rivalPlayer
    };
    return res.json(returnData);
  }
};

//# sourceMappingURL=PlayerController.js.map
