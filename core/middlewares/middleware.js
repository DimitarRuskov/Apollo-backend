module.exports = function(name, generator, loadFunc) {
    this.name = name;
    this.middleware = generator;
    this.load = loadFunc;
};
