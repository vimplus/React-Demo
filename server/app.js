/**
 * overview: Koa App.js
 * Created by vimplus on 2017/02/25.
 */
import Koa from 'koa';
import xtpl from 'koa-xtpl';
import path from 'path';
import Router from 'koa-router';
import request from 'request';
import queryString from 'querystring';
import fetch from 'node-fetch';

const app = new Koa();
const router = new Router();

const port = process.env.PORT || 8081;

app.use(xtpl({
	root: path.resolve(__dirname, '../dist'),
	extname: 'html',
	commands: {}
}));

app.use(router.routes());

router.get('/getList', async(ctx, next) => {
	ctx.response.body = {
		code: 10000,
		msg: 'success'
	};
});

router.get('/api/v1.0/dict/query', async(ctx, next) => {
	var query = ctx.request.query;
	var params = queryString.stringify({
		keyfrom: 'ThinkDict',
		key: '1310088104',
		type: 'data',
		doctype: 'json',
		version: '1.1',
		q: query.word
	})
	var url = 'http://fanyi.youdao.com/openapi.do?'
	var res = await request(url + params, function (err, res, body) {
		console.error(err)
		return body;
	});
	ctx.response.body = res;
});

app.use(async(ctx, next) => {
	if (ctx.path.startsWith('/test')) {
		await next();
	} else {
		await ctx.render('index', {});
	}
});

app.use(async(ctx, next) => {
	ctx.response.body = 'Test here';
});


app.listen(port, () => {
	console.log('Server started on port ' + port);
});
