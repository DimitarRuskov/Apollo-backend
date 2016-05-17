module.exports = function(services) {
    var route = {};

    route.path = 'list';
    route.method = 'get';
    
    route.handler = function * list(next) {
        yield services.get('exercise').listExercises(this.request.body.params);
    };
    
    return route;
};
