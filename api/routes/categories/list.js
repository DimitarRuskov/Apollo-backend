module.exports = function(services) {
    var route = {};

    route.path = '';
    route.method = 'get';
    route.pagination = true;

    route.handler = function * list(next) {
        var params = this.params;
        params.page = this.query.page || 0;
        params.itemsPerPage = route.itemsPerPage;

        var categories = yield services.get('category').listCategories(params);
        
        this.status = 200;
        this.body = {
            categories: categories
        };
    };
    
    return route;
};
