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

<#if parameters.scriptPath?if_exists != "">
  <#assign javaScriptBasePath="${parameters.scriptPath?string}">
<#else>
  <#assign javaScriptBasePath="${base}/common/jquery/">
</#if>
  
<#if parameters.customBasepath?if_exists != "">
  <#assign basePath="${parameters.customBasepath?string}">
<#else>
  <#assign basePath="${javaScriptBasePath}themes">
</#if>
<#--
<#if parameters.compressed?default(true)>

  <#assign jqueryFile="jquery-1.6.2.min.js">
  <#assign jqueryForm="jquery.form.min.js">
  <#assign jqueryUIFile="jquery-ui.min.js">
  <#assign jqueryUICoreFile="jquery.ui.core.min.js">
  <#assign jqueryRequireFile="jquery.require.min.js">
  <#assign jquerySubscribeFile="jquery.subscribe.min.js">
  <#assign jqueryHistoryFile="jquery.ba-bbq.min.js">
  <#assign jqueryCompat13File="jquery.compat-1.3.min.js">
  <#assign jqueryStrutsFile="jquery.struts2.min.js">

<#else>

-->
  <#assign jqueryFile="jquery-3.3.1.js?_=${parameters.appversion?html}">
  <#assign jqueryForm="jquery.form.js?_=${parameters.appversion?html}">
  <#assign jqueryUIFile="jquery-ui.js?_=${parameters.appversion?html}">
  <#assign jqueryUICoreFile="jquery.ui.core.js?_=${parameters.appversion?html}">
  <#assign jqueryRequireFile="jquery.require.js?_=${parameters.appversion?html}">
  <#assign jquerySubscribeFile="jquery.subscribe.js?_=${parameters.appversion?html}">
  <#assign jqueryHistoryFile="jquery.ba-bbq.js?_=${parameters.appversion?html}">
  <#assign jqueryCompat13File="jquery.compat-1.3.js?_=${parameters.appversion?html}">
  <#assign jqueryStrutsFile="jquery.struts2-3.2.0.js?_=${parameters.appversion?html}">

<#--  
</#if>
-->

<script type="text/javascript" src="<@s.url value='/common/jquery/js/base/${jqueryFile}'/>"></script>
<#if parameters.jqueryui?default(true)>
	<#if parameters.loadAtOnce?default(false)>
<script type="text/javascript" src="<@s.url value='/common/jquery/js/base/${jqueryUIFile}'/>"></script>
	<#else>
<script type="text/javascript" src="<@s.url value='/common/jquery/js/base/${jqueryUICoreFile}'/>"></script>
	</#if>
</#if>

<#if parameters.compatibility?if_exists == "1.3">
	<script type="text/javascript" src="<@s.url value='/common/jquery/js/plugins/${jqueryCompat13File}'/>"></script>
</#if>
<#if parameters.loadAtOnce?default(false) ||  parameters.loadFromGoogle?default(false)>
	<script type="text/javascript" src="<@s.url value='/common/jquery/js/plugins/${jqueryForm}'/>"></script>
</#if>
  <script type="text/javascript" src="<@s.url value='/common/jquery/js/plugins/${jquerySubscribeFile}'/>"></script>
 
 <#--  
<#if parameters.ajaxhistory?default(false)>
  <script type="text/javascript" src="<@s.url value='/common/jquery/js/plugins/${jqueryHistoryFile}'/>"></script>
</#if>
-->

<#if parameters.jqueryui?default(true)>
    <#if parameters.jquerytheme?if_exists != "">
       <link id="jquery_theme_link" rel="stylesheet" href="${basePath}/${parameters.jquerytheme?string}/jquery-ui.css" type="text/css"/>
    <#else>
        <link id="path_jquery_theme_link" rel="stylesheet" href="<@s.url value='/common/jquery/themes/path_jquery_smoothness/CommonStyles.css'/>" type="text/css"/>
		<#if isRTL?default("ltr") == 'rtl'>    
	        <link id="path_jquery_theme_link_rtl" rel="stylesheet" href="<@s.url value='/common/jquery/themes/path_jquery_smoothness/CommonStyles-rtl.css'/>" type="text/css"/>
    	</#if>
    </#if>
    
</#if>


  <script type="text/javascript" src="<@s.url value='/common/jquery/js/struts2/${jqueryStrutsFile}'/>"></script>
<script type="text/javascript">
jQuery.contextPath = "${base}";

jQuery(document).ready(function () {
<#if parameters.debug?default(false)>
	jQuery.struts2_jquery.debug = true;
</#if>
<#if parameters.loadAtOnce?default(false) || parameters.loadFromGoogle?default(false)>
	jQuery.struts2_jquery.loadAtOnce = true;
</#if>
<#if parameters.scriptPath?if_exists != "">
  	jQuery.scriptPath = "${parameters.scriptPath?string}";
<#else>
  	jQuery.scriptPath = "${javaScriptBasePath}";
</#if>

jQuery.baseScriptPath = "${base}/struts/"; 
jQuery.struts2_jquery.minSuffix = "";

<#--
<#if !parameters.compressed?default(true)>
	jQuery.struts2_jquery.minSuffix = "";
</#if>
-->
<#if parameters.jqueryLocale?if_exists != "" && parameters.jqueryLocale?if_exists != "en">
  jQuery.struts2_jquery.local = "${parameters.jqueryLocale?string}";
  jQuery.struts2_jquery.gridLocal = "${parameters.jqueryLocale?string}";
</#if>
<#--
<#if parameters.gridLocale??>
  jQuery.struts2_jquery.gridLocal = "${parameters.gridLocale?default('en')}";
</#if>
-->
<#if parameters.ajaxhistory?default(false)>
	jQuery.struts2_jquery.ajaxhistory = true;
</#if>
	<#if parameters.defaultIndicator?if_exists != "">
	jQuery.struts2_jquery.defaults.indicator="${parameters.defaultIndicator?string}";
	</#if>
	<#if parameters.defaultLoadingText?if_exists != "">
	jQuery.struts2_jquery.defaults.loadingText="${parameters.defaultLoadingText?string}";
	</#if>
	<#if parameters.defaultErrorText?if_exists != "">
	jQuery.struts2_jquery.defaults.errorText="${parameters.defaultErrorText?string}";
	</#if>
	jQuery.ajaxSettings.traditional = true;

	jQuery.ajaxSetup ({
	<#if parameters.ajaxcache?default(false)>
		cache: true
	<#else>
		cache: false
	</#if>
	});
<#if parameters.ajaxhistory?default(false)>
	jQuery(window).trigger('hashchange');
</#if>
	//PathSolutions Raees added to load jquery-ui-timepicker-addon.js (to ensure its loaded while calling from script in the grid) 
	//jQuery.struts2_jquery.initDatepicker(true);
});

</script>
