"use strict";
/**
 * overview: Koa Build
 * Created by vimplus on 2017/02/24.
 */

const koa = require('koa');
const app = koa();
const render = require('koa-static');


const port = process.env.PORT || 8080;



// 通常用于加载静态资源
app.use(render(__dirname + '/dist'))

app.listen(port, () => {
  console.log("server started on port " + port);
})
