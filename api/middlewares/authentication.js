module.exports = function * authentication(next) {
    if (this.state.user) {
        yield next;
    } else {
        this.throw(401, 'Unauthorized');
    }
};
