var Middleware = require('./middleware');

module.exports = function() {
    var middlewareObj = new Middleware();
    
    middlewareObj.middleware = function * (next) {
        if (this.request.req.method !== 'GET' && this.request.req.method !== 'OPTIONS' && this.request.accept.headers['content-type'] !== 'application/json') {
            this.throw(400, 'Unsupported content type!');
        } else {
            yield next;
        }
    };
    
    return middlewareObj;
};
