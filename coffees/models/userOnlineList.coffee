redis = require 'redis'
redisClient = redis.createClient()
redisClient.on 'connect',(err,data)->
  if err
    console.log err
  else
    console.log 'redis:connected'

class Player
  construct:(@sid)->
    @state = 'waiting'

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

  addPlayer:(sid)->
    player = new Player(sid)
    playerOnlineList.push(player)

  getPlayer:(sid)->
    for p,i in playerOnlineList
      if p.sid is sid
        break
    return p

  removePlayer:(sid)->
    for p,i in playerOnlineList
      if p.sid is sid
        break

    if i isnt undefined
      return playerOnlineList.splice(i,1)

  showList:->
    console.log playerOnlineList
