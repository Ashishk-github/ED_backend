const Controller = require("./Controllers");
const SessionsService=require('../services/SessionsService')

module.exports=class SessionsController extends Controller{
    constructor(res){
        super(res)
        this.sessionsService=new SessionsService()
    }

    async submitQuestion(req){
        try {
            console.log(req.body)
            const sessionsServiceResponse=await this.sessionsService.submitQuestion(req.body)
            this.respond(sessionsServiceResponse)
        } catch (error) {
            console.log(error)
        }
    }
}