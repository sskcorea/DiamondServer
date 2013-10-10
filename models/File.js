var mongoose = require('mongoose');

var schema = mongoose.Schema({
    id:  String,
    parent_type: String,
    parent_id: String,
    file_name: String,
    file_path: String,
    file_type: String,
    file_size: String,
    reg_date: { type: Date, default: Date.now },
    upd_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('File', schema);