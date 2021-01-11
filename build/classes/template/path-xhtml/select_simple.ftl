<#--
/*
 * $Id: select.ftl 804072 2009-08-14 03:16:35Z musachy $
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
<#setting number_format="#.#####">
<select<#rt/>
 name="${parameters.name?default("")?html}"<#rt/>
 <#-- Path Solutions [Libin] updated ui-widget-content with ui-state-focus to improve the appearance of input fields and separated the css class for giving size to field for handling ie issues --> 
 class="${parameters.cssClass?default('selectCompSize ui-state-focus ui-corner-all')}"<#rt/>
 <#--  -->
<#if parameters.get("size")??>
 size="${parameters.get("size")?html}"<#rt/>
</#if>
<#if parameters.disabled?default(false)>
 disabled="disabled"<#rt/>
 tabindex="-1"<#rt/>
 	<#if parameters.tabindex??>
 oldtabindex="${parameters.tabindex?html}"<#rt/>
	</#if>
<#else>
	<#if parameters.tabindex??>
  tabindex="${parameters.tabindex?html}"<#rt/>
	</#if>
</#if>
<#if parameters.id??>
 id="${parameters.id?html}"<#rt/>
</#if>
<#include "/${parameters.templateDir}/simple/css.ftl" />
<#if parameters.title??>
 title="${parameters.title?html}"<#rt/>
</#if>
<#if parameters.multiple?default(false)>
 multiple="multiple"<#rt/>
</#if>
<#if parameters.listKey??>
 listKey="${parameters.listKey?html}"<#rt/>
</#if>
<#if parameters.listValue??>
 listValue="${parameters.listValue?html}"<#rt/>
</#if>
<#if parameters.required?default(false)>
 required="true"<#rt/>
</#if>
<#if parameters.afterDepEvent??>
 afterDepEvent = "${parameters.afterDepEvent?html}"<#rt/>
</#if>	
<#if parameters.beforeDepEvent??>
 beforeDepEvent = "${parameters.beforeDepEvent?html}"<#rt/>
</#if>	
<#include "/${parameters.templateDir}/path-xhtml/audit-attribute.ftl" />
<#include "/${parameters.templateDir}/path-xhtml/scripting-events.ftl" />
<#include "/${parameters.templateDir}/simple/common-attributes.ftl" />
<#include "/${parameters.templateDir}/simple/dynamic-attributes.ftl" />
><#t/>
<#if parameters.headerKey?? && parameters.headerValue??>
    <option value="${parameters.headerKey?html}"<#t/>
    <#if tag.contains(parameters.nameValue, parameters.headerKey) == true>
 selected="selected"<#rt/>
    </#if>
    >${parameters.headerValue?html}</option><#t/>
</#if>
<#if parameters.emptyOption?default(false)>
    <option value=""></option><#t/>
</#if>
<@s.iterator value="parameters.list">
        <#if parameters.listKey??>
            <#if stack.findValue(parameters.listKey)??>
              <#assign itemKey = stack.findValue(parameters.listKey)/>
              <#assign itemKeyStr = stack.findString(parameters.listKey)/>
            <#else>
              <#assign itemKey = ''/>
              <#assign itemKeyStr = ''/>
            </#if>
        <#else>
            <#assign itemKey = stack.findValue('top')/>
            <#assign itemKeyStr = stack.findString('top')>
        </#if>
        <#if parameters.listValue??>
            <#if stack.findString(parameters.listValue)??>
              <#assign itemValue = stack.findString(parameters.listValue)/>
            <#else>
              <#assign itemValue = ''/>
            </#if>
            <#if parameters.oldValue?? && parameters.oldValue == itemKeyStr>
            	<#assign itemOldValue = itemValue/>
            </#if>
        <#else>
            <#assign itemValue = stack.findString('top')/>
        </#if>
    <option value="${itemKeyStr?html}"<#t/>
        <#if tag.contains(parameters.nameValue, itemKey) == true>
 selected="selected"<#rt/>
        </#if>
    >${itemValue?html}</option><#t/>
</@s.iterator>
<#include "/${parameters.templateDir}/simple/optgroup.ftl" />
</select>
<#if parameters.multiple?default(false)>
<input type="hidden" id="__multiselect_${parameters.id?html}" name="__multiselect_${parameters.name?html}" value=""<#t/>
<#if parameters.disabled?default(false)>
 disabled="disabled"<#rt/>
</#if>
 /><#t/>
</#if>
<#if itemOldValue??>
	<script type="text/javascript"><#t/>
		addOldValToTitle("${parameters.id?html}","${itemOldValue}");<#t/>
	</script><#t/>
</#if>