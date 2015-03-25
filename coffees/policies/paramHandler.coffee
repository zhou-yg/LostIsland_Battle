module.exports = (req,res,next)->
  parameter = req.param('parameter')
  if parameter
    req.parameter = JSON.parse(parameter)

  next()
