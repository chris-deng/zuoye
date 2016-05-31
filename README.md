# 大作业说明

## 工程跑起来
__请先确保已经安装过nodeJS（包含npm一起），另外，建议把puer，mcss安装到全局吧，指不定以后哪里要用__

### 下载代码
    git clone ssh://git@g.hz.netease.com:22222/hzwangfei3/zuoye1.git
    cd zuoye1

### 初始化依赖
    npm i

#### 开启服务
    //开启puer
    npm run proxy
    //开启proxy之后对应链接如下：
    http://localhost:8080/

    //开启mcss监听,如果你的样式是用mcss写的话
    npm run mcss

    //puer-server和mcss-watch都开启
    npm run both


## 目录说明

### puer配置
    /puer
       │
       │---/config.js  puer配置项
       │
       │---/mock.json  mock配置项
       │
       │---/route.js   puer路由规则（目前已经写全，不需要更改）
       │
       └---/util.js    puer请求处理（数据load以及同步数据模板渲染等等，有些配置跟nei强相关，建议勿改）

### mock-config
    //mock的配置文件对应为./puer/mock,json
    {
        "port" : 8080,//启动端口
        "launch" : 1, //启动后是否自动打开浏览器
        "offline" : 1 //mock模式：0-nei数据；1-本地的json数据
    }
    offline字段说明：默认为1，即数据走本地/data之下的json文件，如果改成0，则会load nei接口平台上的数据

#### mock-data
    /data
       │
       │---/async(异步)
       │     │
       │     │---/get（处理get请求）
       │     │
       │     └---/post（处理get请求）
       │
       └---/page（同步）

     //备注：每个请求会对应两个文件，xxx.js xxx.json

### 关于接口
    1.接口命名统一了一下，全部采用驼峰是命名
    2.返还会的数据也作了统一，如果是异步的话，返回格式统一如下：
    {
        code:200,
        msg:"ok",
        data: *
    }
    //之前说明文档里头的数据，*.json里头直接数组或者数组，不大好

### mcss编译
    /mcss
       │
       │---/*.mcss（编译后会对应 ../css 路径之下的同名*.css文件）
       │
       └---/mcss.json（mcss的配置文件，已经配置好，根据自己需要更改）

**关于mcss，可以不用，这里不强制！！！**

### page-template-render-engine

    1.同步数据获取需要页面渲染引擎的帮助，如果不需要的话，可以直接在路由中以带文件后缀格式进行访问，如下：
    http://localhost:8080/blog       ->>采用渲染引擎
    http://localhost:8080/blog.html  ->>不采用渲染引擎

    如果不需要使用同步数据的话，可以直接不适用渲染引擎，这样blog.html里的vm语句将不会被解析成数据，会原封不动的输出

    2.关于页面模板引擎：
    这里没有使用freemarker，而采用了velocity模板
    且文件格式不光针对*.vm格式，如果在相应路径未找到*.vm,则会去找对应的*.html文件，并以velocity引擎去渲染

关于velocity的语法 [velocity语法](http://blog.csdn.net/zhangdaiscott/article/details/21002235)

**关于页面引擎，可以不用，这里不强制！！！**