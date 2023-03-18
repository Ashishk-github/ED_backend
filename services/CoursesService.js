const CoursesRepository=require('../repository/CoursesRepository')
const LessonsRepository=require('../repository/LessonsRepository')
const UserRepository=require('../repository/UserRepository')
const jwt=require('jsonwebtoken')
const mongoose  = require('mongoose')


module.exports=class CoursesService{
    constructor(){
        this.coursesRepository=new CoursesRepository()
        this.lessonsRepository=new LessonsRepository()
        this.userRepository=new UserRepository()
    }

    async getAll(args){
        try {
            let courses=await this.coursesRepository.find().lean()
            let lessons=await this.lessonsRepository.find().lean()
            let user=await this.userRepository.findOne({_id:args.userId})
            const result=[]
            let c={}
            console.log(courses)
            courses.forEach(course=>{
                c[String(course._id)]=[]
            })
            console.log(c)
            console.log(user?.courses?.previousQuestion)
            let status='completed'
            lessons.forEach(lesson=>{
                console.log("lesson-->",user?.courses?.currentQuestion?.lessonId,String(lesson._id))
                if(user?.courses?.currentQuestion?.lessonId===String(lesson._id)) status='inprogress'
                else if(status == 'inprogress') status='locked'
                console.log(String(lesson.courseId),c[String(lesson.courseId)])
                lesson= {...lesson,status}
                c[String(lesson.courseId)]?.push(lesson)
            })
            courses.forEach(course=>{
                // console.log(course,c[String(course._id)])
                course={...course,lessons:c[String(course._id)]}
                result.push(course)
            })
            return result
        } catch (error) {
            throw(error)
        }
    }
}