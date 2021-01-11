<#if tag.class?ends_with("Checkbox")>
<#if parameters.nameValue?? && parameters.nameValue == 'true' || (parameters.valOpt?? && parameters.valOpt?substring(0,parameters.valOpt?index_of(':')) == parameters.nameValue)>
 initialValue="checked"<#rt/>
<#else> initialValue=""<#rt/>
</#if>
<#elseif tag.class?ends_with("Radio")>
<#if tag.contains(parameters.nameValue?default(''), itemKeyStr)>	
 initialValue = "checked"<#rt/>
<#else>
 initialValue=""<#rt/>
</#if>
<#elseif tag.class?ends_with("CheckboxList")>	
	<#if tag.contains(parameters.nameValue, itemKey)>
 initialValue="checked"<#rt/>
	<#else>
 initialValue=""<#rt/>
	</#if>
<#elseif tag.class?ends_with("Select")>	
 	<#if parameters.nameValue??>
 initialValue="${parameters.nameValue?html}" prevValue="${parameters.nameValue?html}"<#rt/>
 	<#elseif parameters.headerKey??>
 initialValue="${parameters.headerKey?html}" prevValue="${parameters.headerKey?html}"<#rt/>
 	<#else>	
 initialValue="" prevValue=""<#rt/>
 	</#if>
 <#elseif tag.class?ends_with("PathForm") >
	<#if parameters.onsubmit??>	
			<#if enableAudit=="true">
				<#if parameters.onsubmit?html?ends_with(";")>
 onsubmit="${parameters.onsubmit?html}auditForm(this);"<#rt/>
		 		 <#else>
 onsubmit="${parameters.onsubmit?html};auditForm(this);"<#rt/>
		 		 </#if>
		 	<#else>
 onsubmit="${parameters.onsubmit?html}"<#rt/>
		 	</#if>	 		 	 
 	<#else>
 		<#if enableAudit=="true"> 		
 onsubmit=auditForm(this);<#rt/> 
 		</#if> 		
	</#if>					 			 	  	  			
<#else>	
		<#if parameters.prevValue??>
 initialValue="${parameters.prevValue?html}" prevValue="${parameters.prevValue?html}"<#rt/>
		<#else>	
		    <#if parameters.nameValue??>
 initialValue="${parameters.nameValue?html}" prevValue="${parameters.nameValue?html}"<#rt/>
		    <#else>
 initialValue="" prevValue=""<#rt/>   
		    </#if>
		</#if>
</#if>