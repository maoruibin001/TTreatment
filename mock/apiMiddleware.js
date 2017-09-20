/**
 * Created by lenovo on 2017/9/20.
 */
const URL = require('url');
const http = require('http');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const serverName = require('./localData.json').List;
const LOS_DEV_SERVER = 'http://localhost:8090';
let SERVER = LOS_DEV_SERVER;

const apiMiddleware = function(req, res, next) {
  if (req.url.indexOf('/mock/') === -1) {
    next();
    return;
  }
  let url = SERVER + req.url.substring(req.url.indexOf('/mock/'));
  let urlObj = URL.parse(url);

  const mockFile = 'mock/data/' + path.basename(urlObj.pathname) + '.json';
  console.log(mockFile)
  console.log(fs.existsSync(mockFile))
  if (fs.existsSync(mockFile)) {
    console.log('------------------------------------------------');
    console.log(url,  '-->', '模拟数据回传');
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
  next();
}

module.exports = apiMiddleware;
