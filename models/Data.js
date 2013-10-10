var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    provider: {type: String}, // The provider which with the user authenticated (facebook, twitter, etc.)
    id: {type: String},
    displayName: {type: String},
    name: {
        familyName: {type: String},
        givenName: {type: String},
        middleName: {type: String}
    },
    emails: {
        value: {type: String},
        type: {type: String} // The type of email address (home, work, etc.).
    },
    photos: {
        value: {type: String} // The URL of the image.
    }
});

var fileSchema = mongoose.Schema({
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
var objSchema = mongoose.Schema({
    member_id: String,
    locale: String,
    type: String,
    name: String,
    memo: String,
    regdate: { type: Date, default: Date.now },
    upddate: { type: Date, default: Date.now }
});

var tagSchema = mongoose.Schema({
	name: String
});

var tagObjSchema = mongoose.Schema({
	obj_seq:  String,
	tag_seq: String,
});

exports.TagObj = mongoose.model('TagObj', tagObjSchema);
exports.Tag = mongoose.model('Tag', tagSchema);
exports.Obj = mongoose.model('Obj', objSchema);
exports.File = mongoose.model('File', fileSchema);
exports.User = mongoose.model('User', userSchema);

