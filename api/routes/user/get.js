module.exports = function(services) {
    var route = {};

    route.path = ':username';
    route.method = 'get';
    route.auth = true;
    
    route.handler = function * (next) {
        var user = yield services.get('user').getProfile(this.params);
                    
        this.status = 200;
        this.body = {
            userDetails: user
        };
    };

    return route;
};
