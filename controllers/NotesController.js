const Controller = require("./Controllers");
const CoursesService=require('../services/CoursesService')

module.exports=class CoursesController extends Controller{
    constructor(res){
        super(res)
        this.coursesService=new CoursesService()
    }

    async getAll(req){
        try {
            console.log(req.query)
            const coursesServiceResponse=await this.coursesService.getAll(req.query)
            this.respond(coursesServiceResponse)
        } catch (error) {
            console.log(error)
            this.respond(error)
        }
    }

}