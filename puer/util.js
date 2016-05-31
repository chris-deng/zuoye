var CONFIG = require('./config.js');
var FS = require('fs'),
    PATH = require('path');
var isFileExist = FS.existsSync || PATH.existsSync;
//转换成绝对路径
// CONFIG.mockApiDir = __dirname + "/" + CONFIG.mockApiDir;//异步
// CONFIG.mockTplDir = __dirname + "/" + CONFIG.mockTplDir;//同步

/**
 * get data from nei
 * type目前就用两种：模板页面请求用1，接口请求用3
 * @param type 参数使用类型，0：页面请求参数，1：模板预填参数，2：接口输入参数，3：接口输出参数，4：接口头信息
 * @param id
 * @param callback
 */
var get = function(type,id,callback){
    if (!CONFIG.mockUrl || !!CONFIG.offline){
        console.log("Mock-type:\t","Local(Offline)");
        callback(null);
        return;
    }
    console.log("Mock-type:\t","NEI(Online)");
    var uri = require('util').format(CONFIG.mockUrl, type, id),
        https = /^https:\/\//i.test(uri);
    console.log("Mock-uri:\t",uri);
    require(https?'https':'http').get(
        uri,function(res){
            var ret = [];
            res.on('data',function(chunk){
                ret.push(chunk.toString());
            });
            res.on('end',function(){
                var json = null;
                try{
                    json = JSON.parse(ret.join(''));
                    //console.log("Mock-json:",json);
                }catch(ex){
                    console.warn("Exception:",ex);
                }
                callback((json||{}).result);
            });
        }
    ).on('error',function(error){
            console.warn("Error:",error);
            callback(null);
        }
    );
};
// load data from local cache or nei server
var load = function(type,id,path,callback){
    var filter = null;
    try{
        var file = path+'.js';
        console.log("Mock-js:\t",file);
        filter = require(file);
        delete require.cache[
            require.resolve(file)
        ];
    }catch(ex){
        console.warn("Exception:",ex);
    }
    // filter is json object
    if (!!filter&&(typeof filter)!=='function'){
        callback(filter);
        return;
    }
    get(type,id,function(json){
        if (json==null){
            try{
                var file = path+'.json';
                console.log("Mock-data:\t",file);
                json = require(file);
                delete require.cache[
                    require.resolve(file)
                ];
            }catch(ex){
                console.warn("Exception:",ex);
            }
        }
        if (!!filter){
            json = filter(json);
        }
        callback(json);
    });
};

//这里的router处理，puer是基于express的，所以写法上可以参考下
exports.req = function(options){
    options = options || {};
    var ignoreFun = function(req,res,next){
        //ignore
    };
    var type = options.type,
        id,path;
    if("tpl"==type){
        //page
        var index = options.index || 0,
            list = options.list || [],
            po = list[index];
        if(!po){
            return ignoreFun;
        }else{
            id = po.id;
            path = po.path;
            return function(req,res,next){
                console.log("\r\nRequest for:\t",path);
                load(1, id, CONFIG.mockTplDir + path, function(json){
                    console.log("☆Response>> Load-Page:\t",path+"\t-> Completed!");
                    var tplFile;
                    tplFile = path + CONFIG.tplExt;
                    var fileExist1 = isFileExist(CONFIG.views + tplFile);
                    if(!fileExist1){
                        console.log("Warn: Can`t find the flie width *.vm and it will find *.html!");
                        tplFile = path + CONFIG.tplExtDefault;
                        var fileExist2 = isFileExist(CONFIG.views + tplFile);
                        if(fileExist2){
                            res.render(tplFile,json);
                            console.log("Rendered-Tpl:\t",tplFile);
                        }else{
                            console.error("Error: Can`t find the page template(Neither *.vm nor nor *.html file has existed), check it plz!!!");
                        }
                    }else{
                        res.render(tplFile,json);
                        console.log("Rendered-Tpl::\t",tplFile);
                    }
                });
            };
        }
    }else if("api"==type){
        //api
        id = options.id;
        path = options.path;
        return function(req,res,next){
            console.log("\r\nRequest for:\t",path);
            load(3, id, CONFIG.mockApiDir + path, function(json){
                console.log("★Response>> Load-Api:\t",path+"\t-> Completed!\r\n");
                res.send(json);
            });
        };
    }else{
        return ignoreFun;
    }

};