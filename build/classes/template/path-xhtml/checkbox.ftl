<#--
/*
 * $Id: checkbox.ftl 720258 2008-11-24 19:05:16Z musachy $
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
<#assign hasFieldErrors = fieldErrors?? && fieldErrors[parameters.name]??/>
<#if hasFieldErrors>
<#list fieldErrors[parameters.name] as error>

      <span class="errorMessage">${error?html}</span><#t/>
</#list>
</#if>
<#if parameters.labelposition?default("") == 'top'>
<#if parameters.label??> <label<#t/>
<#if parameters.id??>
 for="${parameters.id?html}"<#rt/>
 id="lbl_${parameters.id?html}"<#rt/>
 <#if parameters.labelKey??>
 labelKey="${parameters.labelKey?html}"<#rt/>
 </#if>
</#if>
<#if hasFieldErrors>
 class="checkboxErrorLabel"<#rt/>
<#else>
 class="checkboxLabel;"<#rt/>
</#if>
<#if parameters.hideLabel?default('false') == "true">
 style="display:none"<#rt/>
</#if>
>
<#if parameters.required?default(false) && parameters.requiredposition?default("right") != 'right'>
        <span class="required">*</span><#t/>
</#if>
${parameters.label?html}<#t/>
<#if parameters.required?default(false) && parameters.requiredposition?default("right") == 'right'>
 <span class="required">*</span><#t/>
</#if>
:<#t/>
<#if parameters.tooltip??>
    <#include "/${parameters.templateDir}/xhtml/tooltip.ftl" />
</#if>
</label><#t/>
</#if>
       	<#include "/${parameters.templateDir}/${parameters.theme}/checkbox_simple.ftl" />
<#else>
<#if parameters.labelposition?default("") == 'left'>
<#if parameters.label??> <label<#t/>
<#if parameters.id??>
 for="${parameters.id?html}"<#rt/>
 id="lbl_${parameters.id?html}"<#rt/>
 <#if parameters.labelKey??>
 labelKey="${parameters.labelKey?html}"<#rt/>
 </#if>
</#if>
<#if hasFieldErrors>
 class="checkboxErrorLabel"<#rt/>
<#else>
 class="checkboxLabel"<#rt/>
</#if>
<#if parameters.hideLabel?default('false') == "true">
 style="display:none"<#rt/>
</#if>
>
<#if parameters.required?default(false) && parameters.requiredposition?default("right") != 'right'>
        <span class="required">*</span><#t/>
</#if>
${parameters.label?html}<#t/>
<#if parameters.required?default(false) && parameters.requiredposition?default("right") == 'right'>
 <span class="required">*</span><#t/>
</#if>
:<#t/>
<#if parameters.tooltip??>
    <#include "/${parameters.templateDir}/xhtml/tooltip.ftl" />
</#if>
</label><#t/>
</#if>
</#if>
<#if parameters.labelposition?default("") == 'right'>
    <#if parameters.required?default(false)>
        <span class="required">*</span><#t/>
    </#if>
    <#if parameters.tooltip??>
        <#include "/${parameters.templateDir}/xhtml/tooltip.ftl" />
    </#if>
</#if>

<#if parameters.labelposition?default("") != 'top'>
  <#if parameters.label??>
	  <table>
	 <tr> <td>
   </#if>	 
                		<#include "/${parameters.templateDir}/${parameters.theme}/checkbox_simple.ftl" />
   <#if parameters.label??>
      </td>
    </#if>
</#if>                    
<#if parameters.labelposition?default("") != 'top' && parameters.labelposition?default("") != 'left'>
	<#if parameters.label??> <td><label<#t/>
		<#if parameters.id??>
		 for="${parameters.id?html}"<#rt/>
		 id="lbl_${parameters.id?html}"<#rt/>
		 <#if parameters.labelKey??>
		 labelKey="${parameters.labelKey?html}"<#rt/>
		 </#if>
		</#if>
		<#if hasFieldErrors>
		 class="checkboxErrorLabel"<#rt/>
		<#else>
		 class="checkboxLabel"<#rt/>
		</#if>
		<#if parameters.hideLabel?default('false') == "true">
		 style="display:none"<#rt/>
		</#if>
	>${parameters.label?html}</label> </td><#rt/>
	</#if>
</#if>

<#if parameters.labelposition?default("") != 'top' &&  parameters.label??>
   </tr></table>
</#if>

</#if>
 <#include "/${parameters.templateDir}/path-xhtml/controlfooter.ftl" /><#nt/>
