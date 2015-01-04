module.exports = {
  sendUid: function(_req, _res) {
    var uid;
    uid = _req.param('uid');
    console.log('uid=>' + uid);
    return _res.text('nihao');
  }
};

//# sourceMappingURL=UidInsertController.js.map
