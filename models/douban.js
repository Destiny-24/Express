// 引用 axios
const axios = require('axios');
const ISBN_API = 'https://api.douban.com/v2/book/isbn/';
const API_KEY = '0df993c66c0c636e29ecbb5344252a4a';

const douban = {
  isbn:function(isbn){
    return axios.get(ISBN_API + isbn +'?apikey=' + API_KEY);
  }
}

module.exports = douban;