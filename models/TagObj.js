var mongoose = require('mongoose');

var schema = mongoose.Schema({
	obj_seq:  String,
	tag_seq: String,
});

module.exports = mongoose.model('TagObj', schema);