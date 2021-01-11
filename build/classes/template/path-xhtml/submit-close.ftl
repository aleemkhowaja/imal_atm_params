
<#if parameters.type?? && parameters.type=="button">
	</button><#t/>
<#else>
	<#if parameters.type?? && parameters.type=="image">
		</input><#t/>
	<#else>
		</button><#t/>
	</#if>
</#if>

<#include "/${parameters.templateDir}/simple/submit-close.ftl" />
</div><#t/>
<#include "/${parameters.templateDir}/path-xhtml/controlfooter.ftl" />
