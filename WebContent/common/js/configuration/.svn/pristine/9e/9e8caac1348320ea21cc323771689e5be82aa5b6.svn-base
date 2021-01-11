/**
 * function to show system properties
 */
function showSystemProp()
{
	_showProgressBar(true);
	var loadSrc = jQuery.contextPath+"/pathdesktop/config/ConfigurationValidationAction_verifyConfig";
	var	techDetDiv = $("<div id='tech_det_show_system_prop_div'/>");
	techDetDiv.css("padding","0");
	$('body').append(techDetDiv);
	
	$("#tech_det_show_system_prop_div").load(loadSrc, {}, function() {
		_showProgressBar(false);	
	    $("#tech_det_show_system_prop_div").dialog({
	    								modal:true, 
	    								title:tech_det_system_properties_key,
	    								autoOpen:false,
	    								show:'slide',
	    								position:'center', 
	    								width:'800',
	    								height:'500',
	    								close: function (){
			 								  var theDialog = $(this);
			 								  theDialog.remove();
	    								}
	    });
		$("#tech_det_show_system_prop_div").dialog("open");
	});
}