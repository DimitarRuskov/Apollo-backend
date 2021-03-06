'use strict';
var path = require('path');
var Lazy = require('lazy.js');

var apollo_development = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/apollo_development';
var apollo_production = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/apollo_production';

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var base = {
    app: {
        root: path.normalize(path.join(__dirname, '/..')),
        env: env
    }
};

var config = {
    development: {
        app: {
            port: 8003,
            name: 'Apollo Development',
            keys: ['zvRxYI1rbWB1P1eAepjwiguTK3l3WJncfz8VeaLDOIrZPWhX'],
            publicDir: path.join(base.app.root, '/public'),
            jwt: {
                secret: 'W68A1aMlq5VkBN1No32gCxkoj5XBXcItQyFLncRroGXSPqTlRXFQBosGvGLcYWqG',
                duration: 3600
            }
        },
        mongo: {
            url: apollo_development
        }
    },
    production: {
        app: {
            port: 3001,
            name: 'Apollo Production',
            keys: ['']
        },
        mongo: {
            url: apollo_production
        }
    }
};

module.exports = Lazy(base).merge(config[env]).toObject();
