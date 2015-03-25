playerWaitList = []

module.exports =
  len:->
    return playerWaitList.length

  add:(player)->
    if playerWaitList.indexOf(player) is -1
      playerWaitList.push(player)
    return @len()

  get:(player)->
    if playerWaitList.length
      return playerWaitList.shift()

  remove:(player)->
    for p,i in playerWaitList
      if player is p
        break;
    if i isnt undefined
      playerWaitList.splice(i,1)

  display:->
    return playerWaitList
