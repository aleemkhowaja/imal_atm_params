 $(document).ready(function() {
      $('#hdr_languages_link').bind('click', function (){
      
      var theDiv = $(this);
      var $newdiv1 = $("#div_language_key");
      // laod the language Div and show it
      if($newdiv1.length == 0)
      {
       $newdiv1 = $('<div id="div_language_key" class="ui-corner-all ui-widget-header" onmouseout="lang_popup_close(event, this)"/>');
       //$newdiv1.css("width", document.dir == "rtl" ? "150":"200")
       $('body').append($newdiv1);
       $newdiv1.load(jQuery.contextPath+'/pathdesktop/TopMenuAction_menuLang.action', function(){
    	   
	      var rightLeft;
	      var leftOrRight = "right";
	      if(document.dir == "rtl")
		  {
				var rightLeft = theDiv.offset().left -1;
				leftOrRight = "left";
		  }
		  else
		  {
				var rightLeft = theDiv.offset().left  -  $(this).width() + theDiv.width() + 25 ;
		   }
	      var height = theDiv.offset().top+16;
	      $newdiv1.css("position","absolute");
	      $newdiv1.css(leftOrRight,rightLeft);
	      $newdiv1.css("top",height);
	      $newdiv1.css("z-index","1000");
       });
      }
      else
    	{
    	   $("#div_language_key").css("display","");
    	 }
      
     
      
	});	
      });
// hide the language popup
 function lang_popup_close(event, curDiv)
 {
	var toElement = null;
	var eventSrc = event.relatedTarget || event.toElement; 
	if (eventSrc)
	{
		toElement = eventSrc;
	}
	while (toElement && toElement.id != curDiv.id)
	{
		toElement = toElement.parentNode;
	}
	if (!toElement)
	{
		$("#div_language_key").css("display","none");
	}
 }