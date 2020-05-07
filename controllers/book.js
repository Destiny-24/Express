const doubanModel = require('./../models/douban');

const book = {
  info:async function(req,res,next){
    const ISBN = req.query.isbn;
    const bookRequest = await doubanModel.isbn(ISBN);
    res.json({ code: 200, data: bookRequest.data });
  }
}

module.exports = book;