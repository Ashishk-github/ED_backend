const sessionsRouter = require('express').Router()
const jwt=require('jsonwebtoken')
const SessionsController = require('../controllers/SessionsController')


sessionsRouter.post('/v1/sessions/submitQuestion',async(req,res)=>{
    const sessionsControllerPromise=new SessionsController(res)
    sessionsControllerPromise.submitQuestion(req)
})

// sessionsRouter.post('/v1/sessions/login',)

module.exports=sessionsRouter;