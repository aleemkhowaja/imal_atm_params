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
  <#include "/${parameters.templateDir}/path-xhtml/submit-close.ftl" />
<script type='text/javascript'><#t/>
jQuery(document).ready(function () {<#t/>
	var options_${escapedOptionId?html} = {_:1<#t/>
   <#if parameters.clearForm?default(false)>
	,clearform : true<#t/>
    </#if>
   <#if parameters.resetForm?default(false)>
	,resetform : true<#t/>
    </#if>
   <#if parameters.iframe?default(false)>
	,iframe = true<#t/>
    </#if>
   <#if parameters.replaceTarget?default(false)>
	,replaceTarget : true<#t/>
    </#if>
	<#if parameters.openDialog?if_exists != ""> 
	,opendialog : "${parameters.openDialog?html}"<#t/>
	</#if>
	<#-- PathSolutions - workflow button customization -->
	<#if parameters.customBtnData?if_exists != ""> 
  		,customBtnData : ${parameters.customBtnData}<#t/>
  	</#if>
	<#if parameters.customBtnAfterExecData?if_exists != ""> 
  		,customBtnAfterExecData : ${parameters.customBtnAfterExecData}<#t/>
  	</#if>
  	<#-- PathSolutions - icon button url setting  -->
	<#if parameters.buttonIconUrl?if_exists != ""> 
  		,buttonIconUrl : "${parameters.buttonIconUrl?html}"<#t/>
  	</#if>
  	<#-- PathSolutions - remorge base.ftl and merge it directly with the json object  <#include "/${parameters.templateDir}/jquery/base.ftl" /> -->
  	<#if parameters.jqueryaction?exists>
		,jqueryaction : "${parameters.jqueryaction?html}"<#t/>
  	</#if>
  	<#if parameters.id?exists>
		,id : "${parameters.id?html}"<#t/>
  	</#if>
  	<#if parameters.name?exists>
		,name : "${parameters.name?html}"<#t/>
 	</#if>
 	<#-- PathSolutions - remorge action.ftl and merge it directly with the json object  <#include "/${parameters.templateDir}/jquery/action.ftl" /> -->
 	<#if parameters.targets?if_exists != "">
	,targets : "${parameters.targets?html}"<#t/>
  </#if>
  <#if parameters.hrefUrl?if_exists != "">
	,href : "${parameters.hrefUrl?html}"<#t/>
  <#else>
	,href : "#"<#t/>
  </#if>
  <#if parameters.hrefParameter?if_exists != ""> 
	,hrefparameter : "${parameters.hrefParameter?string}"<#t/>
  </#if>
  <#if parameters.formIds?exists>
	,formids : "${parameters.formIds?html}"<#t/>
  </#if>
  <#if parameters.onClickTopics?exists>
	,onclick : "${parameters.onClickTopics?html}"<#t/>
  </#if>
  <#if parameters.indicator?exists>
	,indicatorid : "${parameters.indicator?html}"<#t/>
  </#if>
  <#if parameters.loadingText?exists>
	,loadingtext : "${parameters.loadingText?html}"<#t/>
  </#if>
  <#if parameters.errorText?exists>
	,errortext : "${parameters.errorText?html}"<#t/>
  </#if>
  <#if parameters.errorElementId?exists>
	,errorelementid : "${parameters.errorElementId?html}"<#t/>
  </#if>
  <#if parameters.dataType?exists>
	,datatype : "${parameters.dataType?html}"<#t/>
  </#if>
  <#if parameters.requestType?exists>
	,requesttype : "${parameters.requestType?html}"<#t/>
  </#if>
  <#if parameters.effect?exists>
	,effect : "${parameters.effect?html}"<#t/>
	<#if parameters.effectDuration?exists>
	,effectduration : ${parameters.effectDuration?html}<#t/>
	</#if>  
	<#if parameters.effectMode?exists>
	,effectmode : "${parameters.effectMode?html}"<#t/>
	</#if>  
	<#if parameters.effectOptions?exists>
	,effectoptions : ${parameters.effectOptions?html}<#t/>
	<#else>
	,effectoptions : {}<#t/>
	</#if>  
  </#if>  
  <#if parameters.timeout?exists>
	,timeout : ${parameters.timeout?html}<#t/>
  </#if>
  <#if parameters.listenTopics?exists>
	,listentopics : "${parameters.listenTopics?html}"<#t/>
  </#if>
  <#if parameters.onEffectCompleteTopics?exists>
	,oneffect : "${parameters.onEffectCompleteTopics?html}"<#t/>
  </#if>
  <#-- PathSolutions - remorge button.ftl and merge it directly with the json object  <#include "/${parameters.templateDir}/jquery/button.ftl" /> -->
  	<#if parameters.disabled?default(false)>
	,disabled : true<#t/>
	</#if>
	<#if parameters.button?default(false)>
	,button : true<#t/>
	</#if>
	<#if parameters.buttonIcon?if_exists != ""> 
	,bicon : "${parameters.buttonIcon?html}"<#t/>
	</#if>
	<#if parameters.buttonIconSecondary?if_exists != ""> 
	,bicon2 : "${parameters.buttonIconSecondary?html}"<#t/>
	</#if>
	<#if parameters.buttonText??>
	,btext : ${parameters.buttonText?string}<#t/>
	</#if>
  };<#t/>
  <#-- PathSolutions - remorge base.ftl and merge it directly with the json object  <#include "/${parameters.templateDir}/jquery/base.ftl" /> -->
  <#include "/${parameters.templateDir}/jquery/interactive.ftl" />
  <#include "/${parameters.templateDir}/jquery/topics.ftl" />
  <#-- PathSolutions - remorge action.ftl and merge it directly with the json object  <#include "/${parameters.templateDir}/jquery/action.ftl" /> -->
  <#-- PathSolutions - remorge button.ftl and merge it directly with the json object  <#include "/${parameters.templateDir}/jquery/button.ftl" /> -->
  <#include "/${parameters.templateDir}/jquery/validation.ftl" />
  <#include "/${parameters.templateDir}/jquery/jquery-bind.ftl" />
 });<#t/>
</script><#t/>