<#--
/*
 * $Id: form.ftl 720258 2008-11-24 19:05:16Z musachy $
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
<#include "/${parameters.templateDir}/xhtml/form-validate.ftl" />
<#include "/${parameters.templateDir}/path-xhtml/form-common.ftl" />
<#if (parameters.validate?default(false))>
  onreset="${parameters.onreset?default('clearErrorMessages(this);clearErrorLabels(this);')}"<#rt/>
<#else>
  <#if parameters.onreset??>
  onreset="${parameters.onreset?html}"<#rt/>
  </#if>
</#if>
<#if parameters.dateMask??>
 dateMask="${parameters.dateMask?html}"<#rt/>
</#if>
<#if parameters.groupSepa??>
 groupSepa="${parameters.groupSepa?html}"<#rt/>
</#if>
<#if parameters.decimalSepa??>
 decimalSepa="${parameters.decimalSepa?html}"<#rt/>
</#if>
<#--
<#if parameters.formVarName??>
 formVarName="${parameters.formVarName?html}"<#rt/>
 <#else>
 	formVarName="${parameters.id?html}_var"<#rt/>
</#if>
<#if parameters.useDefaultCss??>
 useDefaultCss="${parameters.useDefaultCss?html}"<#rt/>
</#if>
<#if parameters.caseManagement??>
 caseManagement="${parameters.caseManagement?html}"<#rt/>
</#if>
<#if parameters.menuVar??>
 menuVar="${parameters.menuVar?html}"<#rt/>
</#if>
<#if parameters.menuVarList??>
 menuVarList="${parameters.menuVarList?html}"<#rt/>
</#if>
<#if parameters.tableName??>
 tableName="${parameters.tableName?html}"<#rt/>
</#if>
<#if parameters.formId??>
 formId="${parameters.formId?html}"<#rt/>
</#if>
<#if parameters.dateMask??>
 dateMask="${parameters.dateMask?html}"<#rt/>
</#if>
<#if parameters.gridIds??>
 gridIds="${parameters.gridIds?html}"<#rt/>
</#if>
-->
<#if parameters.isReadOnly??>
 isReadOnly="${parameters.isReadOnly?html}"<#rt/>
</#if>
><#t/>
<input id="_enableAudit" type="hidden" name="_enableAudit" value="${enableAudit}"/><#t/>
<#if _pageRef?? && parameters.useHiddenProps?default('false') == 'true'>
<#assign ps=JspTaglibs["/WEB-INF/tld/path-struts-tags.tld"]>
<@ps.hidden id="auditObj_${_pageRef}" name="_auditJsonStr"/>
<@ps.hidden id="auditTrxNbr_${_pageRef}" name="auditTrxNbr"/>
<@ps.hidden id="pageRef_${_pageRef}" name="_pageRef"/>
<@ps.hidden id="_recReadOnly_${_pageRef}" name="_recReadOnly"/>
<@ps.hidden id="_recSMARTReadOnly_${_pageRef}" name="_SMARTReadOnly"/>
<@ps.hidden id="bpmTaskId_${_pageRef}" name="bpmTaskId"/>
<@ps.hidden id="bpmDeploymentId_${_pageRef}" name="bpmDeploymentId"/>
<@ps.hidden id="smartSpecCompCode_${_pageRef}" name="smartSpecCompCode"/>
<@ps.hidden id="smartSpecBranchCode_${_pageRef}" name="smartSpecBranchCode"/>
<@ps.hidden id="fieldAuditDetails_${_pageRef}" name="fieldAuditDetails"/>
</#if>
<#-- check if memo need to be shown on load of the Page, then call showMemo method -->
<#if _memoJson??>
	<#-- replacing _memoJson to excape double qoutes with \" -->
    <#assign _memoJson=_memoJson?replace('"','\\"')/>
    <script type="text/javascript"> <#t/>
       showMemo({ 'memoJson' : '{"root":${_memoJson}}'});
    </script><#t/>         
 </#if>
<#--
<#include "/${parameters.templateDir}/xhtml/control.ftl" />
-->