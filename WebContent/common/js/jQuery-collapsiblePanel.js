(function($) {
    $.fn.extend({
        collapsiblePanel: function() {
            // Call the ConfigureCollapsiblePanel function for the selected element
            return $(this).each(ConfigureCollapsiblePanel);
        }
    });

})(jQuery);

// PathSolutions [Libin] modified the header icons to show up/down arrows instead of side/down arrows
function ConfigureCollapsiblePanel() {
    $(this).addClass("ui-widget");	 	

	var content  = $("<div class='collapsibleContainerContent ui-widget-content'></div>");
	var toggleIcon = "";
	
	if($(this).hasClass('collapsed')){
		content.css("display","none");
		$(this).removeClass('collapsed');
		//PathSolutions [Libin] added extra span to correct the collapsible panel resolution issue
		toggleIcon = "<span class=\"collapsibleIcon\"><span class=\"ui-icon ui-icon-circle-triangle-s\">&nbsp</span></span>";	
	}
	else{
		toggleIcon = "<span class=\"collapsibleIcon\"><span class=\"ui-icon ui-icon-circle-triangle-n\">&nbsp</span></span>";
	}
	

    // Wrap the contents of the container within a new div.	
    $(this).children().wrapAll(content);
	//PathSolutions [Libin] added 'ui-corner-top' to panel header and replaced the class 'ui-widget-header' with 'ui-state-focus' and changed the panel text id
    // Create a new div as the first item within the container.  Put the title of the panel in here.
    var toolTip =  $(this).attr("pathCollapsTitle");
    toolTip = (toolTip != "undefined" && toolTip !=null)? "title='"+toolTip+"'":"";
     $("<div class='collapsibleContainerTitle ui-state-focus ui-corner-top' ><span class=\"collapsibleLabel\" "+toolTip+">" + $(this).attr("title") + "</span>"+toggleIcon+"</div>").prependTo($(this));

    //PathSolutions: remove title on div
    $(this).removeAttr("title");
     
    // Assign a call to CollapsibleContainerTitleOnClick for the click event of the new title div.
    $(".collapsibleContainerTitle", this).click(CollapsibleContainerTitleOnClick);

}

function CollapsibleContainerTitleOnClick() {
    // The item clicked is the title div... get this parent (the overall container) and toggle the content within it.
    $(".collapsibleContainerContent", $(this).parent()).slideToggle("fast", function () {
			 var toggleElem = $(this).parent().children(":first-child").find('span .ui-icon');//PathSolutions [Libin] modified js to handle extra span added
			 /**
			  * [marwanmaddah]: changed the children selector to select the first level of children
			  * and added condition to the "if" to avoid the change of translation icon on click.
			  */
			 for(var i=0;i<toggleElem.length;i++)
			 {	
				 if($(toggleElem[i]).hasClass('ui-icon-circle-triangle-s') && !$(toggleElem[i]).hasClass('added_cust_icon'))
				 {
				 	$(toggleElem[i]).removeClass('ui-icon ui-icon-circle-triangle-s');
				 	$(toggleElem[i]).addClass('ui-icon ui-icon-circle-triangle-n');
				 }
				 else 
				 {
					if(!$(toggleElem[i]).hasClass('added_cust_icon'))
					{					  
						$(toggleElem[i]).removeClass('ui-icon ui-icon-circle-triangle-n');
						$(toggleElem[i]).addClass('ui-icon ui-icon-circle-triangle-s');
					}
				 }
			 }
    });
}
// PathSolutions [Libin] end of changes