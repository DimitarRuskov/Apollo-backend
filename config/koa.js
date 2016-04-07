'use strict';
const session = require('koa-generic-session');
const MongoStore = require('koa-generic-session-mongo');
const logger = require('koa-logger');
const compress = require('koa-compress');
// const errorHandler = require('koa-error');
const bodyParser = require('koa-bodyparser');

module.exports = function(app, config, passport) {
    app.keys = config.app.keys;

    if (config.app.env !== 'test') {
        app.use(logger());
    }

    // app.use(errorHandler());

    app.use(session({
        key: 'test',
        store: new MongoStore({ url: config.mongo.url })
    }));

    app.use(bodyParser());
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(compress());
};
