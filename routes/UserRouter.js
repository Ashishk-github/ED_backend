const userRouter = require('express').Router()
const jwt=require('jsonwebtoken')
const UserController = require('../controllers/UserController')


userRouter.post('/v1/user/login',async(req,res)=>{
    const userControllerPromise=new UserController(res)
    userControllerPromise.login(req)
})

userRouter.post('/v1/user/register',async(req,res)=>{
    const userControllerPromise=new UserController(res)
    userControllerPromise.register(req)
})

// userRouter.post('/v1/user/login',)

module.exports=userRouter;