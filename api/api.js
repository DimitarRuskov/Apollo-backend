var router = require('koa-joi-router');

var services = require('./services')();
var routes = require('./routes')();

module.exports = function(app) {
    var api = {};
    var apiRoutes = [];
    var apiRouter = router();

    api.initialize = function() {
        services.load();
        routes.load(services);
        apiRoutes = routes.get();
        registerRoutes();
    };
    
    function registerRoutes() {
        apiRoutes.forEach(function(route) {
            apiRouter.route(route);
        });
        
        app.use(apiRouter.middleware());
    }
    
    api.initialize();
};
