var vmRender = require('express-velocity'),
    mockConfig = require("./mock.json"),
    v = "../";
var eg = {
    "html":vmRender({root: [v]})
};
//默认用vm解析html文件
//eg.html = vmRender({root: [views]});
module.exports = {
    "port" : mockConfig.port,
    "dir" : v,
    "inspect" : false,
    "reload" : mockConfig.reload,
    "launch" : mockConfig.launch,
    "rules" : "./route.js",
    "offline" : mockConfig.offline,
    "mockApiDir" : "../data/async/",
    "mockTplDir" : "../data/page/",
    "mockUrl" : "http://nei.hz.netease.com/api/parameter/getTestData?type=%s&id=%s",
    "engine" :  eg,
    "views" : v,
    "tplExt" : ".vm",
    "tplExtDefault" : ".html"
};