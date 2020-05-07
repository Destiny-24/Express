// 引用加密解密模块
const authCodeFunc = require('./../utils/authCode');
module.exports = function (req, res, next) {

  res.locals.isLogin = false;
  res.locals.userInfo = {};
  
  // 判断是否存在ac cookie
  let auth_Code = req.cookies.ac;
  console.log(auth_Code,1)
  if(auth_Code){
    // 如果有，对其进行解密
    auth_Code = authCodeFunc(auth_Code,'DECODE') + '';
    console.log(auth_Code,2)
    authArr = auth_Code.split("\t");
    console.log(authArr,3)
    let email = authArr[0];
    let password = authArr[1];
    let id = authArr[2];
    // 注意：为了防止删改
    // 这里其实应该再调用一次用户模型进行登录校验
    // 然后把状态保存在 session 中来联合判断。
    // 当前为了体验，所以直接把用户名和密码和id直接解密返回
    res.locals.isLogin = true;
    res.locals.userInfo = {
      email,password,id
    }
  }

  next();
}