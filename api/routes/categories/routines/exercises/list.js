module.exports = function(services) {
    var route = {};

    route.path = '';
    route.method = 'get';
    route.pathParams = {
        'categories': 'category',
        'routines': 'routine'
    };
    
    route.pagination = true;

    route.handler = function * list(next) {
        var params = this.request.body.params;
        params.page = this.query.page || 0;
        params.itemsPerPage = route.itemsPerPage;

        yield services.get('exercise').listExercises(params);
    };
    
    return route;
};
