///////main page/////////////
var wid, curPosition = 1, bannerCnt;
function mainInit(isReInit) {
	bannerCnt = $('#bannerScroller').children().length;
	
	if(!isReInit) {
		var scrollDivFirst = "<li class='clsBnner'>" + $('#bannerScroller > li:nth-child(1)').html() + '</li>';
		var scrollDivLast = "<li class='clsBnner'>" + $('#bannerScroller > li:nth-child(' + bannerCnt + ')').html() + '</li>';
	
		$('#bannerScroller').prepend(scrollDivLast);
		$('#bannerScroller').append(scrollDivFirst);
		
		bannerCnt = bannerCnt + 2;
	}

	//wid = $('body').width();
	wid = $('#headBanner').width();
	$('#bannerScroller').css('left', '-' + wid + 'px');
	$('#bannerScroller').width(wid*bannerCnt);
	$('#bannerScroller > li').width(wid);
	
	//var id= setInterval(bannerAnimate, 4000);

}

function bannerAnimate(dir){
	if(dir == 'next'){
		$('#bannerScroller').animate({left: '-=' + wid + 'px'}, 400);
		$('#indicator').children('li:nth-child(' + curPosition + ')').removeClass('active');
		curPosition++;
		$('#indicator').children('li:nth-child(' + curPosition + ')').addClass('active');
		if(bannerCnt - 1 == curPosition) {
			curPosition = 1;
			$('#indicator').children('li:nth-child(' + curPosition + ')').addClass('active');
			$("#bannerScroller").animate({left: '-' + wid + 'px'}, 0);
			
		}
	} else if(dir == 'prev'){
		$('#bannerScroller').animate({left: '+=' + wid + 'px'}, 400);
		$('#indicator').children('li:nth-child(' + curPosition + ')').removeClass('active');
		curPosition--;
		$('#indicator').children('li:nth-child(' + curPosition + ')').addClass('active');
		if(curPosition == 0) {
			curPosition = bannerCnt - 2;
			$('#indicator').children('li:nth-child(' + curPosition + ')').addClass('active');
			$('#bannerScroller').animate({left: '-=' + (wid*curPosition) + 'px'}, 0);
		}
	}
}
