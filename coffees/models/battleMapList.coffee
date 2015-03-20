
class BattleMapOne
  construct:(@p1,@p2)->
    @recordId = recordIndex++


matchFn = (player)->
  rivalPlayer = playerWaitList.get()
  if rivalPlayer
    return rivalPlayer
  else
    playerWaitList.add(player)

recordIndex = 0
battleMapList = []

module.exports =
  match:(sid)->
    player = userOnlineList.getPlayer(sid)

    rivalPlayer = matchFn(player)
    if rivalPlayer
      battleRecord = new BattleMapOne(player,rivalPlayer)
      battleMapList.push(battleRecord)

  remove:(recordIndex)->
    for recordMap,i in battleMapList
      if recordMap.recordId is recordIndex
        break;

    if i isnt undefined
      battleMapList.splice(i,1)



