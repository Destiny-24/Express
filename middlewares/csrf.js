// 使用 Nodejs 中的加密模块
const crypto = require('crypto');

const CSRF = {
  // 生成随机数
  generateRandom:function(len){
    return crypto.randomBytes(Math.ceil(len*3/4)).toString('base64').slice(0,len);
  },
  // 设置token
  getToken:function(req,res,next){
    // 获取当前 session 的 csrf_token。
    var token = req.session._csrf;
    // 获取请求过来的 csrf 参数的 token
    var _csrf = req.query.csrf ? req.query.csrf : (req.query.csrf = req.body.csrf);
    // 将两个 token 进行比较
    // 如果不相等，鉴权失败，禁止下一步。
    // 相等就可以下一步走接下来的业务逻辑操作。
    if(_csrf !== token){
      res.writeHead(403);
      res.end("禁止访问");
    }else{
      next()
    }
  },
  setToken:function(req,res,next){
    console.log(12123123131233)
    // 获取当前 session 是否有 csrf_token
    // 如果是没有关闭浏览器多次刷新的话，就有，使用原来的
    // 如果是新打开浏览器第一次请求的页面，没有就新建一个
    var token = req.session._csrf || (req.session._csrf = CSRF.generateRandom(24));
    // 把token设置在本地数据中，页面获取本地数据渲染到页面
    res.locals.csrf = token;
    next();
  }
}

module.exports = CSRF;