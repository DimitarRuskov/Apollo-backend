module.exports = function(code, message, description, errors) {
    var error = {
        code: code,
        message: message
    };

    if (description) {
        error.description = description;
    }

    if (errors) {
        error.errors = errors;
    }
    
    return error;
};
