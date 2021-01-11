<#if icon???if_exists>
	<#assign alignIcon="fg-button-icon-left">
<#else>
 	<#assign icon="">
 	<#assign alignIcon="">
</#if>  
<#if id???if_exists>	 
<#else>
 	<#assign id=""> 	
</#if> 
<a href='${actionName}' id='${id}' class="fg-button ui-state-default  ui-corner-all ${alignIcon}"><span class='${icon}'></span>