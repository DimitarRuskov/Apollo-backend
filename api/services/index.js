var fs = require('fs');
var path = require('path');
var Lazy = require('lazy.js');

module.exports = function() {
    var services = [];
    
    function loadServices() {
        var servicesPath = path.join(__dirname);
        
        try {
            var servicesNames = fs.readdirSync(servicesPath);
            
            servicesNames.forEach(function(service) {
                if (service !== 'index.js') {
                    var requiredObj = require(path.join(servicesPath, service));
                    
                    services.push({
                        name: requiredObj.name || service.split('.')[0],
                        service: requiredObj
                    });
                }
            });
        } catch (error) {
            throw error;
        }
    }
    
    function getService(name) {
        var serviceResult = Lazy(services).find({name: name});
        
        return (serviceResult && serviceResult.service ? serviceResult.service : undefined);
    }
    
    return {
        load: loadServices,
        get: getService
    };
};
