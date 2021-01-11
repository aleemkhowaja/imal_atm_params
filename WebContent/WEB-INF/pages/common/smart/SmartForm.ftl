<#assign ps=JspTaglibs["/WEB-INF/tld/path-struts-tags.tld"]>
<#assign psj=JspTaglibs["/WEB-INF/tld/path-struts-jquery-tags.tld"]>
<#assign ptt=JspTaglibs["/WEB-INF/tld/path-toolbar-tags.tld"]>

<#if (useActiveX)>
<object name="PathCtrl" style='display:none' id='PathCtrl' classid='${twainCLSID}' codebase='${base}/login/PathTWAINCtrl.cab#version=${scanAxVersion}'></object>
<#assign pathCtrlAXLoaded = 1>
</#if>

<script type="text/javascript">
$(document).ready(function(){ 
	$.struts2_jquery.require("/common/js/smart/Smart.js","",'${base}');
	$.struts2_jquery.require("/common/js/scan/Scan.js","",'${base}');
 });
 </script>
 
<#if (smartCOList?? && smartCOList?size>0) >
<@ps.form id="smartWindow_${_pageRef}" enctype="multipart/form-data"  method="post"  action="">
	<#include "Smart.ftl" />
</@ps.form>
</#if>