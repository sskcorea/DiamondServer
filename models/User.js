var mongoose = require('mongoose');

var schema = mongoose.Schema({
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

module.exports = mongoose.model('User', schema);