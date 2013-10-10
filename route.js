var app = require(__dirname + '/app'),
    handler = require(__dirname + '/handler');

module.exports = function() {
    app.all('/views/*', handler.pre);
    app.get('/views', handler.page);
    app.get('/views/:page', handler.page);
    app.post('/op', handler.operation);
};
