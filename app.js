// 各个依赖包
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nujucks = require('nunjucks');
var favicon = require('serve-favicon');
var session = require('express-session');
var filters = require('./filters/index');

// 路由文件引用
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
// Express 引用实例化
var app = express();

// 视图模版设置
// 设置视图模版目录，设置视图模版后缀为 jade 文件
app.set('view engine', 'tpl');
nujucks.configure('views',{
  autoescape:true,
  express:app,
  watch:true
});

// Use the session middleware
app.use(session({
  secret: 'JaxChu',
  resave: true,
  saveUninitialized: true,
}))
// 使用 morgan 日志打印
app.use(logger('dev'));
// 使用对 Post 来的数据 json 格式化
app.use(express.json());
// 使用对 表单提交的数据 进行格式化
app.use(express.urlencoded({ extended: false }));
// 使用 cookie
app.use(cookieParser());
// 设置静态文件地址路径为 public
app.use(express.static(path.join(__dirname, 'public')));
// 设置favicon地址
app.use(favicon(path.join(__dirname,'public','favicon.ico')));

app.use(session({
  secret: 'JaxChu',
  resave: true,
  saveUninitialized: true,
}))

//过滤中间件需在cookie中间件引用之后，否则会出错。
filters(app);
app.use('/', indexRouter);
app.use('/api', apiRouter);

// 使用配置好的路由
// app.use('/', indexRouter);
// app.use('/api', apiRouter);

// 捕捉404错误
app.use(function(req, res, next) {
  next(createError(404));
});

// 监听异常如果有，立刻返回异常
app.use(function(err, req, res, next) {
  // 设置错误信息
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 渲染到模版
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;