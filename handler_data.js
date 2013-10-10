var Obj = require(__dirname + '/models/Obj');
	
module.exports = {
	
	handleError: function(err){
		console.log(err);
	},
	
	create: function(req, res, next){
		console.log(req.body);
		//console.log('req.user: ' + req.user);
		
		for(var item in req.body){
			switch(item){
				case 'obj':{
				    console.log(req.body.obj);
					doc = new Obj(req.body.obj);
					Obj.create(req.body.obj, function (err, doc) {
						if (err) return handleError(err);
						    console.log('saved: ' + doc);
						    
						res.send({result:'ok'});
					});
					break;	
				}
				default: {
					console.log('error');
					break;
				}
			}
		}
	}
};
