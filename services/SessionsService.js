const SessionsRepository=require('../repository/SessionsRepository')
const UserRepository=require('../repository/UserRepository')
const jwt=require('jsonwebtoken')


module.exports=class SessionsService{
    constructor(){
        this.sessionsRepository=new SessionsRepository()
        this.userRepository=new UserRepository()
    }

    async submitQuestion(args){
        try {
            const {userId , answer} = args
            const user =await this.userRepository.findOne({_id:userId}).lean()
            const sessionId = user?.courses?.currentQuestion?.id
            const session=await this.sessionsRepository.find().lean()
            const index=session.findIndex(s=>String(s._id)===sessionId)
            let currentQuestion=session[index+1]
            console.log(index,session,sessionId)
            const previousQuestion={...user?.courses?.currentQuestion,endedAt:new Date(),answer}
            if(currentQuestion) currentQuestion={id:String(currentQuestion._id),lessonId:String(currentQuestion.lessonId),startedAt:new Date()}
            else currentQuestion={}
            const users=await this.userRepository.updateOne({_id:userId},{ 
                $set: { "courses.currentQuestion": currentQuestion },
                $push: { "courses.previousQuestion": previousQuestion }
             })
            return {message:"submited successfully"}
        } catch (error) {
            throw error
        }
    }

}