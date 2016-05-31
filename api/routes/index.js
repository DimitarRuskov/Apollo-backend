var fs = require('fs');
var path = require('path');
var authentication = require('./../middlewares/authentication');

module.exports = function() {
    var routes = [];

    function loadRoutes(services) {
        var routesPath = getRoutes();

        routesPath.forEach(function(route) {
            var routeObj = require(route.requirePath)(services);
            if (route.requirePath.indexOf('index') >= 0) {
                loadIndexedRoute(routeObj, route).forEach(function(subRoute) {
                    routes.push(subRoute);
                });
            } else {
                route = prepareRoute(routeObj, route);
                routes.push(route);
            }
        });
    }

    function prepareRoute(route, routeDef) {
        var routeObj = route;

        routeObj.handler = [routeObj.handler];

        if (!routeObj.customPath) {
            routeObj.path = path.join(routeDef.parentRoutePath, routeObj.path);
        }
        
        if (routeObj.pathParams) {
            var pathParts = routeObj.path.split('\\');
            
            for (var pathParam in routeObj.pathParams) {
                if (routeObj.pathParams[pathParam]) {
                    for (var i = 0; i < pathParts.length; i++) {
                        if (pathParts[i] === pathParam) {
                            pathParts[i] = path.join(pathParts[i], ':' + routeObj.pathParams[pathParam]);
                        }
                    }
                }
            }
            
            routeObj.path = pathParts.join('\\');
        }

        routeObj.path = routeObj.path.replace(/\\/g, '/');

        if (routeObj.auth) {
            routeObj.handler = [authentication].concat(routeObj.handler);
        }

        if (routeObj.validate && !routeObj.validate.type) {
            routeObj.validate.type = 'application/json';
        }

        return routeObj;
    }

    function loadIndexedRoute(route, routeDef) {
        var result = [];

        route.subRoutes.forEach(function(route) {
            result.push(prepareRoute(route, routeDef));
        });

        return result;
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
                        if (routePath.indexOf('routes\\index.js') < 0) {
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
