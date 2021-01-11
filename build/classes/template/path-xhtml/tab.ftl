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
<#assign escapedOptionId="${parameters.id?string?replace('.', '_')?replace('-', '_')}">
<script type='text/javascript'><#t/>
jQuery(document).ready(function(){ <#t/>
var options_tab_${escapedOptionId?html}={_:1<#t/>
  <#if parameters.id?if_exists != "">
	,id:"${parameters.id?html}"<#t/>
  </#if>
  <#if parameters.cssStyle?if_exists != "">
	,cssstyle:"${parameters.cssStyle?html}"<#t/>
  </#if>
  <#if parameters.cssClass?if_exists != "">
	,cssclass:"${parameters.cssClass?html}"<#t/>
  </#if>
  <#if parameters.formIds?if_exists != "">
	,formIds:"${parameters.formIds?html}"<#t/>
  </#if>
  <#if parameters.href?if_exists != "">
	,href:"${parameters.href?html}"<#t/>
  <#elseif parameters.target?if_exists != "" >
	,href:"#${parameters.target?html}"<#t/>
  <#else>
	,href:"#"<#t/>
  </#if>
  <#if parameters.label?if_exists != "">
	,label:"${parameters.label?html}"<#t/>
  </#if>
  <#if parameters.labelKey?if_exists != "">
	,labelKey:"${parameters.labelKey?html}"<#t/>
  </#if>
  <#if parameters.closable?exists>
	,closable:${parameters.closable?string}<#t/>
  </#if>
  <#if parameters.disabled?exists>
	,disabled:${parameters.disabled?string}<#t/>
  </#if>
  <#if parameters.isVisible?exists>
	,isVisible:${parameters.isVisible?string}<#t/>
  </#if>
};<#t/>
<#if parameters.parentTabbedPanel?if_exists != "">
	<#assign escapedParentOptionId="${parameters.parentTabbedPanel?string?replace('.', '_')?replace('-','_')}">
	<#assign escapedParentId="${parameters.parentTabbedPanel?string?replace('.', '\\\\\\\\.')}">
	_mngTabFt('${escapedParentId}',options_tab_${escapedOptionId?html});<#t/>
</#if>
});<#t/>
</script><#t/>