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
<#if parameters.type?? && parameters.type=="button">
	<button type="button"<#t/>
	<#if parameters.id??>
 id="${parameters.id?html}"<#rt/>
	</#if>
	<#if parameters.name??>
 name="${parameters.name?html}"<#rt/>
	</#if>
	<#if parameters.nameValue??>
 value="<@s.property value="parameters.nameValue"/>"<#rt/>
	</#if>
	<#if parameters.disabled?default(false)>
 disabled="disabled"<#rt/>
	</#if>
	<#if parameters.cssClass??><#-- //[PathSolutions] jquery-3.3.1 migration - point 26 - hide the <button> element by adding class .ui-button-native and then remove it in jquery-ui.js to avoid displaying the native button untill the button is rendered: when jquery-ui class are added -->
 class="ui-button-native ${parameters.cssClass?html}"<#rt/>
	<#else> 
 class="ui-button-native"<#rt/>
	 </#if>  
	<#if parameters.get("cssStyle")??>
 style="${parameters.get("cssStyle")?html}"<#rt/>
	</#if>
	<#if parameters.title??>
 title="${parameters.title?html}"<#rt/>
	</#if>
	<#if parameters.tabindex??>
 tabindex="${parameters.tabindex?html}"<#rt/>
	</#if>
	<#if parameters.targets??>
 targetSubmit="${parameters.targets?html}"<#rt/>
	</#if>
	<#if parameters.freezeOnSubmit??>
 freezeOnSubmit="${parameters.freezeOnSubmit?html}" <#rt/>
	</#if>
	<#if parameters.enableAfterExecution??>
 enableAfterExecution="${parameters.enableAfterExecution?html}" <#rt/>
	</#if>
	 <#if parameters.overrideLabelKey??>
 overrideLabelKey="${parameters.overrideLabelKey?html}" <#rt/>
	 </#if>
	 <#if parameters.overrideLabelText??>
 overrideLabelText="${parameters.overrideLabelText?html}" <#rt/>
	 </#if>
	<#include "/${parameters.templateDir}/simple/scripting-events.ftl"/>
	<#include "/${parameters.templateDir}/simple/common-attributes.ftl" />
	<#include "/${parameters.templateDir}/simple/dynamic-attributes.ftl" />
	><#t/>
<#else>
	<#if parameters.type?? && parameters.type=="image">
		<@s.property value="parameters.body"/>
		<input type="image"<#t/>
		<#if parameters.label??>
 alt="${parameters.label?html}"<#rt/>
		</#if>
		<#if parameters.src??>
 src="${parameters.src?html}"<#rt/>
		</#if>
	<#else>
		<#if parameters.type?? && parameters.type=="submit">
		<button type="submit"<#t/>
		<#else>
		   <#if parameters.customBtnId??>
		   	<button type="button"<#t/> 
		   <#else>   
			<button type="button" tosubmit="true"<#t/>
		   </#if>
		</#if>
	</#if>
	<#if parameters.id??>
 id="${parameters.id?html}"<#rt/>
	</#if>
	<#if parameters.name??>
 name="${parameters.name?html}"<#rt/>
	</#if>
	<#if parameters.nameValue??>
 value="<@s.property value="parameters.nameValue"/>"<#rt/>
	</#if>
	<#if parameters.disabled?default(false)>
 disabled="disabled"<#rt/>
	</#if>
	<#if parameters.cssClass??><#-- //[PathSolutions] jquery-3.3.1 migration - point 26 - hide the <button> element by adding class .ui-button-native and then remove it in jquery-ui.js to avoid displaying the native button untill the button is rendered: when jquery-ui class are added -->
 class="ui-button-native ${parameters.cssClass?html}"<#rt/>
	<#else> 
 class="ui-button-native"<#rt/>
	 </#if>  
	<#if parameters.get("cssStyle")??>
 style="${parameters.get("cssStyle")?html}"<#rt/>
	</#if>
	<#if parameters.title??>
 title="${parameters.title?html}"<#rt/>
	</#if>
	<#if parameters.tabindex??>
 tabindex="${parameters.tabindex?html}"<#rt/>
	</#if>
	<#if parameters.targets??>
 targetSubmit="${parameters.targets?html}" <#rt/>
	</#if>
	 <#if parameters.overrideLabelKey??>
 overrideLabelKey="${parameters.overrideLabelKey?html}" <#rt/>
	 </#if>
	 <#if parameters.overrideLabelText??>
 overrideLabelText="${parameters.overrideLabelText?html}" <#rt/>
	 </#if>
	<#if parameters.freezeOnSubmit??>
 freezeOnSubmit="${parameters.freezeOnSubmit?html}" <#rt/>
	<#elseif parameters.targets??>
 freezeOnSubmit="true"<#rt/>
	</#if>
	<#if parameters.enableAfterExecution??>
 enableAfterExecution="${parameters.enableAfterExecution?html}" <#rt/>
	</#if>
	<#if parameters.customBtnId??>
 customBtnId="${parameters.customBtnId?html}" <#rt/>
	</#if>
	<#include "/${parameters.templateDir}/simple/scripting-events.ftl" />
	<#include "/${parameters.templateDir}/simple/common-attributes.ftl" />
	<#include "/${parameters.templateDir}/simple/dynamic-attributes.ftl" />
	><#t/>
</#if>