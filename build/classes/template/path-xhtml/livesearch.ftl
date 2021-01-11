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
<#assign ps=JspTaglibs["/WEB-INF/tld/path-struts-tags.tld"]/>
<#include "/${parameters.templateDir}/simple/common-attributes.ftl" />
<#include "/${parameters.templateDir}/simple/dynamic-attributes.ftl" />
<#-- The dyamic and static ids for textfield , hidden field,pager etc....-->
<script type="text/javascript"><#rt/>
options_${parameters.id?html}_liveSearch = {<#rt/>
dynHdKeyId : "lookuphiddenkey_${parameters.id?html}",<#rt/>
lookupId : "lookupid_${parameters.id?html}" ,<#rt/>
lookupDiv : "lookupdiv_${parameters.id?html}",<#rt/>
lookupTxt : "lookuptxt_${parameters.id?html}",<#rt/>
spanLookup : "spanLookup_${parameters.id?html}",<#rt/>
overlay : "overlay_${parameters.id?html}",<#rt/>
gridtab : "gridtab_${parameters.id?html}",<#rt/>
pagerid : "pagerid_${parameters.id?html}",<#rt/>
lookupName : "${parameters.name?html}",<#rt/>
afterDepEvent : "${parameters.afterDepEvent?default('')}",<#rt/>
actionName : "${parameters.actionName?html}",<#rt/>
onOkMethod : "${parameters.onOk?default('')}",<#rt/>
searchElement : "${parameters.searchElement?html}",<#rt/>
selectColumn : "${parameters.selectColumn?default('')}",<#rt/>
multiSelect : "${parameters.multiSelect?default('')}",<#rt/>
paramList : "${parameters.paramList?default('')}",<#rt/>
resultList : "${parameters.resultList?default('')}",<#rt/>
dependencyValue : "${parameters.dependency?default('')}",<#rt/>
dependencySrcValue : "${parameters.dependencySrc?default('')}",<#rt/>
readOnlyModeValue : "${parameters.readOnlyMode?default('')}",<#rt/>
parameterValue : "${parameters.parameter?default('')}",<#rt/>
dynExpressionsArgsVal : "${parameters.dynExpressionsArgs?default('')}",<#rt/>
autoSearch : "false",<#rt/>
relatedDescElt : "${parameters.relatedDescElt?default('')}",<#rt/>
reConstruct : "${parameters.reConstruct?default('false')}",<#rt/>
multiResultInput : "${parameters.multiResultInput?default('')}"<#rt/>
<#if parameters.dontLoadData?if_exists != "">
,dontLoadData :${parameters.dontLoadData?string}<#t/>
</#if>
};<#rt/>
</script>
<#assign dynHdKeyId="lookuphiddenkey_"+parameters.id/>
<#assign lookupId="lookupid_"+parameters.id/>
<#assign lookupDiv="lookupdiv_"+parameters.id/>
<#assign lookupTxt="lookuptxt_"+parameters.id/>
<#assign spanLookup="spanLookup_"+parameters.id/>
<#assign overlay="overlay_"+parameters.id/>
<#assign gridtab="gridtab_"+parameters.id/>
<#assign pagerid="pagerid_"+parameters.id/>
<#assign lookupName=parameters.name/>
<#assign afterDepEvent=parameters.afterDepEvent?default("")/>
<#assign beforeDepEvent=parameters.beforeDepEvent?default("")/>
<#assign actionNameTmp=parameters.actionName/>
<#assign onOkMethod=""/>
<#if parameters.onOk???if_exists>
	<#assign onOkMethod=""+parameters.onOk/>
<#else>
 	<#assign onOkMethod=""/>
</#if> 
<#assign searchElement=parameters.searchElement/>
<#if parameters.selectColumn???if_exists>
	<#assign selectColumn=parameters.selectColumn/>
<#else>
 	<#assign selectColumn=""/>
</#if> 
<#if parameters.multiSelect???if_exists>
	<#assign multiSelect=parameters.multiSelect/>
<#else>
 	<#assign multiSelect=""/>
</#if> 
<#if parameters.paramList???if_exists>
	<#assign paramList=parameters.paramList/>
<#else>
 	<#assign paramList=""/>
</#if> 
<#if parameters.resultList???if_exists>
	<#assign resultList=parameters.resultList/>
<#else>
 	<#assign resultList=""/>
</#if> 
<#assign dependencyValue=""/>
<#if parameters.dependency???if_exists>
	<#assign dependencyValue=""+parameters.dependency/>
<#else>
 	<#assign dependencyValue=""/>
</#if> 
<#assign dependencySrcValue=""/>
<#if parameters.dependencySrc???if_exists>
	<#assign dependencySrcValue=""+parameters.dependencySrc/>
<#else>
 	<#assign dependencySrcValue=""/>
</#if> 
<#assign parameterValue=""/>
<#if parameters.parameter???if_exists>
	<#assign parameterValue=""+parameters.parameter/>
<#else>
 	<#assign parameterValue=""/>
</#if>
<#assign dynExpressionsArgsVal=""/>
<#if parameters.dynExpressionsArgs???if_exists>
	<#assign dynExpressionsArgsVal=""+parameters.dynExpressionsArgs/>
<#else>
 	<#assign dynExpressionsArgsVal=""/>
</#if> 
<#assign readOnlyModeValue=""/>
<#if parameters.readOnlyMode???if_exists>
	<#assign readOnlyModeValue=""+parameters.readOnlyMode/>
<#else>
 	<#assign readOnlyModeValue=""/>
</#if> 
<#assign mode = parameters.mode?default('')/>
<#assign multiResultInput= parameters.multiResultInput?default('')/>
<div id = '${lookupDiv}' <#rt/>
<#if parameters.cssStyle??>
 style="${parameters.cssStyle?html}"<#rt/>
</#if> ><#t/>	
    <table border="0" id="liveSearchTb" width="100%" cellspacing="0" cellpadding="0"><#t/>
	    <tr><#t/>
		    <td><#t/>
		    	<div id='${lookupId}'  class="ui-widget liveSearchLookupIdDiv"><#t/>
			    	     <#if parameters.autoSearch?default('false') == "false"> 
			    	        <input type="text" autocomplete="off" id='${lookupTxt}' beforeDepEvent="${beforeDepEvent}" afterDepEvent = "${afterDepEvent}"<#t/>
			    	         <#-- BUG 465503 Added class path-theme-cust-input--> 
			    	               <#if parameters.cssClass??>
 class ="path-theme-cust-input liveSearchText liveSearchCompSize ui-state-focus liveSearchInputCorner ${parameters.cssClass}"<#rt/>
			    	               <#else>
 class ="path-theme-cust-input liveSearchText liveSearchCompSize ui-state-focus liveSearchInputCorner"<#rt/>
			    	               </#if>
 name='${lookupName}' value="<@s.property value="parameters.nameValue"/>"<#rt/>
			    	        	
			    	        	<#if parameters.inputCssStyle??>
 style="${parameters.inputCssStyle?html}"<#rt/>
								</#if>
			    	        	<#if parameters.required?default(false)>
 required = "true"<#rt/>
								</#if>
			    	        	<#if parameters.fieldAudit?default(false)>
 fieldAudit = "true"<#rt/>
								</#if>
								<#if parameters.gridColSortRight?default(false)>
 gridColSortRight="true"<#rt/>
								 </#if>
								<#if parameters.overrideLabelText??>
 overrideLabelText="${parameters.overrideLabelText?html}"<#rt/>
								</#if>
								<#if parameters.overrideLabelKey??>
 overrideLabelKey="${parameters.overrideLabelKey?html}"<#rt/>
								</#if>
								<#if parameters.maxlength?if_exists != "">
 maxlength="${parameters.maxlength?html}"<#rt/>
								</#if>
								<#if parameters.get("size")??>
 size="${parameters.get("size")?html}"<#rt/>
								</#if>								
								<#if parameters.get("mode")??>
 mode="${parameters.get("mode")?html}"<#rt/>
								</#if>
								<#if parameters.get("nbFormat")??>
 nbFormat="${parameters.get("nbFormat")?html}"<#rt/>
								</#if>								
								<#if parameters.get("minValue")??>
 minValue="${parameters.get("minValue")?html}"<#rt/>
								</#if>								
								<#if parameters.get("maxValue")??>
 maxValue="${parameters.get("maxValue")?html}"<#rt/>
								</#if>								
								<#if parameters.get("leadZeros")??>
 leadZeros="${parameters.get("leadZeros")?html}"<#rt/>
								</#if>
								<#if parameters.get("title")??>
 title="${parameters.get("title")?html}"<#rt/>
								</#if>
								<#if parameters.fielddesc??>
 fielddesc="${parameters.fielddesc?html}"<#rt/>
								</#if>
								<#if parameters.get("zeroNotAllowed")??>
 zeroNotAllowed = "${parameters.get("zeroNotAllowed")?html}"<#rt/>
								</#if>
								<#if parameters.tabindex??>
 tabindex="${parameters.tabindex?html}"<#rt/>
 oldtabindex="${parameters.tabindex?html}"<#rt/>
								</#if>
								<#if parameters.relatedDescElt??>
 relatedDescElt="${parameters.relatedDescElt?html}"<#rt/>
								</#if>
								<#if parameters.allowDefValCust?? && parameters.allowDefValCust?if_exists == "true">
 allowDefValCust="true"<#rt/>
								</#if>
								<#if parameters.mode?default("") != "number" && parameters.minlength?default(0) gt 0>
 minlength="${parameters.minlength?html}"<#rt/>
								</#if>
								<#include "/${parameters.templateDir}/path-xhtml/audit-attribute.ftl" />								
			    	        	/><#t/>							
						<#else>
							<input type="text" value="<@s.property value="parameters.nameValue"/>" autocomplete="off" id='${lookupTxt}'<#t/>
							 <#-- BUG 465503 Added class path-theme-cust-input-->
			    	               <#if parameters.cssClass??>
 class ="path-theme-cust-input liveSearchText liveSearchCompSize ui-state-focus liveSearchInputCorner ${parameters.cssClass}"<#rt/>
			    	               <#else>
 class ="path-theme-cust-input liveSearchText liveSearchCompSize ui-state-focus liveSearchInputCorner"<#rt/>
			    	               </#if>
 name='${lookupName}' afterDepEvent = "${afterDepEvent}"  onclick="return liveSearch(options_${parameters.id?html}_liveSearch);"
								<#if parameters.inputCssStyle??>
 style="${parameters.inputCssStyle?html}"<#rt/>
								</#if>
								<#if parameters.required?default(false)>
 required = "true"<#rt/>
								</#if>
			    	        	<#if parameters.fieldAudit?default(false)>
 fieldAudit = "true"<#rt/>
								</#if>
								<#if parameters.gridColSortRight?default(false)>
 gridColSortRight="true"<#rt/>
								 </#if>
								<#if parameters.overrideLabelText??>
 overrideLabelText="${parameters.overrideLabelText?html}"<#rt/>
								</#if>
								<#if parameters.overrideLabelKey??>
 overrideLabelKey="${parameters.overrideLabelKey?html}"<#rt/>
								</#if>
								<#if parameters.maxlength??>
 maxlength="${parameters.maxlength?html}"<#rt/>
								</#if>
								<#if parameters.get("size")??>
 size="${parameters.get("size")?html}"<#rt/>
								</#if>
								<#if parameters.get("mode")??>
 mode="${parameters.get("mode")?html}"<#rt/>
								</#if>
								<#if parameters.get("nbFormat")??>
 nbFormat="${parameters.get("nbFormat")?html}"<#rt/>
								</#if>											
								<#if parameters.get("minValue")??>
 minValue="${parameters.get("minValue")?html}"<#rt/>
								</#if>								
								<#if parameters.get("maxValue")??>
 maxValue="${parameters.get("maxValue")?html}"<#rt/>
								</#if>			
								<#if parameters.get("leadZeros")??>
 leadZeros="${parameters.get("leadZeros")?html}"<#rt/>
								</#if>
								<#if parameters.get("title")??>
 title="${parameters.get("title")?html}"<#rt/>
								</#if>
								<#if parameters.fielddesc??>
 fielddesc="${parameters.fielddesc?html}"<#rt/>
								</#if>
								<#if parameters.get("zeroNotAllowed")??>
 zeroNotAllowed = "${parameters.get("zeroNotAllowed")?html}"<#rt/>
								</#if>
								<#if parameters.tabindex??>
 tabindex="${parameters.tabindex?html}"<#rt/>
 oldtabindex="${parameters.tabindex?html}"<#rt/>
								</#if> 
								<#if parameters.mode?default("") != "number" && parameters.minlength?default(0) gt 0>
 minlength="${parameters.minlength?html}"<#rt/>
    							</#if>
								<#include "/${parameters.templateDir}/path-xhtml/audit-attribute.ftl" />
								/><#t/>
						</#if>	
						<span id = '${spanLookup}'  class='ui-search ui-state-default ui-state-focus liveSearchSpanCorner liveSearchSpanSize liveSearchSpanDisplay' <#t/>
 onclick="liveSearch(options_${parameters.id?html}_liveSearch);return false;" role="button" <#rt/>
								<#if parameters.tabindex??>
 tabindex="${parameters.tabindex?html}"<#rt/>
 oldtabindex="${parameters.tabindex?html}"<#rt/>
								<#else>
 tabindex="0"<#rt/>
 oldtabindex="0"<#rt/>
								</#if> 
						><#t/>
					<span class='ui-icon ui-icon-search live-search-ui'></span><#t/>
					</span><#t/>
					<div id = '${overlay}' class= "first liveSearchOverlay"><#t/>
						<table id = '${gridtab}'  border="0" ></table><#t/>
					</div><#t/>			
					<div id='${pagerid}'></div><#t/>															
				</div><#t/>
			</td><#t/>
		</tr><#t/>
	</table><#t/>
</div><#t/>
<script type="text/javascript"><#t/>
_mnglivsch("${multiResultInput?default('')}","${lookupTxt?default('')}","${mode?default('')}","${readOnlyModeValue?default('')}","${parameters.id}","${lookupDiv?default('')}","${dependencyValue?default('')}","${dependencySrcValue?default('')}","${parameterValue?default('')}","${spanLookup?default('')}","${afterDepEvent?default('')}","${overlay?default('')}","${beforeDepEvent?default('')}","${dynExpressionsArgsVal?default('')}",${parameters.customBtnData?default('null')},${parameters.customKeyEventBtnData?default('null')});<#t/>
</script><#t/>