const executionRouter=require('express').Router()

executionRouter.get('/v1/scripts/run',(req,res)=>{
    console.log('in')
    res.json({message:'success'})
})

module.exports= executionRouter