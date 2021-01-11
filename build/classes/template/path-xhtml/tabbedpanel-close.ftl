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
</div>
<script type='text/javascript'><#t/>
 <#assign escapedId="${parameters.id?string?replace('.', '\\\\\\\\.')}">
jQuery(document).ready(function(){<#t/>
    var options_${escapedOptionId?html}={_:1<#t/>
  <#if parameters.selectedTab?exists>
	,selectedtab:${parameters.selectedTab?html}<#t/>
  </#if>
  <#if parameters.openOnMouseover?default(false)>
	,event:"mouseover"<#t/>
  </#if>
  <#if parameters.collapsible?default(false)>
	,collapsible:true<#t/>
  </#if>
  <#if parameters.useSelectedTabCookie?default(false)>
	,cookie:true<#t/>
  </#if>
  <#if parameters.animate?default(false)>
	,animate:true<#t/>
  </#if>
  <#if parameters.cache?default(false)>
	,cache:true<#t/>
  </#if>
  <#if parameters.spinner?exists>
	  <#if parameters.spinner?if_exists != "">
	,spinner:"${parameters.spinner?html}"<#t/>
	  <#else>
	,spinner:""<#t/>
	  </#if>
  </#if>
  <#if parameters.disabledTabs?if_exists != "">
	,disabledtabs:"${parameters.disabledTabs?html}"<#t/>
  </#if>
  <#if parameters.sortable?default(false)>
	,sortable:true<#t/>
  </#if>
  <#if parameters.onAddTopics?if_exists != "">
	,onaddtopics:"${parameters.onAddTopics?html}"<#t/>
  </#if>
  <#if parameters.onRemoveTopics?if_exists != "">
	,onremovetopics:"${parameters.onRemoveTopics?html}"<#t/>
  </#if>
  <#if parameters.onselect?if_exists != "">
	,onselect:"${parameters.onselect?html}${escapedId}Topic"<#t/>
  </#if>
  <#if parameters.tabsOrder?if_exists != "">
	,tabsOrder:"${parameters.tabsOrder?html}"<#t/>
  </#if>
  <#if parameters.additionalTabsStr?if_exists != "">
	,additionalTabsStr:${parameters.additionalTabsStr?string}<#t/>
  </#if>
};<#t/>
<#include "/${parameters.templateDir}/jquery/base.ftl" />
<#include "/${parameters.templateDir}/jquery/interactive.ftl" />
<#include "/${parameters.templateDir}/jquery/topics.ftl" />

<#include "/${parameters.templateDir}/jquery/jquery-bind.ftl" />
 <#if parameters.onselect?if_exists != "">
    _subscribeTopic("${escapedId}","${parameters.onselect}${escapedId}Topic",${parameters.onselect},"tab");<#t/>
  </#if>
    _bindContextMenu("${escapedId}","${userPrefLabel}");<#t/>
 });<#t/>
</script><#t/>