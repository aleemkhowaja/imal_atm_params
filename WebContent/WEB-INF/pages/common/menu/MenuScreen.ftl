<#assign psj=JspTaglibs["/WEB-INF/tld/path-struts-jquery-tags.tld"]/>
<#attempt>
<#assign index=0 />
<#assign classUniqueId='' />
<#assign baseUrl=actionName+"?actionName="+actionName+"&targetName="+targetName+"&id="+id+"&enableReportOrdering="+enableReportOrdering?default("") />
<#assign targetName=targetName/>
<#assign id=id/>
<@s.iterator value="menuData">
<#assign menuName=menuData.get(index).menuName />
<#assign leaf=menuData.get(index).leaf />
<#if classUniqueId==''>
	<#assign classUniqueId=menuData.get(index).menuVar?replace(' ','')/>
	<#assign classUniqueId=classUniqueId?replace('-','_')/>
</#if>
<#assign menuVar=menuData.get(index).menuVar/>
<#assign idMenuVar=menuData.get(index).menuVar?replace(' ','')/>
<#assign idMenuVar=idMenuVar?replace('-','_')/>
<#assign specialChars=idMenuVar?matches('.*[;%!@#$%^&*(){}<>=\\[\\]/\\\\\'\"].*')/>
<#assign onLeafClick=""/>
<#if menuData.get(index).onLeafClick?if_exists != "">
 <#assign onLeafClick=menuData.get(index).onLeafClick?default("")/>
</#if> 
<#assign root=root/>
<#assign url=(baseUrl+"&menuId="+menuVar)?html  />
<div id='_selenuim${idMenuVar}'><#t/>
<#if !leaf>
	<#if !root>
			<li><#t/>
				<a href='${url}' class='a_${idMenuVar} subLevelHeader_${classUniqueId} encdata'>${menuName}</a><#t/>
				<ul class='subLevelContentHeader_${classUniqueId}'><#t/>
					<li><#t/>
						<#if specialChars>
							<a href="#" onclick="showAnchorError()"><#t/>
								<span menuVar='${menuVar}' class="accordprefix"><#t/>
									<span  class='ui-icon ui-icon-newwin'></span><#t/>
								</span><#t/>		
								${menuName}<#t/>
								<span class="accordsuffix"></span><#t/>					
							</a><#t/>
						<#else>
							<a href='${url}' class='subLevelHeader_${classUniqueId}hiddenajaxlink encdata' ><#t/>
								<span menuVar='${menuVar}' class="accordprefix"><#t/>
									<span  class='ui-icon ui-icon-newwin'></span><#t/>
								</span><#t/>
								${menuName}<#t/>
								<span class="accordsuffix"></span><#t/>						
							</a><#t/>
						</#if>
					</li><#t/>
				</ul><#t/>
			</li><#t/>
	<#else>
		<h3 class='h3_${idMenuVar} accordionheader rootheader${id}'>${menuName}</h3><#t/>
			<ul class='rootcontent${id}'><#t/>			
				<li><#t/>
					<#if specialChars>
						<a href="#" onclick="showAnchorError()"><#t/>
					<#else>
						<a href='${url}' class='rootheader${id}hiddenajaxlink encdata'><#t/>
					</#if>						
						<span menuVar='${menuVar}' class="accordprefix"><span  class='ui-icon ui-icon-newwin'></span></span><#t/>						
							${menuName}<#t/>
						<span class="accordsuffix"></span><#t/>				
					</a><#t/>
				</li><#t/>
			</ul><#t/>
	</#if>
<#else>
	<#if !root>
			<li><#t/>
			  <#if onLeafClick == "">
					<@psj.a href='${base}/path/loadScreen?menuVar=${menuVar}'   id='${idMenuVar}' targets='${targetName}' cssClass='encdata' ><#t/>
						<span menuVar='${menuVar}' class="accordprefix"><span  class='ui-icon ui-icon-newwin'></span></span><#t/>					
							<span>${menuName}</span><#t/>
						<span class="accordsuffix"></span><#t/>
					</@psj.a><#t/>
				<#else>	
		  			<@psj.a href='#' id='${idMenuVar}'  onclick="javascript:${onLeafClick}" ><#t/>
						<span menuVar='${menuVar}' class="accordprefix"><span  class='ui-icon ui-icon-newwin'></span></span><#t/>						
							<span>${menuName}</span><#t/>
						<span class="accordsuffix"></span>	<#t/>
					</@psj.a><#t/>
				</#if>	
			</li><#t/>
	<#else>
			<h3 class='accordionheader'><#t/>
			  <#if onLeafClick == "">
			  		<@psj.a href='${base}/path/loadScreen?menuVar=${menuVar}' cssClass="leafHeaderTitle encdata"  id='${idMenuVar}' targets='${targetName}' ><#t/>
						<span menuVar='${menuVar}' class="accordprefix"><span  class='ui-icon ui-icon-newwin'></span></span><#t/>				
							<span>${menuName}</span><#t/>
						<span class="accordsuffix"></span><#t/>	
					</@psj.a><#t/>
				<#else>
				   <@psj.a href='#' cssClass="leafHeaderTitle" id='${idMenuVar}' onclick="javascript:${onLeafClick}" ><#t/>
						<span menuVar='${menuVar}' class="accordprefix"><span  class='ui-icon ui-icon-newwin'></span></span><#t/>						
							<span>${menuName}</span><#t/>
						<span class="accordsuffix"></span>	<#t/>
					</@psj.a><#t/>
				</#if>	
		  	</h3>	<#t/>
	</#if>		
</#if>
</div><#t/>
<#assign index=index+1 />
</@s.iterator>
<script><#t/>
<#if !root>
 ddaccordion.initSubLevel('subLevelHeader_${classUniqueId}','subLevelContentHeader_${classUniqueId}','','');<#rt/>
</#if>
 anchorEncryptHrefParams();<#rt/>
</script><#t/>
<#recover>
${_error?default('Error FR Occurred Please Contact Administrator')}
</#attempt>