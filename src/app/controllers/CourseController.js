const Course = require('../models/Course');
class CourseController {
  // [GET] /search
  show(req, res) {
   Course.findOne({ slug: req.params.slug }).lean()
        .then((course) => {
            res.render('courses/show', { course });

            }
        )
  }
}

module.exports = new CourseController();
