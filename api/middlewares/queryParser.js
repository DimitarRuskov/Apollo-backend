var qs = require('qs');

module.exports = function * queryParser(next) {
    this.originalUrl = this.originalUrl.replace(this.req._parsedUrl.search, '');
    this.query = qs.parse(this.req._parsedUrl.query);
    yield next;
};
