class BattleMapOne
  constructor:(@p1,@p2)->
    @recordId = recordIndex++
    @p1.recordId = @p2.recordId = @recordId

    @chessRecordArr = []
    #0未插入，1插入中，0插入完成
    @chessRecordArr.state = 0

  checkUid:(uid)->
    return @p1.uid is uid or @p2.uid is uid

  pushChess:(uid,chessI)->
    if !@checkUid(uid)
      return false

    chessRecordArr = @chessRecordArr
    key = 'u'+uid

    if chessRecordArr.state is 0
      chessRecordArr.push {
        key:chessI
      }
      chessRecordArr.state = 1
    else if chessRecordArr.state is 1
      record = chessRecordArr[chessRecordArr.length-1]
      if !record[key]
        record[key] = chessI
        chessRecordArr.state = 0
        return record

    return false

  getPlayers:(uid)->
    if @p1.uid is uid
      return [@p1,@p2]

    else if @p2.uid is uid
      return [@p2,@p1]

    return false

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

      #匹配，通知页面
      sails.sockets.emit(player.sid,'match',{
        uid:rivalPlayer.uid
      })
      sails.sockets.emit(rivalPlayer.sid,'match',{
        uid:uid
      })

      return rivalPlayer
    else
      player.wait()
      return 'wait'

  fight:(uid,chessI)->
    recordMap = @getRecordByUid(uid)
    #记录
    pushResult = recordMap.pushChess uid,chessI
    playersArr = recordMap.getPlayers(uid)

    #分发
    if pushResult
      sails.sockets.emit playersArr[0].sid,{
        record:pushResult
      }
      sails.sockets.emit playersArr[1].sid,{
        record:pushResult
      }
      return true
    else
      return false


  #---------------------#
  getRecordByRid:(recordIndex)->
    for recordMap,i in battleMapList
      if recordMap.recordId is recordIndex
        break;

    if i isnt undefined
      return battleMapList[i]
    return false

  getRecordByUid:(uid)->
    for recordMap,i in battleMapList
      if recordMap.checkUid(uid)
        break;

    if i isnt undefined
      return battleMapList[i]
    return false

  removeRecordByUid:(uid)->
    for recordMap,i in battleMapList
      if recordMap.checkUid(uid)
        break;

    if i isnt undefined
      return battleMapList.splice(i,1)
    return false

  removeRecordByRid:(recordIndex)->
    for recordMap,i in battleMapList
      if recordMap.recordId is recordIndex
        break;

    if i isnt undefined
      return battleMapList.splice(i,1)
    return false

  display:->
    return battleMapList

