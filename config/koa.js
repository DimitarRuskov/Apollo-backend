'use strict';
const session = require('koa-generic-session');
const MongoStore = require('koa-generic-session-mongo');
const logger = require('koa-logger');
const compress = require('koa-compress');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const path = require('path');

module.exports = function(app, config) {
    app.keys = config.app.keys;
    app.use(serve(path.join(config.app.root, 'public')));
    
    app.use(cors());

    app.use(logger());

    app.use(session({
        store: new MongoStore({ url: config.mongo.url })
    }));

    app.use(bodyParser());

    app.use(compress());
};
