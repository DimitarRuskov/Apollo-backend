var fs = require('fs');
var path = require('path');
var Lazy = require('lazy.js');

module.exports = function(app) {
    var middlewares = [];
    
    function load() {
        try {
            var files = fs.readdirSync(__dirname);
             
            files.forEach(function(file) {
                if (file !== 'index.js' && file !== 'middleware.js') {
                    var requiredObj = require(path.join(__dirname, file))(app);
                    requiredObj.name = requiredObj.name || file.split('.')[0];
                    
                    middlewares.push(requiredObj);
                }
            });
            
            middlewares.forEach(function(middleware) {
                (middleware.load ? middleware.load() : undefined);
            });
        } catch (error) {
            throw error;
        }
    }
    
    function getMiddleware(name) {
        var middlewareRes = Lazy(middlewares).find({name: name});
        return (middlewareRes ? middlewareRes.middleware : undefined);
    }
    
    return {
        load: load,
        get: getMiddleware
    };
};
