<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt"  uri="/path-toolbar-tags" %>
<style>
droppable {
	padding: 0.5em;
	float: left;
	margin: 10px;
}

droppableInner {
	padding: 0.5em;
	float: left;
	margin: 10px;
}

draggable {
	padding: 0.5em;
	float: left;
	margin: 10px;
	cursor: hand;
	border: 1px solid #000;
}

_newdrag {
	cursor: move;
	overflow: hidden;
	border: 1px solid #000;
}

_other {
	cursor: auto;
}
.ui-widget {
	font-family: Lucida Grande, Lucida Sans, Arial, sans-serif;
	font-size: 13px !important;
}

form,div,table,ul,li,label,button,span,a {
	font: 8pt Tahoma !important;
}
div.cont {
    width:730px;
    height:505px;
    overflow-y:scroll;
    overflow-x:scroll;
    position:relative;
}
</style>
		<ps:set name="afterSubmit" value="afterSubmit" />
		<ps:set name="actionType_${_pageRef}"   value="actionType"/>
		<ps:hidden name="afterSubmit" id="afterSubmit"></ps:hidden>
		<table width="100%" height="100%" cellpadding="0" cellspacing="1">
		   <tr style="width: 100%" height="90%">
		      <td style="width: 5%;height: 100%">
				<div class="ui-accordion ui-widget ui-helper-reset"
					style="padding: 0px 1px 0px 0px; overflow: hidden; height: 100%">
					<div id="widgetPane" style="height: 100%">
						<h3 class="ui-accordion-header ui-helper-reset ui-state-default ui-state-active ui-corner-top">
							<a>Optional Widgets</a>
						</h3>
						<div id="widgets_optional" class="draggable ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active"
							style="overflow: hidden; height: 100%">
						</div>
					</div>
				</div>		      
		      </td>
		      <td style="width:60%">
				<div id="center-pane" class="ui-accordion ui-widget ui-helper-reset"
					style="width: 100%; height: 100%; position: relative;">
					<h3 class="ui-accordion-header ui-helper-reset ui-state-default ui-state-active ui-corner-top">
					<a>Designer</a>
					</h3>
					<div class="cont">
						<div  style="width: 1024px; height: 1600px; position: relative; padding-bottom: 1px">					
							<div id="editor_div" class="droppable" style="width: 100%; height: 98%; border-style:solid; border-width:thin; border-color:black;" title="Editor">
							</div>
						</div>
					</div>
				</div>
		      </td>
		      <td style="width: 30%; padding-top: 0px;" valign="top">
				<div class="ui-accordion ui-widget ui-helper-reset" style="padding: 0px 1px 0px 1px; overflow: hidden;">                    
					<h3 class="ui-accordion-header ui-helper-reset ui-state-default ui-state-active ui-corner-top">
                    <span title="Un-Pin" class="ui-icon ui-icon-pin-s ui-corner-all ui-layout-button-pin ui-layout-button-pin-east ui-layout-button-pin-down ui-layout-button-pin-east-down" id="propCloseWest" style="color:white; width: 7%; float:left;" onclick="alert(1111)"></span>
					<a style="padding-left: 20px;">Element Properties</a>
					</h3>
					<div id="elementPropertiesWidId" class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active">
					</div>
				</div>
		      </td>
		   </tr>
		   <tr>
		       <td colspan="3" align="right">
				<ptt:toolBar id="screenGeneratorMaintToolBar_${_pageRef}" hideInAlert="true">
				    <psj:submit id="screenGeneratorMaint_save_${_pageRef}" button="true" freezeOnSubmit="true" onclick="screenGeneratorMaint_processSubmit()">
				    	<ps:label key="Save_key" for="screenGeneratorMaint_save_${_pageRef}"/>
				    </psj:submit>
				    <psj:submit id="screenGeneratorMaint_delete_${_pageRef}" button="true" freezeOnSubmit="true" onclick="screenGeneratorList_onDelClicked()">
				    	<ps:label key="delete_key" for="screenGeneratorMaint_delete_${_pageRef}"/>
				    </psj:submit>
				</ptt:toolBar>
		       </td>
		   </tr>
		</table>
<script type="text/javascript">
	$(document).ready(function() {
		$.struts2_jquery.require("ScreenGeneratorMaint.js" ,null,jQuery.contextPath+"/common/js/screengenerator/");
		$.struts2_jquery.require("DynamicScreenTabbedPanel.js" ,null,jQuery.contextPath+"/common/js/tabs/");
		screenGenerator_bindEvents();
	});
</script>