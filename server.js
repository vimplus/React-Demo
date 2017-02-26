"use strict";
/**
 * overview: Koa Build
 * Created by vimplus on 2017/02/24.
 */

const koa = require('koa');
const app = new koa();
const path = require('path');
const render = require('koa-static');
const Router = require('koa-router');
const router = new Router();


const port = process.env.PORT || 8081;



// 通常用于加载静态资源
app.use(render(__dirname + '/dist'))

app.use(router.routes());

router.get('*', function (ctx, next) {
    ctx.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    //res.sendFile('index.html')
})

app.use(function*() {
    this.body = 'abc';
});

app.listen(port, () => {
    console.log("Server started on port " + port);
})
