const user=require('../models/Users')

module.exports= class UserRepository{
    find(args){
        return user.find(args)
    }

    findOne(args){
        return user.findOne(args)
    }

    create(args){
        return user.insertMany(args)
    }

    updateMany(cond,args){
        return user.updateMany(cond,args)
    }

    updateOne(cond,args){
        return user.updateOne(cond,args)
    }
}