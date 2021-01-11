

<style>
.ui-webserviceexplorer-upper{
	min-width: 100px;
    overflow: scroll;
}

.ui-webserviceexplorer-upper .ui-webserviceexplorer-leftpane{
    width: 22%;
    float: left;
    margin-top: 1%;
    margin-left: 0.5%;
    border-collapse: collapse;
}

.ui-webserviceexplorer-upper .ui-webserviceexplorer-rightpane{
    width: available  !important;
    position: relative;
    margin-left: 1%;
    margin-right: 2%;
    margin-bottom: 2%;
    border-collapse: collapse;
}
.ui-right-td{
    width: available  !important;
    position: relative;
}
.ui-config-lookup{
   float: left;
   margin-left: 0.5%;
   margin-bottom: 2%;
}

.ui-webserviceexplorer-toolBar{
    margin-top: 10px;
    margin-bottom: 10px;
}

.ui-webserviceexplorer-upper .path-subgrd-hdr{
	background: linear-gradient(#ffffff, #f4f2f2) !important
}
.lookupSection{
	margin-top: 1%;
    margin-bottom: 1%;
}
.ui-webserviceexplorer-table{
    table-layout: fixed;
    height: 50%;
}

</style>
	
	<!-- Mandatory Hidden Fields for all extended grids -->
	<%@ include file = "WebServiceExplorerCommonHiddenFields.jsp" %>
	
	
	<!-- 
	<table style="width: 100%; height:2%" cellpadding="0" cellspacing="0" border="0">
		<tr>
		<td>
			<%--@include file="WebServiceExplorerSavedConfigurationLookup.jsp"--%>
		<td>
		</tr>
	</table>
	-->
	<form id = "WebServiceExplorerCommonFields_form_${_pageRef}">	
		<%@ include file = "WebServiceExplorerCommonFields.jsp" %>
	</form>
	
	<div id="tst" style="width: 100%;">
	
	<psj:tabbedpanel id="custTabs_${_pageRef}" selectedTab="0"  >

	<psj:tab id="custTab1" target="custTab1TabsContent_${_pageRef}" key="web_service_param_key"/>
	<psj:tab id="custTab2" target="custTab2TabsContent_${_pageRef}" key="web_service_req_resp_param_key"/>
			

	<div id="custTab1TabsContent_${_pageRef}">
		<%@include file= "WebServiceExplorerServicesParamsOperations.jsp" %>
	</div>

	<div id="custTab2TabsContent_${_pageRef}">
		<div id="webServiceExplorerRequestRespCollapse_${_pageRef}" style="padding:0.5em;height: 77%;margin-top:1%;" title="<ps:text name="request_response_key"/>" >
			<table style="width: 100%; height: 95%;" cellpadding="0" cellspacing="0" border="0">
				<tr>
				<td>					
						<div id="WebServiceInputOutRequest_${_pageRef}" style="width: 100%">
								<%@include file="WebServiceExplorerRequestResponse.jsp"%>
						</div>
						</td>
				</tr>
			</table>
		</div>
</psj:tabbedpanel>
	</div>
	
	<div id="webServiceExplorer_toolbar_${_pageRef}"
						style="padding: 0.2em; width: 100%;position: relative;"
						class="ui-webserviceexplorer-toolBar">
					<%@include file="WebServiceExplorerToolbar.jsp"%>
						
	</div>


<script type="text/javascript">

	$(function(){	
		//$("#lookuptxt_channel_id_"+_pageRef).attr('readonly','readonly');
		var $mainTab = $("#custTabs_"+_pageRef);
		var $tabId1 = "custTab1TabsContent_"+_pageRef;
		var $tabId2 = "custTab2TabsContent_"+_pageRef;
	//	$("#custTabs_"+_pageRef).tabs("disableAll",["custTab2TabsContent_"+_pageRef]);
		$mainTab.tabs('disable',$tabId2);
		try{
			var ieTreeStyle = "min-height:550px;overflow: scroll;max-height:560px"; 
			var otherTreeStyle = "height: 98%;overflow: scroll; max-height:550px";
			var ieGridStyle = "min-height:550px;overflow:scroll;max-height:560px";
			var otherGridStyle = "height: 98%;overflow:scroll;max-height:550px";
			if( navigator.userAgent.toLowerCase().indexOf('firefox') > -1 )
			{
				$("#webServiceGuiTree_"+_pageRef).attr('style',otherTreeStyle);
				$("#webServiceGuiGrid_"+_pageRef).attr('style',otherGridStyle);
				document.getElementById('mainTabs').style.overflowX = "hidden";
			}
			else 
			if( navigator.userAgent.toLowerCase().indexOf('chrome') > -1 )
			{
				$("#webServiceGuiTree_"+_pageRef).attr('style',otherTreeStyle);
				$("#webServiceGuiGrid_"+_pageRef).attr('style',otherGridStyle);
				document.getElementById('mainTabs').style.overflowX = "hidden";
			}
			else{
				$("#webServiceGuiTree_"+_pageRef).attr('style',otherTreeStyle);
				$("#webServiceGuiGrid_"+_pageRef).attr('style',otherGridStyle);
				document.getElementById('mainTabs').style.overflowX = "hidden";
			}
			if(undefined != $.browser)
			{
				if($.browser.msie == true)
				{
					var inoutStyle = "width:100%;min-height:570px";
					$("#webServiceGuiTree_"+_pageRef).attr('style',ieTreeStyle);
					$("#webServiceGuiGrid_"+_pageRef).attr('style',ieGridStyle);
					$("#WebServiceInputOutRequest_"+_pageRef).attr('style',inoutStyle);
					document.getElementById('mainTabs').style.overflowX = "hidden";
				}
			}
		
		}
		catch(e)
		{
			
		}
	});
	$.struts2_jquery.require("WebServiceExplorerTree.js" ,null,jQuery.contextPath+"/path/js/commonpwsmapping/webserviceexplorer/");	
	$.struts2_jquery.require("WebServiceExplorerSavedConfigurationList.js" ,null,jQuery.contextPath+"/path/js/commonpwsmapping/webserviceexplorer/");	
	$("#webServiceExplorerCollapse_"+_pageRef).collapsiblePanel();
	$("#commonFieldsCollapsable_"+_pageRef).collapsiblePanel();
	//$("#webServiceGuiTree_"+_pageRef).collapsiblePanel();
	//$("#webServiceExplorerRequestRespCollapse_"+_pageRef).collapsiblePanel();
	//$( "#custTabs" ).tabs();
</script>
					