import * as chatRoomController from '../Controller/chatController'

const route=require('express').Router()


route.get('/get-chat',chatRoomController.getChat)




module.exports=route