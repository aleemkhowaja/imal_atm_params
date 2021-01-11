<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<html>
<head> 
<script type="text/javascript">
var condFeRequAlert = '<ps:text name="conditions.condFeRequired"/>';
var fromPrev=$("#filterPrev_${_pageRef}").val();
var retrieveKey = '<ps:text name="retrieve_key"/>';
var deleteConfirmCond = '<ps:text name="app.deleteConfirm"/>';
var deleteTitleCond = '<ps:text name="reporting.delete"/>';
$(document).ready(function () 
{
	$("#conditionGrid_${htmlPageRef}").subscribe('applyConjunction', function(event,data) 
	{
		var condCount=$("#conditionGrid_${htmlPageRef}").jqGrid('getGridParam','records');
		if(condCount>0)
		{
				$("#conjunction_${_pageRef}").val("And");
		}
		
		if(fromPrev=="prevFilter")
		{
			var pagerId = "conditionGrid_${htmlPageRef}"+"_pager_left";
			var myGrid = $("#conditionGrid_${htmlPageRef}");
			myGrid.jqGrid('navButtonAdd',pagerId,{caption:"",title: retrieveKey, id:"NewButton_${_pageRef}",
			buttonicon :'ui-icon-play', onClickButton:function()
			{ 
				$('#filterPrevRepDlg_${htmlPageRef}').dialog('close');
		 		refreshRepMenuData("${htmlPageRef}");
			} });
		}
		
	});		
}
);

		function conditionRowClicked()
		{
			rowid = $('#conditionGrid_${htmlPageRef}').jqGrid('getGridParam','selrow');
			myObject = $("#conditionGrid_${htmlPageRef}").jqGrid('getRowData', rowid);

			var zSrc="${pageContext.request.contextPath}//path/repCommon/commonReporting_findSingleCondition.action" ;
			params ={};
			params["locIndex"]=myObject["index"];
			params["update1"]=$("#filterPrev_${_pageRef}").val();
			params["_pageRef"]="${_pageRef}";
			$.getJSON(zSrc, params, function( data2, status, xhr ) 
			{
				var opList = data2['operatorsList'];
				var myArray = null;
				if(myObject["field1.FIELD_DATA_TYPE"] == "java.lang.String")
				{
					myArray = opList.filter(function( obj ) {
					    return obj["LOV_TYPE_ID"] == "8";
					});
					data2['operatorsList'] = myArray;

					$("#operator_${_pageRef}").empty();
					$.each(myArray, function(i, option) {
				        $("#operator_${_pageRef}").append($('<option/>').attr("value", option.VALUE_CODE).text(option.VALUE_DESC));
				    });					
				}
				else if(myObject["field1.FIELD_DATA_TYPE"] == "java.math.BigDecimal")
				{
					myArray = opList.filter(function( obj ) {
					    return obj["LOV_TYPE_ID"] == "7";
					});
					data2['operatorsList'] = myArray;
					$("#operator_${_pageRef}").empty();
					$.each(myArray, function(i, option) {
				        $("#operator_${_pageRef}").append($('<option/>').attr("value", option.VALUE_CODE).text(option.VALUE_DESC));
				    });
				}
				//empty form
				$("#ARGUMENT1Cond_${_pageRef}").val("");
				$("#ARGUMENT2Cond_${_pageRef}").val("");
				$("#customArgument_${_pageRef}").val("");
				//fill form
				
				var qryType=$("#qryType_${_pageRef}").val();
				if(qryType!="sqb")
				{
					$("#conditionEntity_${_pageRef}").val(data2['conditionObject']['entity1']['index']);
				}
				$("#conditionIndex_${_pageRef}").val(data2['conditionObject']['index']);
				
				$("#conjunction_${_pageRef}").val(data2['conditionObject']['conjunction']);
				$("#rpar_${_pageRef}").val(data2['conditionObject']['rparenthesis']);
				$("#lpar_${_pageRef}").val(data2['conditionObject']['lparenthesis']);
				if(data2['conditionObject']['argument2']!=null)
				{
					$("#ARGUMENT2Cond_${_pageRef}").val(data2['conditionObject']['argument2']['index']);
				}
				if(data2['conditionObject']['argument1']!=null)
				{
					$("#ARGUMENT1Cond_${_pageRef}").val(data2['conditionObject']['argument1']['index']);
				}
				if(data2['conditionObject']['operator']!=null)
				{
					$("#operator_${_pageRef}").val(data2['conditionObject']['operator']);
				}
				$("#customArgument_${_pageRef}").val(data2['conditionObject']['value']);
				$('#conditionField_${_pageRef} option').each(function(index, option) {
				    $(option).remove();
				});
				
				for (var i = 0; i < data2['fields1'].length; i++)// we should use the document.createElement("option") instead of append to work on ie7 
					{
						var opt = document.createElement("option"); // Create the new element
						opt.text = data2['fields1'][i]['FIELD_ALIAS']; // set the value
						opt.value =  data2['fields1'][i]['FIELD_DB_NAME']; // set the text
						document.getElementById("conditionField_${_pageRef}").options[i]=opt;
					}
				
//				for (var i = 0; i < data2['fields1'].length; i++)
//				{
//					$("#conditionField_${_pageRef}").append(new Option(data2['fields1'][i]['FIELD_ALIAS'],data2['fields1'][i]['FIELD_DB_NAME']));
//				}
				
				$("#conditionField_${_pageRef}").val(data2['conditionObject']['field1']['FIELD_DB_NAME']);
			});
			
			//$("#operator_${_pageRef}").remove();
			
			$('#operator_${_pageRef} option').each(function(index, option) {
		    //$(option).remove();
		    	
		    	
		    	
//		    if(myObject["field1.FIELD_DATA_TYPE"]== "java.sql.Timestamp" || myObject["field1.FIELD_DATA_TYPE"]== "java.math.Date" || myObject["field1.FIELD_DATA_TYPE"]=="java.util.Date")
//		    {
//			    $("option[value='<>']").remove();
//		    }
//		    else
//		    {
//				$("option[value='<>']").remove();
//			    
//			    var myOptions = {
//				    contains : '<>'
//				};
//				var mySelect = $("#operator_${_pageRef}");
//			    mySelect.append($("<option></option>").val("<>").html("<>"));
//		    }
		    
		    if(myObject["field1.FIELD_DATA_TYPE"]!= "java.lang.String")
		    {
			    $("option[value='contains']").remove();
			    $("option[value='startsWith']").remove();
			    $("option[value='endsWith']").remove();
		    }
		    else
		    {
				$("option[value='contains']").remove();
			    $("option[value='startsWith']").remove();
			    $("option[value='endsWith']").remove();
			    
			    var myOptions = {
				    contains : 'contains',
				    startsWith : 'Starts with',
				    endsWith : 'Ends with'
				};
				var mySelect = $("#operator_${_pageRef}");
//				    mySelect.append(
//				        $('<option></option>').val(myOptions).html(text)
//			    );
			    //mySelect.append("<option value="1 ">"Bangalore"</option>");
			    mySelect.append($("<option></option>").val("contains").html("contains"));
			    mySelect.append($("<option></option>").val("startsWith").html("Starts with"));
			    mySelect.append($("<option></option>").val("endsWith").html("Ends with"));
		    }
		    
		});

	}
	function entityChanged()
	{
		$("#conditionField_${_pageRef}").val("");
	}
	function emptyForm()
	{
		$("#conjunction_${_pageRef}").val("And");
		$("#rpar_${_pageRef}").val("");
		$("#ARGUMENT2Cond_${_pageRef}").val("");
		$("#ARGUMENT1Cond_${_pageRef}").val("");
		$("#operator_${_pageRef}").val("");
		
	
		var qryType=$("#qryType_${_pageRef}").val();
		$("#conditionField_${_pageRef}").val("");
		$("#conditionEntity_${_pageRef}").val("");
		if(qryType!="sqb")
		{
			$('#conditionField_${_pageRef} option').each(function(index, option) {
		    $(option).remove();
		});
		}
		
		
		$("#lpar_${_pageRef}").val("");
		$("#customArgument_${_pageRef}").val("");
		$("#conditionIndex_${_pageRef}").val("");
	

	}
	function requiredCondFieldsFilled()
	{
		if($("#conditionField_${_pageRef}").val()==null || $("#conditionField_${_pageRef}").val()=="" || $("#operator_${_pageRef}").val()=="" || 
				($("#ARGUMENT1Cond_${_pageRef}").val()==""	&& $("#ARGUMENT2Cond_${_pageRef}").val() == "" && $("#customArgument_${_pageRef}").val() == ""))
		{
			_showErrorMsg(condFeRequAlert);
			return 0;
		}
		return 1;
	}
	function addCondition()
	{
		if(!requiredCondFieldsFilled())
			return;
		parseNumbers();
		
		var url1 = '${pageContext.request.contextPath}/path/repCommon/commonReporting_addUpdateCondition.action';
		 var myObject =  $("#conditionForm_${_pageRef}").serialize();
		 myObject+="&_pageRef=${_pageRef}";
		$.post(	url1,myObject,
				function(data)
				{
					$("#conditionGrid_${htmlPageRef}").trigger("reloadGrid");
					$("#conjunction_${_pageRef}").attr("disabled",false);
				}
			);//post
			emptyForm();

	}
	function deleteCondition(rowid) 
	{
		 var args = {rowid: rowid};
		_showConfirmMsg(deleteConfirmCond, deleteTitleCond, "deleteTheConditon", args);
	}

	function deleteTheConditon(confirmation, args)
	{
		if(confirmation)
		{
			rowid=args.rowid
			parseNumbers();
			var lineNumber = $("#conditionGrid_${htmlPageRef}").jqGrid('getCell', rowid,'index');
			var url1 = '${pageContext.request.contextPath}/path/repCommon/commonReporting_deleteCondition.action';
			var param={};
			param["update1"]=$("#filterPrev_${_pageRef}").val();
			param["locIndex"]=lineNumber;
			param["_pageRef"]="${_pageRef}";
			$.get(url1,param,function(param) 
					{
						$("#conditionGrid_${htmlPageRef}").trigger("reloadGrid");
						emptyForm();
						if(param['conditionRecordsCount'] > 0)
							$("#conjunction_${_pageRef}").attr("disabled",false);
						else{
							$("#conjunction_${_pageRef}").attr("disabled",true);
							$("#conjunction_${_pageRef}").val("");
						}
					}
			);//get
		}
	}
</script>
</head>
	<style type="text/css">
	 	.headerPortion 
		{
			padding: 0 0 5px 0;
		}
		.headerPortionContent 
		{
			padding: 0 10px 0 10px;
		}
		form div,table,ul,li 
		{
			font: 8pt Tahoma;	 
		}
	</style> 
<body>
<div>
<form id="conditionForm_${_pageRef}">
<ps:url id="urlTag" action="commonReporting_conditionGridUrl" escapeAmp="false"
	namespace="/path/repCommon">
	<ps:param name="_pageRef" value="_pageRef"></ps:param>
	<ps:param name="update1" value="update1"></ps:param>
	</ps:url>
<table width="100%" border="0">
<tr>
<td colspan="8">
<psjg:grid id="conditionGrid_${htmlPageRef}" gridModel="gridModel" dataType="json"
	href="%{urlTag}" pager="true" navigator="true" navigatorSearch="false "
	viewrecords="true" rowNum="5" rowList="5,10,15,20" editinline="true"
	navigatorEdit="false" addfunc="addCondition" navigatorRefresh="false"
	delfunc="deleteCondition" onGridCompleteTopics="applyConjunction"
	ondblclick="conditionRowClicked()"
	>
	<psjg:gridColumn name="index" index="index"
		id="index" title="none"
		colType="text" editable="false" sortable="true" hidden="true" />
	<psjg:gridColumn name="conjunction" index="conjunction"
		id="conjunction" width="7"
		title="%{getText('cnd.Conjunction')}" colType="text"
		editable="false" sortable="true" hidden="true"/>
	<psjg:gridColumn name="conjunctionName" index="conjunctionName"
		id="conjunctionName" width="7"
		title="%{getText('cnd.Conjunction')}" colType="text"
		editable="false" sortable="true" />
	<psjg:gridColumn name="lparenthesis" index="lparenthesis"
		id="lparenthesis" width="7" title="("
		colType="text" editable="false" sortable="true" />
	<psjg:gridColumn name="entity1.ENTITY_ALIAS" index="ENTITY_ALIAS"
		id="FIELD_DB_NAME" width="7"
		title="%{getText('jn.entity1')}" colType="text"
		editable="false" sortable="true" hidden="true"/>
		
	<psjg:gridColumn name="entity1.entityAliasWithCount" index="entityAliasWithCount"
		id="entityAliasWithCount" width="7"
		title="%{getText('jn.entity1')}" colType="text"
		editable="false" sortable="true"  hidden="%{hideEntGrid}" />
	
	<psjg:gridColumn name="field1.FIELD_ALIAS" index="field1"
		id="field1" width="7"
		title="%{getText('jn.field1')}" colType="text"
		editable="false" sortable="true" />
		
	<psjg:gridColumn name="operator" index="operator"
		id="operator" width="7"
		title="%{getText('operator')}" colType="text"
		editable="false" sortable="true" hidden="true"/>
	
	<psjg:gridColumn name="operatorName" index="operatorName"
		id="operatorName" width="7"
		title="%{getText('operator')}" colType="text"
		editable="false" sortable="true" hidden="false"/>
	
		
	<psjg:gridColumn name="argument1.ARGUMENT_NAME" index="argument1_argumentName"
		id="argument1_argumentName" width="7"
		title="%{getText('cnd.Argument1')}" colType="text"
		editable="false" sortable="true" hidden="%{hideArgsGrid}" />

	<psjg:gridColumn name="argument2.ARGUMENT_NAME" index="argument2_argumentName"
		id="argument2_argumentName" width="7"
		title="%{getText('cnd.Argument2')}" colType="text"
		editable="false" sortable="true" hidden="%{hideArgsGrid}"/>

	<psjg:gridColumn name="value" index="value"
		id="value" width="7"
		title="%{getText('cnd.Value')}" colType="text"
		editable="false" sortable="true" hidden="false"/>
		
	<psjg:gridColumn name="rparenthesis" index="rparenthesis"
		id="rparenthesis" width="7"
		title=")" colType="text"
		editable="false" sortable="true" />
		
		
	<psjg:gridColumn name="field1.FIELD_DATA_TYPE" index="field1.FIELD_DATA_TYPE"
		id="field1.FIELD_DATA_TYPE" width="7"
		title="data type" colType="text"
		editable="false" sortable="true" hidden="true"/>
			
	</psjg:grid>
</td>
</tr>
	<tr>
		<td>
			<ps:label value="%{getText('cnd.Conjunction')}"></ps:label>
		</td>
		<td>
			<ps:label value="("></ps:label>
		</td>
		<td>
			<ps:label value="%{getText('cnd.Field')}"></ps:label>
		</td>
		<td>
			<ps:label value="%{getText('operator')}"></ps:label>
		</td>
		<td >
			<span style="display: none" id="arg1Lbl_${_pageRef}">
			<ps:label value="%{getText('cnd.Argument1')}"></ps:label>
			</span>
		</td>
		<td>
			<span style="display: none"  id="arg2Lbl_${_pageRef}">
			<ps:label value="%{getText('cnd.Argument2')}"></ps:label>
			</span>
		</td>
		<td>
			<ps:label value="%{getText('cnd.Value')}"></ps:label>
		</td>
		<td>
			<ps:label value=")"></ps:label>
		</td>

	</tr>
	<tr>
		<td>
			<ps:select id="conjunction_${_pageRef}" list="conjunctionsList" emptyOption="true" listKey="VALUE_CODE" listValue="VALUE_DESC" name="conditionObject.conjunction" disabled="%{condConjunctionDisabled}"></ps:select>
		</td>
		<td>
		<ps:hidden id="conditionIndex_${_pageRef}" name="conditionIndex" value=""></ps:hidden>
			<ps:select id="lpar_${_pageRef}" list="#{'(':'('}" emptyOption="true" name="conditionObject.lparenthesis"></ps:select>
		</td>
		<td >
		<span id="entSelect_${_pageRef}" style="display: none;">
			<ps:select name="conditionEntity" id="conditionEntity_${_pageRef}" list="entitiesList" 
				listKey="index" listValue="entityAliasWithCount" emptyOption="true"
				dependency="conditionField_${_pageRef}:fields1"
				dependencySrc="${pageContext.request.contextPath}/path/repCommon/commonReporting_conditionEntityChange"
				parameter="conditionEntity:conditionEntity_${_pageRef},update1:filterPrev_${_pageRef},_pageRef:condPgRef_${_pageRef}"
				onchange="entityChanged()">
			</ps:select>
			</span>
			<span>
			<ps:select name="conditionField" id="conditionField_${_pageRef}" list="fields1"
					   dependency="operator_${_pageRef}:operatorsList"
					   dependencySrc="${pageContext.request.contextPath}/path/repCommon/commonReporting_operatorChange"
					   parameter="conditionField:conditionField_${_pageRef},_pageRef:_pageRef,conditionEntity:conditionEntity_${_pageRef},update1:filterPrev_${_pageRef}"
					   listKey="FIELD_DB_NAME" listValue="FIELD_ALIAS" emptyOption="%{emptyOptionFe}">
			</ps:select>
			</span>
		</td>
		<td>
			<ps:select name="conditionObject.operator" id="operator_${_pageRef}" list="operatorsList"
				listKey="VALUE_CODE" listValue="VALUE_DESC"
				parameter="updates:operator_${_pageRef}"
				dependency="ARGUMENT2Cond_${_pageRef}:updates"
			    dependencySrc="${pageContext.request.contextPath}/path/repCommon/commonReporting_showHideSecondArg">
			</ps:select>
		</td>
		<td >
		<span style="display: none" id="arg1Select_${_pageRef}">
			<ps:select name="ARGUMENT1" id="ARGUMENT1Cond_${_pageRef}" list="argumentsList"
				listKey="index" listValue="ARGUMENT_NAME" emptyOption="true">
			</ps:select>
			</span>
		</td>
		<td >
		<span style="display: none" id="arg2Select_${_pageRef}">
			<ps:select name="ARGUMENT2" id="ARGUMENT2Cond_${_pageRef}" list="argumentsList"
				listKey="index" listValue="ARGUMENT_NAME" emptyOption="true">
			</ps:select>
			</span>
		</td>
		<td>
			<ps:textfield name="conditionObject.value"
				id="customArgument_${_pageRef}"></ps:textfield>
		</td>
		<td>
			<ps:select id="rpar_${_pageRef}" list="#{')':')'}" emptyOption="true" name="conditionObject.rparenthesis"></ps:select>
		</td>

	</tr>
</table>
<ps:hidden id="filterPrev_${_pageRef}" name="update1"></ps:hidden>
<ps:hidden id="qryType_${_pageRef}" name="qryType"></ps:hidden>
</form>
</div>
<ps:hidden name="_pageRef" id="condPgRef_${_pageRef}"></ps:hidden>
</html>

<script type="text/javascript">
	var qryType=$("#qryType_${_pageRef}").val();
	if(fromPrev=="" || fromPrev==null)
	{
			document.getElementById("arg1Lbl_${_pageRef}").style.display="inline";
			document.getElementById("arg2Lbl_${_pageRef}").style.display="inline";
			document.getElementById("arg1Select_${_pageRef}").style.display="inline";
			document.getElementById("arg2Select_${_pageRef}").style.display="inline";
			document.getElementById("entSelect_${_pageRef}").style.display="inline";
	}
	else if(fromPrev=="prevFilter" && qryType =="qbe")
	{
		document.getElementById("entSelect_${_pageRef}").style.display="inline";
	}
</script>