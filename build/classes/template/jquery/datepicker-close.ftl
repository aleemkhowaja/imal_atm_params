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
<#assign escapedOptionId="${parameters.id?string?replace('.', '_')}">
<#assign escapedOptionDisplayFormat="${parameters.displayFormat?html}">
<script type='text/javascript'><#t/>
jQuery(document).ready(function () {<#t/>
_chkDtBefLv({id:"${escapedOptionId?html}", displayFormat:"${escapedOptionDisplayFormat?html}" <#rt/>
<#if parameters.timepicker?default(false)>,timepicker:true </#if> }); <#rt/>
	var options_${escapedOptionId?html} = {beforeShow: function(input, inst) { if($("#${escapedOptionId?html}").attr('readonly')) {return false;} }<#rt/>
  <#if parameters.dayValue?if_exists != "">
	,day : ${parameters.dayValue?html}<#t/>
  </#if>
  <#if parameters.disabled?default(false)>
	 ,disabled : true<#t/>
  </#if>
  <#if parameters.monthValue?if_exists != "">
	,month : ${parameters.monthValue?html}<#t/>
  </#if>
  <#if parameters.yearValue?if_exists != "">
	,year : ${parameters.yearValue?html}<#t/>
  </#if>
  <#if parameters.hourValue?if_exists != "">
	,hour : ${parameters.hourValue?html}<#t/>
  </#if>
  <#if parameters.minuteValue?if_exists != "">
	,minute : ${parameters.minuteValue?html}<#t/>
  </#if>
  <#if parameters.secondValue?if_exists != "">
	,second : ${parameters.secondValue?html}<#t/>
  </#if>
  <#if parameters.showButtonPanel?default(false)>
	,showButtonPanel : true<#t/>
  </#if>
  <#if parameters.buttonImageOnly?default(false)>
	,buttonImageOnly : true<#t/>
  </#if>
  <#if parameters.changeMonth?default(false)>
	,changeMonth : true<#t/>
  </#if>
  <#if parameters.changeYear?default(false)>
	,changeYear : true<#t/>
  </#if>
  <#if parameters.showOn?if_exists != "">
	,showOn : "${parameters.showOn?html}"<#t/>
  <#else>
	,showOn : "both"<#t/>
  </#if>
  <#if parameters.buttonImage?if_exists != "">
	,buttonImage : "${parameters.buttonImage?html}"<#t/>
  <#else>
    <#if parameters.buttonText?if_exists == "">
	,buttonImage : "${base}/common/images/calendar.png"<#t/>
    </#if>
  </#if>
  <#if parameters.buttonText?if_exists != "">
	,buttonText : "${parameters.buttonText?html}"<#t/>
  </#if>
  <#if parameters.duration?if_exists != "">
	,duration : "${parameters.duration?html}"<#t/>
  </#if>
  <#if parameters.showAnim?if_exists != "">
	,showAnim : "${parameters.showAnim?html}"<#t/>
  </#if>
  <#if parameters.firstDay?if_exists != "">
	,firstDay : "${parameters.firstDay?html}"<#t/>
  </#if>
  <#if parameters.numberOfMonths?if_exists != "">
	,numberofmonths : "${parameters.numberOfMonths?html}"<#t/>
  </#if>
  <#if parameters.showOptions?if_exists != "">
	, showoptions : "${parameters.showOptions?html}"<#t/>
  </#if>
  <#if parameters.yearRange?if_exists != "">
	,yearRange : "${parameters.yearRange?html}"<#t/>
  </#if>
  <#if parameters.displayFormat?if_exists != "">
	,displayformat :"${parameters.displayFormat?html}"<#t/>
  </#if>
  <#if parameters.onBeforeShowDayTopics?if_exists != "">
 	, onbeforeshowdaytopics : "${parameters.onBeforeShowDayTopics?html}"<#t/>
  </#if>
  <#if parameters.onChangeMonthYearTopics?if_exists != "">
 	,onchangemonthyeartopics : "${parameters.onChangeMonthYearTopics?html}"<#t/>
  </#if>
  <#if parameters.zindex?if_exists != "">
 	,zindex : ${parameters.zindex?html}<#t/>
  </#if>
  <#if parameters.appendText?if_exists != "">
	,appendText : "${parameters.appendText?html}"<#t/>
  </#if>
  <#if parameters.maxDate?if_exists != "">
	,maxDate : "${parameters.maxDate?html}"<#t/>
  </#if>
  <#if parameters.maxDayValue??>
  	<#if parameters.timepicker?default(false)>
	,maxDate : new Date(${parameters.maxYearValue?html}, ${parameters.maxMonthValue?html}, ${parameters.maxDayValue?html}, ${parameters.maxHourValue?html}, ${parameters.maxMinuteValue?html}, ${parameters.maxSecondValue?html})<#t/>
	<#else>
	,maxDate : new Date(${parameters.maxYearValue?html}, ${parameters.maxMonthValue?html}, ${parameters.maxDayValue?html})<#t/>
  	</#if>
  </#if>
  <#if parameters.minDate?if_exists != "">
	,minDate : "${parameters.minDate?html}"<#t/>
  </#if>
  <#if parameters.minDayValue??>
  	<#if parameters.timepicker?default(false)>
	,minDate : new Date(${parameters.minYearValue?html}, ${parameters.minMonthValue?html}, ${parameters.minDayValue?html}, ${parameters.minHourValue?html}, ${parameters.minMinuteValue?html}, ${parameters.minSecondValue?html})<#t/>
	<#else>
	,minDate : new Date(${parameters.minYearValue?html}, ${parameters.minMonthValue?html}, ${parameters.minDayValue?html})<#t/>
  	</#if>
  </#if>
  <#if parameters.inline?default(false)>
	,inline : true<#t/>
  </#if>
  <#if parameters.timepicker?default(false)>
	,timepicker : true<#t/>
  	<#if parameters.timepickerOnly?default(false)>
	,tponly : true<#t/>
  	</#if>
   	<#if parameters.timepickerAmPm?default(false)>
	,ampm : true<#t/>
  	</#if>
    <#if parameters.timepickerShowHour?exists>
	,showHour : ${parameters.timepickerShowHour?string}<#t/>
	</#if>
    <#if parameters.timepickerShowMinute?exists>
	,showMinute : ${parameters.timepickerShowMinute?string}<#t/>
	</#if>
    <#if parameters.timepickerShowSecond?exists>
	,showSecond : ${parameters.timepickerShowSecond?string}<#t/>
	</#if>
    <#if parameters.timepickerStepHour?exists>
	,stepHour : ${parameters.timepickerStepHour?c}<#t/>
	</#if>
    <#if parameters.timepickerStepMinute?exists>
	,stepMinute : ${parameters.timepickerStepMinute?c}<#t/>
	</#if>
    <#if parameters.timepickerStepSecond?exists>
	,stepSecond : ${parameters.timepickerStepSecond?c}<#t/>
	</#if>
  	<#if parameters.timepickerFormat?if_exists != "">
	,timeFormat : "${parameters.timepickerFormat?html}"<#t/>
  	</#if>
  	<#if parameters.timepickerSeparator?if_exists != "">
	,separator : "${parameters.timepickerSeparator?html}"<#t/>
  	</#if>
     <#if parameters.timepickerGridHour?exists>
	,hourGrid : ${parameters.timepickerGridHour?c}<#t/>
	</#if>
    <#if parameters.timepickerGridMinute?exists>
	,minuteGrid : ${parameters.timepickerGridMinute?c}<#t/>
	</#if>
    <#if parameters.timepickerGridSecond?exists>
	,secondGrid : ${parameters.timepickerGridSecond?c}<#t/>
	</#if>
  	<#if parameters.timepickerTimeOnlyTitle?if_exists != "">
	,timeOnlyTitle : "${parameters.timepickerTimeOnlyTitle?html}"<#t/>
  	</#if>
  	<#if parameters.timepickerTimeText?if_exists != "">
	,timeText : "${parameters.timepickerTimeText?html}"<#t/>
  	</#if>
  	<#if parameters.timepickerHourText?if_exists != "">
	,hourText : "${parameters.timepickerHourText?html}"<#t/>
  	</#if>
  	<#if parameters.timepickerMinuteText?if_exists != "">
	,minuteText : "${parameters.timepickerMinuteText?html}"<#t/>
  	</#if>
  	<#if parameters.timepickerSecondText?if_exists != "">
	,secondText : "${parameters.timepickerSecondText?html}"<#t/>
  	</#if>
  	<#if parameters.timepickerCurrentText?if_exists != "">
	,currentText : "${parameters.timepickerCurrentText?html}"<#t/>
  	</#if>
  	<#if parameters.timepickerCloseText?if_exists != "">
	,closeText : "${parameters.timepickerCloseText?html}"<#t/>
  	</#if>
  	<#if parameters.showHijri?if_exists != "" && parameters.showHijri=="true">
	,showHijri : "${parameters.showHijri?html}"<#t/>
  	</#if>
  </#if>
  <#if parameters.isRTL?default(false)>
	 ,isRTL : true<#t/>
  </#if>
  <#-- PathSolutions - remorge base.ftl and merge it directly with the json object  <#include "/${parameters.templateDir}/jquery/base.ftl" /> -->
  <#if parameters.jqueryaction?exists>
	,jqueryaction : "${parameters.jqueryaction?html}"<#t/>
  </#if>
  <#if parameters.id?exists>
	,id : "${parameters.id?html}"<#t/>
  </#if>
  <#if parameters.name?exists>
	,name : "${parameters.name?html}"<#t/>
  </#if>
  };<#t/>
<#-- PathSolutions - remorge base.ftl and merge it directly with the json object  <#include "/${parameters.templateDir}/jquery/base.ftl" /> -->
<#include "/${parameters.templateDir}/jquery/interactive.ftl" />
<#include "/${parameters.templateDir}/jquery/topics.ftl" />
<#include "/${parameters.templateDir}/jquery/jquery-bind.ftl" />
 });<#t/>
</script><#t/>