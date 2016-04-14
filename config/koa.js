'use strict';
const logger = require('koa-logger');
const compress = require('koa-compress');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const jwt = require('koa-jwt');
const path = require('path');

module.exports = function(app, config) {
    app.keys = config.app.keys;
    app.use(serve(path.join(config.app.root, 'public')));

    app.use(cors());

    app.use(logger());

    app.use(jwt({secret: config.app.jwt.secret, passthrough: true}));
    
    app.use(bodyParser());

    app.use(compress());
};
