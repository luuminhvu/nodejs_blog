const Course = require('../models/Course');
class MeController{
    //[GET] /me/store/courses
    storeCourses(req,res,next){
        Course.find({}).lean()
        .then((courses) => {
            res.render('me/store-courses', { courses });
        })
        .catch(next);
       
    }
}
module.exports = new MeController();