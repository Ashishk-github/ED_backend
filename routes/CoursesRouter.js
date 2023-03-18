const coursesRouter = require('express').Router()
const CoursesController = require('../controllers/CoursesController')


coursesRouter.get('/v1/courses/all',async(req,res)=>{
    const coursesControllerPromise=new CoursesController(res)
    coursesControllerPromise.getAll(req)
})


module.exports=coursesRouter;