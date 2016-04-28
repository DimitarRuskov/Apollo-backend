var fs = require('fs');
var path = require('path');
var authentication = require('./../middlewares/authentication');

module.exports = function() {
    var routes = [];
    
    function loadRoutes(services) {
        var routesPath = getRoutes();

        routesPath.forEach(function(route) {
            var routeObj = require(route.requirePath)(services);
            routeObj.handler = [routeObj.handler];

            if (!routeObj.customPath) {
                routeObj.path = path.join(route.parentRoutePath, routeObj.path);
            }

            routeObj.path = routeObj.path.replace(/\\/g, '/');
            
            if (routeObj.auth) {
                routeObj.handler = [authentication].concat(routeObj.handler);
            }
            
            if (routeObj.validate && !routeObj.validate.type) {
                routeObj.validate.type = 'application/json';
            }
            
            route = routeObj;

            routes.push(route);
        });
    }

    function getRoutes(basePath, baseRoutePath) {
        basePath = basePath || __dirname;
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
                        if (route !== 'index.js') {
                            routes.push({
                                parentRoutePath: baseRoutePath,
                                requirePath: routePath
                            });
                        }
                    }
                });
            }
        } catch (error) {
            throw error;
        }
        return routes;
    }
    
    function get() {
        return routes;
    }
        
    return {
        load: loadRoutes,
        get: get
    };
};
