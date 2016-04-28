var fs = require('fs');
var path = require('path');

exports.load = function() {
    try {
        var modelsPath = __dirname;
        var modelNames = fs.readdirSync(modelsPath);

        modelNames.forEach(function(model) {
            require(path.join(modelsPath, model));
        });
    } catch (error) {
        throw error;
    }
};
