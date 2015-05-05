#记录号
recordIndex = 0

battleMapList = []

windDotsMax = 3

turnMax = 5

class BattleMapOne
  constructor:(@p1,@p2)->
    @recordId = recordIndex++

    @recordPre = 'u'

    @p1.recordId = @p2.recordId = @recordId

    @windDotsMax = windDotsMax
    @p1WinDots = @p2WinDots = 0

    @chessRecordArr = []
    #0未插入，1插入中，0插入完成
    @chessRecordArr.state = 0


  checkUid:(uid)->
    return @p1.uid is uid or @p2.uid is uid

  checkResult:->
    battleResult = false

    chessRecordArr = @chessRecordArr
    latestRecordObj = chessRecordArr[chessRecordArr.length-1]

    p1ChessI = latestRecordObj[@recordPre+@p1.uid]
    p2ChessI = latestRecordObj[@recordPre+@p2.uid]

    fightResult = chessBattleCenter.fightByChessI(p1ChessI,p2ChessI)
    console.log 'battleResult:',battleResult
    if fightResult is -1
      @p2WinDots++
    else if fightResult is 1
      @p1WinDots++
    else if fightResult is 0
      @windDotsMax++
      @p1WinDots++
      @p2WinDots++

    console.log '------------------------'
    console.log 'windDotsMax:',windDotsMax
    console.log '@p1WinDots:',@p1WinDots
    console.log '@p2WinDots:',@p2WinDots
    if @p1WinDots is @windDotsMax
      battleResult = ['p1','p2']
    else if @p2WinDots is @windDotsMax
      battleResult = ['p2','p1']
    else if chessRecordArr.length is turnMax
      if @p1WinDots > @p2WinDots
        battleResult = ['p1','p2']
      else if @p1WinDots < @p2WinDots
        battleResult = ['p2','p1']
      else
        #平手
        battleResult = 'equal'


    return battleResult

  pushChess:(uid,chessI)->
    pushResult = false

    if @checkUid(uid)
      chessRecordArr = @chessRecordArr
      key = @recordPre+uid

      if chessRecordArr.state is 0

        recordObj = {}
        recordObj[key] = chessI

        chessRecordArr.push recordObj
        chessRecordArr.state = 1

      else if chessRecordArr.state is 1

        recordObj = chessRecordArr[chessRecordArr.length-1]

        if !recordObj[key]
          recordObj[key] = chessI
          chessRecordArr.state = 0

          #检测结果
          checkResult = @checkResult()
          console.log 'checkResult:',checkResult
          if checkResult
            recordObj.end = true
            if checkResult is 'equal'
              recordObj.win = false
            else
              console.log '@[checkResult[0]]:',@[checkResult[0]]

              recordObj.win = @[checkResult[0]].uid
              recordObj.lose = @[checkResult[1]].uid

          pushResult = recordObj

    return pushResult

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
    fightResult = false

    recordMap = @getRecordByUid(uid)
    #记录
    pushResult = recordMap.pushChess uid,chessI
    #.
    playersArr = recordMap.getPlayers(uid)

    console.log 'pushResult:',pushResult
    #分发
    if pushResult
      if pushResult.end
        sails.sockets.emit(playersArr[0].sid,'fightResult',{
          record:pushResult
        })
        sails.sockets.emit(playersArr[1].sid,'fightResult',{
          record:pushResult
        })
      else
        sails.sockets.emit(playersArr[0].sid,'fight',{
          record:pushResult
        })
        sails.sockets.emit(playersArr[1].sid,'fight',{
          record:pushResult
        })

      fightResult = true

    return fightResult

  #---------------------#
  getRecordByRid:(recordIndex)->
    find = false
    for recordMap,i in battleMapList
      if recordMap.recordId is recordIndex
        find = true
        break;

    if find
      find = battleMapList[i]
    return find

  getRecordByUid:(uid)->
    find = []
    for recordMap,i in battleMapList
      if recordMap.checkUid(uid)
        find.push(recordMap)

    if find.length>0
      find = find.pop()
    else
      find = false
    return find

  removeRecordByUid:(uid)->
    find = false
    for recordMap,i in battleMapList
      if recordMap.checkUid(uid)
        find = true
        break;

    if find
      find = battleMapList.splice(i,1)
    return find

  removeRecordByRid:(recordIndex)->
    find = false
    for recordMap,i in battleMapList
      if recordMap.recordId is recordIndex
        find = true
        break;

    if find
      find = battleMapList.splice(i,1)
    return find

  display:->
    return battleMapList

