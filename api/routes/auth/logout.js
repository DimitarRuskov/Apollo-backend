module.exports = function(services) {
    var route = {};

    route.path = 'logout';
    route.method = 'post';

    route.handler = function * (next) {
        yield services.get('auth').logout(this.request.body.params);
    };

    return route;
};
