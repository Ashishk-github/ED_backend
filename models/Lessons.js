const mongoose=require('mongoose')

const LessonsSchema=mongoose.Schema({
    courseId:mongoose.Schema.Types.ObjectId,
    name:String,
    description:String
})

const Lessons=mongoose.model('lessons',LessonsSchema)

module.exports=Lessons