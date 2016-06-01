module.exports = function(services) {
    var route = {};

    route.path = '';
    route.method = 'get';
    route.pathParams = {
        'categories': 'category',
        'routines': 'routine'
    };
    
    route.handler = function * list(next) {
        yield services.get('exercise').listExercises(this.request.body.params);
    };
    
    return route;
};
