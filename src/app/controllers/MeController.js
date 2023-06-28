const SortMiddleware = require('../middlewares/SortMiddleware');
const Course = require('../models/Course');
class MeController{
    //[GET] /me/store/courses
    storeCourses(req,res,next){
        let CourseFind = Course.find({}).lean();
        if(req.query.hasOwnProperty('_sort')){
           CourseFind = CourseFind.sort({
                [req.query.column]: req.query.type
            })
        }
        Promise.all([CourseFind,Course.countDocumentsWithDeleted({deleted:true})])
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