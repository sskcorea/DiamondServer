var hData = require(__dirname + '/handler_data'),
    hBiz = require(__dirname + '/handler_biz');
    hPage = require(__dirname + '/handler_page');

module.exports = {
    pre : function(req, res, next){
        /*
        if(req.user == undefined)
            res.redirect('back');
        else
            next();
        */
        next();
    },
    page : function(req, res, next){
        var page = req.params.page ? req.params.page.replace('.html','') : '';
        
        if(page.length ==0){
            res.render('main', hPage['main'](req));
            //return;
        }

        if('function' === typeof hPage[page]) {
        	if(page != 'selling')
        		res.render(page, hPage[page](req)); // req.query --> req
        	else 
        		hPage[page](req, res); // render 하기 위해서 res 파라미터 추가
        } else {
            // error  
            res.redirect('views/main');
        }
    },
    operation : function(req, res, next){
        //console.log(req.query);
        //console.log(req.body);
        //console.log(req.params);
        console.log('req.query');
        console.log(req.query);
        switch(req.query.optype){
            case 'data':{
                switch(req.query.opcode){
                    case 'c': {
                        hData.create(req, res, next);
                        break;
                    }
                    case 'r': break;
                    case 'u': break;
                    case 'd': break;
                }                
                break;
            }
            case 'biz':
                switch(req.query.opcode){
                    case 'fu': {
                        console.log(req.body);
                        console.log(req.files);
                        res.redirect('back');
                        break;
                    }
                    case 'reg_sell': {
                        console.log('body:');
                        console.log(req.body);
                        console.log('files:');
                        console.log(req.files);
                        if(hBiz.reg_sell(req))
                        	res.redirect('../views/selling');
                        	//hPage['selling'](req, res);
                        else
                            res.send({result:'fail'});
                    }
                }
                break;
            default:
                console.log('error');
                break;
        }
    }
};