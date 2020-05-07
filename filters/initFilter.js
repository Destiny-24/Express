module.exports = function (req, res, next) {
  res.locals.seo = {
    title: 'ExpressApp',
    keywords: 'Express、Nodejs',
    description: 'ExpressApp to study Nodejs on Web'
  }

  next();
}