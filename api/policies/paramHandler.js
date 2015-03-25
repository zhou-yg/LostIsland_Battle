module.exports = function(req, res, next) {
  var parameter;
  parameter = req.param('parameter');
  if (parameter) {
    req.parameter = JSON.parse(parameter);
  }
  return next();
};

//# sourceMappingURL=paramHandler.js.map
