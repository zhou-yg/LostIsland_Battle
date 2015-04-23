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
    find = false
    for p,i in playerWaitList
      if player is p
        find = true
        break;
    if find
      find = playerWaitList.splice(i,1)
    return find

  display:->
    return playerWaitList
