/**
 * overview: Koa App.js
 * Created by vimplus on 2017/02/25.
 */
import Koa from 'koa';
import xtpl from 'koa-xtpl';
import path from 'path';
import Router from 'koa-router';

const app = new Koa();
const router = new Router();

const port = process.env.PORT || 8081;

app.use(xtpl({
	root: path.resolve(__dirname, '../dist'),
	extname: 'html',
	commands: {}
}));

app.use(async(ctx, next) => {
	if (ctx.path.startsWith('/test')) {
		await next();
	} else {
		await ctx.render('index', {});
	}
});

app.use(async(ctx, next) => {
	ctx.response.body = 'index';
});



app.use(router.routes());

router.get('/getList', async(ctx, next) => {
	ctx.response.body = {
		code: 10000,
		msg: 'ok'
	};
});




app.listen(port, () => {
	console.log('Server started on port ' + port);
});
