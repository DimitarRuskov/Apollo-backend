var koa = require('koa');
var mongoose = require('mongoose');

var config = require('../config/config');
var models = require('./models');
var middlewares = require('./middlewares')();

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
        
        models.load();
        middlewares.load(app);
        
        app = koa();
        
        app.use(middlewares.get('contentType'));
        app.use(middlewares.get('errorHandler'));
    }
    
    return server;
}());
