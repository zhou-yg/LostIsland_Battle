module.exports = {
  test: function(_req, _res) {
    var uid;
    uid = _req.param('uid');
    return _res.json({
      res: 'test'
    });
  },
  display: function(req, res) {
    console.log(userOnlineList.display());
    console.log(playerWaitList.display());
    console.log(battleMapList.display());
    return res.json({
      a: userOnlineList.display(),
      b: playerWaitList.display(),
      c: battleMapList.display()
    });
  }
};

//# sourceMappingURL=TestController.js.map
