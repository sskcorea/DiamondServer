var GoogleStrategy = require('passport-google').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    app = require(__dirname + '/app'),
    //User = require(__dirname + '/models/User'); // 원본 
    Data = require(__dirname + '/models/Data');

module.exports = function(passport) {
    
    //var hostUrl = 'http://182.172.161.197:3000';
	var hostUrl = 'http://24market.biz:3000';

    passport.use(new GoogleStrategy({
        returnURL: hostUrl + '/auth/google/return',
        realm: hostUrl
        },
        function(identifier, profile, done) {
            //User.findOne({ 'provider': 'google', 'id': profile.emails[0].value }, function(err, user) { //원본
        	Data.User.findOne({ 'provider': 'google', 'id': profile.emails[0].value }, function(err, user) {
                //console.log('user: '+ user);
                console.log(identifier);
                //console.log(profile);
                if(user == null){
                    console.log('user not found');

                    var newUser = new Data.User({
                        'provider': 'google',
                        'id': profile.emails[0].value,
                        'displayName': profile.displayName,
                        'name.familyName': profile.name.familyName,
                        'name.givenName': profile.name.givenName,
                        'name.middleName': '',
                        'emails.value': profile.emails[0].value,
                        'emails.type': '',
                        'photos.value': ''
                    });
                    newUser.save(function(err){
                        if (err) console.log('err: ' + err);
                        done(err, newUser);
                    });
                }else{
                    console.log('user found');
                    done(err, user);
                }
            });
        }
    ));

    passport.use(new FacebookStrategy({
        clientID: '207240399428912',
        clientSecret: 'c92ece510e4963dedabdd6d4f6ac5339',
        callbackURL: hostUrl + "/auth/facebook/callback"
        },
        function(accessToken, refreshToken, profile, done) {
        	//User.findOne({ 'provider': profile.provider, 'id': profile.id }, function(err, user) { // 원본
            Data.User.findOne({ 'provider': profile.provider, 'id': profile.id }, function(err, user) {
                //console.log('user: ' + user);
                //console.log('profile: ');
                //console.log(profile);
                if(user == null){
                    console.log('user not found');

                    var newUser = new Data.User({
                        'provider': profile.provider,
                        'id': profile.id,
                        'displayName': profile.displayName,
                        'name.familyName': profile.name.familyName,
                        'name.givenName': profile.name.givenName,
                        'name.middleName': profile.name.middleName,
                        'emails.value': profile.emails[0].value,
                        'emails.type': '',
                        'photos.value': ''
                    });
                    newUser.save(function(err){
                        if (err) console.log('err: ' + err);
                        done(err, newUser);
                    });
                }else{
                    console.log('user found');
                    done(err, user);
                }
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        console.log('serializeUsers');
        //console.log('user._id: '+ user._id);
        done(null, user._id);
    });
    
    passport.deserializeUser(function(id, done) {
        console.log('deserializeUser');
        //console.log('id: ');
        //console.log(id);
        // Data.User.findById(id, function(err, user) {// 원본
        Data.User.findById(id, function(err, user) {
            if(err) return console.log('err' + err);
            done(null, user);
        });
    });
    
    app.get('/auth/google', passport.authenticate('google'));
    app.get('/auth/google/return', 
        passport.authenticate('google', { successRedirect: '/views/main',
                                        failureRedirect: '/views/login', 
                                        failureFlash: true}));
    
    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback', 
        passport.authenticate('facebook', { successRedirect: '/views/main',
                                          failureRedirect: '/views/login',
                                          failureFlash: true }));
}
