const Controller = require("./Controllers");
const LessonsService=require('../services/LessonsService')

module.exports=class LessonsController extends Controller{
    constructor(res){
        super(res)
        this.lessonsService=new LessonsService()
    }

    async getAll(req){
        try {
            console.log(req.query)
            const lessonsServiceResponse=await this.lessonsService.getAll(req.query)
            this.respond(lessonsServiceResponse)
        } catch (error) {
            console.log(error)
        }
    }
}