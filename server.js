const Koa = require('koa');
const koaStatic = require('koa-static');
const path = require('path');
const koaBody = require('koa-body');
const router = require('./router');
const cors = require('koa-cors');

const app = new Koa();

app.use(cors());
app.use(koaStatic(path.resolve('./build/')));

app.use(async (ctx, next) => {
    ctx.set('Cache-Control', 'no-cache');
    await next();
});

app.use(koaBody({
    multipart: true
}));

app.use(router.routes());
app.listen(7001, ()=>{
    process.env.NODE_ENV = 'development'
    console.log('接口已启动2')
});
