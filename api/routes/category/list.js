module.exports = function(services) {
    var route = {};

    route.path = 'list';
    route.method = 'get';
    
    route.handler = function * list(next) {
        var categories = yield services.get('category').listCategories(this.query);
        
        this.status = 200;
        this.body = {
            categories: categories
        };
    };
    
    return route;
};
