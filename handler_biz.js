var Obj = require(__dirname + '/models/Obj');
var File = require(__dirname + '/models/File');

module.exports = {

    handleError: function(err){
        console.log(err);
    },

    reg_sell: function(req, res, next){
        console.log(req.user);
        var obj = {
            member_id:req.user.id,
            locale: req.body.locale,
            type: req.body.type,
            name: req.body.name,
            memo: req.body.memo,
            regdatde: req.body.regdate,
            update: req.body.update
        };
        var file = {
            id: req.body.member_id,
            parent_type: 'user',
            parent_id: req.user.id,
            file_name: req.files.image.name,
            file_path: req.files.image.path.substring(req.files.image.path.lastIndexOf('\\') + 1),
            file_type: req.files.image.type,
            file_size: req.files.image.size
        };
        
        Obj.create(obj, function (err, doc) {
            if (err) return handleError(err);
            console.log('saved: ' + doc);
        });
        
        File.create(file, function(err, doc){
            if (err) return handleError(err);
            console.log('saved: ' + doc);
        });
        return true;
    }
};
