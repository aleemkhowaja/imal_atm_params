<#--
/*
 * Licensed to PathSolutions
 * Author: Khaled Hussein
 */
-->
<div id = "${parameters.id?html}" />	

<#assign escapedOptionId="${parameters.id?string?replace('.', '_')}">

<script type='text/javascript'>
jQuery(document).ready(function () { 
	jQuery.struts2_jquery.require("js/joint/path.gtree.js");
	
	// Get the width and the height passed in parameters, by default 100% will be used.
	var width, height;
	
	<#if parameters.width?exists>
		width = '${parameters.width}';
	<#else>
		width = '100%';
	</#if>
	<#if parameters.height?exists>
		height = '${parameters.height}';
	<#else>
		height = '100%';
	</#if>
	
	var options_${escapedOptionId?html} = {};
	
	options_${escapedOptionId?html}.width = width;
	options_${escapedOptionId?html}.height = height;
	options_${escapedOptionId?html}.cells = ${parameters.cells?string};
	options_${escapedOptionId?html}.addLabel = '${parameters.addLabel?string}';
	options_${escapedOptionId?html}.linkLabel = '${parameters.linkLabel?string}';
	options_${escapedOptionId?html}.removeLabel = '${parameters.removeLabel?string}';
	options_${escapedOptionId?html}.renameLabel = '${parameters.renameLabel?string}';
	options_${escapedOptionId?html}.gtreeNameLbl = '${parameters.gtreeNameLbl?string}';
	options_${escapedOptionId?html}.okButtonLbl = '${parameters.okButtonLbl?string}';
	options_${escapedOptionId?html}.cancelButtonLbl = '${parameters.cancelButtonLbl?string}';
	options_${escapedOptionId?html}.editable = '${parameters.editable?default("")?string}';
	options_${escapedOptionId?html}.editableLink = '${parameters.editableLink?default("")?string}';
	options_${escapedOptionId?html}.detailsButtonLbl = '${parameters.detailsButtonLbl?default("")?string}';
	
	<#if parameters.customAddDialog?if_exists != "">
		options_${escapedOptionId?html}.customAddDialog = "${parameters.customAddDialog?string}";
	</#if>
	
	<#if parameters.customNodeDetailsFunc?if_exists != "">
		options_${escapedOptionId?html}.customNodeDetailsFunc = "${parameters.customNodeDetailsFunc?string}";
	</#if>
	
	<#if parameters.hideNodeRenameBtn?if_exists != "">
		options_${escapedOptionId?html}.hideNodeRenameBtn = "${parameters.hideNodeRenameBtn?string}";
	</#if>
	
	<#if parameters.hideLinkLabelField?if_exists != "">
		options_${escapedOptionId?html}.hideLinkLabelField = "${parameters.hideLinkLabelField?string}";
	</#if>
	
	<#if parameters.customAddLinkDialog?if_exists != "">
		options_${escapedOptionId?html}.customAddLinkDialog = "${parameters.customAddLinkDialog?string}";
	</#if>
	
	<#if parameters.onDblClickTopic?if_exists != "">
		options_${escapedOptionId?html}.onDblClickTopic = "${parameters.onDblClickTopic?string}";
	</#if>
	
	<#if parameters.onLinkDblClickTopic?if_exists != "">
		options_${escapedOptionId?html}.onLinkDblClickTopic = "${parameters.onLinkDblClickTopic?string}";
	</#if>
	
	<#if parameters.hideAddLinkBtn?if_exists != "">
		options_${escapedOptionId?html}.hideAddLinkBtn = "${parameters.hideAddLinkBtn?string}";
	</#if>
	
	<#if parameters.deleteNodeCallBack?if_exists != "">
		options_${escapedOptionId?html}.deleteNodeCallBack = "${parameters.deleteNodeCallBack?string}";
	</#if>
	
	<#if parameters.cssClassAdd?if_exists != "">
		options_${escapedOptionId?html}.cssClassAdd = "${parameters.cssClassAdd?string}";
	</#if>
	<#if parameters.cssClassDelete?if_exists != "">
		options_${escapedOptionId?html}.cssClassDelete = "${parameters.cssClassDelete?string}";
	</#if>
	<#if parameters.cssClassInfo?if_exists != "">
		options_${escapedOptionId?html}.cssClassInfo = "${parameters.cssClassInfo?string}";
	</#if>
	<#if parameters.cssClassLink?if_exists != "">
		options_${escapedOptionId?html}.cssClassLink = "${parameters.cssClassLink?string}";
	</#if>
	<#if parameters.cssClassRename?if_exists != "">
		options_${escapedOptionId?html}.cssClassRename = "${parameters.cssClassRename?string}";
	</#if>
	
	<#assign escapedId="${parameters.id?string?replace('.', '\\\\\\\\.')}">
	
	jQuery.path_gTree.gTree('${escapedId?html}',options_${escapedOptionId?html});
 }); 
</script>
