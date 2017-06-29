;(function($){
	$.fn.myTooltip = function() {
		$("body").append("<div class='myTooltip'></div>");
		$(".myTooltip").css({"position": "absolute","padding": "5px","background": "#ccc","color": "#000","border-radius": "5px","font-size": "13px","font-family": "Verdana","box-shadow": "0 0 10px rgba(0,0,0, 0.3)","display": "none"});
		var title;

		return this.each(function() {

			var tag = $(this).get(0).nodeName;
			if (tag == "SPAN") {
				$(this).css({
					"border-bottom":"1px dashed red",
					"background":"yellow"
				});
			} else if (tag == "IMG") {
				var titleImg = $.trim($(this).attr("title"));
				if (titleImg == undefined || titleImg == "") {
					var titleAttr = $(this).attr("alt");
					$(this).attr("title",titleAttr);
				};
			};
			
			
			$(this).mouseenter(function() {
				title = $.trim($(this).attr("title"));
				$(this).attr("title","");
				if (title == undefined || title == "") {
					title = $(this).text();
				};
			});//END mouseenter

			$(this).mousemove(function(e) {
				var top = e.pageY + 20;
				var left = e.pageX + 20;
				//console.log(top + " | " + left);
				$(".myTooltip").css({
					"left": left,
					"top": top
				}).text(title);
				$(".myTooltip").fadeIn(400);
			});//END mousemove

			$(this).mouseleave(function() {
				$(".myTooltip").hide();
				$(this).attr("title",title);
			});//END mouseleave
		});
	};
})(jQuery);