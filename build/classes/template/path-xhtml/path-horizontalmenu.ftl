<script type="text/javascript"  src="<@s.url value='/common/jquery/js/base/jquery.positionBy.js'/>" ></script>
<script type="text/javascript"  src="<@s.url value='/common/jquery/js/base/jquery.dimensions.js'/>" ></script>
<link rel="stylesheet" type="text/css" href="<@s.url value='/common/style/horizontalmenu/jquery.jdMenu.css' />" />
<script type="text/javascript"  src="<@s.url value='/common/js/horizontalmenu/HorizontalMenu.js' />"  ></script>
<script type="text/javascript"  src="<@s.url value='/common/js/horizontalmenu/jquery.jdMenu.js' />"  ></script>

<script type="text/javascript">

$(document).ready(function(){
if(document.dir == "rtl")
	{
		$.struts2_jquery.requireCss("/common/style/horizontalmenu/jquery.jdMenu_rtl.css",'${base}');
	}
});
$.subscribe('setTitle', function(event, data) 
		{
			var titleVal = event.originalEvent.target.text;
			$('title').remove();
			$('head').append('<title>'+titleVal+'</title>')
		}
	);
	</script>	
<ul id="${parameters.id?html}" hActionName="${parameters.actionName?html}" hTargetName="${parameters.targetName?html}" scrollSize="${parameters.scrollSize?number}" class="jd_menu jd_menu_slate " targetLoadAction="${parameters.targetLoadAction?html}" style="display:block">	
</ul>