const courses=require('../models/Courses')

module.exports= class CoursesRepository{
    find(args){
        return courses.find(args)
    }

    findOne(args){
        return courses.findOne(args)
    }

    create(args){
        return courses.insertMany(args)
    }
}