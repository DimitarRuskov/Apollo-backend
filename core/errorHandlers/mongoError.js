var buildError = require('./buildError');

module.exports = function(error) {
    var result = new Error();
    var errors = [];
    
    (Array.isArray(error.details) ? error.details.forEach(function(err) {
        errors.push({
            field: err.context.key,
            message: err.message
        });
    }) : undefined);
            
    result.content = buildError(error.statusCode, error.name, error.message, errors);
            
    return result;
};
