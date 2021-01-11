<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<html>
	<script type="text/javascript">
	var orderSelRowAlert = '<ps:text name="reporting.selectRowAlert"/>';
	var retrieveKey = '<ps:text name="retrieve_key"/>';	
	var fromPrev=$("#update1Order_${htmlPageRef}").val();
	var oldOrder;
	
		$(document).ready(function()
		{
			$("#orderGrid_${htmlPageRef}").subscribe('addRetrieveBtn', 
				function(event,data) 
				{
					if(fromPrev=="fromPrev")
					{
						var pagerId = "orderGrid_${htmlPageRef}"+"_pager_left";
						var myGrid = $("#orderGrid_${htmlPageRef}");
						myGrid.jqGrid('navButtonAdd',pagerId,{caption:"",title: retrieveKey, id:"NewButton_${htmlPageRef}",
						buttonicon :'ui-icon-play', onClickButton:function()
						{ 
					 		$('#orderPrevRepDlg_${htmlPageRef}').dialog('close');
					 		refreshRepMenuData("${htmlPageRef}");
						} });
					}
				}
			);
		});	
			
	 function saveOrderBy()
	 {

	   //save previous row
	    var jsonStringUpdates = $("#orderGrid_${htmlPageRef}").jqGrid('getChangedRowData'); 
	    $("#updatesOrder_${htmlPageRef}").val(jsonStringUpdates); 
	    var url = $("#orderGridform_${htmlPageRef}").attr("action");
		 myObject =  $("#orderGridform_${htmlPageRef}").serialize();
		 myObject+="&_pageRef=${htmlPageRef}";
		 myObject+="&fromAddButton=1";
		 $.post(url, myObject , function( param )
	 	{
			if(fromPrev=="fromPrev")
			{
				var updates1= param["updates1"];
				if(updates1 != "" && updates1 !=null)
				{
					_showErrorMsg("<ps:text name='reporting.denyOrderAlert'/>"+" : "+updates1,error_msg_title,400,120); 
				}
				else
				{
					document.getElementById("sortTd_"+htmlPageRef).style.display = "block";
					var gridUrl = jQuery.contextPath+"/path/repCommon/commonReporting_loadOrderGrid.action?_pageRef="+htmlPageRef+"&updates1=fromPrev&fromAddButton=1";
					$("#orderGrid_${htmlPageRef}").jqGrid('setGridParam', {url : gridUrl}).trigger("reloadGrid");
				}
			}
			else
			{
				document.getElementById("sortTd_"+htmlPageRef).style.display = "block";
				var gridUrl = jQuery.contextPath+"/path/repCommon/commonReporting_loadOrderGrid.action?_pageRef="+htmlPageRef+"&fromAddButton=1";
	   	  		$("#orderGrid_${htmlPageRef}").trigger("reloadGrid");
	   	  	}
	 	});
	 }
	 
	
 function getPrevOrder(obj)
 {
 	    var idx = obj.id.indexOf("_"); 
	    var rowId = obj.id.substring(0,idx)
	    myObject  = $("#orderGrid_${htmlPageRef}").jqGrid('getRowData',rowId);
	    oldOrder = myObject["order"];
 }
 
	function changeOrder(obj)
	{
	    var idx = obj.id.indexOf("_");
	    var rowId = obj.id.substring(0,idx)
	    myObject  = $("#orderGrid_${htmlPageRef}").jqGrid('getRowData',rowId);
	    var grpName =myObject["groupName"];
	    var order = myObject["order"];
	    if( grpName!=null && grpName!="" && grpName!="null")
	    {
	    	if(order =="" || order ==null)
	    	{
	    		$("#"+obj.id).val(oldOrder);
	    		_showErrorMsg( "<ps:text name='designer.orderReq'/>");
	    	}
	    }
	    document.getElementById("sortTd_"+htmlPageRef).style.display = "none";
	}
	
	
	 
	 function moveRow(calledFrom)
	 {
	 	var selRowId = $("#orderGrid_${htmlPageRef}").jqGrid('getGridParam','selrow');
	 	if(selRowId==null)
	 	{
	 		_showErrorMsg(orderSelRowAlert,warning_msg_title); 
			return;
	 	}
	 	var url= "${pageContext.request.contextPath}/path/repCommon/commonReporting_changeOrderPosition.action"
	    var params ={};
	    params["updates"]=selRowId;
	    params["updates1"]=calledFrom;
	    params["update1"]=$("#update1Order_${htmlPageRef}").val();
	    params["_pageRef"]="${htmlPageRef}"
	    $.post(url, params , function( param )
		{
			$("#orderGrid_${htmlPageRef}").trigger("reloadGrid");
			 window.setTimeout("delayOrderFunc("+selRowId+")" ,500);
			
		});
	 	
	 }
	 
	 function delayOrderFunc(objj)
	 {
	 	$("#orderGrid_${htmlPageRef}").jqGrid("setSelection",objj,true);
	 }
	 
	 
	
	function saveSorting() 
	{
		var jsonStringUpdates = $("#orderGrid_" + htmlPageRef).jqGrid('getAllRows');
		$("#updateSortingParameter_" + htmlPageRef).val(jsonStringUpdates);
		var url = jQuery.contextPath + "/path/repCommon/commonReporting_saveSorting.action";
		myObject = $("#orderGridform_${htmlPageRef}").serialize();
		myObject += "&_pageRef=${htmlPageRef}";
		$.post(url, myObject, function(param) 
		{
			_showErrorMsg("<ps:text name='saved_successfully_key'/>", info_msg_title, 300, 100);
			$('#orderPrevRepDlg_${htmlPageRef}').dialog('close');
		});

	}
	</script>
	<body>

			
						
						<div id="orderGridDiv_${htmlPageRef}">
						<ps:url var="urlTag" action="commonReporting_loadOrderGrid" namespace="/path/repCommon" escapeAmp="false">
							<ps:param name="_pageRef" value="_pageRef"></ps:param>
							<ps:param name="updates1" value="update1"></ps:param>
							<ps:param name="fromAddButton" value="fromAddButton"></ps:param>
						</ps:url>
						<psjg:grid  id="orderGrid_${htmlPageRef}" 
							gridModel="gridModel"
							dataType="json"
							href="%{urlTag}"
							pager="true"
							navigator="true"
							navigatorSearch="false "
							navigatorDelete="false"
							navigatorRefresh="false"
		          			viewrecords="true"
		          			rowNum="5" 
		    	  			rowList="5,10,15,20"
		    	  			editinline="true"
		    	  			editurl="%{urlTag}"
		          			navigatorEdit="false"
		          			addfunc="saveOrderBy"
		          			onGridCompleteTopics="addRetrieveBtn"
		          			
		          			 >
									 <psjg:gridColumn name="entityAliasWithCount" id="entityAliasWithCountOrder" index="entityAliasWithCount"   colType="text" title="%{getText('entities')}"  editable="false" sortable="false" hidden="%{hideEntityCol}" />
				      				 <psjg:gridColumn name="FIELD_ALIAS" id="dbFieldAliasOrder" index="FIELD_ALIAS"  title="%{getText('query.fields')}" colType="text"  editable="false" sortable="false" />
									 <psjg:gridColumn name="order" index="order" id="order" title="%{getText('reporting.order')}" colType="select" editable="true" edittype="select" formatter="select" editoptions="{value:' : ;asc:%{getText('reporting.asc')};desc:%{getText('reporting.desc')}',dataEvents: [{ type: 'click', fn: function() { getPrevOrder(this)}},{ type: 'change', fn: function() { changeOrder(this)}}]}"  sortable="false"/>
									
									 <psjg:gridColumn name="FIELD_DB_NAME" id="FIELD_DB_NAME" index="FIELD_DB_NAME"   colType="text" title="field alias"  editable="false" sortable="false" hidden="true"/>
									 <psjg:gridColumn name="ENTITY_ALIAS" id="entFieldAliasOrder" index="ENTITY_ALIAS"   colType="text" title="entity alias"  editable="false" sortable="false" hidden="true"/>
									 <psjg:gridColumn name="index" id="indexOrder"  index="index"  colType="number" title="ID"  editable="true" sortable="false" key="true" hidden="true"/>
									 <psjg:gridColumn name="groupName" id="groupName"  index="groupName"  colType="text" title="groupName"  editable="true" sortable="false" hidden="true"/>
				      
		    		       </psjg:grid> 
		       
						</div>
						
						<div id="upDownDiv_${htmlPageRef}" style="display: none;">
						<table>
						<tr>
						<td>
							<psj:a button="true" onclick="return moveRow(1);">
 									<ps:text name="order.up"/>
								</psj:a>
							</td>
							<td>	
							<psj:a button="true" onclick="return moveRow(2);">
				  				<ps:text name="order.down"/>
					 		</psj:a>
					 		</td>
					 		<td id ="sortTd_${htmlPageRef}" style="display:none;">	
								<psj:a button="true" onclick="saveSorting();">
					  				<ps:text name="Set_as_default_key"/>
						 		</psj:a>
					 		</td>
					 		</tr>
					 		</table>
						</div>
		
		<ps:form id="orderGridform_${htmlPageRef}" action="commonReporting_validateOrder" namespace="/path/repCommon">
			<ps:hidden name="updates" id="updatesOrder_${htmlPageRef}"></ps:hidden>
			<ps:hidden name="update1" id="update1Order_${htmlPageRef}"></ps:hidden>
			<ps:hidden name="updates1" id="updateSortingParameter_${htmlPageRef}"></ps:hidden>
	   </ps:form>
	</body>
</html>

<script type="text/javascript">
	if(fromPrev=="fromPrev")
	{
			document.getElementById("upDownDiv_${htmlPageRef}").style.display="inline";
	}
	 

</script>

