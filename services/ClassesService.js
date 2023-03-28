const LessonsRepository=require('../repository/LessonsRepository')
const SessionsRepository=require('../repository/SessionsRepository')
const UserRepository=require('../repository/UserRepository')
const jwt=require('jsonwebtoken')


module.exports=class LessonsService{
    constructor(){
        this.lessonsRepository=new LessonsRepository()
        this.sessionsRepository=new SessionsRepository()
        this.userRepository=new UserRepository()
    }

    async getAll(args){
        try {
            const {userId,lessonId}=args
            const lesson = await this.lessonsRepository.findOne({_id:lessonId}).lean()
            if(!lesson) return ({error:"Invalid lessonId"})
            lesson.sessions=[]
            const sessions = await this.sessionsRepository.find({lessonId:lesson._id}).lean()
            const user = await this.userRepository.findOne({_id:userId}).lean()
            let status='completed'
            sessions.forEach(session=>{
                if(user.courses?.currentQuestion?.id === String(session._id)) status='inprogress'
                else if(status === 'inprogress') status = 'locked'
                lesson.sessions.push({...session,status})
            })
            return lesson
        } catch (error) {
            throw error
        }

    }

}