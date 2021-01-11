<#--
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
-->
<#assign colName="${parameters.name?string?replace('.', '_')}">
<#assign escapedOptionId="${parameters.grid?string?replace('.', '_')}">
options_${escapedOptionId?html}_colmodels_${colName} = {<#t/>
	name : "${parameters.name?string}"<#t/>
<#if parameters.jsonmap?if_exists != "">
	,jsonmap : "${parameters.jsonmap?html}"<#t/>
<#else>
	,jsonmap : "${parameters.name?html}"<#t/>
</#if>
<#if parameters.index?if_exists != "">
	,index : "${parameters.index?html}"<#t/>
</#if>
<#if parameters.width?if_exists != "">
	,width : ${parameters.width?html}<#t/>
</#if>
<#if parameters.editoptions?if_exists != "">
	,editoptions : ${parameters.editoptions?string}<#t/>
</#if>
<#if parameters.edittype?if_exists != "">
	,edittype : "${parameters.edittype?html}"<#t/>
</#if>
<#if parameters.editrules?if_exists != "">
	,editrules : ${parameters.editrules?html}<#t/>
</#if>
<#if parameters.formoptions?if_exists != "">
	,formoptions : ${parameters.formoptions?html}<#t/>
</#if>
<#if parameters.formatter?if_exists != "">
	<#if parameters.formatter == "integer" 
		|| parameters.formatter == "number" 
		|| parameters.formatter == "currency" 
		|| parameters.formatter == "date" 
		|| parameters.formatter == "email" 
		|| parameters.formatter == "link" 
		|| parameters.formatter == "showlink" 
		|| parameters.formatter == "checkbox" 
		|| parameters.formatter == "select" 
		>
		,formatter : "${parameters.formatter?html}"<#t/>
	<#else>
		,formatter : ${parameters.formatter?html}<#t/>
		<#if parameters.unformat?if_exists != "">
			,unformat : ${parameters.unformat?html}<#t/>
		</#if>
	</#if>
</#if>
<#if parameters.formatoptions?if_exists != "">
,formatoptions : ${parameters.formatoptions?html}<#t/>
</#if>
<#if parameters.align?if_exists != "">
,align : "${parameters.align?html}"<#t/>
</#if>
<#if parameters.cssClass?if_exists != "">
,classes : "${parameters.cssClass?html}"<#t/>
</#if>
<#if parameters.editable?default(false)>
,editable : true<#t/>
<#else>
,editable : false<#t/>
</#if>
<#if parameters.sortable?default(true)>
,sortable : true<#t/>
<#else>
,sortable : false<#t/>
</#if>
<#if parameters.sorttype?if_exists != "">
,sorttype : "${parameters.sorttype?html}"<#t/>
</#if>
<#if parameters.resizable?default(true)>
,resizable : true<#t/>
<#else>
,resizable : false<#t/>
</#if>
<#if parameters.search?default(true)>
,search : true
	<#if parameters.searchtype?if_exists != "">
	,stype = "${parameters.searchtype?html}"<#t/>
	</#if>
<#else>
	,search : false<#t/>
</#if>
<#if parameters.key?default(false)>
,key : true<#t/>
</#if>
<#if parameters.fromCustomization?default(false)>
,fromCustomization : true<#t/>
</#if>
<#if parameters.hidedlg?default(false)>
,hidedlg : true<#t/>
</#if>
<#if parameters.hidden?default(false)>
,hasHiddenCols : true<#t/>
,hidden : true<#t/>
</#if>
<#if parameters.defval?if_exists != "">
,defval : "${parameters.defval?html}"<#t/>
</#if>
<#if parameters.surl?if_exists != "">
,surl : "${parameters.surl?string}"<#t/>
</#if>
<#if parameters.searchoptions?if_exists != "">
,searchoptions : ${parameters.searchoptions?html}<#t/>
</#if>
<#if parameters.maxDisplayLen?if_exists != "">
,maxDisplayLen : '${parameters.maxDisplayLen?html}'<#t/>
</#if>
<#if parameters.colType?if_exists != "">
,colType : "${parameters.colType?html}"<#t/>
	<#if parameters.colType == "number">
		,searchtype : "${parameters.colType?html}"<#t/>
		,searchrules : {"number":true}<#t/>
		<#if parameters.minValue?if_exists != "">
			,minValue : ${parameters.minValue?html}<#t/>
		</#if>	
		<#if parameters.maxValue?if_exists != "">
			,maxValue : '${parameters.maxValue?html}'<#t/>
		</#if>	
		<#if parameters.maxLenBeforeDec?if_exists != "">
			,maxLenBeforeDec : '${parameters.maxLenBeforeDec?html}'<#t/>
		</#if>	
	<#elseif parameters.colType == "liveSearch">
		,dataAction : "${parameters.dataAction?default('')}"<#t/>
		,resultList : "${parameters.resultList?default('')}"<#t/>
		,autoSearch : "${parameters.autoSearch?default('false')}"<#t/>
		,onOkMethod : "${parameters.onOkMethod?default('')}"<#t/>
		,searchElement : "${parameters.searchElement?default('')}"<#t/>
		,paramList : "${parameters.paramList?default('')}"<#t/>
		,cssStyle : "${parameters.cssStyle?default('')}"<#t/>
		
		<#if parameters.dontLoadData?if_exists != "">
		,dontLoadData : "${parameters.dontLoadData?html}"<#t/>
		</#if>
		
		<#if parameters.mode?if_exists != "">
			,mode : "${parameters.mode?html}"<#t/>
			<#if parameters.minValue?if_exists != "">
				,minValue : ${parameters.minValue?html}<#t/>
			</#if>	
			<#if parameters.maxValue?if_exists != "">
				,maxValue : ${parameters.maxValue?html}<#t/>
			</#if>	
		</#if>
		<#-- [TP#1043972] OnChange Event For Grid Column- Editable Grid Customization Enhancements -->
		<#if parameters.customBtnData?if_exists != "">
		 	,customBtnData : "${parameters.customBtnData?string?replace('\"', '\\"')}"<#t/>
		</#if>
	<#elseif parameters.colType == "dialog">
	  	,paramList : "${parameters.paramList?default('')}"<#t/>
	</#if>
</#if>
<#if parameters.searchType?if_exists != "">
,searchtype : "${parameters.searchType?html}"<#t/>
</#if>
<#if parameters.searchRules?if_exists != "">
,searchrules : "${parameters.searchRules?html}"<#t/>
</#if>
<#if parameters.dependency?if_exists != "">
,dependency : "${parameters.dependency?html}"<#t/>
</#if>
<#if parameters.dependencySrc?if_exists != "">
,dependencySrc : "${parameters.dependencySrc?html}"<#t/>
</#if>
<#if parameters.afterDepEvent?if_exists != "">
,afterDepEvent : "${parameters.afterDepEvent?html}"<#t/>
</#if>
<#if parameters.beforeDepEvent?if_exists != "">
,beforeDepEvent : "${parameters.beforeDepEvent?html}"<#t/>
</#if>
<#if parameters.fieldAudit?default(false)>
,fieldAudit : true<#t/>
</#if>
<#if parameters.params?if_exists != "">
,params : "${parameters.params?html}"<#t/>
</#if>
<#if parameters.dialogOptions?if_exists != "">
,dialogOptions : ${parameters.dialogOptions?html}<#t/>
</#if>
<#if parameters.dialogUrl?if_exists != "">
,dialogUrl : "${parameters.dialogUrl?html}"<#t/>
</#if>
<#if parameters.frozen?default(false)>
,frozen : true<#t/>
</#if>
<#if parameters.leadZeros?if_exists != "">
,leadZeros : "${parameters.leadZeros?html}"<#t/>
</#if>
<#if parameters.nbFormat?if_exists != "">
,nbFormat : "${parameters.nbFormat?html}"<#t/>
,default_nbFormat : "${parameters.nbFormat?html}"<#t/>
</#if>
<#if parameters.formatCol?if_exists != "">
,formatCol : "${parameters.formatCol?html}"<#t/>
</#if>
<#if parameters.required?default(false)>
,required : "true"<#t/>
</#if>
<#if parameters.dateFormat?if_exists != "">
,dateFormat : "${parameters.dateFormat?html}"<#t/>
</#if>
<#if parameters.timePicker?if_exists != "">
,timePicker : "${parameters.timePicker?html}"<#t/>
,timeFormat : "${parameters.timeFormat?html}"<#t/>
</#if>
,loadOnce : true<#t/>
<#if !parameters.loadOnce?default(true)>
,loadOnce : false<#t/>
</#if>
<#if parameters.applyRounding?if_exists != "">
,applyRounding : ${parameters.applyRounding?html}<#t/>
</#if>
<#if parameters.reConstruct?if_exists != "">
,reConstruct : "${parameters.reConstruct?html}"<#t/>
</#if>
<#if parameters.multiSelect?if_exists != "">
,multiSelect : "${parameters.multiSelect?html}"<#t/>
</#if>
<#if parameters.multiResultInput?if_exists != "">
,multiResultInput : "${parameters.multiResultInput?html}"<#t/>
</#if>
<#if parameters.readOnlyMode?if_exists != "">
,readOnlyMode : "${parameters.readOnlyMode?html}"<#t/>
</#if>
<#if parameters.selectColumn?if_exists != "">
,selectColumn : "${parameters.selectColumn?html}"<#t/>
</#if>
};<#t/>
options_${escapedOptionId?html}_colnames.push("${parameters.title?html?replace('\n', '\\n')?replace('\"', '\\"','r')}");<#t/>
options_${escapedOptionId?html}_colmodels.push(options_${escapedOptionId?html}_colmodels_${colName});<#t/>