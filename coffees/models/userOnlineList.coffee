###
redis = require 'redis'
redisClient = redis.createClient()
redisClient.on 'connect',(err,data)->
  if err
    console.log err
  else
    console.log 'redis:connected'
###
class Player
  constructor:(@sid,@uid)->
    @state = 'online'

  normal:->
    @state = 'online'
  wait:->
    @state = 'waiting'
  play:->
    @state = 'playing'

Player.PLAY_STATE = 'online'
Player.WAIT_STATE = 'waiting'
Player.PLAY_STATE = 'playing'

playerOnlineList = []

module.exports =

  addPlayer:(sid,uid)->
    player = new Player(sid,uid)
    playerOnlineList.push(player)

  getPlayer:(sid)->
    for p,i in playerOnlineList
      if p.sid is sid
        break
    return p

  getPlayerByUid:(uid)->
    getResult = false
    for p in playerOnlineList
      if p.uid is uid
        getResult = true
        break

    return if getResult then p else null

  #下线，同时移除在线列表，和等待列表
  removePlayer:(sid)->
    for p,i in playerOnlineList
      if p.sid is sid
        break

    if i isnt undefined
      playerOnlineList.splice(i,1)
      playerWaitList.remove(p)

  showList:->
    console.log playerOnlineList

  display:->
    return playerOnlineList
