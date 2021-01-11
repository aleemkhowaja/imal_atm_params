<#assign ps=JspTaglibs["/WEB-INF/tld/path-struts-tags.tld"]/>
<#assign psj=JspTaglibs["/WEB-INF/tld/path-struts-jquery-tags.tld"]/>
<#assign currRTL=isRTL?default("ltr")/>
<#assign index=1/>
<script type="text/javascript"><#t/>
 _menLayOut({currRTL:"${currRTL}"});<#t/>
</script><#t/>
<ul id="${parameters.id?html}" class="menu-header-elmnt"><#t/>
<#if parameters.list??>
<@s.iterator value="parameters.list">	
<@s.if test="%{href == null}" >
  <li class="menu_rite" relatedDiv="div_${index}"><#t/>
    <a href="#" class="drop">${menuHeaderName}</a><#t/>
    <script><#t/>
    $(document).ready(function() {<#rt/>
 var $newdiv1 = $('<div id="div_${index}" onmouseout="submenuMouseoutHandler(event, this)" style="background-color: silver; display:none;" class="dropdown_2columns align_right"/>');<#rt/>
 $('body').append($newdiv1);<#rt/>
 $newdiv1.load('${base}/${subHref}');<#rt/>
 });<#rt/>
     </script><#t/>
  </li><#t/>
 </@s.if>
<@s.else>
  <@s.if test="%{cssClass == null}" >
  <li class="menu_rite"><a href="${base}/${href}" class="">${menuHeaderName}</a><#t/>
  </li><#t/>
  </@s.if>
  <@s.else>
    <li class="${cssClass}" id="${list_id}"></li> <#t/>
  </@s.else> 
</@s.else> 
<#assign index=index+1 />
</@s.iterator>
</#if>
</ul><#t/>