
class BattleMapOne
  constructor:(@p1,@p2)->
    @recordId = recordIndex++


matchFn = (player)->
  rivalPlayer = playerWaitList.get(player)
  if rivalPlayer
    return rivalPlayer
  else
    playerWaitList.add(player)
    return null

recordIndex = 0
battleMapList = []

module.exports =
  #匹配
  match:(uid)->
    player = userOnlineList.getPlayerByUid(uid)
    if player.state is player.constructor.WAIT_STATE
      return 'already wait'

    rivalPlayer = matchFn(player)
    if rivalPlayer
      #改变playing状态
      player.play()
      rivalPlayer.play()

      battleRecord = new BattleMapOne(player,rivalPlayer)
      battleMapList.push(battleRecord)
      return rivalPlayer
    else
      player.wait()
      return 'wait'

  remove:(recordIndex)->
    for recordMap,i in battleMapList
      if recordMap.recordId is recordIndex
        break;

    if i isnt undefined
      battleMapList.splice(i,1)

  display:->
    return battleMapList

