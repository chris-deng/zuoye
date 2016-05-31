var _ = require('./util.js');
module.exports = {
    //apis
    "GET /api/addBlog"               : _.req({id: 17298,   type: 'api',  path: 'get/api/addBlog'}),
    "GET /api/deleteBlog"            : _.req({id: 17302,   type: 'api',  path: 'get/api/deleteBlog'}),
    "GET /api/editBlog"              : _.req({id: 17301,   type: 'api',  path: 'get/api/editBlog'}),
    "GET /api/getBlogs"              : _.req({id: 17296,   type: 'api',  path: 'get/api/getBlogs'}),
    "GET /api/getFriendsLatestBlogs" : _.req({id: 17297,   type: 'api',  path: 'get/api/getFriendsLatestBlogs'}),
    "GET /api/topBlog"               : _.req({id: 17299,   type: 'api',  path: 'get/api/topBlog'}),
    "GET /api/untopBlog"             : _.req({id: 17300,   type: 'api',  path: 'get/api/untopBlog'}),
    //pages
    //视情况加上或去掉 根目录/ 路由
    "GET /"                          : _.req({name:'blog', type: 'tpl',  index: 1, list: [{"id":11209,"path":"blog"},{"id":11363,"path":"blog"}]}),
    "GET /index"                     : _.req({name:'blog', type: 'tpl',  index: 1, list: [{"id":11209,"path":"blog"},{"id":11363,"path":"blog"}]}),
    "GET /blog"                      : _.req({name:'blog', type: 'tpl',  index: 1, list: [{"id":11209,"path":"blog"},{"id":11363,"path":"blog"}]})
};
