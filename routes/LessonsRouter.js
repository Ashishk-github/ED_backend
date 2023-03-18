const lessonsRouter = require('express').Router()
const jwt=require('jsonwebtoken')
const LessonsController = require('../controllers/LessonsController')


lessonsRouter.get('/v1/lessons/get',async(req,res)=>{
    const lessonsControllerPromise=new LessonsController(res)
    lessonsControllerPromise.getAll(req)
})


module.exports=lessonsRouter;