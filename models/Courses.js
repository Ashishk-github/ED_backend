const mongoose=require('mongoose')

const CoursesSchema=mongoose.Schema({
    name:String,
    description:String,
    time:String,
    // email:String,
    // mobile:String,
    // password:String
})

const Courses=mongoose.model('courses',CoursesSchema)

module.exports=Courses