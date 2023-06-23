class NewsController {
  index(req, res) {
    res.render('news');
  }
  show(req, res) {
    res.send('News detail');
  }
}
module.exports = new NewsController(); // xuất ra ngoài để sử dụng
