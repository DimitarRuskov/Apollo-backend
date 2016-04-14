var fs = require('fs');
var path = require('path');
var koa = require('koa');
var mongoose = require('mongoose');

var config = require('../config/config');
var errorHandlers = require('./errorHandlers/index')();
var buildError = require('./errorHandlers/buildError');

module.exports = (function() {
    var server = {};
    var app;

    server.start = function() {
        initialize();

        require('../config/koa')(app, config);

        require('../api/api')(app);

        app.listen(config.app.port);
        console.log('Server started, listening on port: ' + config.app.port);
    };

    function initialize() {
        mongoose.connect(config.mongo.url);
        mongoose.connection.on('error', function(err) {
            console.log(err);
        });
        
        loadModels();

        app = module.exports = koa();
        
        app.use(function * (next) {
            if (this.request.accept.headers['content-type'] !== 'application/json') {
                this.throw(400, 'Unsupported content type!');
            } else {
                yield next;
            }
        });
        
        app.use(errorHandler());
    }
    
    function loadModels() {
        try {
            var modelsPath = path.join(__dirname, 'models');
            var modelNames = fs.readdirSync(modelsPath);

            modelNames.forEach(function(model) {
                require(path.join(modelsPath, model));
            });
        } catch (error) {
            throw error;
        }
    }
    
    function errorHandler() {
        return function * (next) {
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
    }

    return server;
}());
