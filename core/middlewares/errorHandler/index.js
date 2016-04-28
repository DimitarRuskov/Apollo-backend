var fs = require('fs');
var path = require('path');
var buildError = require('./buildError');
var Middleware = require('./../middleware');

module.exports = function() {
    var errorHandlers = {};
    var middlewareObj = new Middleware();
    
    function loadErrorHandlers() {
        try {
            var files = fs.readdirSync(__dirname, 'errors');
            
            files.forEach(function(file) {
                if (file.indexOf('Error') > -1) {
                    errorHandlers[file.split('.')[0]] = require(path.join(__dirname, file));
                }
            });
        } catch (error) {
            throw error;
        }
    }
    
    middlewareObj.load = function() {
        loadErrorHandlers();
    };
    
    middlewareObj.middleware = function * (next) {
        try {
            yield next;
        } catch (err) {
            var errorResult = err;
            
            if (errorHandlers[errorResult.name]) {
                errorResult = errorHandlers[errorResult.name](errorResult);
            } else {
                errorResult.content = buildError(err.status || 500, errorResult.name || 'Internal Server Error', errorResult.message || '');
            }
            
            this.status = errorResult.content.code;
            this.body = errorResult.content;
        }
    };
    
    return middlewareObj;
};
