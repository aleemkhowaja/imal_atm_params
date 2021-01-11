<#--
/*
 * $Id: submit.ftl 720258 2008-11-24 19:05:16Z musachy $
 *
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


<#assign ps=JspTaglibs["/WEB-INF/tld/path-struts-tags.tld"]>


<#include "/${parameters.templateDir}/simple/scripting-events.ftl" />
<#include "/${parameters.templateDir}/simple/common-attributes.ftl" />
<#include "/${parameters.templateDir}/simple/dynamic-attributes.ftl" />

<#-- The dyamic and static ids for dialog,textfield , hidden field,pager etc....-->
<#assign dynHdKeyId="lookuphiddenkey_"+id>
<#assign dynHdResultId="lookuphiddenresult_"+id>		
<#assign dynDialogId ="lookupdialog_"+id>
<#assign stTextId=id>
<#assign lookupTbId="lookuptable_"+id>
<#assign actionNameTmp=actionName>
<#assign actionMethod="GET">
<#assign data="json">
<#assign pagerid="ptoolbar_"+id>
<#assign okBtn="{'OK':function() { ">
<#assign okcancel="'Cancel':function() { ">

<#assign readOnlyVal="">
<#assign disabledVal="false">
<#assign buttonVal="true">
<#if parameters.disabled?default(false) == true>
	<#assign disabledVal="true">
	<#assign buttonVal="false">	
</#if>
<#if parameters.readOnly?default(false)>
	<#assign readOnlyVal="true">
	<#assign buttonVal="false">	
</#if>
<#assign onClickFunc="lookupJS(\"${lookupTbId}\",\"${dynHdKeyId}\",\"${actionNameTmp}\",\"${actionMethod}\",\"${data}\",\"${pagerid}\",\"${dynDialogId}\",\"${disabledVal}\");">

<#if parameters.onOk?default("") != "">
	<#assign okBtn=okBtn+"${parameters.onOk?html}"+"(\"${lookupTbId}\",\"${dynHdResultId}\",\"${dynDialogId}\"); },">
<#else>
	<#assign okBtn=okBtn+"okButtonfun"+"(\"${lookupTbId}\",\"${dynHdResultId}\",\"${dynDialogId}\"); },">
</#if> 
<#if parameters.onCancel?default("") != "">
	<#assign okcancel=okBtn+"'Cancel':function() { "+"${parameters.onCancel?html}"+"(\"${dynDialogId}\"); }}">
<#else>
	<#assign okcancel=okBtn+"'Cancel':function() { "+"cancelButton"+"(\"${dynDialogId}\"); }}">
</#if> 

<#-- The text field of the lookup component-->
<#-- Path Solutions [Libin] updated ui-widget-content with ui-state-focus to improve the appearance of input fields  --> 
<@ps.textfield id=stTextId disabled=disabledVal readOnly=readOnlyVal name=name theme = "path-xhtml" cssClass="${parameters.cssClass?default('lookupCompSize ui-state-focus ui-corner-all')}"></@ps.textfield>
<#--  -->
<#-- The hidden field of the lookup component(It will sets the key list(where clause parameter from jsp)from the jsp-->
<@ps.hidden id=dynHdKeyId value=paramList theme = "path-xhtml"></@ps.hidden>


<#-- The hidden field of the lookup component(It will sets the result list (Column names and Component Id : 
The value of selected column should get set on the respective component)from the jsp-->
<@ps.hidden id=dynHdResultId value=resultList theme = "path-xhtml"></@ps.hidden>

<#-- Initializing the dialog width=width height=height-->
<@sj.dialog	id=dynDialogId autoOpen=autoOpen  modal=modal title=title hideEffect=hideEffect position=position buttons=okcancel
                width=width height=height position="center">
	<table id=${lookupTbId}>
		 <tr>
		   <td />
		 </tr>
	</table>
	<div id=${pagerid}></div>
</@sj.dialog>

<#-- The anchor tag for the button of lookup component   ui-icon-newwin-->
<@sj.a openDialog=dynDialogId onclick=onClickFunc
button=buttonVal buttonIcon="ui-icon-search"></@sj.a>