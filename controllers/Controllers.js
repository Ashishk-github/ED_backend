
module.exports=class Controller{
    constructor(res){
        this.res=res
    }

    respond(args){
        this.res.json(args)
    }

    
}