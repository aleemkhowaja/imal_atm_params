<#--
/*
 * $Id: radiomap.ftl 720258 2008-11-24 19:05:16Z musachy $
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

<table  border="0" cellspacing="0">
<tr>
<#assign ps=JspTaglibs["/WEB-INF/tld/path-struts-tags.tld"]/>
<#if parameters.dynExpressionsArgs??>
    <input id="${parameters.id?html}_exprArgs" type="hidden" value="${parameters.dynExpressionsArgs}"/><#rt/>      
</#if>
<#assign index=0/> 
<@s.iterator value="parameters.list">
    <#if parameters.listKey??>
        <#assign itemKey = stack.findValue(parameters.listKey)/>
    <#else>
        <#assign itemKey = stack.findValue('top')/>
    </#if>
    <#assign itemKeyStr = itemKey.toString() />
    <#if parameters.listValue??>
        <#assign itemValue = stack.findString(parameters.listValue)/>
    <#else>
        <#assign itemValue = stack.findString('top')/>
    </#if>
    <#assign specialChars=itemValue?matches('.*[-+<>^&*].*')/>
    <#if specialChars>
    	<#assign itemValue = "'" + itemValue + "'"/>
    </#if>
<td><#rt/>
    <#assign hiddenOp=""/>
    <#if parameters.hasHiddenOpt?? && parameters.hasHiddenOpt== "1">
	     <#assign hiddenOp=parameters.list.get(index).hiddenOpt?default("")/> 
    </#if>
	<input type="radio" class="path-dummy-cls"<#rt/>
	<#if parameters.name??>
	 name="${parameters.name?html}"<#rt/>
	</#if>
	 id="${parameters.id?html}${itemKeyStr?html}"<#rt/>
	<#if tag.contains(parameters.nameValue?default(''), itemKeyStr)>
	checked="checked"<#rt/>
	</#if>
	<#if itemKey??>
	 value="${itemKeyStr?html}"<#rt/>
	</#if>
	<#if parameters.disabled?default(false)>
	 disabled="disabled"<#rt/>
	</#if>
	<#if parameters.tabindex??>
	 tabindex="${parameters.tabindex?html}"<#rt/>
	</#if>
	<#if parameters.cssClass??>
	 class="${parameters.cssClass?html}"<#rt/>
	</#if>
	<#if parameters.cssStyle??>
	 style="${parameters.cssStyle?html}"<#rt/>
	</#if>
	<#if hiddenOp == '1'>
	   style="display:none"<#rt/>
	</#if>
	<#if parameters.title??>
	 title="${parameters.title?html}"<#rt/>
	</#if>
	<#if parameters.groupElemKeyLabel??>
	 groupElemKeyLabel="${parameters.groupElemKeyLabel?html}"<#rt/>
	</#if>
	<#include "/${parameters.templateDir}/path-xhtml/audit-attribute.ftl" />
	<#include "/${parameters.templateDir}/path-xhtml/scripting-events.ftl" />
	<#include "/${parameters.templateDir}/simple/common-attributes.ftl" />
	/><#rt/>
</td>
<td>
	<#-- Path Solutions [Libin] Modified the radio label to add a cssClass property.If nothing specified will take ui-state-focus as class name as default  -->
	<#-- Path Solutions [Libin] updated ui-widget-content with ui-state-focus -->
	<#-- Path Solutions [Marwan Maddah] added the id attribute to avoid the override from the Browser side--> 
	<@ps.label id="lbl_${parameters.id?html}${itemKeyStr?html}" for="${parameters.id?html}${itemKeyStr?html}" key="${itemValue}" cssClass="${parameters.cssClass?default('')}"></@ps.label>
</td>
<#if (parameters.dependency?? && parameters.dependencySrc??) || parameters.fieldAudit??>
	<script type="text/javascript">
		$('#${parameters.id?html}${itemKeyStr?html}').bind("_event.dependency",function(event)
		{
			<#if parameters.dependency?? && parameters.dependencySrc??>
				callDependency("${parameters.dependency?default('')}","${parameters.dependencySrc?default('')}","${parameters.parameter?default('')}","${parameters.id?html}${itemKeyStr?html}","${parameters.afterDepEvent?default('')}","${parameters.dynExpressionsArgs?default('')}" );
			</#if>
			
		});
		$('#${parameters.id?html}${itemKeyStr?html}').bind("click",function(event)
			{
			    <#if parameters.fieldAudit?default(false)>
					callAuditOnField('${parameters.id}${itemKeyStr?html}');
				</#if>
                <#if parameters.dependency?? && parameters.dependencySrc??>
                    $('#${parameters.id?html}${itemKeyStr?html}').trigger("_event.dependency");                
                </#if>
			});
	</script>
</#if>
<#assign index=index+1/>
</@s.iterator>
</tr>
</table>
