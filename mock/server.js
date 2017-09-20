const URL = require('url');
const http = require('http');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const serverName = require('./localData.json').List;
const MOCK_API_URL = /\/los\//;
const MOCK_IMAGE_URL = /images\/home_/;
const MOCK_DATA_URL = /\/mock\/data/;
const LOS_DEV_SERVER = 'http://10.50.133.243:50002';
const LOS_TEST_SERVER = 'http://10.60.133.31:54018';
const LOS_UAT_SERVER = 'http://10.60.133.47:54018';
let SERVER = LOS_DEV_SERVER;

// mock服务
const server = {
    postMock: function(req, res, next) {
        if (MOCK_DATA_URL.test(req.url)) {
            req.method = 'GET';
        }
        next();
    },

    api: function(req, res, next) {
        if (!MOCK_API_URL.test(req.url)) {
            next();
            return;
        }

        let url = SERVER + req.url.substring(req.url.indexOf('/los/'));
        let urlObj = URL.parse(url);
        let apiReqOpts = {
            hostname: urlObj.hostname,
            port: urlObj.port,
            path: urlObj.path,
            method: 'POST',
            headers: {
                'host': urlObj.hostname
            }
        };

        for (var a in serverName) {
            if (urlObj.pathname.indexOf(serverName[a]) > 0) {
                const mockFile = 'mock/data/' + path.basename(urlObj.pathname) + '.json';
                if (fs.existsSync(mockFile)) {
                    console.log('------------------------------------------------');
                    console.log(url, '管道数据强制转模拟数据');

                    const state = fs.statSync(mockFile);
                    res.writeHead(200, {
                        'Content-Type': 'text/html;charset=UTF-8',
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Pragma': 'no-cache',
                        'Expires': '0',
                        'Content-Length': state.size
                    });
                    fs.createReadStream(mockFile).pipe(res);
                    return ;
                }
            }
        }

        for(let p in req.headers){
            if(p === 'Origin' || p === 'Referer'){
                continue;
            }
            apiReqOpts.headers[p] = req.headers[p];
        }

        // 创建API服务请求对象
        let apiReq = http.request(apiReqOpts, function(apiRes) {
            if (apiRes.statusCode !== 200) {
                const mockFile = 'mock/data/' + path.basename(urlObj.pathname) + '.json';

                // mock
                if (fs.existsSync(mockFile)) {
                    console.log('------------------------------------------------');
                    console.log(url, '[', apiRes.statusCode, ']-->', '模拟数据回传');
                    const state = fs.statSync(mockFile);
                    res.writeHead(200, {
                        'Content-Type': 'text/html;charset=UTF-8',
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Pragma': 'no-cache',
                        'Expires': '0',
                        'Content-Length': state.size
                    });
                    fs.createReadStream(mockFile).pipe(res);
                    return;
                }
            }
            // header管道
            let headers = {};
            for (var header in apiRes.headers) {
                headers[header] = apiRes.headers[header];
            }
            console.log('------------------------------------------------');
            console.log(url, '[', apiRes.statusCode, ']管道数据');
            res.writeHead(apiRes.statusCode, headers);
            apiRes.pipe(res);
        });

        // 错误回调
        apiReq.on('error', function(e) {
            res.writeHead(500);
            res.write(e.toString());
            res.end();
            console.log('Mock失败', e);
        });

        req.pipe(apiReq);
    },

    img : function(req, res, next){
        if (!MOCK_IMAGE_URL.test(req.url)) {
            next();
            return;
        }


        let url = LOS_UAT_SERVER + req.url.substring(req.url.indexOf('/images/'));
        let urlObj = URL.parse(url);
        let apiReqOpts = {
            hostname: urlObj.hostname,
            port: urlObj.port,
            path: urlObj.path,
            method: 'GET',
            headers : req.headers
        };

        // 创建API服务请求对象
        let apiReq = http.request(apiReqOpts, function(apiRes) {
            console.log(url, '[', apiRes.statusCode, ']管道数据');
            res.writeHead(apiRes.statusCode, apiRes.headers);
            apiRes.pipe(res);
        });

        // 错误回调
        apiReq.on('error', function(e) {
            res.writeHead(500);
            res.write(e.toString());
            res.end();
            console.log('Mock失败', e);
        });

        req.pipe(apiReq);
    }
};

module.exports = {
    middlewares: function(service) {
        switch (service) {
            case 'dev':
                SERVER = LOS_DEV_SERVER;
                break;
            case 'test':
                SERVER = LOS_TEST_SERVER;
                break;
            case 'uat':
                SERVER = LOS_UAT_SERVER;
                break;
            default:

        }
        return [server.api, server.postMock];
    }
};
