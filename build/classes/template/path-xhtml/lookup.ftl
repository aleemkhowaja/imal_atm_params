<#include "/${parameters.templateDir}/${parameters.theme}/controlheader.ftl" />

<DIV id="${parameters.lookupId?html}"<#rt/>
	name="${parameters.name?default("")?html}"<#rt/>
	lookupVarName="${parameters.lookupVarName?html}"<#rt/>
	onValidate="${parameters.onValidate?html}"<#rt/>
	onOpenClose="${parameters.onOpenClose?html}"<#rt/>
	onNodeDbClick="${parameters.onNodeDbClick?html}"<#rt/>
	onNodeClick="${parameters.onNodeClick?html}"<#rt/>
	onChkClick="${parameters.onChkClick?html}"<#rt/>
	onAfterLookupLoad="${parameters.onAfterLookupLoad?html}"<#rt/>
	onBeforeLookupLoad="${parameters.onBeforeLookupLoad?html}"<#rt/>
	onLinkClick="${parameters.onLinkClick?html}"<#rt/>

<#if parameters.nameValue??>
 value="<@s.property value="parameters.nameValue"/>"<#rt/>
</#if>
<#if parameters.tabindex??>
 tabindex="${parameters.tabindex?html}"<#rt/>
</#if>
<#if parameters.disabled?default(false)>
 disabled="disabled"<#rt/>
</#if>
<#if parameters.readonly?default(false)>
 readonly="readonly"<#rt/>
</#if>
<#if parameters.id??>
 id="${parameters.id?html}"<#rt/>
</#if>
	
<#if parameters.lookupName??>
 lookupName="${parameters.lookupName?html}"<#rt/>
</#if>

<#if parameters.lookupWidth??>
 lookupWidth="${parameters.lookupWidth?html}"<#rt/>
</#if>

<#if parameters.lookupHeight??>
 lookupHeight="${parameters.lookupHeight?html}"<#rt/>
</#if>

<#if parameters.lookupTop??>
 lookupTop="${parameters.lookupTop?html}"<#rt/>
</#if>	

<#if parameters.lookupLeft??>
 lookupLeft="${parameters.lookupLeft?html}"<#rt/>
</#if>	

<#if parameters.useDefaultCSS??>
 useDefaultCSS="${parameters.useDefaultCSS?html}"<#rt/>
</#if>	

<#if parameters.idProperty??>
 idProperty="${parameters.idProperty?html}"<#rt/>
</#if>	

<#if parameters.lookupTitle??>
 lookupTitle="${parameters.lookupTitle?html}"<#rt/>
</#if>	

<#if parameters.onSelectionClick??>
 onSelectionClick="${parameters.onSelectionClick?html}"<#rt/>
</#if>	

<#if parameters.defaultFilter??>
 defaultFilter="${parameters.defaultFilter?html}"<#rt/>
</#if>	

<#if parameters.menuVar??>
 menuVar="${parameters.menuVar?html}"<#rt/>
</#if>	

<#if parameters.startWithCode??>
 startWithCode="${parameters.startWithCode?html}"<#rt/>
</#if>	

<#if parameters.recursive??>
 recursive="${parameters.recursive?html}"<#rt/>
</#if>	

<#if parameters.selectFoundNode??>
 selectFoundNode="${parameters.selectFoundNode?html}"<#rt/>
</#if>	

<#if parameters.sizeProperty??>
 sizeProperty="${parameters.sizeProperty?html}"<#rt/>
</#if>	

<#if parameters.multiSelection??>
 multiSelection="${parameters.multiSelection?html}"<#rt/>
</#if>	

<#if parameters.onAdd??>
 onAdd="${parameters.onAdd?html}"<#rt/>
</#if>	

	
<#include "/${parameters.templateDir}/path-xhtml/scripting-events.ftl" />
<#include "/${parameters.templateDir}/simple/common-attributes.ftl" />
<#include "/${parameters.templateDir}/simple/dynamic-attributes.ftl" />


></DIV>	


<#include "/${parameters.templateDir}/path-xhtml/controlfooter.ftl" />