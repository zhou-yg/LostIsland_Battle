module.exports = {
  add: function(req, res) {
    var sid;
    sid = req.socket.id;
    console.log('s&u:', sid);
    return res.json({
      'sid': sid
    });
  },
  match: function(req, res) {
    var sid;
    sid = req.socket.id;
    battleMapList.match(sid);
    return res.json({
      result: true,
      data: 'waiting'
    });
  }
};

//# sourceMappingURL=PlayerController.js.map
