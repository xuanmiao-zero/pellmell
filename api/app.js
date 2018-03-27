const request = require('request')

const express = require('express')
const app = express();

const Wallhaven = require('wallhaven-api')
const api = new Wallhaven()

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

app.get('', (req, res) =>{
   if(req.query.id) {
    let url = 'https://wallhaven-api.now.sh/details/' + req.query.id
    request({
      url: url,
      gzip:true
    },function (err,reponse,body){ //err 错误信息 reponse 响应头 body响应的数据
      res.send(body);
    })
  }else {
     let options = {
       categories: req.query.categories, //
       page: req.query.page,
       sorting: req.query.sorting,
       nsfw: req.query.nsfw,
       sketchy: req.query.sketchy,
     }
     api.search(req.query.keyword, options)
    .then(result => {      //result格式: { totalPages: 29, images: [] }
      res.send(result)
    })
  }
})

app.listen(3000)
console.log('请访问localhost:3000')

