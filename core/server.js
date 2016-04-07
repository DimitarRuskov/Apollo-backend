var fs = require('fs');
var path = require('path');
var koa = require('koa');
var passport = require('koa-passport');
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

        app = koa();

        require('../config/passport')(passport, config);

        require('../config/koa')(app, config, passport);

        require('../api/api')(app, passport);

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

    return server;
}());
