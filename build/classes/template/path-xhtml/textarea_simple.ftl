<#--
/*
 * $Id: textarea.ftl 720258 2008-11-24 19:05:16Z musachy $
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
<textarea<#t/>
 name="${parameters.name?default("")?html}"<#rt/>
 <#-- If col not available then set the size 100% of that of parent by setting cssClass to textCompSize or else read col attr-->
<#if parameters.cols??>
 cols="${parameters.cols?html}"<#rt/>
 <#-- BUG 465503 Added class path-theme-cust-input-->
	 	 <#if parameters.cssClass??>
 class = "path-theme-cust-input ui-state-focus ui-corner-all ${parameters.cssClass}"<#rt/>  
	 <#else>
 class = "path-theme-cust-input ui-state-focus ui-corner-all"<#rt/>   
	 </#if>
 <#else>
     <#if parameters.cssClass??>
 class = "path-theme-cust-input textCompSize ui-state-focus ui-corner-all ${parameters.cssClass}"<#rt/>
     <#else>
 class = "path-theme-cust-input textCompSize ui-state-focus ui-corner-all"<#rt/>
     </#if>	
</#if> 
 rows="${parameters.rows?default("")?html}"<#rt/>
<#if parameters.wrap??>
 wrap="${parameters.wrap?html}"<#rt/>
</#if>
<#if parameters.disabled?default(false)>
 disabled="disabled"<#rt/>
</#if>
<#if parameters.readonly?default(false)>
 readonly="readonly"<#rt/>
</#if>
<#if parameters.tabindex??>
 tabindex="${parameters.tabindex?html}"<#rt/>
</#if>
<#if parameters.id??>
 id="${parameters.id?html}"<#rt/>
</#if>
<#include "/${parameters.templateDir}/simple/css.ftl" />
<#if parameters.title??>
 title="${parameters.title?html}"<#rt/>
</#if>
<#if parameters.required?default(false)>
 required = "true"<#rt/>
</#if>	
<#if parameters.dir??>
 dir="${parameters.dir?html}"<#rt/>
</#if>	
<#if parameters.maxlength??>
 maxlength="${parameters.maxlength?html}"<#rt/>
</#if>	
<#if parameters.get("size")??>
 size="${parameters.get("size")?html}"<#rt/>
</#if>
<#if parameters.minlength?default(0) gt 0>
 minlength="${parameters.minlength?html}"<#rt/>
</#if>
<#include "/${parameters.templateDir}/path-xhtml/audit-attribute.ftl" />
<#include "/${parameters.templateDir}/path-xhtml/scripting-events.ftl" />
<#include "/${parameters.templateDir}/simple/common-attributes.ftl" />
<#include "/${parameters.templateDir}/simple/dynamic-attributes.ftl" />
><#t/>
<#if parameters.nameValue??>
<@s.property value="parameters.nameValue"/><#t/>
</#if>
</textarea><#t/>
<#if parameters.customBtnData??>
<script type="text/javascript"><#t/>
 var customBtnData = ${parameters.customBtnData};<#t/>
 $( "#${parameters.id?html}" ).data( "customBtnData", customBtnData );<#t/>
</script><#t/>
</#if>
<#if parameters.customKeyEventBtnData??>
<script type="text/javascript"><#t/>
	var customKeyEventBtnData = ${parameters.customKeyEventBtnData}
		$( "#${parameters.id?html}" ).data( "customKeyEventBtnData", customKeyEventBtnData );
			$( "#${parameters.id?html}" ).keydown(function(event) {
    			if (event.keyCode === 117 && event.ctrlKey ) {
        			customKeyEventCall('${parameters.id}');
   				}
			});
</script><#t/>
</#if>
<#if parameters.onlyArabic?if_exists !="false">
 <script type="text/javascript"><#t/>
     switchInput('${parameters.id}',true);<#t/>
 </script><#t/>      
</#if>
<#if parameters.dir??>
<script type="text/javascript"><#t/>
	if("${parameters.dir}"=="rtl" && "${parameters.onlyArabic?default("false")}" != "true")<#t/>
		{switchInput('${parameters.id}');}<#t/>
</script><#t/>
</#if>
<#if parameters.cssStyle??>
<script type="text/javascript"><#t/>
	 switchInputTA('${parameters.id}','${parameters.cssStyle}','${parameters.onlyArabic?default("false")}','${parameters.dir?default("")}');<#t/>
</script><#t/>
</#if>
