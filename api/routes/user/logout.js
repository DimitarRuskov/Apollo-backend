module.exports = function(services) {
    var route = {};

    route.path = 'logout';
    route.method = 'post';

    route.handler = function * logout(next) {
        yield services['user'].signOut(this);
    };

    return route;
};
