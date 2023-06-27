const Course = require('../models/Course');
class MeController{
    //[GET] /me/store/courses
    storeCourses(req,res,next){
        Promise.all([Course.find({}).lean(),Course.countDocumentsWithDeleted({deleted:true})])
        .then(([courses,deletedCount]) => {
            res.render('me/store-courses', { courses,deletedCount });
        })
        .catch(next);
    }
    //[GET] /me/trash/courses
    trashCourses(req,res,next){
       Course.findWithDeleted({deleted:true}).lean()
        .then((courses) => {
            res.render('me/trash-courses', { courses });
        }
        )
        .catch(next);

    }
    
}
module.exports = new MeController();