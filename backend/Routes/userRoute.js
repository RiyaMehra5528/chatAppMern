const { createUser, login,getUserList } = require('../Controller/userController')

const route=require('express').Router()


route.post('/create-user',createUser)
route.post('/login',login)
route.get('/get-user-list',getUserList)


module.exports=route