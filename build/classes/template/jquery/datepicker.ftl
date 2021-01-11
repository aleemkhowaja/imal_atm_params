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
 *   <#assign dtTagClass=""+parameters.parentTheme>  ${""+dtTagClass} 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
-->
<#--
/*	<#if parameters.parentTheme == 'xhtml' || parameters.parentTheme == 'css_xhtml' || parameters.parentTheme == 'simple'>
*	<#if parameters.parentTheme == 'xhtml'>
*		<#include "/${parameters.templateDir}/xhtml/controlheader.ftl" />
*	</#if>
*	<#if parameters.parentTheme == 'css_xhtml'>
*		<#include "/${parameters.templateDir}/css_xhtml/controlheader.ftl" />
*	</#if>
*	<#include "/${parameters.templateDir}/simple/text.ftl" />
*	<#if parameters.parentTheme == 'xhtml'>
*		<#include "/${parameters.templateDir}/xhtml/controlfooter.ftl" />
*	</#if>
*	<#if parameters.parentTheme == 'css_xhtml'>
*		<#include "/${parameters.templateDir}/css_xhtml/controlfooter.ftl" />
*	</#if>
*	<#else>
*		<#include "/${parameters.templateDir}/${parameters.parentTheme}/text.ftl" />
*	</#if>
*/
-->
<#assign ps=JspTaglibs["/WEB-INF/tld/path-struts-tags.tld"]>
<#if parameters.dateLabelsKeys??>
    <#assign lblLst = "${parameters.dateLabelsKeys}"?split(",")> 
</#if>
<#assign fromDatepicker="true">
<#assign originalStyle="">
<#if parameters.cssStyle??>
   <#assign originalStyle= "${parameters.cssStyle}">
</#if>
<script type='text/javascript'><#t/>
<#if parameters.showHijri?if_exists != "" && parameters.showHijri=="true">
_mngHijCal();<#t/>
</#if>
</script><#t/>
<div class="dateCompDiv"><#t/>
	<#if parameters.showHijri?if_exists != "true">
		<#if lblLst??>
	       <table border="0"><#t/>
	           <tr><#t/>
	               <#if lblLst??>
			             <td><#rt/>	 
				         <@ps.label id="lbl_${parameters.id}" theme='path-xhtml' 
			                              cssStyle="${originalStyle}"
			                              for="${parameters.id}" 
			                              key="${lblLst[0]}"></@ps.label>
			             </td><#t/>
		           </#if>
		           <td><#t/>
		               <#include "/${parameters.templateDir}/path-xhtml/text.ftl"/>
		           </td><#t/>
	           </tr><#t/>
		    </table><#t/>
		<#else>	   
		     <#include "/${parameters.templateDir}/path-xhtml/text.ftl" />
		</#if>
	<#else>
	    <#assign hijriDate_id = "${parameters.id}_hijriDate">
	    <#if lblLst??>
	        <#assign lblLstSize = lblLst?size>
	    </#if>
	           <table border="0"><#t/>
	               <tr><#t/>
	                   <#if lblLst??>
				             <td<#rt/>	 
				               <#if (lblLstSize == 1)>
				                 rowspan = "2"<#rt/>	 
				               </#if>
				             ><#t/>
				               <#if parameters.showOnlyHijri?if_exists != "true"> 
					               <@ps.label id="lbl_${parameters.id}" theme='path-xhtml'
				                              cssStyle="${originalStyle}"
				                              for="${parameters.id}" 
				                              key="${lblLst[0]}"></@ps.label>
			                   </#if>
				             </td><#t/>
			           </#if>
			           <td><#t/>
			               <#assign hijriDate="false">
			               <#if parameters.showOnlyHijri?if_exists == "true">
			                    <#assign parameters = parameters + {'cssStyle':parameters.cssGregorianStyle}>
			               </#if>
			               <#include "/${parameters.templateDir}/path-xhtml/text.ftl"/>
			           </td><#t/>
	               </tr><#t/>
	               <tr><#t/>
	                   <#if lblLst?? && (lblLstSize > 1)>
		                   <td>
		                       <#if parameters.overrideLabelText??>
		                          <#assign x= parameters.remove('overrideLabelText')>
		                       </#if>
		                       <#if parameters.overrideLabelKey??>
		                          <#assign x= parameters.remove('overrideLabelKey')>
		                       </#if>
				               <@ps.label id="lbl_${hijriDate_id}" theme='path-xhtml' cssStyle="${originalStyle}" for="${hijriDate_id}" key="${lblLst[1]}"></@ps.label><#t/>
		                   </td><#t/>
	                   </#if>
	                   <td><#t/>
	                       <#assign hijriDate = "true">
						   <#if parameters.nameValue??>
						        <#assign parameters = parameters + {'nameValue':''}>
						   </#if>
			               <#assign parameters = parameters +   {'id':hijriDate_id}>
			               <#assign parameters = parameters +   {'name':''}>
			               <#if originalStyle?if_exists !="">
			                  <#assign parameters = parameters + {'cssStyle':originalStyle}>
			               <#else>
			                  <#if parameters.showOnlyHijri?if_exists == "true">
			                      <#assign x= parameters.remove('cssStyle')> 
			                  </#if>    
			               </#if>
			               <#include "/${parameters.templateDir}/path-xhtml/text.ftl"/>
	                   </td><#t/>
	               </tr><#t/>
	           </table><#t/>
	</#if><#t/>
</div><#t/>