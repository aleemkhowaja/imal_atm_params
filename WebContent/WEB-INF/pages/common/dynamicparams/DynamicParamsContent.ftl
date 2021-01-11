<#assign ps=JspTaglibs["/WEB-INF/tld/path-struts-tags.tld"]>
<#assign psj=JspTaglibs["/WEB-INF/tld/path-struts-jquery-tags.tld"]>
<#assign psjg=JspTaglibs["/WEB-INF/tld/path-struts-jquery-grid-tags.tld"]>
<#attempt>
<#assign preRow=-1/>
<#assign nextRow=0/>
<#assign index=0/>
<#assign preCol=0/>
<#assign nbInpts=0/>
<#assign openedPanel = 0/>
<#assign parentTechId = 0/>
<#assign collapsibleDivExists = 0/>
<#assign absoluteElements = formVO.absoluteElements?default('false')/>
<#assign collapseList = ""/>
<#--variables used for tabbed panel-->
<#assign openTabbedPanelTechId = 0 />
<#assign openTabbedPanelParentTechId = 0 />
<#assign openTabTechId = 0 />
<#assign openTabParentTechId = 0 />
<#assign tabsHtmlArr = {} />
<#assign openTabsAndPanelsArr = {} />
<#assign closeTabsAndPanelsArr = {} />
<#assign openTabsArr = {} />
<#assign openTabPanelsArr = {} />
<#assign gridInTabExists = 0 />
<#assign collPanelParentTechId = 0/>
<#assign openCollapsiblePanelsArr = {} />
<#assign closeCollapsiblePanelsArr = {} />
<#if absoluteElements != 'true'>
<table <#if formVO.tableCssStyle?if_exists != "">
		style="${formVO.tableCssStyle}"
       </#if> >
<#else>
  <div id="${formVO.formId}_DivId">
</#if>
<@s.iterator value="formVO.element_list">
<#assign label=formVO.element_list.get(index).label?default('')/>
<#assign labelKeyCode=formVO.element_list.get(index).labelKeyCode?default('') />
<#assign labelId=formVO.element_list.get(index).labelId?default("lbl_dynFrm_${index}") />
<#assign labelForElemId=formVO.element_list.get(index).labelForElemId?default("") />
<#assign element_type=formVO.element_list.get(index).element_type />
<#assign element_dataType=formVO.element_list.get(index).element_dataType/>
<#assign id=formVO.element_list.get(index).id/>
<#assign name=formVO.element_list.get(index).name/>
<#assign nbFormat=formVO.element_list.get(index).nbFormat/>
<#assign formatter=formVO.element_list.get(index).formatter?default("")/>
<#assign zeroNotAllowed=formVO.element_list.get(index).zeroNotAllowed?default("")/>
<#assign row=formVO.element_list.get(index).row/>
<#assign col=formVO.element_list.get(index).column/>
<#assign value=formVO.element_list.get(index).value/>
<#assign targets=formVO.element_list.get(index).targets/>
<#assign readOnly_att=formVO.element_list.get(index).readOnly/>
<#assign css_attr=formVO.element_list.get(index).cssStyle?default("")/>
<#assign maxlength=formVO.element_list.get(index).maxLength?default("")/>
<#assign maxValue=formVO.element_list.get(index).maxValueStr?default("")/>
<#assign minValue=formVO.element_list.get(index).minValueStr?default("")/>
<#assign maxLenBeforeDec=formVO.element_list.get(index).maxLenBeforeDecStr?default("")/>
<#assign mode=formVO.element_list.get(index).mode?default("")/>
<#assign enblSearch=formVO.element_list.get(index).enblSearch?default("")/>
<#assign dateWithTime=formVO.element_list.get(index).dateWithTime?default("false")/>
<#assign dateTimeAmPm=formVO.element_list.get(index).dateTimeAmPm?default("false")/>
<#assign actionName=formVO.element_list.get(index).actionName?default("")/>
<#assign dependency=formVO.element_list.get(index).dependency?default("")/>
<#assign depSrc=formVO.element_list.get(index).dependencySrc?default("")/>
<#assign params=formVO.element_list.get(index).parameters?default("")/>
<#assign searchElem=formVO.element_list.get(index).searchElement?default("")/>
<#assign paramList=formVO.element_list.get(index).paramList?default("")/>
<#assign gridIdList=formVO.element_list.get(index).gridIdList?default("")/>
<#assign resLst=formVO.element_list.get(index).resultList?default("")/>
<#assign onchange=formVO.element_list.get(index).onchange?default("")/>
<#assign onclick=formVO.element_list.get(index).onClick?default("")/>
<#assign buttonScript=formVO.element_list.get(index).buttonScript?default("")/>
<#assign onChangeScript=formVO.element_list.get(index).onChangeScript?default("")/>
<#assign css_class=formVO.element_list.get(index).cssClass?default("")/>
<#assign txtFormat=formVO.element_list.get(index).txtFormat?default("")/>
<#assign multiSelect=formVO.element_list.get(index).multiSelect?default("false")/>
<#assign multiResultInput=formVO.element_list.get(index).multiResultInput?default("")/>
<#assign selectColumn=formVO.element_list.get(index).selectColumn?default("")/>
<#assign required_att=formVO.element_list.get(index).required?default("false")/>
<#assign positionAbsolute=formVO.element_list.get(index).positionAbsolute/>
<#assign afterDepEvent=formVO.element_list.get(index).afterDepEvent?default("")/>
<#assign colspan=formVO.element_list.get(index).colspan?default("")/>
<#assign title=formVO.element_list.get(index).title?default("Title")/>
<#assign showHijri=formVO.element_list.get(index).showHijri?default("")/>
<#assign showOnlyHijri=formVO.element_list.get(index).showOnlyHijri?default("")/>
<#assign timepicker=formVO.element_list.get(index).timepicker?default("false")/>
<#assign timepickerOnly=formVO.element_list.get(index).timepickerOnly?default("")/>
<#assign considerChoiceValue=formVO.element_list.get(index).considerChoiceValue?default("false")/>
<#assign groupLabel=formVO.element_list.get(index).groupLabel?default("") />
<#assign emptyOption=formVO.element_list.get(index).emptyOption?default("false") />
<#assign colsLst=formVO.element_list.get(index).colsLst?default("") />
<#assign editable=formVO.element_list.get(index).editable?default("") />
<#assign renderFileDownloadBtn=formVO.element_list.get(index).renderFileDownloadBtn?default("true")/>
<#assign techId = formVO.element_list.get(index).techId?default("") />
<#assign footerRowForGrid=formVO.element_list.get(index).footerRow?default("false")/>
<#assign defaultValueAvailableForGrid=formVO.element_list.get(index).defaultValueAvailable?default("false")/>

<#if timepicker=='false' && dateWithTime=='false'>
   <#assign timepicker="false"/>
<#else>
   <#assign timepicker="true"/>
</#if>

<#if absoluteElements != 'true'>
   <#if preRow!=row>
     <#if preRow != -1>
       <#assign innerIterator=row-preRow-1/>
       <#if innerIterator!=0>
		<#list 1..innerIterator as x>
          <tr></tr>
		</#list>
	   </#if> 
     </#if>
	 <#assign preRow=row/>
     <tr>
     <#assign preCol=0/>
   </#if>
   <#assign nextRow=index+1/>
   <#if nextRow == formVO.element_list.size()>
      <#assign nextRow=-1/>
   </#if>
    <#assign iteratorCol=col-preCol-1/>
    <#assign preCol=col/>
    <#if iteratorCol!=0>
       <#list 1..iteratorCol as x>
          <td></td>
          <td></td>
	   </#list>   
    </#if>
</#if>
   <#assign currParentTechId = formVO.element_list.get(index).parentTechId?default(-1)/>
	<#if (currParentTechId?if_exists == -1 && (openedPanel?if_exists == 1 ||  openTabTechId?if_exists != 0))
		|| (openedPanel?if_exists == 0 && currParentTechId != openTabTechId)
		|| (openedPanel?if_exists == 1 && currParentTechId != parentTechId && currParentTechId != openTabTechId)
		|| (openedPanel?if_exists == 1 && currParentTechId != parentTechId && currParentTechId == openTabTechId && collPanelParentTechId == openTabTechId)
		|| (openedPanel?if_exists == 1 && currParentTechId == parentTechId && collPanelParentTechId != openTabTechId)>
		
		<#list openTabsAndPanelsArr as key, value>
			<#assign isAlreadyClosed = 0 />
			<#list closeTabsAndPanelsArr as ckey, cvalue>
				<#if key == ckey>
					<#assign isAlreadyClosed = 1 />
					<#break>
				</#if>
			</#list>
			<#if isAlreadyClosed == 0>
				<#if key==(""+currParentTechId)>
					<#break>
				<#else>
					<#assign closeTabsAndPanelsArr = closeTabsAndPanelsArr + {key:value} />
					<#-- if current opened div is of Tab -->
					<#if openTabsArr[key]??>
						</div>
						<#if openTabPanelsArr[""+value]??>
							<#if openTabsArr[""+openTabPanelsArr[""+value]]??>
								<#assign openTabTechId = openTabPanelsArr[""+value]/>
								<#assign openTabParentTechId = openTabsArr[""+openTabPanelsArr[""+value]]/>
							<#else>
								<#assign openTabTechId = 0 />
								<#assign openTabParentTechId = 0 />
							</#if>
						</#if>
					<#-- if current opened div is of Tabbed Panel -->
					<#elseif openTabPanelsArr[key]??>
						</div>
						<#if openTabsArr[""+value]??>
							<#if openTabPanelsArr[""+openTabsArr[""+value]]??>
								<#assign openTabbedPanelTechId = openTabsArr[""+value]/>
								<#assign openTabbedPanelParentTechId = openTabPanelsArr[""+openTabsArr[""+value]]/>
							</#if>
						<#elseif openCollapsiblePanelsArr[""+value]??>
							<#if openTabsArr[""+openCollapsiblePanelsArr[""+value]]??>
								<#assign openTabbedPanelTechId = openTabsArr[""+openCollapsiblePanelsArr[""+value]]/>
								<#assign openTabbedPanelParentTechId = openTabPanelsArr[""+openTabsArr[""+openCollapsiblePanelsArr[""+value]]]/>
							</#if>
						<#else>
							<#assign openTabTechId = 0 />
							<#assign openTabParentTechId = 0 />
							<#assign openTabbedPanelTechId = 0 />
							<#assign openTabbedPanelParentTechId = 0 />
						</#if>
					<#-- if current opened div is of Collapsible Panel -->
					<#elseif openCollapsiblePanelsArr[key]??>
						</div>
						</div>
						<#assign closeCollapsiblePanelsArr = {parentTechId:collPanelParentTechId} + closeCollapsiblePanelsArr />
						<#if openCollapsiblePanelsArr?size == closeCollapsiblePanelsArr?size>
							<#assign openedPanel  = 0 />
							<#assign parentTechId = 0 />
							<#assign collPanelParentTechId = 0 />
						<#else>
							<#list openCollapsiblePanelsArr as key, value>
								<#assign isAlreadyClosed = 0 />
								<#list closeCollapsiblePanelsArr as ckey, cvalue>
									<#if key == ckey>
										<#assign isAlreadyClosed = 1 />
										<#break>
									</#if>
								</#list>
								<#if isAlreadyClosed == 0>
									<#assign parentTechId = key?number />
									<#assign collPanelParentTechId = value?number />
									<#break>
								</#if>
							</#list>
						</#if>
					</#if>
				</#if>
			</#if>
		</#list>
   </#if>   
   <#if element_type=='panel'>
      <div id="${id}" 
      <#if positionAbsolute?default(false) == true>
        style="${css_attr}; position:absolute;" 
      <#else>
        style="${css_attr}"
      </#if>
      >
      <div id="${id}_collapse" class="collapsibleContainer" title="${title}" style ="position: relative;">
      <#assign openedPanel = 1/>
      <#assign collapsibleDivExists = 1/>
      <#if collapseList =="">        
        <#assign collapseList = "${id}"/>
      <#else>
        <#assign collapseList = "${collapseList},${id}"/> 
      </#if>
      <#if formVO.element_list.get(index).techId??>
      	  <#assign parentTechId = formVO.element_list.get(index).techId/>
      	  <#assign collPanelParentTechId = currParentTechId />
   		  <#assign openCollapsiblePanelsArr = {techId:currParentTechId} + openCollapsiblePanelsArr />
	   	  <#assign openTabsAndPanelsArr = {techId:currParentTechId} + openTabsAndPanelsArr/>
      </#if>
   </#if>
   <#if element_type=='textfield'>
    <#assign gridParams= ''/>
  	      <#if gridIdList != ''> 
  	      <#list gridIdList?split(",") as gridId>
    			<#assign gridParams= gridParams+ " ;$(" + gridId + ").trigger(\"reloadGrid\");"/>
		 </#list>
		  </#if>
	   <#if element_dataType=='Number' || mode == 'number'>
	   <#if absoluteElements != 'true'>
		    <td
		    <#if label==''>
		     colspan="2">
		    <#else>
		    >
		      <@ps.label id="${labelId}" key="${label}" labelKeyCode="${labelKeyCode}" for="${id}"></@ps.label>
	  	    </td>
	  	    <td>
	  	    </#if>
  	    </#if>
	    	<@ps.textfield id='${id}' 
	    	               value='${value}' 
	    	               maxlength="${maxlength}" 
	    	               maxLenBeforeDec="${maxLenBeforeDec}" 
	    	               minValue="${minValue}" 
	    	               maxValue="${maxValue}" 
	    	               name="${name}"
			       dependencySrc="${base}/${depSrc}"
			       dependency="${dependency}"
			       parameter="${params}"
	    	               mode="number"
	    	               formatter = "${formatter}"
	    	               zeroNotAllowed = "${zeroNotAllowed}"
	    	               nbFormat="${nbFormat}" 
	    	               readonly="${readOnly_att}" 
	    	               cssStyle="${css_attr}" 
	    	               onchange="${onchange}"+"${gridParams}"
	    	               required="${required_att}"></@ps.textfield>
  	      <#if absoluteElements != 'true'>	
	  		</td>
	  	  </#if>	
	  <#else>
	      <#if absoluteElements != 'true'>	
	  	    <td
		    <#if label==''>
		     colspan="2">
		    <#else>
		    >
		       <@ps.label id="${labelId}" key="${label}" labelKeyCode="${labelKeyCode}" for="${id}"></@ps.label>
	  	    </td>
	  	    <td>
	  	    </#if>
  	      </#if>
  	         <@ps.textfield id='${id}' 
  	                        value='${value}' 
  	                        maxlength="${maxlength}"  
  	                        name="${name}"
				dependencySrc="${base}/${depSrc}"
				dependency="${dependency}"
				parameter="${params}"
  	                        readonly="${readOnly_att}" 
  	                        cssStyle="${css_attr}" 
  	                        cssClass="${css_class}" 
  	                        onchange="${onchange}"+"${gridParams}"
  	                        txtFormat="${txtFormat}" 
  	                        required="${required_att}"></@ps.textfield>
  	   <#if absoluteElements != 'true'>                     
  	    	</td>
  	   </#if> 
  	   </#if>
  	   <#assign nbInpts=nbInpts+1/>
  	</#if>
  	<#if element_type=='livesearch'>
  	<#assign gridParams= ''/>
  	<#if gridIdList != ''>  
  	      <#list gridIdList?split(",") as gridId>
    			<#assign gridParams= gridParams+ " ;$(" + gridId + ").trigger('reloadGrid');"/>
		 </#list>
		</#if>
  	    <#if absoluteElements != 'true'>
	  	    <td>
		       <@ps.label id="${labelId}" key="${label}" labelKeyCode="${labelKeyCode}" for="lookuptxt_${id}"></@ps.label>
	  	    </td>
  	        <td>
  	    </#if>
		  	<@psj.livesearch id="${id}" name="${name}" 
					mode="${mode}"
					cssClass="${css_class}"
					cssStyle="${css_attr}"
					resultList="${resLst}"	
					paramList ="${paramList}"
					actionName="${base}/${actionName}"  
					searchElement='${searchElem}' 
					dependencySrc="${base}/${depSrc}"
					dependency="${dependency}"
					parameter="${params}"
					value="${value}" readOnlyMode="${readOnly_att}"
					maxlength="${maxlength}" 
					minValue="${minValue}" 
					maxValue="${maxValue}"
					multiSelect="${multiSelect}"
					multiResultInput="${multiResultInput}"
					selectColumn="${selectColumn}"
					required="${required_att}"
					afterDepEvent="${afterDepEvent}"
					beforeDepEvent="${gridParams}"
					>
			</@psj.livesearch>
		<#if absoluteElements != 'true'>	
		   </td>
		</#if>  
		  <#assign nbInpts=nbInpts+1/>
  	 </#if>
  	 
  	<#if element_type=='comboBox'>
  	<#assign gridParams= ''/>
  	<#if gridIdList != ''>  
  	      <#list gridIdList?split(",") as gridId>
    			<#assign gridParams= gridParams+ " ;$(" + gridId + ").trigger(\"reloadGrid\");"/>
		 </#list>
		</#if>
  	 <#if absoluteElements != 'true'>
	  	  <td>
	  	     <@ps.label id="${labelId}" key="${label}" labelKeyCode="${labelKeyCode}" for="${id}"></@ps.label>
	  	  </td>
	  	  <td>
  	 </#if> 
  	   <#assign list=formVO.element_list.get(index).listParamVO.valueList/>
  	   <#assign key=formVO.element_list.get(index).listParamVO.key/>
  	    <#if key==''>
  		    <@ps.select list="${list}" 
  		                name="${name}" 
  		                id="${id}"
  		                considerChoiceValue="${considerChoiceValue}"
  		                dynValue = "${value}"
  		                disabled="${readOnly_att}" 
  		                cssStyle="${css_attr}"
  		                emptyOption ="${emptyOption}"
				        dependencySrc="${base}/${depSrc}"
				        dependency="${dependency}"
				        parameter="${params}" 
  		                onchange="${onchange}"+"${gridParams}"
  		                required="${required_att}"/>
  		<#else>
  		    <#assign listValue=formVO.element_list.get(index).listParamVO.value/>
  		    <@ps.select list="${list}" 
  		                name="${name}" 
  		                id="${id}"
  		                considerChoiceValue="${considerChoiceValue}"
  		                dynValue = "${value}" 
  		                listKey="${key}"
  		                emptyOption ="${emptyOption}" 
  		                listValue="${listValue}"
				        dependencySrc="${base}/${depSrc}"
				        dependency="${dependency}"
				        parameter="${params}" 
  		                onchange="${onchange}"+"${gridParams}"
  		                disabled="${readOnly_att}" 
  		                cssStyle="${css_attr}"
  		                required="${required_att}"/>
  		</#if>
  	  <#if absoluteElements != 'true'>	
  	  	</td>
  	  </#if>
  	</#if>
  	
  	<#if element_type=='radioButton'>
  	<#assign gridParams= ''/>
  	<#if gridIdList != ''>  
  	      <#list gridIdList?split(",") as gridId>
    			<#assign gridParams= gridParams+ " ;$(" + gridId + ").trigger('reloadGrid');"/>
		 </#list>
	
		</#if>
  	  <#if dependency != "" && depSrc != "">
  	      <#assign onclick = 'callDependency("${dependency}","${base}/${depSrc}","${params}","${id}","${afterDepEvent}")'/> 
  	  </#if>
  	  <#if absoluteElements != 'true'> 
	  	  <td>
	  	     <@ps.label id="${labelId}" key="${label}" labelKeyCode="${labelKeyCode}"></@ps.label>
	  	  </td>
	  	  <td>
  	  </#if>
  	     <#assign list=formVO.element_list.get(index).listParamVO.valueList/>
  	     <#assign key=formVO.element_list.get(index).listParamVO.key?default('')/>
  	        <#if positionAbsolute?default(false) == true>
  	           <div style = "${css_attr}">
		  	    <#if key==''>
	  		 		<@ps.radio considerChoiceValue="${considerChoiceValue}" dynValue = "${value}" list="${list}" name="${name}" onclick="${onclick}"+"${gridParams}" id="${id}" disabled="${readOnly_att}" groupElemKeyLabel="${groupLabel}"/>
	  		 	<#else>
		  		    <#assign listValue=formVO.element_list.get(index).listParamVO.value/>
		  		    <#assign hasHiddenOpt=formVO.element_list.get(index).listParamVO.hasHiddenOpt/>
		  		    <@ps.radio considerChoiceValue="${considerChoiceValue}" dynValue = "${value}" list="${list}" name="${name}" onclick="${onclick}"+"${gridParams}" id="${id}" disabled="${readOnly_att}" listKey="${key}" listValue="${listValue}" hasHiddenOpt="${hasHiddenOpt}" groupElemKeyLabel="${groupLabel}"/>
	  		    </#if>
  		       </div>	
  	        <#else>
		  	    <#if key==''>
	  		 		<@ps.radio considerChoiceValue="${considerChoiceValue}" dynValue = "${value}" list="${list}" name="${name}" onclick="${onclick}"+"${gridParams}" id="${id}" disabled="${readOnly_att}"  cssStyle="${css_attr}" groupElemKeyLabel="${groupLabel}"/>
	  		 	<#else>
		  		    <#assign listValue   =formVO.element_list.get(index).listParamVO.value/>
		  		    <#assign hasHiddenOpt=formVO.element_list.get(index).listParamVO.hasHiddenOpt/>
		  		    <@ps.radio considerChoiceValue="${considerChoiceValue}" dynValue = "${value}" list="${list}" name="${name}" onclick="${onclick}"+"${gridParams}" id="${id}" disabled="${readOnly_att}" listKey="${key}" listValue="${listValue}" hasHiddenOpt="${hasHiddenOpt}" cssStyle="${css_attr}" groupElemKeyLabel="${groupLabel}"/>
	  		    </#if>  	           
  	        </#if>
  	  <#if absoluteElements != 'true'>
  	  	</td>
  	  </#if>
  	</#if>

  	<#if element_type=='checkBoxList'>
  	  <#if absoluteElements != 'true'>
	  	  <td>
	  	   <@ps.label id="${labelId}" key="${label}" labelKeyCode="${labelKeyCode}" cssStyle="${css_attr}"></@ps.label>
	  	  </td>
	  	  <td>
  	  </#if>
  	   		<#assign list=formVO.element_list.get(index).listParamVO.valueList/>
	  	    <#assign key=formVO.element_list.get(index).listParamVO.key?default('')/> 
	  	    <#if key==''>
	  		    <@ps.checkboxlist list="${list}" 
	  		                      name="${name}" 
	  		                      id="${id}"
					              dependencySrc="${base}/${depSrc}"
					              dependency="${dependency}"
					              parameter="${params}" 
	  		                      disabled="${readOnly_att}" 
	  		                      onclick="${onclick}" 
	  		                      cssStyle="${css_attr}"/>
	  		<#else>
	  		    <#assign value=formVO.element_list.get(index).listParamVO.value/>
  		    	<@ps.checkboxlist list="${list}" 
  		    	                  name="${name}" 
  		    	                  id="${id}" 
  		    	                  listKey="${key}"
  		    	                  onclick="${onclick}" 
  		    	                  listValue="${value}" 
  		    	                  disabled="${readOnly_att}" 
  		    	                  cssStyle="${css_attr}"/>
  		    </#if>
  	  <#if absoluteElements != 'true'>	    
      	</td>
      </#if>
  	</#if>
  	
     <#if element_type=='checkBox'>
       <#if absoluteElements != 'true'>	
        <td>
       </#if> 
         	<#assign gridParams= ''/>
  				<#if gridIdList != ''>  
  	      			<#list gridIdList?split(",") as gridId>
    					<#assign gridParams= gridParams+ " ;$(" + gridId + ").trigger('reloadGrid');"/>
		 			</#list>
				</#if>
               <#assign valOpt=formVO.element_list.get(index).valOpt?default('')/>
               <@ps.checkbox name="${name}" 
                             id="${id}"
                             valOpt = "${valOpt}"
			                 dependencySrc="${base}/${depSrc}"
			                 dependency="${dependency}"
			                 parameter="${params}" 
                             disabled="${readOnly_att}" 
                             onclick="${onclick}" 
                             cssStyle="${css_attr}" 
                             value="${value}"
                             onchange="${gridParams}"/>
       <#if absoluteElements != 'true'> 
	        </td>
	        <td>
	               <@ps.label id="${labelId}" key="${label}" labelKeyCode="${labelKeyCode}" cssStyle="${css_attr}" for="${id}"></@ps.label>
		    </td>
	   </#if>  
      </#if>
  	
  	
  	<#if element_type=='submit'>
  	 <#if absoluteElements != 'true'> 
  	  <td>
  	 </#if> 
  		<@psj.submit key="${label}" id="${id}" type="submit" targets="${targets}" disabled="${readOnly_att}" cssStyle="${css_attr}">
  		  <@ps.label key="${label}" labelKeyCode="${labelKeyCode}" for="${id}"></@ps.label>
  		</@psj.submit>
  	 <#if absoluteElements != 'true'> 	
  	  </td>
  	 </#if>
  	</#if>
  	
  	<#if element_type=='button'>
  	 <#if absoluteElements != 'true'> 
  	  <td>
  	 </#if> 
  		<@psj.submit button="true" disabled="${readOnly_att}" id="${id}" onclick="${onclick}" cssStyle="${css_attr}">
  		  <@ps.label key="${label}" labelKeyCode="${labelKeyCode}" for="${id}"></@ps.label>
  		</@psj.submit>
  	 <#if absoluteElements != 'true'> 	
  	  </td>
  	 </#if> 
  	   	<#if buttonScript?default('') != ''>
  	     <script type="text/javascript">
  	     ${buttonScript}
  	     </script>
  	   </#if>  
  	</#if>
  	<#if element_type=='label'>
  	  <#if absoluteElements != 'true'> 
  	  <td colspan='2'>
  	  </#if>
  	   <#if labelForElemId?? && labelForElemId?if_exists != "">
  		<@ps.label key="${label}" id="${id}" labelKeyCode="${labelKeyCode}" for="${labelForElemId}" cssStyle="${css_attr}"></@ps.label>
  	   <#else>
  	   	<@ps.label key="${label}" id="${id}" labelKeyCode="${labelKeyCode}" cssStyle="${css_attr}"></@ps.label>
  	   </#if>
  	  <#if absoluteElements != 'true'> 	
  	  </td>
  	  </#if>
  	</#if>

  	<#if element_type=='datePicker'>
  	<#assign gridParams= ''/>
  				<#if gridIdList != ''>  
  	      			<#list gridIdList?split(",") as gridId>
    					<#assign gridParams= gridParams+ " ;$(" + gridId + ").trigger('reloadGrid');"/>
		 			</#list>
				</#if>
  	  <#if absoluteElements != 'true'> 
	  	  <td>
	  	    <@ps.label id="${labelId}" key="${label}" labelKeyCode="${labelKeyCode}" for='${id}'></@ps.label>
	  	  </td>
	  	  <td>
  	  </#if>
  	   <#if positionAbsolute?default(false) == true>
  	     <div id="dynScr_DPickerDiv_${id}" style = "${css_attr}; position:absolute;">
  	   </#if>  
  		<@psj.datepicker value='${value}' 
  		                 id='${id}' 
  		                 name="${name}" 
  		                 readonly="${readOnly_att}" 
  		                 cssStyle="${css_attr}" 
  		                 buttonImageOnly="true" 
  		                 onchange="${onchange}"+"${gridParams}"
				         dependencySrc="${base}/${depSrc}"
				         dependency="${dependency}"
				         parameter="${params}" 
  		                 timepicker="${timepicker}" 
  		                 timepickerAmPm="${dateTimeAmPm}" 
  		                 timepickerShowSecond="true" 
  		                 timepickerFormat="hh:mm:ss TT"
  		                 showOnlyHijri="${showOnlyHijri}"
  		                 showHijri="${showHijri}"
  		                 required="${required_att}"
  		                 timepickerOnly="${timepickerOnly}"></@psj.datepicker>
  		<#if positionAbsolute?default(false) == true>
  		 </div>
  		</#if>
  	 <#if absoluteElements != 'true'> 	                 
  	  </td>
  	 </#if> 
  	  <#assign nbInpts=nbInpts+1/>
  	</#if>
  	
  	<#if element_type=='textArea'>
  	  <#if absoluteElements != 'true'> 
	  	  <td>
	  	    <@ps.label id="${labelId}" key="${label}" labelKeyCode="${labelKeyCode}" for='${id}'></@ps.label>
	  	  </td>
  	      <#if colspan==''>
  	  	    <td>
	      <#else>
  	  	    <td colspan="${colspan}">
	      </#if>
  	  </#if>
  	  <@ps.textarea value='${value}' id='${id}' maxlength="${maxlength}" name="${name}" readonly="${readOnly_att}" cssStyle="${css_attr}" cssClass="${css_class}" required="${required_att}"></@ps.textarea>
  	  <#if absoluteElements != 'true'> 
  	  	</td>
  	  </#if>
  	  <#assign nbInpts=nbInpts+1/>
  	</#if>
  	
  	<#if element_type=='file'>
  	   <#if positionAbsolute?default(false) == true>
  	     <div style = "${css_attr}; position:absolute;">
  	     <table>
  	     <tr>
  	     <td>
  	   <#else>  	        
	  	  <td>
  	   </#if>
  	    <@ps.file id="${id}" 
  	              name="${name}"
  	              cssStyle="${css_attr}"
  	              required="${required_att}"
  	              cssClass="path-dummy-cls"
  	              disabled="${readOnly_att}"></@ps.file>
	  	  </td>
	  	  <#if renderFileDownloadBtn=='true'>
		  	  <td>
		  		<@psj.submit button="true" 
		  		             disabled="${readOnly_att}" 
		  		             onclick="${onclick}" 
		  		             id="btn_filedownload_${id}">
		  		    <@ps.label key="Download_key" labelKeyCode="Download" for="btn_filedownload_${id}"></@ps.label>
		  		</@psj.submit> 	
		  	  </td>
	  	  </#if>        
  		<#if positionAbsolute?default(false) == true>
  		  </tr>
  		  </table>
  		 </div>
  		</#if>
  	  <#assign nbInpts=nbInpts+1/>   
  	</#if>

	<#if element_type=='grid'>
		<#if openTabTechId?if_exists != 0>
			<#assign gridInTabExists = 1 />
		</#if>		
		<#if editable== "true"> 
			<#assign tableId=formVO.element_list.get(index).tableId /> 
			<#assign pager="false" /> 
			<#assign viewrecords="false" /> 
		<#else> 
			<#assign tableId=0 /> 
			<#assign pager="true" /> 
			<#assign viewrecords="true" />
		</#if>
		<#if enblSearch == '1'>
    		<#assign filter="true"/>
   			<#assign navigatorSearch="true"/>
		<#else>
   			<#assign filter="false"/>
   			<#assign navigatorSearch="false"/>
		</#if>
		 <#if buttonScript?default('') != ''>
	  	    <script type="text/javascript">
	  	    ${buttonScript}
	  	    </script>
	  	 </#if>  
		 <#if absoluteElements != 'true'> 
			<td>
		 </#if> 
		 <div style = "${css_attr}">
			<@ps.url id="${id}_GridUrl" namespace="/path/dynamicScreen" action="dynScrGridListAction_loadDynScrGridWidget" escapeAmp="false">
					<@ps.param name="criteria.objectType" value="%{element_dataType}"></@ps.param>
					<@ps.param name="criteria.tableId" value="%{tableId}"></@ps.param>
					<@ps.param name="criteria.elementId" value="%{value}"></@ps.param>
					<@ps.param name="criteria.loadEmptyGrid" value="true"></@ps.param>
			</@ps.url>
			<@psjg.grid  id="${id}"
						caption="${title}"
						dataType="json"
						pager="${pager}"
						href="%{${id}_GridUrl}"
						gridModel="gridModel"
						rowNum="5"
						rowList="5,10,15,20"
						navigator="true"
						viewrecords="${viewrecords}"
						hiddengrid="false"
						height="${height?default('150')}-75"
						altRows="true"
						sortable="true"
						filter="${filter}"
						editurl="dummy"
						editinline="${editable}"
						navigatorAdd="${editable}"
						navigatorDelete="${editable}"
						navigatorEdit="false"
						navigatorSearch="${navigatorSearch}"
						navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt','le','ge']}"
						multiselect="false"
						delfunc="dynamicScreen_deleteDynGridRecord('%{id}','%{formVO.formId}')"
						addfunc="dynamicScreen_addDynGridRecord('%{id}','%{formVO.formId}')"
						ondblclick="${onclick}"
						onSelectRowTopics="%{id}_dynamicScreen_onSelectDynGridRecord"
						shrinkToFit="true"
						onBeforeTopics="${id}_onBeforeTopics" 
						onGridCompleteTopics="${id}_onGridCompleteTopics"
						dontLoadData="true"
						userDataOnFooter="${footerRowForGrid}"
						footerrow="${footerRowForGrid}"
						hasDefaultValueOnAddRow="${defaultValueAvailableForGrid}"
			>
				<#list colsLst as item>
					<@ps.if test="${(item.COL_TYPE == '0')?string('true','false')}">
						<#if item.nbFormat?? && item.nbFormat !='' >
							<@psjg.gridColumn id="${item.COL_TECH_NAME}"
												 colType="${item.COL_TYPE_DESC}"
												 nbFormat="${item.nbFormat}"
												 name="${item.COL_TECH_NAME}"
												 index="${item.COL_TECH_NAME}"
												 title="${item.COL_DESC}"
												 hidden="${item.HIDDEN}"
												 sortable="${sortable}"
												 editable="${item.ENABLE_FIELD}"
												 searchElement="${item.searchElement}"
				     							 paramList="${item.paramList}"
				        						 dataAction="${base}/${item.actionName}"
				        						 resultList="${item.resultList}"
				        						 editoptions="{dataEvents: [{ type: 'change', fn: function(e) {dynamiGridColumn_actionTypeChanged('${id}','%{formVO.formId}')}}]}"
								/>
						<#else>
							   <@psjg.gridColumn id="${item.COL_TECH_NAME}"
												 colType="${item.COL_TYPE_DESC}"
												 name="${item.COL_TECH_NAME}"
												 index="${item.COL_TECH_NAME}"
												 title="${item.COL_DESC}"
												 hidden="${item.HIDDEN}"
												 sortable="${sortable}"
												 editable="${item.ENABLE_FIELD}"
												 searchElement="${item.searchElement}"
				     							 paramList="${item.paramList}"
				        						 dataAction="${base}/${item.actionName}"
				        						 resultList="${item.resultList}"
				        						 editoptions="{dataEvents: [{ type: 'change', fn: function(e) {dynamiGridColumn_actionTypeChanged('${id}','%{formVO.formId}')}}]}"
								/>
						</#if>			
					</@ps.if>
					<@ps.if test="${(item.COL_TYPE == '1')?string('true','false')}">
						<@psjg.gridColumn id="${item.COL_TECH_NAME}"
										 colType="${item.COL_TYPE_DESC}"
										 name="${item.COL_TECH_NAME}"
										 index="${item.COL_TECH_NAME}"
										 title="${item.COL_DESC}"
										 hidden="${item.HIDDEN}"
										 sortable="${sortable}"
										 editable="${item.ENABLE_FIELD}"
						/>
					</@ps.if>
					<@ps.if test="${(item.COL_TYPE == '3')?string('true','false')}">
						<#if item.nbFormat?? && item.nbFormat !='' >
							<@psjg.gridColumn id="${item.COL_TECH_NAME}"
											 colType="number"
											 name="${item.COL_TECH_NAME}"
											 index="${item.COL_TECH_NAME}"
											 title="${item.COL_DESC}"
											 hidden="${item.HIDDEN}"
											 sortable="${sortable}"
											 editable="${item.ENABLE_FIELD}"
											 editoptions="{dataEvents: [{ type: 'change', fn: function(e) {dynamiGridColumn_actionTypeChanged('${id}','%{formVO.formId}')}}]}"
											 nbFormat="${item.nbFormat}"
							/>
						<#else>
							<@psjg.gridColumn id="${item.COL_TECH_NAME}"
											 colType="number"
											 name="${item.COL_TECH_NAME}"
											 index="${item.COL_TECH_NAME}"
											 title="${item.COL_DESC}"
											 hidden="${item.HIDDEN}"
											 sortable="${sortable}"
											 editable="${item.ENABLE_FIELD}"
											 editoptions="{dataEvents: [{ type: 'change', fn: function(e) {dynamiGridColumn_actionTypeChanged('${id}','%{formVO.formId}')}}]}"
							/>
						</#if>
					</@ps.if>
					<@ps.if test="${(item.COL_TYPE == '4')?string('true','false')}">
						<@psjg.gridColumn 	id="${item.COL_TECH_NAME}"
											name="${item.COL_TECH_NAME}" 
											index="${item.COL_TECH_NAME}"
											title="${item.COL_DESC}"
											hidden="${item.HIDDEN}"
											colType="checkbox"
											formatter="checkbox"
											editable="${item.ENABLE_FIELD}"
											edittype="checkbox"
											sortable="${sortable}"
											search="true"
											align="center"
											searchoptions="{sopt:['eq']}"
						/>
					</@ps.if>
						<@ps.if test="${(item.COL_TYPE == '2')?string('true','false')}">
						<@psjg.gridColumn 	name= "${item.COL_TECH_NAME}"
											title="${item.COL_DESC}"
											index="${item.COL_TECH_NAME}" 
											hidden="${item.HIDDEN}"
											colType="date"
											editable="${item.ENABLE_FIELD}"
											sortable="${sortable}"
											search="true"
											id="${item.COL_TECH_NAME}" 
											sorttype="date"
											searchType="date" 
											formatter="date" 
											formatoptions="{srcformat:'Y-m-d H:i:s.u',newformat:'d/m/Y'}"
						/>
					</@ps.if>
					<@ps.if test="${(item.COL_TYPE == '5')?string('true','false')}">
						<@psjg.gridColumn 	name= "${item.COL_TECH_NAME}"
											title="${item.COL_DESC}"
											index="${item.COL_TECH_NAME}"
											hidden="${item.HIDDEN}"
											colType="date"
											editable="${item.ENABLE_FIELD}"
											sortable="${sortable}"
											search="true"
											id="${item.COL_TECH_NAME}"
											sorttype="date"
											searchType="date"
											formatter="date"
											formatoptions="{srcformat:'Y-m-d H:i:s.u',newformat:'d/m/Y h:i:s A',timepicker:true,showSecond:true,timeFormat:'hh:mm:ss TT',ampm:true}"
						/>
					</@ps.if>
				</#list>
			</@psjg.grid>  
		 </div>
		 <#if absoluteElements != 'true'> 
			<td>
		 </#if>  
		<#assign nbInpts=nbInpts+1/>   
		<@ps.if test="${(editable == 'true')?string('true','false')}">
			<script type="text/javascript">
			$.subscribe("${id}_dynamicScreen_onSelectDynGridRecord",function(rowObj){
				dynamicScreen_onSelectDynGridRecord('${id}');	 
			});
	  	   </script>
  	   </@ps.if>
  	   
  	   <script type="text/javascript">
  	   		
  	   		$('#${id}').subscribe("${id}_onBeforeTopics",function(rowObj){
				screenGeneratorProp_onBeforTopic('${id}',rowObj,'${formVO.formId?default('')}');
			});
  	   
  	   		$('#${id}').subscribe("${id}_onGridCompleteTopics",function(rowObj){
  	   			$.struts2_jquery.require("ScreenGeneratorList.js,ScreenGeneratorMaint.js" ,null,jQuery.contextPath+"/common/js/screengenerator/");
				var params = {};
		 		params["criteria.objectType"] = "${element_dataType}";
		 		params["criteria.elementId"] = ${value};
		 		params["criteria.tableId"] = ${tableId};
		 		params["criteria.screenFieldId"] = parseScreenFieldId('${id}');
		 		params["criteria.screenId"] 	= parseScreenId('${formVO.formId}');
		 		
		 		screenGeneratorProp_onGridCompleteTopicReload('${id}',params,'${formVO.formId?default('')}');
		 	});
		 	
		 	$('#${id}').data('toreloadgrid',true);
		 	$('#${id}').trigger('${id}_onGridCompleteTopics');
			
	   </script>
	   
	   <@ps.hidden id='${id}_screenParamList' value='${paramList}'></@ps.hidden>
  	   
	</#if>

  	<#if element_type=='div'>
	  <#if absoluteElements != 'true'> 
	  	<td>
	  </#if>
	    <div id='${id}'>
	    	<#if jspIncludeDiv?if_exists != "">
	    		<@s.include value="${jspIncludeDiv}" />
	    	</#if>
	    </div>
	  <#if absoluteElements != 'true'>   
	  	</td>
	  </#if>
	</#if>
  	
  	<#if element_type=='hidden'>
  		<@ps.hidden id='${id}' name='${name}' value='${value}'></@ps.hidden>
  	</#if>
   <#if absoluteElements != 'true'> 
	   <#if nextRow==-1 || formVO.element_list.get(nextRow).row != preRow>
			</tr>
	   </#if>
   </#if>
	<#--build tabbed panel-->
	<#if element_type == 'tab'>
		<#if currParentTechId == -1>
			<#assign openTabPanelsArr = {techId:currParentTechId} + openTabPanelsArr/>
			<#assign openTabsAndPanelsArr = {techId:currParentTechId} + openTabsAndPanelsArr/>
			<#assign openTabbedPanelTechId = techId />
			<#assign openTabbedPanelParentTechId = currParentTechId/>
			
		    <div id="${id}"
				<#if positionAbsolute?default(false) == true>
					style="${css_attr}; position:absolute;" 
				<#else>
					style="${css_attr}"
				</#if>
			>
		    <@psj.tabbedpanel id="${id}" sortable="true">
			<#assign itrIndex = 0 />
			<@s.iterator value="formVO.element_list">
				<#assign tabParentTechId = formVO.element_list.get(itrIndex).parentTechId?default(0) />
				<#if tabParentTechId == openTabbedPanelTechId>
					<#assign tabId=formVO.element_list.get(itrIndex).id?default(0)/>
					<#assign tabTechId=formVO.element_list.get(itrIndex).techId?default(0)/>
					<#assign tabTitle=formVO.element_list.get(itrIndex).title?default("Tab")/>
					<#assign tabsHtmlArr = tabsHtmlArr + {tabTechId:tabId} />
					<@psj.tab id="${tabId}" target="${tabId}_div" key="${tabTitle}" />				
				</#if>
				<#assign itrIndex = itrIndex + 1 />
			</@s.iterator>
			</@psj.tabbedpanel>
		<#elseif currParentTechId == openTabTechId || currParentTechId == parentTechId>
			<#assign openTabPanelsArr = {techId:currParentTechId} + openTabPanelsArr/>
			<#assign openTabsAndPanelsArr = {techId:currParentTechId} + openTabsAndPanelsArr/>
			<#assign openTabbedPanelTechId = techId />
			<#assign openTabbedPanelParentTechId = currParentTechId/>
			
		    <div id="${id}"
				<#if positionAbsolute?default(false) == true>
					style="${css_attr}; position:absolute;" 
				<#else>
					style="${css_attr}"
				</#if>
			>
		    <@psj.tabbedpanel id="${id}" sortable="true">
			<#assign itrIndex = 0 />
			<@s.iterator value="formVO.element_list">
				<#assign tabParentTechId = formVO.element_list.get(itrIndex).parentTechId?default(0) />
				<#if tabParentTechId == openTabbedPanelTechId>
					<#assign tabId=formVO.element_list.get(itrIndex).id?default(0)/>
					<#assign tabTechId=formVO.element_list.get(itrIndex).techId?default(0)/>
					<#assign tabTitle=formVO.element_list.get(itrIndex).title?default("Tab")/>
					<#assign tabsHtmlArr = tabsHtmlArr + {tabTechId:tabId} />
					<@psj.tab id="${tabId}" target="${tabId}_div" key="${tabTitle}" />				
				</#if>
				<#assign itrIndex = itrIndex + 1 />
			</@s.iterator>
			</@psj.tabbedpanel>
		<#elseif currParentTechId == openTabbedPanelTechId>
			<#if tabsHtmlArr[""+techId]??>
	  			<div id="${tabsHtmlArr[""+techId]}_div"
	  			<#if positionAbsolute?default(false) == true>
        			style="${css_attr}; position:absolute;" 
      			<#else>
        			style="${css_attr}"
      			</#if>
   				>
				<#assign openTabTechId = techId/>
				<#assign openTabParentTechId = currParentTechId/>
				<#assign openTabsArr = {techId:currParentTechId} + openTabsArr/>
 				<#assign openTabsAndPanelsArr = {techId:currParentTechId} + openTabsAndPanelsArr/>
			</#if>
		</#if>
	</#if>
<#assign index=index+1 />
<#if onChangeScript?default('') != ''>
  <script type="text/javascript">
  ${onChangeScript}
  </script>
</#if>  

</@s.iterator>
<#if absoluteElements != 'true'> 
</table>
<#else>
  </div>
</#if>
<#-- check if only one element in Form then Add hidden dummy input so that IE will not submit on enter key press-->
   <#if 1 == nbInpts>
      <input type='text' disabled='disabled' style='display:none'/>
   </#if>
<#assign theFormId=formVO.formId?default('')/>
<#if collapsibleDivExists == 1>
	<script type="text/javascript">
	$(document).ready(
		function() {
		<#if collapsibleDivExists == 1>
		   <#list collapseList?split(",") as collDivId>
	              var _collDivId = "${collDivId}";
	              applyCollapsibleToDynDiv(_collDivId);
	           </#list>
		</#if>
	});   
	</script>
</#if>
<#if gridInTabExists?if_exists == 1 && tabsHtmlArr?size gt 1>
	<script type="text/javascript">
		$(document).ready(function() {
			_dynScrGridResize("${formVO.formId}");
		});
	</script>
</#if>
<#recover>
${_error?default('Error FR Occurred Please Contact Administrator')}
</#attempt>