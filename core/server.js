var fs = require('fs');
var path = require('path');
var koa = require('koa');
var mongoose = require('mongoose');

var config = require('../config/config');

module.exports = (function() {
    var server = {};
    var app;

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
        
        error.content = buildError(code, message, description, errors);
        
        throw error;
    }

    function buildError(code, message, description, errors) {
        var error = {
            code: code,
            message: message
        };

        if (description) {
            error.description = description;
        }

        if (errors) {
            error.errors = errors;
        }
        
        return error;
    }

    function parseValidationError(error) {
        var result = new Error();
        var errors = [];
        
        (Array.isArray(error.details) ? error.details.forEach(function(err) {
            errors.push({
                field: err.context.key,
                message: err.message
            });
        }) : undefined);
                
        result.content = buildError(error.statusCode, error.name, error.message, errors);
                
        return result;
    }

    function errorHandler() {
        return function * (next) {
            try {
                yield next;
            } catch (err) {
                if (err.name === 'ValidationError') {
                    err = parseValidationError(err);
                }
                
                this.status = err.content.code;
                this.body = err.content;
            }
        };
    }

    return server;
}());
