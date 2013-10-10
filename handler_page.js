var Data = require(__dirname + '/models/Data');

var returnData = {
	isAuth : false,
	title : '',
	isMobile : false
};
var mobileCheck = function (agent){
	if(agent.match(/Android/i) || agent.match(/BlackBerry/i) ||
		agent.match(/iPhone|iPad|iPod/i) || agent.match(/Opera Mini/i) ||
		agent.match(/IEMobile/i)){
		return true;
	}
	return false;
}
var isLogin = function(user) {
	if(user == null || user == 'undefined'){
		return false;
	}
	return true;
}
module.exports = {
	sell: function(req){
		//var ret = req; // json 
		
		returnData = {
			isAuth : isLogin(req.user),
			title  : 'Register your goods'
		};
		
		return returnData; 
	},
	buy: function(req){
		returnData = {
			isAuth : isLogin(req.user),
			title  : 'Choose'
		};
		
		return returnData; 
	},
	selling: function(req, res){
		if(isLogin(req.user)){
			Data.Obj.find({member_id: req.user.id}, function (err, obj){
				returnData = {
					isAuth : isLogin(req.user),
					title  : 'Keywords you registered',
					isMobile : mobileCheck(req.headers['user-agent']),
					list : obj
				};
				console.log(obj);
				res.render('selling', returnData);
			}).sort({regdate : 'desc'}); // 다른 건 먹는데 date는 안먹어요 ㅠㅠ
		} else {
			returnData = {
				isAuth : false,
				title  : 'Keywords you registered'
			};
			res.render('selling', returnData);
		}
	},
	selling_backup: function(req){
		
		returnData = {
			isAuth : isLogin(req.user),
			title  : 'Keywords you registered',
			isMobile : mobileCheck(req.headers['user-agent'])
		};
		
		return returnData; 
	},
	main : function(req) {
		returnData = {
			isAuth : isLogin(req.user),
			title : 'Welcome to 24-Market',
		};
		returnData.isMobile = mobileCheck(req.headers['user-agent']);
		
		return returnData;
	},
	login : function(req) {
		returnData.isAuth = isLogin(req.user),
		returnData.title = 'Login',
		returnData.isMobile = mobileCheck(req.headers['user-agent']);

		return returnData;
	},
	logout : function(req, res) {
		returnData.isAuth = isLogin(req.user);
		if(req.user != null && req.user != 'undefined'){
			req.logout();
		}
		//res.redirect('/views/main');
		
		return returnData;
	},
	intro : function(req) {
		returnData.isAuth = isLogin(req.user),
		returnData.title = '24 Market',
		returnData.isMobile = mobileCheck(req.headers['user-agent']);

		return returnData;
	},
	mypage : function(req) {
		//console.log(req.user);
		returnData.isAuth = isLogin(req.user),
		returnData.title = 'My Page',
		returnData.isMobile = mobileCheck(req.headers['user-agent']);
		
		if(returnData.isAuth) {
			returnData.userName = req.user.displayName,
			returnData.userEmail = req.user.emails.value,
			returnData.userId = req.user.id,
			returnData.provider = req.user.provider;
		}
		return returnData;
	}
};	
