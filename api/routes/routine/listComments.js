var Joi = require('koa-joi-router').Joi;

module.exports = function(services) {
    var route = {};

    route.path = 'listComments';
    route.method = 'get';
    
    route.handler = function * list(next) {
        var commentsData = yield services.get('comment').listComments(this.query);
        
        this.status = 200;
        this.body = {
            comments: commentsData.comments,
            commentCount: commentsData.count
        };
    };

    return route;
};
