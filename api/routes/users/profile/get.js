module.exports = function(services) {
    var route = {};

    route.path = '';
    route.method = 'get';
    route.pathParams = {
        'users': 'username'
    };
    
    route.handler = function * (next) {
        var user = yield services.get('user').getProfile(this.params);
                    
        this.status = 200;
        this.body = {
            userDetails: user
        };
    };

    return route;
};
