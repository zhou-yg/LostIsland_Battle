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

  getPlayerBySid:(sid)->
    find = false
    for p,i in playerOnlineList
      if p.sid is sid
        find = true
        break
    if find
      find = p
    return find

  getPlayerByUid:(uid)->
    find = false
    for p in playerOnlineList
      if p.uid is uid
        find = true
        break

    if find
      find = p
    return find

  #下线，同时移除在线列表，和等待列表
  removePlayer:(sid)->
    find = false
    for p,i in playerOnlineList
      if p.sid is sid
        find = true
        break

    if find
      find = playerOnlineList.splice(i,1)
      playerWaitList.remove(p)
    return find

  showList:->
    console.log playerOnlineList

  display:->
    return playerOnlineList
