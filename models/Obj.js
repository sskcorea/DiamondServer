var mongoose = require('mongoose');

var schema = mongoose.Schema({
    member_id: String,
    locale: String,
    type: String,
    name: String,
    memo: String,
    regdate: { type: Date, default: Date.now },
    upddate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Obj', schema);