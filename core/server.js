var fs = require('fs');
var path = require('path');
var koa = require('koa');
var mongoose = require('mongoose');

var config = require('../config/config');

module.exports = (function() {
    var server = {};
    var app = undefined;

    server.start = function() {
        mongoose.connect(config.mongo.url);
        mongoose.connection.on('error', function(err) {
            console.log(err);
        });

        loadModels();

        app = module.exports = koa();
        
        app.use(function * (next) {
            this.throwError = this.throwError || throwError;
            yield next;
        });
        
        app.use(errorHandler());
        
        require('../config/koa')(app, config);

        require('../api/api')(app);

        app.listen(config.app.port);
        console.log('Server started, listening on port: ' + config.app.port);
    };

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

    function throwError(code, message, description, errors) {
        var error = new Error();
        error.content = {
            code: code,
            message: message
        };
        
        if (description) {
            error.content.description = description;
        }
        
        if (errors) {
            error.content.errors = errors;
        }
        throw error;
    }

    function errorHandler() {
        return function * (next) {
            try {
                yield next;
            } catch (err) {
                this.status = err.content.code;
                this.body = err.content;
            }
        };
    }

    return server;
}());
