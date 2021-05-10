const Router = require('koa-router');
const router = new Router();
const fs = require('fs');
const path = require('path');
const images = require('images');
// 老页面路由

router.post('/test', async (ctx) => {
    ctx.body = 'sss1'
});

router.post('/uploadfile', async ctx => {
    console.log('来了');
    const ctx_ = ctx;
    const file = ctx.request.files.file;
    // const dir = process.env.NODE_ENV === 'development'? 'upload': '/home/source/images';
    const dir = '/home/source/images';
    const filePath = dir + `/${new Date().getTime() + file.name}`;
    const getUrlPath = () => {
        return new Promise(r => {
            const source = fs.createReadStream(file.path); // 读取临时文件流
            const dest = fs.createWriteStream(filePath);
            source.pipe(dest);
            source.on('end', () => {
                fs.stat(filePath, (err, stat) => {
                    if(err){console.log(err); return;}
                    const fileDestName = `${new Date().getTime() + file.name}`
                    const newPath = dir + '/' + fileDestName;
                    images(filePath).save(newPath, { quality : 50 });
                    fs.unlink(filePath, (err) => {
                        if(err){								
                            console.log('原图删除失败');
                            return;
                        }
                        console.log('原图删除成功', filePath);
                    })
                    r(fileDestName)
                });
            });
            source.on('error', (err) => {
                r(err);
            });
        })
    }

    ctx_.body = {
        code: 0,
        success: true,
        data: {
            url: await getUrlPath()
        },
        msg: 'success'
    };
});

module.exports = router;
