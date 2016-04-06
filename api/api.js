var fs = require('fs');
var path = require('path');
var router = require('koa-joi-router');

module.exports = function(app, passport) {
    var api = {};
    var routes = [];
    var services = {};
    
    var apiRouter = router();
    
    api.initialize = function() {
        loadServices();
        loadRoutes();
        registerRoutes();
    };
        
    function * authenthication(next) {
        if (this.isAuthenticated()) {
            yield next;
        } else {
            this.status = 401;
        }
    }
    
    function registerRoutes() {
        routes.forEach(function(route) {
            apiRouter.route(route);
        });
        
        app.use(apiRouter.middleware());
    }
        
    function loadRoutes() {
        var routesPath = getRoutes();
        
        routesPath.forEach(function(route) {
            var routeObj = require(route.requirePath)(services);
            routeObj.handler = [routeObj.handler];
            
            if (!routeObj.customPath) {
                routeObj.path = path.join(route.parentRoutePath, routeObj.path);
            }
            
            routeObj.path = routeObj.path.replace(/\\/g, '/');
            
            if (routeObj.auth) {
                routeObj.handler = routeObj.handler.concat([authenthication]); 
            }
                
            route = routeObj;
            
            routes.push(route);
        });
    }
    
    function getRoutes(basePath, baseRoutePath) {
        basePath = basePath || path.join(__dirname, 'routes');
        baseRoutePath = baseRoutePath || '/';
        var routes = [];
                
        try {
            var routeNames = fs.readdirSync(basePath);
        
            if (Array.isArray(routeNames)) {
                routeNames.forEach(function(route) {
                    var routePath = path.join(basePath, route);
                    if (fs.statSync(routePath).isDirectory()) {
                        var subRoutes = getRoutes(routePath, path.join(baseRoutePath, route));
                        
                        subRoutes.forEach(function(subRoute) {
                            routes.push(subRoute);
                        });
                    } else {
                        routes.push({
                            parentRoutePath: baseRoutePath,
                            requirePath: routePath
                        });
                    }
                });
            }
        } catch (error) {
            throw error;
        }
        
        return routes;
    }
    
    function loadServices() {
        var servicesPath = path.join(__dirname, 'services');
        
        try {
            var servicesNames = fs.readdirSync(servicesPath);
            
            servicesNames.forEach(function(service) {
                services[service.split('.')[0]] = require(path.join(servicesPath, service));
            });
        } catch (error) {
            throw error;
        }
    }
    
    api.initialize();
};
