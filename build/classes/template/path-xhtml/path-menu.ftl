<#--
/*
 * $Id: text.ftl 720258 2008-11-24 19:05:16Z musachy $
 *
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

<script type="text/javascript" src="${base}/common/js/menu/AccordionMenu.js?_=${parameters.appversion?html}"></script>
<#assign id=id/>
<script type="text/javascript">		
	var actionName="${parameters.actionName?html}";
	var targetName="${parameters.targetName?html}";
	var appName="${parameters.appName?default('RET')}";
	var id = "${id?html}";
	var params = "actionName="+actionName+"&targetName="+targetName+"&appName="+appName+"&id="+id;
	params = returnEncryptedData(params);
	var url=actionName + "?" + params ;
	$(document).ready(function(){
	$.struts2_jquery.requireCss("/common/style/menu/AccordionMenu.css",'${base}');
	if(document.dir == "rtl")
	{
		$.struts2_jquery.requireCss("/common/style/menu/AccordionMenu-rtl.css",'${base}');
	}
	ddaccordion.initRoot(id,url,${parameters.collapseprev?html});
	
	$.subscribe('setTitle', function(event, data) 
		{
			var titleVal = event.originalEvent.target.text;
			$('title').remove();
			$('head').append('<title>'+titleVal+'</title>')
		}
	);
	function setHeaderTitle(ele,event)
	{	
		var hrefTag=$(ele).find('a').get(0)
		var title = hrefTag.id
		$('title').remove();
		$('head').append('<title>'+title+'</title>')
	}
	});
	
	function accordionReloadMenuItem(menuVar)
	{
		var theMenuVar = menuVar.replace(' ',''); 
		theMenuVar = menuVar.replace('-','_');
		var $menuElt;
		if(menuVar == "ROOT")
		{
			ddaccordion.initRoot(id ,url,${parameters.collapseprev?html});
		}
		else
		{
			if( $(".h3_"+theMenuVar).html() != null) //means header level 
			{
				$menuElt = $(".h3_"+theMenuVar)
			}
			else if($(".a_"+theMenuVar).html() != null) //sublevel
			{
			 	$menuElt = $(".a_"+theMenuVar);
			}
			if($menuElt != null && $menuElt.html() != null)
			{
				$menuElt.data('ajaxinfo').status = "none"
				$menuElt.trigger("evt_accordion",[false,true]);
			}
		} 
	}
	
</script>
<div id='${id}' class="accordionmenu ui-accordion">	

</div>
