var qs = require('qs');

module.exports = function * queryParser(next) {
    this.originalUrl = this.originalUrl.replace(this.request.search, '');
    this.query = qs.parse(this.request.querystring);
    yield next;
};
