<#--
/*
 * $Id: text.ftl 720258 2008-11-24 19:05:16Z musachy $
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
<#include "/${parameters.templateDir}/path-xhtml/controlheader.ftl" />
<#-- Path Solutions [Libin] added autocomplete to override default browser behavior--> 
<input type="text" autocomplete="off"<#t/>	
 name="${parameters.name?default("")?html}"<#rt/>
<#-- If size not available then set the size 100% of that of parent by setting cssClass to textCompSize or else read size attr-->
<#if parameters.get("size")??>
 <#-- BUG 465503 Added class path-theme-cust-input-->
 size="${parameters.get("size")?html}"<#rt/>
<#if parameters.cssClass??>
 class = "path-theme-cust-input ui-state-focus ui-corner-all path-text-size ${parameters.cssClass}"<#rt/>
	 <#else>
 class = "path-theme-cust-input ui-state-focus ui-corner-all path-text-size"<#rt/>
</#if>	
<#else>
	<#-- applying the style for date picker and text component  --> 
	<#-- Path Solutions [Libin] updated ui-widget-content with ui-state-focus to improve the appearance of input fields  --> 
	<#if fromDatepicker??>
 class="path-theme-cust-input ${parameters.cssClass?default('dateCompSize ui-state-focus ui-corner-all')}"<#rt/>
	<#else>
	      <#if parameters.cssClass??>
 class="path-theme-cust-input textCompSize ui-state-focus ui-corner-all ${parameters.cssClass}"<#rt/>
	      <#else>
 class="path-theme-cust-input textCompSize ui-state-focus ui-corner-all"<#rt/>  
	      </#if>
	</#if> 
</#if>
<#if parameters.maxlength?if_exists != "">
 maxlength="${parameters.maxlength?html}"<#rt/>
</#if>
<#if parameters.nameValue??>
 value="<@s.property value="parameters.nameValue"/>"<#rt/>
</#if>
<#if parameters.disabled?default(false)>
 disabled="disabled"<#rt/>
</#if>
<#if parameters.readonly?default(false)>
 	readonly="readonly"<#rt/>
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
<#if parameters.fielddesc??>
 fielddesc="${parameters.fielddesc?html}"<#rt/>
</#if>
<#if parameters.mode?default("") == 'number'>
 mode="${parameters.mode?html}"<#rt/>
  	<#if parameters.label?if_exists != "">
 label = "${parameters.label?html}"<#rt/>
	</#if>	
 	<#if parameters.nbFormat?if_exists != "">
 nbFormat = "${parameters.nbFormat?html}"<#rt/>
		<#else>
		 	<#if parameters.txtFormat?if_exists != "">
 txtFormat = "${parameters.txtFormat?html}"<#rt/>
			</#if>	
	</#if>	
 	<#if parameters.noFormat?if_exists != "">
 noFormat = "${parameters.noFormat?html}"<#rt/>
	</#if>	
 	<#if parameters.zeroNotAllowed?if_exists != "">
 zeroNotAllowed = "${parameters.zeroNotAllowed?html}"<#rt/>
	</#if>
	<#if parameters.leadZeros?if_exists !="">
 leadZeros = "${parameters.leadZeros?html}"<#rt/>
	</#if>	
 	<#if parameters.decimalSepa?if_exists != "">
 decimalSepa = "${parameters.decimalSepa?html}"<#rt/>
	</#if>
 	<#if parameters.groupSepa?if_exists != "">
 groupSepa = "${parameters.groupSepa?html}"<#rt/>
	</#if>
 	<#if parameters.roundNumber?if_exists != "">
 roundNumber = "${parameters.roundNumber?html}"<#rt/>
	</#if>	
 	<#if parameters.showCurrency?if_exists != "">
 showCurrency = "${parameters.showCurrency?html}"<#rt/>
	</#if>	
 	<#if parameters.currencySymbol?if_exists != "">
 currencySymbol = "${parameters.currencySymbol?html}"<#rt/>
	</#if>	
 	<#if parameters.emptyValue?if_exists != "">
 emptyValue = "${parameters.emptyValue?html}"<#rt/>
	</#if>	
 	<#if parameters.minValue?if_exists != "">
 minValue = "${parameters.minValue?html}"<#rt/>
	</#if>	
 	<#if parameters.maxValue?if_exists != "">
 maxValue = "${parameters.maxValue?html}"<#rt/>
	</#if>
 	<#if parameters.maxLenBeforeDec?if_exists != "">
 maxLenBeforeDec = "${parameters.maxLenBeforeDec?html}"<#rt/>
	</#if>
	<#if parameters.formatter?if_exists != ""> 
 formatter="${parameters.formatter?html}"<#rt/>
	</#if>
</#if>
<#if parameters.required?default(false)>
 required = "true"<#rt/>
</#if>	
<#if parameters.afterDepEvent??>
 afterDepEvent = "${parameters.afterDepEvent?html}"<#rt/>
</#if>	
<#if parameters.inputOrder??>
 inputOrder = "${parameters.inputOrder?html}"<#rt/>
</#if>	
<#if parameters.descriptionKey??>
 descriptionKey = "${parameters.descriptionKey?html}"<#rt/>
</#if>	
<#if parameters.allowDefValCust?? && parameters.allowDefValCust?if_exists == "true">
 allowDefValCust="true"<#rt/>
</#if>
<#if parameters.mode?default("") != "number" && parameters.minlength?default(0) gt 0>
 minlength="${parameters.minlength?html}"<#rt/>
</#if>
<#include "/${parameters.templateDir}/path-xhtml/audit-attribute.ftl" />
<#include "/${parameters.templateDir}/path-xhtml/scripting-events.ftl" />
<#include "/${parameters.templateDir}/simple/common-attributes.ftl" />
<#include "/${parameters.templateDir}/simple/dynamic-attributes.ftl" />
<#if parameters.dynExpressionsArgs??>
 dynExpressionsArgs = "${parameters.dynExpressionsArgs?html}"<#rt/>
</#if>
<#if parameters.mode?default("") == 'multiValue'>
><img src="/common/components/form/img/MultiValue.gif"></input><#t/>
<#else>/><#t/>
<#include "/${parameters.templateDir}/path-xhtml/controlfooter.ftl" />
<script type="text/javascript"><#t/>
<#if parameters.mode?default("") == 'number'>		
 applyFormat("${parameters.id}");<#rt/>
<#else>
		<#if parameters.txtFormat?if_exists != "">
 $.struts2_jquery.require( [ "js/plugins/jquery.maskedinput.js"]); <#rt/>
 $("#${parameters.id}").mask("${parameters.txtFormat?html}");<#rt/>
		</#if>
</#if>
</#if>
<#if parameters.customBtnData??>
 var customBtnData = ${parameters.customBtnData};<#t/>
 $( "#${parameters.id?html}" ).data( "customBtnData", customBtnData );<#t/>
</#if>
<#if parameters.customKeyEventBtnData??>
	var customKeyEventBtnData = ${parameters.customKeyEventBtnData}
		$( "#${parameters.id?html}" ).data( "customKeyEventBtnData", customKeyEventBtnData );
			$( "#${parameters.id?html}" ).keydown(function(event) {
    			if (event.keyCode === 117 && event.ctrlKey ) {
        			customKeyEventCall('${parameters.id}');
   				}
			});
</#if>
<#if parameters.onlyArabic?? && parameters.onlyArabic?if_exists !="false">
       switchInput('${parameters.id}',true);<#t/>
</#if>
<#if parameters.cssStyle?? && parameters.onlyArabic?if_exists !="true">
	   switchInput('${parameters.id}',false,'${parameters.cssStyle}');<#t/>
</#if>
<#if (fromDatepicker?? && hijriDate?if_exists =="true") || ( parameters.onlyArabic?? && parameters.onlyArabic?if_exists !="false")>
       <#if fromDatepicker?? && hijriDate?if_exists =="true">
		    calendar = $.calendars.instance('islamic'<#t/>
		    <#if parameters.langCode?if_exists != "" && parameters.langCode?if_exists != "en">
		    ,'${parameters.langCode}'<#t/>
		    </#if>
		    );<#t/>
		    var _style = "";<#t/>
		    <#if parameters.cssStyle??>
		      <#--
		         /**		          
		          * [MarwanMaddah]
		          * this piece of code is used to remove the width from the image style
		          * to avoid abnormal image layout
		          */
		      -->
		      _style = "${parameters.cssStyle}";<#t/>
		      if(_style.indexOf("width") != -1 )<#t/>
		      {<#t/>
		        var styleContent = _style.split(';');<#t/>
		        _style = "";<#t/>
		        for(var i=0;i<styleContent.length;i++)<#t/>
		        {<#t/>
		          if(styleContent[i].indexOf("width") == -1 && ""!=styleContent[i])<#t/>
		          {<#t/>
		            _style = _style + styleContent[i]+";";<#t/>
		          }<#t/>
		        }<#t/>
		      }<#t/>
		    </#if>
			$('#${parameters.id}').calendarsPicker({inputId:'${parameters.id}',pickerClass: 'demo',renderer: $.calendars.picker.themeRollerRenderer,changeMonth: false,dateFormat:'dd/mm/yyyy', calendar: calendar,showTrigger:'<img src="${base}/common/images/calendar.png" alt="..." title="..."<#t/>
		    <#if parameters.cssStyle??>
 style="'+_style+'"<#rt/>
		    </#if>
 class="path-theme-cust-input ui-datepicker-trigger">'});<#rt/>
       <#else>
 _reqArInp();<#rt/>
       </#if>
 </#if>
 </script><#t/>