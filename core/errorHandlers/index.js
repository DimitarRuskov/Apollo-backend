var fs = require('fs');
var path = require('path');

module.exports = function() {
    var errorHandlers = {};
    
    function loadErrorHandlers() {
        try {
            var files = fs.readdirSync(__dirname);
            
            files.forEach(function(file) {
                if (file.indexOf('Error') > -1) {
                    errorHandlers[file.split('.')[0]] = require(path.join(__dirname, file));
                }
            });
        } catch (error) {
            throw error;
        }
    }
    
    loadErrorHandlers();
     
    return {
        errorHandlers: errorHandlers
    };
};
