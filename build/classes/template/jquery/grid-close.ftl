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
<#assign escapedOptionId="${parameters.id?string?replace('.', '_')}">
	var options_${escapedOptionId?html}_extension = {<#t/>
	datatype : "${parameters.dataType?default('json')}"<#t/>
  <#if parameters.subGridOptions?if_exists != "">
		,subGridOptions : ${parameters.subGridOptions?html}<#t/>
  </#if>
  <#if parameters.href?if_exists != "">
  	<#-- 953614 Specify Grid Filter Query Expression -->
  	<#if parameters.href?string?contains("?")>
	,url : "${parameters.href?string}&gridObjectId=${escapedOptionId}"<#t/>
  	<#else>
	,url : "${parameters.href?string}?gridObjectId=${escapedOptionId}"<#t/>
  	</#if>
  </#if>
  <#if parameters.columnsOrder?exists>
	,columnsOrder : "${parameters.columnsOrder?string}"<#t/>
  </#if>
  <#if parameters.requestType?if_exists != "">
	,mtype : "${parameters.requestType?html}"<#t/>
  </#if>
  <#if parameters.formIds?exists>
	,formids : "${parameters.formIds?html}"<#t/>
  </#if>
  <#if parameters.editurl?if_exists != "">
	,editurl : "${parameters.editurl?string}"<#t/>
  </#if>
  <#if parameters.cellurl?if_exists != "">
	,cellurl : "${parameters.cellurl?string}"<#t/>
  </#if>
  <#if parameters.multiselectWidth?exists>
	,multiselectWidth : ${parameters.multiselectWidth?html}<#t/>
  </#if>
  <#if parameters.page?exists>
	,page : ${parameters.page?html}<#t/>
  </#if>
  <#if parameters.width?exists>
	,width : ${parameters.width?html}<#t/>
  </#if>
  <#if parameters.height?exists>
	,height : ${parameters.height?html}<#t/>
  <#else>
	,height : 'auto'<#t/>
  </#if>
  <#if parameters.pager?default(false)>
	,pager : "${escapedOptionId?html}_pager"<#t/>
  </#if>
  <#if parameters.pagerButtons?default(true)>
	,pgbuttons : true<#t/>
  <#else>
	,pgbuttons : false<#t/>
  </#if>
  <#if parameters.pagerInput?default(true)>
	,pginput : true<#t/>
  <#else>
	,pginput : false<#t/>
  </#if>
  <#if parameters.pagerPosition?if_exists != "">
	,pagerpos : "${parameters.pagerPosition?string}"<#t/>
  </#if>
  <#if parameters.rowNum?if_exists != "" && parameters.pager?default(false)>
	,rowNum : ${parameters.rowNum?html}<#t/>
  <#else>
  <#if parameters.rowNum?if_exists != "">
	,rowNum : '-1'<#t/>
  </#if>
  </#if>
  <#if parameters.rowList?if_exists != "" && parameters.pager?default(false)>
	,rowList : [${parameters.rowList?html}]<#t/>
	<#else>
	<#if parameters.rowList?if_exists != "">
	,rowList : ''<#t/>
	</#if>
  </#if>
  <#if parameters.rowTotal?exists>
	,rowTotal : ${parameters.rowTotal?html}<#t/>
  </#if>
  <#if parameters.sortname?if_exists != "">
	,sortname : "${parameters.sortname?html}"<#t/>
  </#if>
  <#if parameters.viewrecords?default(false)>
	,viewrecords : true<#t/>
  </#if>
  <#if parameters.fromCustomization?default(false)>
	,fromCustomization : true<#t/>
  </#if>
  <#if parameters.gridview?default(false)>
	,gridview : true<#t/>
  </#if>
  <#if !parameters.autowidth?default(true)>
	,autowidth : false<#t/>
  </#if>
  <#if parameters.scroll?if_exists != "">
	,scroll : ${parameters.scroll?html}<#t/>
  </#if>
  <#if parameters.sortorder?if_exists != "">
	,sortorder : "${parameters.sortorder?html}"<#t/>
  </#if>
  <#if parameters.multiSort?if_exists != "">
	,multiSort : ${parameters.multiSort?html}<#t/>
  </#if>
  <#if parameters.altRows?default(false)>
	,altRows : true<#t/>
  </#if>
  <#if parameters.altClass?if_exists != "">
	,altclass : "${parameters.altClass?html}"<#t/>
  </#if>
  <#if parameters.prmNames?if_exists != "">
	,prmNames : ${parameters.prmNames?html}<#t/>
  </#if>
  <#if parameters.direction?if_exists != "">
	,direction : "${parameters.direction?html}"<#t/>
  <#else>
    ,direction : (document.dir)? document.dir: "ltr"<#t/>
  </#if>
  <#if parameters.recordpos?if_exists != "">
	,recordpos : "${parameters.recordpos?html}"<#t/>
  </#if>
  <#if parameters.viewsortcols?if_exists != "">
	,viewsortcols : ${parameters.viewsortcols?html}<#t/>
  </#if>
  <#if parameters.toppager?default(false)>
	,toppager : true<#t/>
  </#if>
  <#if parameters.dragLockRowColor?exists>
	,dragLockRowColor : "${parameters.dragLockRowColor?string}"<#t/>
  </#if>
  <#if parameters.dragLockColName?exists>
	,dragLockColName : "${parameters.dragLockColName?string}"<#t/>
  </#if>
  <#if parameters.dragLockColVal?exists>
	,dragLockColVal : "${parameters.dragLockColVal?string}"<#t/>
  </#if>
  <#if parameters.groupField?if_exists != "">
	,grouping : true<#t/>
	<#if parameters.groupColumnShow?if_exists != "">
		,groupColumnShow : ${parameters.groupColumnShow?html}<#t/>
	</#if>
	,groupingView : { groupField : ${parameters.groupField ?string} <#t/>
	  <#if parameters.groupText?if_exists != "">
		,groupText : ${parameters.groupText?string}<#t/>
	  </#if>
  	  <#if parameters.groupCollapse?default(false)>
		,groupCollapse : true<#t/>
	  </#if>
	  <#if parameters.groupOrder?if_exists != "">
		,groupOrder : ${parameters.groupOrder?html}<#t/>
	  </#if>
	  <#if parameters.groupSummary?if_exists != "">
		,groupSummary : ${parameters.groupSummary?html}<#t/>
	  </#if>
  	  <#if parameters.groupDataSorted?default(false)>
		,groupDataSorted : true<#t/>
	  </#if>
  	  <#if parameters.groupShowSummaryOnHide?default(false)>
		,showSummaryOnHide : true<#t/>
	  </#if>
	  <#if parameters.groupPlusIcon?if_exists != "">
		,plusicon : "${parameters.groupPlusIcon?html}"<#t/>
	  </#if>
	  <#if parameters.groupMinusIcon?if_exists != "">
		,minusicon : "${parameters.groupMinusIcon?html}"<#t/>
	  </#if>
	  }<#t/>
  </#if>
  <#if parameters.navigator?default(false)>
	,navigator : true<#t/>
	  <#if parameters.navigatorEditOptions?if_exists != "">
		,navigatoreditoptions : ${parameters.navigatorEditOptions?html}<#t/>
	  </#if>
	  <#if parameters.navigatorAddOptions?if_exists != "">
		,navigatoraddoptions : ${parameters.navigatorAddOptions?html}<#t/>
	  </#if>
	  <#if parameters.navigatorDeleteOptions?if_exists != "">
		,navigatordeleteoptions : ${parameters.navigatorDeleteOptions?html}<#t/>
	  </#if>
	  <#if parameters.navigatorViewOptions?if_exists != "">
		,navigatorviewoptions : ${parameters.navigatorViewOptions?html}<#t/>
	  </#if>
	  <#if parameters.navigatorSearchOptions?if_exists != "">
		,navigatorsearchoptions : ${parameters.navigatorSearchOptions?html}<#t/>
	  </#if>
	  <#if parameters.navigatorAdd?default(true)>
		,navigatoradd : true<#t/>
	  <#else>
		,navigatoradd : false<#t/>
	  </#if>
	  <#if parameters.navigatorDelete?default(true)>
		,navigatordel : true<#t/>
	  <#else>
		,navigatordel : false<#t/>
	  </#if>
	  <#if parameters.navigatorEdit?default(true)>
		,navigatoredit : true<#t/>
	  <#else>
		,navigatoredit : false<#t/>
	  </#if>
	  <#if parameters.navigatorRefresh?default(true)>
		,navigatorrefresh : true<#t/>
	  <#else>
		,navigatorrefresh : false<#t/>
	  </#if>
	  <#if parameters.navigatorSearch?default(true)>
		,navigatorsearch : true<#t/>
	  <#else>
		,navigatorsearch : false<#t/>
	  </#if>
	  <#if parameters.navigatorView?default(false)>
		,navigatorview : true<#t/>
	  <#else>
		,navigatorview : false<#t/>
	  </#if>
	  <#if parameters.navigatorExtraButtons?if_exists != "">
		,navigatorextrabuttons : ${parameters.navigatorExtraButtons?html}<#t/>
	  </#if>
  </#if>
  <#if parameters.editinline?default(false)>
	,editinline : true<#t/>
  </#if>
  <#if parameters.rowColorCssColumn?exists>
	,rowColorCssColumn : '${parameters.rowColorCssColumn?html}'<#t/>
  </#if>
  <#if parameters.loadonce?default(false)>
	,loadonce : true<#t/>
  </#if>
  <#if parameters.loadingText?if_exists != "">
	,loadtext : "${parameters.loadingText?html}"<#t/>
  </#if>
  <#if parameters.filter?default(false)>
	,filter : true<#t/>
  </#if>
  <#if parameters.filter?default(false) && parameters.filterOptions?if_exists != "">
	,filteroptions : ${parameters.filterOptions?html}<#t/>
  </#if>
  <#if parameters.multiselect?default(false)>
	,multiselect : true<#t/>
  </#if>
  <#if parameters.multiboxonly?default(false)>
	,multiboxonly : true<#t/>
  </#if>
  <#if parameters.caption?if_exists != "">
	,caption : "${parameters.caption?html}"<#t/>
  </#if>
  <#if parameters.sortable?default(false)>
	,sortable : true<#t/>
  </#if>
  <#if parameters.gridColSortRight?default(false)>
  ,gridColSortRight : true<#t/>
  </#if>
    <#if parameters.treeGrid?default(false)>
	,treeGrid : true<#t/>
  </#if>
  <#if parameters.expandColumn?exists>
	,ExpandColumn : "${parameters.expandColumn?html}"<#t/>
  </#if>
  <#if parameters.treeGridModel?if_exists != "">
	,treeGridModel : "${parameters.treeGridModel?html}"<#t/>
  </#if>
  <#if parameters.shrinkToFit?exists>
	,shrinkToFit : ${parameters.shrinkToFit?string}<#t/>
  </#if>
  <#if parameters.autoencode?default(true)>
	,autoencode : true<#t/>
  </#if>
  <#if parameters.cellEdit?default(false)>
	,cellEdit : true<#t/>
  </#if>
  <#if parameters.footerrow?default(false)>
	,footerrow : true<#t/>
  </#if>
  <#if parameters.hiddengrid?default(false)>
	,hiddengrid : true<#t/>
  </#if>
   <#if parameters.hasDefaultValueOnAddRow?if_exists != "">
	,hasDefaultValueOnAddRow :${parameters.hasDefaultValueOnAddRow?string}<#t/>
  </#if>
  <#if parameters.hidegrid?exists>
	,hidegrid : ${parameters.hidegrid?string}<#t/>
  </#if>
  <#if parameters.dontLoadData?if_exists != "">
	,dontLoadData :${parameters.dontLoadData?string}<#t/>
  </#if>	
  <#if parameters.hoverrows?exists>
	,hoverrows : ${parameters.hoverrows?string}<#t/>
  </#if>
  <#if parameters.rownumbers?default(false)>
	,rownumbers : true<#t/>
  </#if>
  <#if parameters.scrollrows?default(false)>
	,scrollrows : true<#t/>
  </#if>
  <#if parameters.userDataOnFooter?default(false)>
	,userDataOnFooter : true<#t/>
  </#if>
  <#if parameters.onSelectRowTopics?if_exists != "">
	,onselectrowtopics : "${parameters.onSelectRowTopics?html}"<#t/>
  </#if>
  <#if parameters.onSelectAllTopics?if_exists != "">
	,onselectalltopics : "${parameters.onSelectAllTopics?html}"<#t/>
  </#if>
  <#if parameters.onPagingTopics?if_exists != "">
	,onpagingtopics : "${parameters.onPagingTopics?html}"<#t/>
  </#if>
  <#if parameters.onSortColTopics?if_exists != "">
	,onsortcoltopics : "${parameters.onSortColTopics?html}"<#t/>
  </#if>
  <#if parameters.onCellSelectTopics?if_exists != "">
	,oncellselecttopics : "${parameters.onCellSelectTopics?html}"<#t/>
  </#if>
  <#if parameters.onGridCompleteTopics?if_exists != "">
	,ongridcompletetopics : "${parameters.onGridCompleteTopics?html}"<#t/>
  </#if>
  <#if parameters.onEditInlineAfterSaveTopics?if_exists != "">
	,oneisave : "${parameters.onEditInlineAfterSaveTopics?html}"<#t/>
  </#if>
  <#if parameters.onEditInlineBeforeTopics?if_exists != "">
	,oneibefore : "${parameters.onEditInlineBeforeTopics?html}"<#t/>
  </#if>
  <#if parameters.onEditInlineSuccessTopics?if_exists != "">
	,oneisuccess : "${parameters.onEditInlineSuccessTopics?html}"<#t/>
  </#if>
  <#if parameters.onEditInlineErrorTopics?if_exists != "">
	,oneierror : "${parameters.onEditInlineErrorTopics?html}"<#t/>
  </#if>
  <#if parameters.onCellEditSuccessTopics?if_exists != "">
	,oncesuccess : "${parameters.onCellEditSuccessTopics?html}"<#t/>
  </#if>
  <#if parameters.onCellEditErrorTopics?if_exists != "">
	,onceerror : "${parameters.onCellEditErrorTopics?html}"<#t/>
  </#if>
  <#if parameters.reloadTopics?if_exists != "">
	,reloadtopics : "${parameters.reloadTopics?html}"<#t/>
  </#if>
  <#if parameters.connectWith?if_exists != "">
	,connectWith : "${parameters.connectWith?html}"<#t/>
  </#if>
  <#if parameters.securityRef?if_exists != "">
	,securityRef : "${parameters.securityRef?html}"<#t/>
  </#if>
  <#if parameters.multiHeader?if_exists != "">
	,multiHeader : "${parameters.multiHeader?html}"<#t/>
  </#if>
  <#if parameters.addfunc?if_exists != "">
	,addfunc : "${parameters.addfunc?html}"<#t/>
  </#if>
  <#if parameters.editfunc?if_exists != "">
	,editfunc : "${parameters.editfunc?html}"<#t/>
  </#if>
  <#if parameters.delfunc?if_exists != "">
	,delfunc : "${parameters.delfunc?html}"<#t/>
  </#if>
  <#if parameters.viewfunc?if_exists != "">
	,viewfunc : "${parameters.viewfunc?html}"<#t/>
  </#if>
  <#if parameters.disableEditableFocus?if_exists != "">
	,disableEditableFocus : ${parameters.disableEditableFocus?html}<#t/>
  </#if>
  <#if parameters.onSubGridRowExpanded?if_exists != "">
	,onsgrowexpanded : "${parameters.onSubGridRowExpanded?html}"<#t/>
  </#if>
  <#if parameters.onClickGroupTopics?if_exists != "">
	,onclickgroup : "${parameters.onClickGroupTopics?html}"<#t/>
  </#if>
  <#if parameters.onDblClickRowTopics?if_exists != "">
	,ondblclickrow : "${parameters.onDblClickRowTopics?html}"<#t/>
  </#if>
  <#if parameters.onRightClickRowTopics?if_exists != "">
	,onrightclickrow : "${parameters.onRightClickRowTopics?html}"<#t/>
  </#if>
  <#if parameters.reloadTopics?if_exists != "">
	,reloadtopics : "${parameters.reloadTopics?html}"<#t/>
  </#if>
  <#if parameters.connectWith?if_exists != "">
	,connectWith : "${parameters.connectWith?html}"<#t/>
  </#if>
	<#if parameters.serializeGridData?if_exists != "">
		,serializeGridData : "${parameters.serializeGridData?html}"<#t/>
  	</#if>
	,jsonReader : {<#t/>
	repeatitems : false<#t/>
  <#if parameters.gridModel?if_exists != "">
	,root : "${parameters.gridModel?html}"<#t/>
  <#else>
	,root : "gridModel"<#t/>
  </#if>
  <#if parameters.loadonce?default(false)>
  <#else>
	,page : "page"<#t/>
	,total : "total"<#t/>
	,records : "records"<#t/>
  </#if>
	}<#t/>
	<#if parameters.exportExcel?default(false)>
		,exportExcel : true<#t/>
	   	,exportText : "${parameters.exportText?string}"<#t/>
	   	,exportOkBtn : "${parameters.exportOkBtn?string}"<#t/>
	   	,exportAllPagesLbl : "${parameters.exportAllPagesLbl?string}"<#t/>
	   	,exportCurrentPageLbl : "${parameters.exportCurrentPageLbl?string}"<#t/>
	</#if>
	<#if parameters.customBtnData??>
    	,customBtnData : ${parameters.customBtnData}<#t/>
	</#if>
  };<#t/>
  options_${escapedOptionId?html} = $.extend(options_${escapedOptionId?html}, options_${escapedOptionId?html}_extension);<#t/>
  options_${escapedOptionId?html}.colNames = options_${escapedOptionId?html}_colnames;<#t/>
  options_${escapedOptionId?html}.colModel = options_${escapedOptionId?html}_colmodels;<#t/>
  <#include "/${parameters.templateDir}/jquery/draggable.ftl" />
  <#include "/${parameters.templateDir}/jquery/droppable.ftl" />
  <#include "/${parameters.templateDir}/jquery/resizable.ftl" />
  <#include "/${parameters.templateDir}/jquery/selectable.ftl" />
  <#include "/${parameters.templateDir}/jquery/sortable.ftl" />
<#include "/${parameters.templateDir}/jquery/base.ftl" />
<#include "/${parameters.templateDir}/jquery/interactive.ftl" />
<#include "/${parameters.templateDir}/jquery/topics.ftl" />
<#if !parameters.subGrid?default(false)>
	<#assign escapedId="${parameters.id?string?replace('.', '\\\\\\\\.')}">
	jQuery.struts2_jquery_grid.bind(jQuery('#${escapedId?html}'),options_${escapedOptionId?html});<#t/>
 // [PathSolutions] jquery-3.3.1 migration - point 22 - remove the document.ready from grid.ftl to force the construction of the grid inside the html directly after having defining the div of the grid. this way any <script> inside the same jsp that contains header.hide() of groupheader willl be executed without errors, and without the need to add document.ready on it
 // });
</script><#t/>
<#else>
	<#if parameters.subGridUrl?if_exists != "">
	options_${escapedOptionId?html}.url = "${parameters.subGridUrl?string}";<#t/>
	</#if>
	<#assign escapedParentOptionId="${parameters.parentGrid?string?replace('.', '_')}">
	options_${escapedParentOptionId?html}.subgridoptions = options_${escapedOptionId?html};<#t/>
</#if>