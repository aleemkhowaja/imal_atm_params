
<#assign index=0 />
<#assign scrollSize = scrollSize?number />
<#assign menuId = id />
<#assign targetLoadAction = targetLoadAction />

<#assign baseUrl=actionName+"?actionName="+actionName+"&targetName="+targetName+"&scrollSize="+scrollSize+"&id="+menuId+"&targetLoadAction="+targetLoadAction />
<#assign targetName=targetName/>   
<#assign root=root/> 

<@s.iterator value="menuData">
	<#assign menuName=menuData.get(index).menuName />
	<#assign leaf=menuData.get(index).leaf />
	<#assign menuVar=menuData.get(index).menuVar/>	
	<#assign url=baseUrl+"&menuId="+menuVar />
	<#if menuData.get(index).onLeafClick??>	
		<#assign onLeafClick=menuData.get(index).onLeafClick/>
	  <#else>
	  	<#assign onLeafClick=""/>		
	</#if>		
	<#if !root || index<scrollSize>	
		<li  class="ui-state-focus  ui-corner-all">
		<#if !leaf>
		
			<a href="#" class="accessible" onmouseover="loadSublevelMenu('${url}','${menuVar}',event);">${menuName}&nbsp;&nbsp;&raquo;</a> 
			<ul class="" id="${menuVar}">	
			</ul>
		<#else>	
			 <#if onLeafClick == "">		
				<a   onclick="loadTarget(this,'<@s.url value="/${targetLoadAction}?menuVar=${menuVar}" />','${targetName}')" >${menuName}</a>
			<#else>							
				<a   onclick="javascript:${onLeafClick}" >${menuName}</a>
			</#if>					
		</#if>
		</li>
	</#if>		
	<#if root>
	<script>						
		arrRootMenuData[${index}] = new Array()
		arrRootMenuData[${index}]["NAME"] = '${menuName}';
		arrRootMenuData[${index}]["LEAF"] = '${leaf?string}';
		arrRootMenuData[${index}]["MENU_VAR"] = '${menuVar}';
		arrRootMenuData[${index}]["TARGET_NAME"] = '${targetName}';
		arrRootMenuData[${index}]["LEAF_ONCLICK"] = '${onLeafClick}';
		
		<#if leaf>
			arrRootMenuData[${index}]["URL"] = '<@s.url value="/${targetLoadAction}?menuVar=${menuVar}" />';		
		<#else>
			arrRootMenuData[${index}]["URL"] = '${url}';
		</#if>
	</script>
	</#if>
	
	<#assign index=index+1 />
	
</@s.iterator>

<#if root && (index>scrollSize) >
<li class="nextNavLi ui-state-focus ui-corner-all">
	<span id="nextNav" onclick="scrollMenu(${scrollSize},'n');" >&nbsp;</span> 
</li>
</#if>



