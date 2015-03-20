playerWaitList = []

module.exports =
  len:->
    return playerWaitList.length

  add:(player)->
    playerWaitList.push(player)
    return @len()

  get:->
    if playerWaitList.length
      return playerWaitList.shift()
