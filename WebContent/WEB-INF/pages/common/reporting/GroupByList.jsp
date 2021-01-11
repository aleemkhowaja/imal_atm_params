<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<%
	String fromPrev=(String)request.getAttribute("updates");
 %>
<html>
<head>


<script type="text/javascript">
var missingFe = '<ps:text name="group.missingFe"/>';	
var grpSelRowAlert = '<ps:text name="reporting.selectRowAlert"/>';	 
var fromPrev="<%=fromPrev%>";
var retrieveKey = '<ps:text name="retrieve_key"/>';
var deleteConfirmGrp = '<ps:text name="app.deleteConfirm"/>';
var deleteTitleGrp = '<ps:text name="reporting.delete"/>';
if(fromPrev!="prevGrp")
{
	var editor = CKEDITOR.instances.editor1;
}

	$(document).ready(function()
	{
		$("#grpByGrid_"+fromPrev+"_${htmlPageRef}").subscribe('addRetrieveBtn', 
			function(event,data) 
			{
				if(fromPrev=="prevGrp")
				{
					var pagerId = "grpByGrid_"+fromPrev+"_${htmlPageRef}_pager_left";
					var myGrid = $("#grpByGrid_"+fromPrev+"_${htmlPageRef}");
					myGrid.jqGrid('navButtonAdd',pagerId,{caption:"",title: retrieveKey, id:"NewButton_${_pageRef}",
					buttonicon :'ui-icon-play', onClickButton:function()
					{ 
						$('#grpPrevRepDlg_${htmlPageRef}').dialog('close');
				 		refreshRepMenuData("${htmlPageRef}");
					} });
				}
			}
		);
	});	
			function fillGrpByFrm${htmlPageRef}()
			{
				if(fromPrev=="prevGrp")
				{
					emptyGrpForm();
					rowid = $("#grpByGrid_"+fromPrev+"_${htmlPageRef}").jqGrid('getGridParam','selrow');
					myObject = $("#grpByGrid_"+fromPrev+"_${htmlPageRef}").jqGrid('getRowData', rowid);
					$("#grpName_"+fromPrev+"_${_pageRef}").val(myObject["groupName"]);
					$("#qryNameSelect_"+fromPrev+"_${_pageRef}").val(myObject["queryName"]);
					//fill the fields combo
					var zSrc=jQuery.contextPath+ "/path/repCommon/commonReporting_retFieldsComboLst.action";
					params ={};
					params["fieldIndex"]=myObject["fieldIndex"];
					params["qryNamee"]=myObject["queryName"];
					params["_pageRef"]="${_pageRef}"
					$.getJSON(zSrc, params, function( data2, status, xhr ) 
					{
						//fill fields combo 
						for (var i = 0; i < data2['fieldsCmbo'].length; i++)
						{
							var opt = document.createElement("option"); // Create the new element
							opt.text = data2['fieldsCmbo'][i]['feName']; // set the value
							opt.value =  data2['fieldsCmbo'][i]['index']; // set the text
							document.getElementById("qryField_"+fromPrev+"_${_pageRef}").options[i]=opt;
						}
						
						$("#qryField_"+fromPrev+"_${_pageRef}").val(myObject["fieldIndex"]);
					});
				}
			}

function validateGroup()
{
	//check if emptyyyy
	if($("#grpName_"+fromPrev+"_${_pageRef}").val()=="" || $("#qryNameSelect_"+fromPrev+"_${_pageRef}").val()=="" || $("#qryField_"+fromPrev+"_${_pageRef}").val()=="")
	{
		_showErrorMsg(missingFe);
		return false;
	}
	
	//save
	var groupName = $("#grpName_"+fromPrev+"_${_pageRef}").val();
	var selRowId = $("#grpByGrid_"+fromPrev+"_${htmlPageRef}").jqGrid('getGridParam','selrow');
	var url = jQuery.contextPath+ "/path/repCommon/commonReporting_addNewGroup.action";
	params = {};
	params["updates"]=fromPrev;
	params['qryNamee']=$("#qryNameSelect_"+fromPrev+"_${_pageRef}").val();
	params['grpName']=groupName;
	params['qryField']=$("#qryField_"+fromPrev+"_${_pageRef}").val();
	params["_pageRef"]="${_pageRef}";
	params["updates1"]=selRowId;
	params['qryFieldName']=document.getElementById('qryField_'+fromPrev+"_${_pageRef}").options[document.getElementById('qryField_'+fromPrev+"_${_pageRef}").selectedIndex].text;
	
	
	$.get(url, params , function( json )
	{
	
	  if(fromPrev!="prevGrp")
	  {
			var htmlTableId = json["htmlTableId"];
	
			newRow =  editor.document.createElement( 'tr' );
			if(htmlTableId == "root")
			{
				newRow.setAttribute( 'height', '45' );
			}
			else {
				newRow.setAttribute( 'height', '20' );
			}
			newRow.setAttribute( 'id', 'group_header_'+groupName );
			newRow.setAttribute( 'expression', groupName );
	
			if(htmlTableId == "root")
			{
				newCell =  editor.document.createElement( 'td' );
				newCell.setAttribute( 'style', "BACKGROUND: url(${pageContext.request.contextPath}/ckeditor/images/groupHeader.JPG) no-repeat center" );
				newCell.setAttribute( 'valign', 'top' );
				br =  editor.document.createElement( 'br' );
				newCell.append(br);
				newRow.append(newCell);
			}
			else {
				var cellsNbr = editor.document.getById( htmlTableId+'_detail' ).$.cells.length;
				for (var i=0; i<cellsNbr; i++)
				{
					newCell =  editor.document.createElement( 'td' );
					newCell.setAttribute( 'style', 'text-align: center' );
					newCell.setAttribute( 'bgColor', "#F0F8FF" );
					newCell.append(editor.document.createElement( 'br' ));
					newRow.append(newCell);
				}
			}
	
			var detailRow = editor.document.getById( htmlTableId+'_detail' );
			newRow.insertBefore( detailRow );
			
			var orderMsg = json["orderMsg"];
			if(orderMsg=="isNotQuerySyntax")
			{
				_showErrorMsg( "<ps:text name='designer.setOrder'/> '"+$("#qryField_${updates}_${_pageRef} option:selected").text()+"' .<ps:text name='designer.changeOrder'/>","");
			}
			else
			{
				_showErrorMsg( "<ps:text name='designer.setOrderSyntax'/> '"+$("#qryField_${updates}_${_pageRef} option:selected").text()+"' <ps:text name='designer.querySyntax'/>","");
				
			}
		}

		//_showErrorMsg( "<ps:text name='designer.setOrder'/> '"+$("#qryField_${updates}_${_pageRef} option:selected").text()+"' .<ps:text name='designer.changeOrder'/>","");


		$('#groupDialog').dialog('close');
		$("#grpByGrid_"+fromPrev+"_${htmlPageRef}").trigger("reloadGrid");
		//empty form
		emptyGrpForm();
		
		
	});
	return false;	
}

function emptyGrpForm()
{
	$("#grpName_"+fromPrev+"_${_pageRef}").val("");
	$("#qryNameSelect_"+fromPrev+"_${_pageRef}").val("");

	$('#qryField_${updates}_${_pageRef} option').each(function(index, option) {
				    $(option).remove();
				});
}

function deleteGrpBy(sel_row_index)
{
	var args = {selRow: sel_row_index};
	_showConfirmMsg(deleteConfirmGrp, deleteTitleGrp, "deleteGrouping", args);
}

function deleteGrouping(confirmation, args)
{
	var selRow = args.selRow;
	if(confirmation)
	{
		var grpId=$("#grpByGrid_"+fromPrev+"_${htmlPageRef}").jqGrid('getCell', selRow,'fieldIndex');
		var queryName=$("#grpByGrid_"+fromPrev+"_${htmlPageRef}").jqGrid('getCell', selRow,'queryName');
		var groupName = $("#grpByGrid_"+fromPrev+"_${htmlPageRef}").jqGrid('getCell', selRow,'groupName');
		var feIndex = $("#grpByGrid_"+fromPrev+"_${htmlPageRef}").jqGrid('getCell', selRow,'fieldIndex');
		var feAlias = $("#grpByGrid_"+fromPrev+"_${htmlPageRef}").jqGrid('getCell', selRow,'fieldName');
	    var url = jQuery.contextPath+ "/path/repCommon/commonReporting_deleteGroup.action";
	    params = {};
	    params['grpId']= selRow;
		params['qryNamee']=queryName;
	    params['updates']=fromPrev;
	    params['_pageRef']="${_pageRef}";
	    $.get(url, params , function( param )
	 	{   
	 	    if(fromPrev!="prevGrp") 
	 	    {
		 	    var grpRow = editor.document.getById( 'group_header_'+groupName );
				grpRow.remove();
	 	    }
			
	   	  	$("#grpByGrid_"+fromPrev+"_${htmlPageRef}").trigger("reloadGrid");
	   	  	//add the deleted field to the fieldsCombo
	   	  	var qryNameCmb =$("#qryNameSelect_"+fromPrev+"_${_pageRef}").val();
	   	  	if($("#qryNameSelect_"+fromPrev+"_${_pageRef}").val()!="" && qryNameCmb==queryName)
	   	  	{
	   	  		 var qryVal = document.getElementById("qryField_"+fromPrev+"_${_pageRef}");
	   	   		 qryVal.options[qryVal.options.length]=new Option(feAlias,feIndex);
	   	  	}
	   	  	
	   	  	//emptyForm
	   	  	emptyGrpForm();
	 	});
	}
}

function moveGrpRow(calledFrom)
{
		var selRowId = $("#grpByGrid_"+fromPrev+"_${htmlPageRef}").jqGrid('getGridParam','selrow');
	 	if(selRowId==null)
	 	{
	 		_showErrorMsg(grpSelRowAlert,warning_msg_title); 
			return;
	 	}
	 	var url= "${pageContext.request.contextPath}/path/repCommon/commonReporting_changeGrpPosition.action"
	    var params ={};
	    params["_pageRef"]="${_pageRef}";
	    params["updates"]=selRowId+"~"+calledFrom+"~"+fromPrev;
	    $.post(url, params , function( param )
		{
			$("#grpByGrid_"+fromPrev+"_${htmlPageRef}").trigger("reloadGrid");
			 window.setTimeout("delayGrpFunc("+selRowId+")" ,500);
		});
}

 function delayGrpFunc(objj)
 {
 	$("#grpByGrid_"+fromPrev+"_${htmlPageRef}").jqGrid("setSelection",objj,true);
 }
 
</script>
</head>

<body> 
<form>
 
  	 <div>
		<h1 class="headerPortionContent ui-widget ui-state-default">
			<ps:label value="%{getText('group.groupList')}"/>
		</h1>
     </div>
     <div id="gridContentGrpBy_${updates}_${_pageRef}" style="overflow: hidden;width:100%;padding: 2px">
	  	<ps:url id="grpByUrl_${updates}_${htmlPageRef}" escapeAmp="false" action="commonReporting_loadGroupByList" namespace="/path/repCommon">
	  	 <ps:param name="_pageRef" value="_pageRef"></ps:param>
	  	 <ps:param name="updates" value="updates"></ps:param>
	  	</ps:url>   
	    <psjg:grid
	    	id="grpByGrid_${updates}_${htmlPageRef}"
	    	dataType="json" 
	    	href="%{grpByUrl_${updates}_${htmlPageRef}}" 
	    	gridModel="gridModel"
	    	pager="true" 
	    	rowNum="5"
	    	rowList="5,10,15,20"
	    	viewrecords="true"
	    	navigator="true"			    		
	    	onErrorTopics="loadError"
	    	navigatorEdit="false"
	    	navigatorAdd="true"
	    	addfunc="validateGroup"
			navigatorRefresh="false"
			navigatorSearch="false"
			delfunc="deleteGrpBy"
			ondblclick="fillGrpByFrm${htmlPageRef}()"
			onGridCompleteTopics="addRetrieveBtn"		    	
	     >
			  <psjg:gridColumn name="fieldIndex" index="fieldIndex" id="field_Index" title="Id" colType="number"  editable="false" sortable="false" key="true" hidden="true"/>
			  <psjg:gridColumn name="groupName" index="groupName" id="group_Name" title="%{getText('group.groupName')}" colType="text"  editable="false" sortable="false"   />
		      <psjg:gridColumn name="queryName" index="queryName" id="query_Name" title="%{getText('queryName')}" colType="text"  editable="false" sortable="false" />
			  <psjg:gridColumn name="fieldName" index="fieldName" id="field_Name" title="%{getText('reporting.fieldName')}" colType="text"  editable="false" sortable="false"   />
			  <psjg:gridColumn name="feAlias" index="feAlias" id="field_Alias" title="field Alias" colType="text"  editable="false" sortable="false"  hidden="true" />
				     
	    </psjg:grid>
 	</div>
  
  	<div id="grpByDiv_${updates}_${_pageRef}" style="display: none;">
		<psj:a button="true" onclick="return moveGrpRow(1);">
					<ps:text name="order.up"/>
			</psj:a>
			
		<psj:a button="true" onclick="return moveGrpRow(2);">
 				<ps:text name="order.down"/>
 		</psj:a>
	</div>
  
  
  
	  <div>
			<h1 class="headerPortionContent ui-widget ui-state-default">
				<ps:label value="%{getText('group.groupDetails')}"/>
			</h1>
	  </div>
 	 <div class="headerPortion">
 	    <ps:form id="grpFrmId_${updates}_${_pageRef}" name="grpFrmId" action="commonReporting_addNewGroup" namespace="/path/repCommon"  method="POST" >
			<table class="headerPortionContent ui-widget-content" width="80%" >
				<tr>
			 		 <td nowrap="nowrap" align="left" width="80px"><ps:label value="%{getText('group.groupName')}"/></td>
					 <td nowrap="nowrap"><ps:textfield name="grpName" id="grpName_${updates}_${_pageRef}" ></ps:textfield></td>
				</tr>
				<tr>
			 		 <td nowrap="nowrap" align="left"><ps:label value="%{getText('queryName')}"/></td>
					 <td nowrap="nowrap">
						 <ps:select name="qryName" id="qryNameSelect_${updates}_${_pageRef}" list="queriesCmbo"
									listKey="grpByQryName" listValue="QUERY_NAME" emptyOption="true"
									dependency="qryField_${updates}_${_pageRef}:fieldsCmbo"
									dependencySrc="${pageContext.request.contextPath}/path/repCommon/commonReporting_qryFieldDependency?_pageRef=${_pageRef}"
									parameter="qryNamee:qryNameSelect_${updates}_${_pageRef},updates:updateGrp_${updates}_${_pageRef}"
									>
						</ps:select>
					 </td>
				</tr>
				<tr>
			 		 <td nowrap="nowrap" align="left"><ps:label value="%{getText('reporting.fieldName')}"/></td>
					 <td nowrap="nowrap">
					 	<ps:select name="qryField" id="qryField_${updates}_${_pageRef}" list="fieldsCmbo"
								listKey="index" listValue="feName" emptyOption="false">
						</ps:select>
					 </td>
				</tr>
			</table>
		</ps:form>
  </div>

  <div id="butBarGrp_${updates}_${_pageRef}">
  <ps:hidden name="updates" id="updateGrp_${updates}_${_pageRef}"></ps:hidden>
  </div>
</form>
</body>
</html>

<script type="text/javascript">
	if(fromPrev=="prevGrp")
	{
			document.getElementById("grpByDiv_"+fromPrev+"_${_pageRef}").style.display="inline";
	}
</script>