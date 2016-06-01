module.exports = function(services) {
    var route = {};

    route.path = '';
    route.method = 'get';
    route.pathParams = {
        'routines': 'routine',
        'categories': 'category'
    };
    
    route.handler = function * list(next) {
        var params = {
            routineId: this.params.routine
        };
        
        var commentsData = yield services.get('comment').listComments(params);
        
        this.status = 200;
        this.body = {
            comments: commentsData.comments,
            commentCount: commentsData.count
        };
    };

    return route;
};
