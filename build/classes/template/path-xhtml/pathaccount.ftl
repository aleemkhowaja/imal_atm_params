<#include "/${parameters.templateDir}/${parameters.theme}/controlheader.ftl" />
<#attempt>
<#assign ps=JspTaglibs["/WEB-INF/tld/path-struts-tags.tld"]>
<#assign namesLst     = "${parameters.inputNames}"?split("~")>
<#assign idLst        = "${parameters.inputIds}"?split("~")>
<#assign cssDispLst = "${parameters.cssDisp}"?split("~")>
<#assign lstSize = idLst?size>
<#assign nameValueLst        = "${parameters.nameValues}"?split("~")>
<#if parameters.inputsOrder??>
   <#assign orderLst    = "${parameters.inputsOrder}"?split("~")>
</#if>
<#if parameters.additionalLabels??>
   <#assign labelsLst    = "${parameters.additionalLabels}"?split("~")>
</#if>
<#if parameters.readOnly??>
   <#assign readOnlyLst    = "${parameters.readOnly}"?split("~")>
</#if>
<#if parameters.overrideLabelTextStr??>
   <#assign overrideLabelTextLst = "${parameters.overrideLabelTextStr}"?split("~")>
</#if>
<#if parameters.overrideLabelKeyStr??>
   <#assign overrideLabelKeyLst = "${parameters.overrideLabelKeyStr}"?split("~")>
</#if>
<#if parameters.required??>
   <#assign requiredLst    = "${parameters.required}"?split("~")>
</#if>
<#if parameters.maxLen??>
   <#assign maxLengthLst    = "${parameters.maxLen}"?split("~")>
</#if>
<#if parameters.leadZeros??>
   <#assign leadZerosLst    = "${parameters.leadZeros}"?split("~")>
</#if>
<#if parameters.rowLocation??>
   <#assign rowLocationLst  = "${parameters.rowLocation}"?split("~")>
</#if>
<#if parameters.colSpan??>
   <#assign colSpanLst      = "${parameters.colSpan}"?split("~")>
</#if>
<#if parameters.dependency??>
	<#assign dependencyLst   = "${parameters.dependency}"?split("~")>
	<#assign depSrcLst       = "${parameters.dependencySrc}"?split("~")>
	<#-- the parameters should be split on ~ but not on ~CONST since it is used for constants, "r" is for regular expression -->
	<#assign depParamLst     = "${parameters.parameter}"?split("~(?!CONST)","r")>
	<#if parameters.afterDepEvent??>
		<#assign afterDepEventLst     = "${parameters.afterDepEvent}"?split("~")>
	</#if>
	<#if parameters.beforeDepEvent??>
		<#assign beforeDepEventLst     = "${parameters.beforeDepEvent}"?split("~")>
	</#if>
</#if>
<#if parameters.mode??>
    <#assign modeLst   = "${parameters.mode}"?split("~")>
</#if>
<#if parameters.onchangeStr??>
    <#assign onChangeLst   = "${parameters.onchangeStr}"?split("~")>
</#if>
<#if parameters.onblur??>
    <#assign onblurLst   = "${parameters.onblur}"?split("~")>
</#if>
<#if parameters.ondblclick??>
   <#assign ondblclickLst   = "${parameters.ondblclick}"?split("~")>
</#if>
<#if parameters.inputSizes??>
   <#assign sizeLst = "${parameters.inputSizes}"?split("~")>
</#if>
<#assign elem_style = "">
<#if parameters.cssStyle?if_exists != "">
   <#assign elem_style = "${parameters.cssStyle}">
</#if>
<#if parameters.actionName??>
    <#assign actionNameLst   = "${parameters.actionName}"?split("~")>
</#if>
<#if parameters.searchElement??>
    <#assign searchElementLst   = "${parameters.searchElement}"?split("~")>
</#if>
<#if parameters.validateAction??>
    <#assign validateActionLst   = "${parameters.validateAction}"?split("~")>
</#if>
<#if parameters.paramList??>
   <#assign paramListLst   = "${parameters.paramList}"?split("~")>
</#if>
<#if parameters.toolTipNames??>
   <#assign toolTipNamesLst   = "${parameters.toolTipNames}"?split("~")>
</#if>
<#if parameters.fieldDescNames??>
   <#assign fieldDescLst   = "${parameters.fieldDescNames}"?split("~")>
</#if>
<#if parameters.resultList??>
   <#assign resultListLst   = "${parameters.resultList}"?split("~")>
</#if>
<#if parameters.onOk??>
   <#assign onOkLst   = "${parameters.onOk}"?split("~")>
</#if>
<#if parameters.onCancel??>
   <#assign onCancelLst   = "${parameters.onCancel}"?split("~")>
</#if>
<#if parameters.multiSelect??>
   <#assign multiSelectLst   = "${parameters.multiSelect}"?split("~")>
</#if>
<#if parameters.selectColumn??>
   <#assign selectColumnLst   = "${parameters.selectColumn}"?split("~")>
</#if>
<#if parameters.autoSearch??>
    <#assign autoSearchLst   = "${parameters.autoSearch}"?split("~")>
</#if>
<#if parameters.dontLoadData??>
    <#assign dontLoadDataLst   = "${parameters.dontLoadData}"?split("~")>
</#if>
<#if parameters.tabindex??>
   <#assign tabindexLst    = "${parameters.tabindex}"?split("~")>
</#if>
<#if parameters.customBtnDataStr??>
    <#assign customBtnDataLst   = "${parameters.customBtnDataStr}"?split("~")>
</#if>
<#if parameters.customKeyEventBtnDataStr??>
    <#assign customKeyEventBtnDataLst   = "${parameters.customKeyEventBtnDataStr}"?split("~")>
</#if>
<#assign input_name ="">
<#assign lead_zeros ="0">
<#assign on_change ="">
<#assign dependencyP ="">
<#assign dependencySrcP ="">
<#assign parameterP ="">
<#assign theRow = "1">
<#assign secondrowSize = 0>
<#assign mode_value = "number">
<#assign y=0>
<#assign defaultParam = "">
<#assign defaultDependency = "">
<#assign defaultDependencySrc = "">
<#assign accountContentLst = ["account.BRANCH_CODE","account.CURRENCY_CODE","account.GL_CODE","account.CIF_SUB_NO","account.SL_NO","account.ADDITIONAL_REFERENCE","account.BRIEF_NAME_ENG","account.currencyDesc","account.accountType","account.cifName"]>
   <#if parameters.accountLabel?if_exists != "">
	<fieldset class="ui-widget-content ui-corner-all path-dummy-cls" style="${elem_style};padding-top: 10px; margin-top: 10px;" id="pathAccount_${parameters.id?default('')}"><#t/>
	   <legend class="ui-widget-content floatRightLeft" style="margin-top:-20px;border:0;"><@ps.label for="${parameters.inputIds}"  key="${parameters.accountLabel}" id="lbl_${idLst[0]}"></@ps.label></legend><#t/>
   </#if>
   <table width="100%" cellspacing="1" cellpadding="0" style="${elem_style}" class="path-dummy-cls" id="tbl_pathAccount_${parameters.id?default('')}"><#t/>
   <tr><#t/>
   <#list idLst as i>
  		       ${tag.addParameter('mode', 'number')}
		       ${tag.addParameter('nbFormat', '####')}
		       ${tag.addParameter('cssClass', 'path-dummy-cls')}
			   <#if modeLst?? && modeLst[i_index]?if_exists != "" && modeLst[i_index]!="N">
				   <#assign mode_value = "${modeLst[i_index]}">
				   ${tag.addParameter('mode', mode_value)}
			   <#else>
			        <#if parameters.mode??>
				   	   ${tag.addParameter('mode', '')}
				   	</#if>
		       </#if>
			   <#assign accContLstSize = accountContentLst?size>
			   <#assign z=accContLstSize>
			   <#if i_index < z >
	               <#if i_index!=0 && i_index!=5>		                      
	                  <#if mode_value ?if_exists == "livesearch">
		                  <#assign paramVal = "${accountContentLst[i_index]}"+":lookuptxt_"+"${i}">
		                  <#assign defaultParam = "${defaultParam}"+","+"${paramVal}">
		                  ${tag.addParameter('mode', 'number')}
	                  <#else>
		                  <#assign paramVal = "${accountContentLst[i_index]}"+":"+"${i}">
		                  <#assign defaultParam = "${defaultParam}"+","+"${paramVal}">
	                  </#if>  
	               <#else>
	                  <#if i_index==0>
	                     <#assign paramVal = "${accountContentLst[i_index]}"+":"+"${i}">
	                     <#assign defaultParam = "${paramVal}">
	                  </#if>                  
	               </#if>
               </#if>
				 <#assign y=i_index>
				 <#assign defaultDependency = "">
				 <#assign idListSize = idLst?size>
				 <#if z < idListSize>
				    <#assign loopLimit = z>
				 <#else>
				    <#assign loopLimit = idListSize>   
				 </#if>
				 <#if y < z>
		             <#if mode_value ?if_exists != "livesearch">	               
			             <#list y..loopLimit-1 as j>
			                <#if modeLst?? && modeLst[j]?if_exists != "" && modeLst[j]!="N" && modeLst[j]=="livesearch">
				                <#if j == y>
				                  <#assign defaultDependency = defaultDependency+"lookuptxt_${idLst[j]}"+":"+"${accountContentLst[j]}">
				                <#else>
				                  <#assign defaultDependency = defaultDependency+",lookuptxt_${idLst[j]}"+":"+"${accountContentLst[j]}">
				                </#if>
				            <#else>
				                <#if j == y>
				                  <#assign defaultDependency = defaultDependency+"${idLst[j]}"+":"+"${accountContentLst[j]}">
				                <#else>
				                  <#assign defaultDependency = defaultDependency+",${idLst[j]}"+":"+"${accountContentLst[j]}">
				                </#if>			                    
			                </#if> 
			             </#list>
			         <#else>
			             <#list 0..loopLimit-1 as j>
	                        <#if modeLst?? && modeLst[j]?if_exists != "" && modeLst[j]!="N" && modeLst[j]=="livesearch">                            
				                <#if j == 0>
				                  <#assign defaultDependency = defaultDependency+"lookuptxt_${idLst[j]}"+":"+"${accountContentLst[j]}">
				                <#else>
				                  <#assign defaultDependency = defaultDependency+",lookuptxt_${idLst[j]}"+":"+"${accountContentLst[j]}">
				                </#if>
				            <#else>
				                <#if j == 0>
				                  <#assign defaultDependency = defaultDependency+"${idLst[j]}"+":"+"${accountContentLst[j]}">
				                <#else>
				                  <#assign defaultDependency = defaultDependency+",${idLst[j]}"+":"+"${accountContentLst[j]}">
				                </#if>
	                        </#if>  
			             </#list>
		             </#if>
	             </#if>
			    <#if orderLst?? && orderLst[i_index]?if_exists !="" && orderLst[i_index] !="N">
			    	<#assign parameters = parameters + {'inputOrder' : orderLst[i_index] } > 
				</#if>                              
               <#switch i_index>
                  <#case 0>
				    <#if orderLst?? && orderLst[i_index]?if_exists !="" && orderLst[i_index] !="N">
				        <#if orderLst[i_index] == "br">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/BranchesDependencyAction_dependencyByBrId?">
				        </#if>
				        <#if orderLst[i_index] == "cy">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/CurrencyDependencyAction_dependencyByCYId?">
				        </#if>
				        <#if orderLst[i_index] == "gl">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/GLDependencyAction_dependencyByGLId?">
				        </#if>
				        <#if orderLst[i_index] == "cif">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/CifDependencyAction_dependencyByCifId?">
				        </#if>
				        <#if orderLst[i_index] == "sl">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/AccountDependencyAction_dependencyBySLId?">
				        </#if>
				        <#if orderLst[i_index] == "ref">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/AccountDependencyAction_dependencyByACRef?">
				        </#if>
					<#else>
                        <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/BranchesDependencyAction_dependencyByBrId?">
				    </#if>	             
                  <#break>
                  <#case 1>
				    <#if orderLst?? && orderLst[i_index]?if_exists !="" && orderLst[i_index] !="N">
				        <#if orderLst[i_index] == "br">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/BranchesDependencyAction_dependencyByBrId?">
				        </#if>
				        <#if orderLst[i_index] == "cy">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/CurrencyDependencyAction_dependencyByCYId?">
				        </#if>
				        <#if orderLst[i_index] == "gl">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/GLDependencyAction_dependencyByGLId?">
				        </#if>
				        <#if orderLst[i_index] == "cif">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/CifDependencyAction_dependencyByCifId?">
				        </#if>
				        <#if orderLst[i_index] == "sl">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/AccountDependencyAction_dependencyBySLId?">
				        </#if>
				        <#if orderLst[i_index] == "ref">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/AccountDependencyAction_dependencyByACRef?">
				        </#if>
					<#else>
                        <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/CurrencyDependencyAction_dependencyByCYId?">
				    </#if>	             
                  <#break>
                  <#case 2>
				    <#if orderLst?? && orderLst[i_index]?if_exists !="" && orderLst[i_index] !="N">
				        <#if orderLst[i_index] == "br">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/BranchesDependencyAction_dependencyByBrId?">
				        </#if>
				        <#if orderLst[i_index] == "cy">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/CurrencyDependencyAction_dependencyByCYId?">
				        </#if>
				        <#if orderLst[i_index] == "gl">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/GLDependencyAction_dependencyByGLId?">
				        </#if>
				        <#if orderLst[i_index] == "cif">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/CifDependencyAction_dependencyByCifId?">
				        </#if>
				        <#if orderLst[i_index] == "sl">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/AccountDependencyAction_dependencyBySLId?">
				        </#if>
				        <#if orderLst[i_index] == "ref">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/AccountDependencyAction_dependencyByACRef?">
				        </#if>
					<#else>
                        <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/GLDependencyAction_dependencyByGLId?">                 
				    </#if>	             
                  <#break>
                  <#case 3>
				    <#if orderLst?? && orderLst[i_index]?if_exists !="" && orderLst[i_index] !="N">
				        <#if orderLst[i_index] == "br">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/BranchesDependencyAction_dependencyByBrId?">
				        </#if>
				        <#if orderLst[i_index] == "cy">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/CurrencyDependencyAction_dependencyByCYId?">
				        </#if>
				        <#if orderLst[i_index] == "gl">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/GLDependencyAction_dependencyByGLId?">
				        </#if>
				        <#if orderLst[i_index] == "cif">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/CifDependencyAction_dependencyByCifId?">
				        </#if>
				        <#if orderLst[i_index] == "sl">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/AccountDependencyAction_dependencyBySLId?">
				        </#if>
				        <#if orderLst[i_index] == "ref">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/AccountDependencyAction_dependencyByACRef?">
				        </#if>				       
					<#else>
                        <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/CifDependencyAction_dependencyByCifId?">                  
				    </#if>	             
                  <#break>
                  <#case 4>
				    <#if orderLst?? && orderLst[i_index]?if_exists !="" && orderLst[i_index] !="N">
				        <#if orderLst[i_index] == "br">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/BranchesDependencyAction_dependencyByBrId?">
				        </#if>
				        <#if orderLst[i_index] == "cy">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/CurrencyDependencyAction_dependencyByCYId?">
				        </#if>
				        <#if orderLst[i_index] == "gl">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/GLDependencyAction_dependencyByGLId?">
				        </#if>
				        <#if orderLst[i_index] == "cif">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/CifDependencyAction_dependencyByCifId?">
				        </#if>
				        <#if orderLst[i_index] == "sl">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/AccountDependencyAction_dependencyBySLId?">
				        </#if>
				        <#if orderLst[i_index] == "ref">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/AccountDependencyAction_dependencyByACRef?">
				        </#if>				       
					<#else>
                        <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/AccountDependencyAction_dependencyBySLId?">                 
				    </#if>	             
                  <#break>
                  <#case 5>
				    <#if orderLst?? && orderLst[i_index]?if_exists !="" && orderLst[i_index] !="N">
				        <#if orderLst[i_index] == "br">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/BranchesDependencyAction_dependencyByBrId?">
				        </#if>
				        <#if orderLst[i_index] == "cy">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/CurrencyDependencyAction_dependencyByCYId?">
				        </#if>
				        <#if orderLst[i_index] == "gl">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/GLDependencyAction_dependencyByGLId?">
				        </#if>
				        <#if orderLst[i_index] == "cif">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/CifDependencyAction_dependencyByCifId?">
				        </#if>
				        <#if orderLst[i_index] == "sl">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/AccountDependencyAction_dependencyBySLId?">
				        </#if>
				        <#if orderLst[i_index] == "ref">
				           <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/AccountDependencyAction_dependencyByACRef?">
				        </#if>				       
					<#else>					
                       <#assign defaultDependencySrc = "${parameters.contextPath}/pathdesktop/AccountDependencyAction_dependencyByACRef?">
				    </#if>	             
                    ${tag.addParameter('mode', 'text')} 
                  <#break>
                  <#default>
                    <#assign defaultDependencySrc = "">                  
                  <#break>
               </#switch>
               <#if parameters.overrideLabelTextStr?? && overrideLabelTextLst?? && overrideLabelTextLst[i_index]?if_exists != "" >
					<#assign parameters = parameters +   {'overrideLabelText':overrideLabelTextLst[i_index]}>
			   <#else>	                 	
					<#assign parameters = parameters +   {'overrideLabelText':''}>
           	   </#if>
               <#if parameters.overrideLabelKeyStr?? && overrideLabelKeyLst?? && overrideLabelKeyLst[i_index]?if_exists != "" >
					<#assign parameters = parameters +   {'overrideLabelKey':overrideLabelKeyLst[i_index]}>
			   <#else>	                 	
					<#assign parameters = parameters +   {'overrideLabelKey':''}>
           	   </#if>
               <#if parameters.rowLocation?? && "${rowLocationLst[i_index]}"?if_exists != theRow >
                  </td><#t/>
                  </tr><#t/>
                  <tr><#t/>
                  <#if i_index < 6>
                      <td colSpan ="${colSpanLst[i_index]}">
                  </#if>
                  <#if i_index == 6>
                  		<#assign add_elem_style = "">
                  		<#if elem_style == "">
                  			 <#assign add_elem_style = "${cssDispLst[i_index]}">
                  			 <#--
                  		<#else>
                  			<#assign add_elem_style = "${elem_style}">
                  			-->
                  		</#if>
                        <td colSpan ="5"><#t/>
                        <table width="100%" cellPadding="0"><#t/>
                        <tr><#t/>
                       <#if labelsLst?? && labelsLst[i_index]?if_exists !="" && labelsLst[i_index] != "N">
                           <td><@ps.label id = "lbl_${idLst[i_index]}" cssStyle="${add_elem_style}"  for="${idLst[i_index]}" key="${labelsLst[i_index]}"></@ps.label></td><#t/>
                       <#else>
                           <td><@ps.label id = "lbl_${idLst[i_index]}" cssStyle="${add_elem_style}"  for="${idLst[i_index]}" key="no_Label_found_key"></@ps.label></td><#t/>
                       </#if>
                       <td><#t/>
                  </#if>
                  <#if (i_index > 6)>
                       <#if labelsLst?? && labelsLst[i_index]?if_exists !="" && labelsLst[i_index] != "N">
                            <td><@ps.label id = "lbl_${idLst[i_index]}" cssStyle="${add_elem_style}"  for="${idLst[i_index]}" key="${labelsLst[i_index]}"></@ps.label></td><#t/>
                       <#else>
                            <td><@ps.label id = "lbl_${idLst[i_index]}" cssStyle="${add_elem_style}"  for="${idLst[i_index]}" key="no_Label_found_key"></@ps.label></td>
                       </#if>
                       <td><#t/>
                  </#if>       
                  <#assign theRow = "${rowLocationLst[i_index]}">
               <#else>
                  </td><#t/>
                  <#if i_index < 6 >
					  <#if parameters.inputSizes?? && sizeLst[i_index]?if_exists != "" && sizeLst[i_index]!="N">
		                 <td width="${sizeLst[i_index]}"><#t/>
		              <#else>
		                 <td><#t/>
				      </#if>                  
                  </#if>
                  <#-- dynamic label management -->
		                  <#if i_index == 6>
		                  		<#assign add_elem_style = "">
		                  		<#if elem_style == "">
		                  			 <#assign add_elem_style = "${cssDispLst[i_index]}">
		                  			 <#--
		                  		<#else>
		                  			<#assign add_elem_style = "${elem_style}">
		                  			-->
		                  		</#if>
		                        <td colSpan ="5"><#t/>
		                        <table width="100%" cellPadding="0"><#t/>
		                        <tr><#t/>
		                       <#if labelsLst?? && labelsLst[i_index]?if_exists !="" && labelsLst[i_index] != "N">
		                           <td><@ps.label id = "lbl_${idLst[i_index]}" cssStyle="${add_elem_style}"  for="${idLst[i_index]}" key="${labelsLst[i_index]}"></@ps.label></td><#t/>
		                       <#else>
		                           <td><@ps.label id = "lbl_${idLst[i_index]}" cssStyle="${add_elem_style}"  for="${idLst[i_index]}" key="no_Label_found_key"></@ps.label></td><#t/>
		                       </#if>
		                       <td>
		                  </#if>
		                  <#if (i_index > 6)>
		                       <#if labelsLst?? && labelsLst[i_index]?if_exists !="" && labelsLst[i_index] != "N">
		                            <td><@ps.label id = "lbl_${idLst[i_index]}" cssStyle="${add_elem_style}"  for="${idLst[i_index]}" key="${labelsLst[i_index]}"></@ps.label></td><#t/>
		                       <#else>
		                            <td><@ps.label id = "lbl_${idLst[i_index]}" cssStyle="${add_elem_style}"  for="${idLst[i_index]}" key="no_Label_found_key"></@ps.label></td><#t/>
		                       </#if>
		                       <td><#t/>
		                  </#if>       
                  <#-- end dynamic label management -->
               </#if>
		       <#assign parameters = parameters + {'id':i}>
		       <#if parameters.inputNames?? && namesLst[i_index]?if_exists !="" && namesLst[i_index] != "N">
					<#assign input_name = "${namesLst[i_index]}">
					<#assign nameValue = "${nameValueLst[i_index]}">
					<#assign parameters = parameters + {'name':input_name}>
						<#if nameValue?if_exists !='null'>
							<#if parameters.nameValue?if_exists !=""> 
							   <#assign x = parameters.remove('nameValue') >
							 </#if> 
							${tag.addParameter('nameValue', nameValue)} 
						<#else>
							<#if parameters.nameValue?if_exists !=""> 
							   <#assign x = parameters.remove('nameValue') >
							 </#if> 
							${tag.addParameter('nameValue', '')} 
						</#if>
			   </#if>
		       <#if parameters.readOnly?? && readOnlyLst[i_index]?if_exists !="" && readOnlyLst[i_index] != "N">
					  <#if mode_value ?if_exists == "livesearch">
					      <#assign parameters = parameters +   {'readOnlyMode':readOnlyLst[i_index]}>
					  <#else>
					      <#assign parameters = parameters +   {'readonly':readOnlyLst[i_index]?contains("true")}>
					      <#--PathSolution Denisk adding tabindex -1 to the 5 parameter which is account Name and remove from others
					      <#if i_index == 5>
					         ${tag.addParameter('tabindex', '-1')} 
					      <#else>
					         <#if parameters.tabindex??>   
					           <#assign x = parameters.remove('tabindex') >
					          </#if> 
				       	  </#if> 
					       -->
					  </#if>
			   <#else>
			       <#if parameters.readonly??>
			          <#assign parameters = parameters +   {'readonly':false}>
			       </#if>
			       <#if parameters.readOnlyMode??>
			          <#assign parameters = parameters +   {'readOnlyMode':"false"}>
			       </#if>
			   </#if>
			    <#if requiredLst?? && requiredLst[i_index]?if_exists !="" && requiredLst[i_index] !="N">
					<#assign parameters = parameters +   {'required':requiredLst[i_index]?contains("true")}>
				<#else>
				    <#if parameters.required??>
				   	   <#assign parameters = parameters +   {'required':false}>
				   	</#if>
			   </#if>
			   <#if leadZerosLst?? && leadZerosLst[i_index]?if_exists !="" && leadZerosLst[i_index] !="N">
			    	<#assign lead_zeros = "${leadZerosLst[i_index]}">
					${tag.addParameter('leadZeros',lead_zeros)}
				<#else>
				    <#if parameters.leadZeros??>
				   	   ${tag.addParameter('leadZeros','')}
				   	</#if>
			   </#if>
			   <#if maxLengthLst?? && maxLengthLst[i_index]?if_exists !="" && maxLengthLst[i_index] !="N">
			    	<#assign max_length = "${maxLengthLst[i_index]}">
					<#assign parameters = parameters + {'maxlength':max_length}>
				<#else>
				    <#if parameters.maxlength??>
				   	   <#assign parameters = parameters + {'maxlength':''}>
				   	</#if>
			   </#if>
			   <#if tabindexLst?? && tabindexLst[i_index]?if_exists !="" && tabindexLst[i_index] !="N">
			    	<#assign tab_index = "${tabindexLst[i_index]}">
					<#assign parameters = parameters + {'tabindex':tab_index}>
				<#else>
			    	<#if parameters.tabindex??>
			   	   		<#assign parameters = parameters + {'tabindex':'0'}>
			   		</#if>
			   </#if>
			   <#if dependencyLst??>
				   <#if dependencyLst[i_index]?if_exists != "" && dependencyLst[i_index] !="N">
				        <#assign dependencyP = "${dependencyLst[i_index]}">
						<#assign parameters = parameters +  {'dependency':dependencyP}>
				   <#else>
				        <#if parameters.dependency??>
				           <#assign parameters = parameters +  {'dependency':defaultDependency}>
				        </#if>
				   </#if>
				   <#if depSrcLst[i_index]?if_exists != "" && depSrcLst[i_index] != "N">
				        <#assign dependencySrcP = "${depSrcLst[i_index]}">
						<#assign parameters = parameters +  {'dependencySrc':dependencySrcP}>
				   <#else>
				        <#if parameters.dependencySrc??>
				           <#assign parameters = parameters +  {'dependencySrc':defaultDependencySrc}>
				        </#if>
				   </#if>
				   <#if depParamLst[i_index]?if_exists != "" && depParamLst[i_index] != "N">
				        <#assign parameterP = "${depParamLst[i_index]}">
						<#assign parameters = parameters +  {'parameter':parameterP}>
				   <#else>
				        <#if parameters.parameter??>
				           <#assign parameters = parameters +  {'parameter':defaultParam}>
				        </#if>	 	
				   </#if>
				   <#if afterDepEventLst??>
					   <#if afterDepEventLst[i_index]?if_exists != "" && afterDepEventLst[i_index] != "N">
					   		<#assign afterDepEventP = "${afterDepEventLst[i_index]}">
						<#else>
							<#assign afterDepEventP = "">
					    </#if>
						<#assign parameters = parameters +  {'afterDepEvent':afterDepEventP}>
				   </#if>
				   <#if beforeDepEventLst??>
					   <#if beforeDepEventLst[i_index]?if_exists != "" && beforeDepEventLst[i_index] != "N">
					   		<#assign beforeDepEventP = "${beforeDepEventLst[i_index]}">
						<#else>
							<#assign beforeDepEventP = "">
					    </#if>
						<#assign parameters = parameters +  {'beforeDepEvent':beforeDepEventP}>
				   </#if>
			   <#else>
			       <#assign parameters = parameters +  {'parameter':defaultParam}>
			       <#assign parameters = parameters +  {'dependencySrc':defaultDependencySrc}>
			       <#assign parameters = parameters +  {'dependency':defaultDependency}>
			   </#if>
			   <#if onChangeLst?? && onChangeLst[i_index]?if_exists != "" && onChangeLst[i_index]!="N">
				   <#assign on_change = "${onChangeLst[i_index]}">
				   <#assign parameters = parameters +  {'onchange':on_change}>
			   <#else>
			        <#if parameters.onchange??>
				   	   <#assign parameters = parameters + {'onchange':''}>
				   	</#if>
		       </#if>
			   <#if onblurLst?? && onblurLst[i_index]?if_exists != "" && onblurLst[i_index]!="N">
				   <#assign on_blur = "${onblurLst[i_index]}">
				   <#assign parameters = parameters +  {'onblur':on_blur}>
			   <#else>
			        <#if parameters.onblur??>
				   	   <#assign parameters = parameters + {'onblur':''}>
				   	</#if>
		       </#if>
			   <#if ondblclickLst?? && ondblclickLst[i_index]?if_exists != "" && ondblclickLst[i_index]!="N">
				   <#assign on_dblclick = "${ondblclickLst[i_index]}">
				   <#assign parameters = parameters +  {'ondblclick':on_dblclick}>
			   <#else>
			        <#if parameters.ondblclick??> 
				   	   <#assign parameters = parameters + {'ondblclick':''}>
				   	</#if>
		       </#if>
		       <#if elem_style?if_exists != "">
		        <#--
		         <#if mode_value ?if_exists == "livesearch">
		            <#assign parameters = parameters  + {'cssStyle':'${elem_style}'}>
		         <#else>
		         </#if>   
		         -->
		            <#assign parameters = parameters  + {'cssStyle':'width:100%'}>   
		       <#else>
		         <#if mode_value ?if_exists == "livesearch">  
		             <#assign parameters = parameters  + {'cssStyle':'${cssDispLst[i_index]}'}>
		         <#else>
		            <#assign parameters = parameters  + {'cssStyle':'width:100%;${cssDispLst[i_index]}'}>
		         </#if>      		             
		       </#if>
			   <#if actionNameLst?? && actionNameLst[i_index]?if_exists != "" && actionNameLst[i_index]!="N">
				   <#assign actionName_value = "${actionNameLst[i_index]}">
				   <#assign parameters = parameters +  {'actionName':actionName_value}>
			   <#else>
			        <#if parameters.actionName??>
				   	   <#assign parameters = parameters + {'actionName':''}>
				   	</#if>
		       </#if>
			   <#if searchElementLst?? && searchElementLst[i_index]?if_exists != "" && searchElementLst[i_index]!="N">
				   <#assign searchElement_value = "${searchElementLst[i_index]}">
				   <#assign parameters = parameters +  {'searchElement':searchElement_value}>
			   <#else>
			        <#if parameters.searchElement??>
				   	   <#assign parameters = parameters + {'searchElement':''}>
				   	</#if>
		       </#if>
			   <#if validateActionLst?? && validateActionLst[i_index]?if_exists != "" && validateActionLst[i_index]!="N">
				   <#assign validateAction_value = "${validateActionLst[i_index]}">
				   <#assign parameters = parameters +  {'validateAction':validateAction_value}>
			   <#else>
			        <#if parameters.validateAction??>
				   	   <#assign parameters = parameters + {'validateAction':''}>
				   	</#if>
		       </#if>
			   <#if paramListLst?? && paramListLst[i_index]?if_exists != "" && paramListLst[i_index]!="N">
				   <#assign paramList_value = "${paramListLst[i_index]}">
				   <#assign parameters = parameters +  {'paramList':paramList_value}>
			   <#else>
			        <#if parameters.paramList??>
				   	   <#assign parameters = parameters + {'paramList':''}>
				   	</#if>
		       </#if>
			   <#if resultListLst?? && resultListLst[i_index]?if_exists != "" && resultListLst[i_index]!="N">
				   <#assign resultList_value = "${resultListLst[i_index]}">
				   <#assign parameters = parameters +  {'resultList':resultList_value}>
			   <#else>
			        <#if parameters.resultList??>
				   	   <#assign parameters = parameters + {'resultList':''}>
				   	</#if>
		       </#if>
			   <#if onOkLst?? && onOkLst[i_index]?if_exists != "" && onOkLst[i_index]!="N">
				   <#assign onOk_value = "${onOkLst[i_index]}">
				   <#assign parameters = parameters +  {'onOk':onOk_value}>
			   <#else>
			        <#if parameters.onOk??>
				   	   <#assign parameters = parameters + {'onOk':''}>
				   	</#if>
		       </#if>
			   <#if onCancelLst?? && onCancelLst[i_index]?if_exists != "" && onCancelLst[i_index]!="N">
				   <#assign onCancel_value = "${onCancelLst[i_index]}">
				   <#assign parameters = parameters +  {'onCancel':onCancel_value}>
			   <#else>
			        <#if parameters.onCancel??>
				   	   <#assign parameters = parameters + {'onCancel':''}>
				   	</#if>
		       </#if>
			   <#if multiSelectLst?? && multiSelectLst[i_index]?if_exists != "" && multiSelectLst[i_index]!="N">
				   <#assign multiSelect_value = "${multiSelectLst[i_index]}">
				   <#assign parameters = parameters +  {'multiSelect':multiSelect_value}>
			   <#else>
			        <#if parameters.multiSelect??>
				   	   <#assign parameters = parameters + {'multiSelect':''}>
				   	</#if>
		       </#if>
			   <#if selectColumnLst?? && selectColumnLst[i_index]?if_exists != "" && selectColumnLst[i_index]!="N">
				   <#assign selectColumn_value = "${selectColumnLst[i_index]}">
				   <#assign parameters = parameters +  {'selectColumn':selectColumn_value}>
			   <#else>
			        <#if parameters.selectColumn??>
				   	   <#assign parameters = parameters + {'selectColumn':''}>
				   	</#if>
		       </#if>
			   <#if autoSearchLst?? && autoSearchLst[i_index]?if_exists != "" && autoSearchLst[i_index]!="N">
				   <#assign autoSearch_value = "${autoSearchLst[i_index]}">
				   <#assign parameters = parameters +  {'autoSearch':autoSearch_value}>
			   <#else>
			        <#if parameters.autoSearch??>
				   	   <#assign parameters = parameters + {'autoSearch':''}>
				   	</#if>
		       </#if>
		       
		        <#if dontLoadDataLst?? && dontLoadDataLst[i_index]?if_exists != "" && dontLoadDataLst[i_index]!="N">
				   <#assign dontLoadData_value = "${dontLoadDataLst[i_index]}">
				   <#assign parameters = parameters +  {'dontLoadData':dontLoadData_value}>
		       </#if>
		       
		        <#if toolTipNamesLst?? && toolTipNamesLst[i_index]?if_exists != "" && toolTipNamesLst[i_index]!="N">
				   <#assign toolTipNamesLst_value = "${toolTipNamesLst[i_index]}">
				   ${tag.addParameter('title',toolTipNamesLst_value)}
			   <#else>
			        <#if parameters.toolTipNamesLst??>
			           ${tag.addParameter('title','')}
				   	</#if>
		       </#if>
		       <#if fieldDescLst?? && fieldDescLst[i_index]?if_exists != "" && fieldDescLst[i_index]!="N">
				   <#assign fieldDescLst_value = "${fieldDescLst[i_index]}">
				   <#assign parameters = parameters +  {'fielddesc':fieldDescLst_value}>
		       </#if>
		       <#if customBtnDataLst?? && customBtnDataLst[i_index]?if_exists != "" && customBtnDataLst[i_index]!="N">
				   <#assign parameters = parameters +  {'customBtnData': customBtnDataLst[i_index] } > 
			   </#if>
			   <#if customKeyEventBtnDataLst?? && customKeyEventBtnDataLst[i_index]?if_exists != "" && customKeyEventBtnDataLst[i_index]!="N">
				   <#assign parameters = parameters +  {'customKeyEventBtnData' : customKeyEventBtnDataLst[i_index]}>
			   </#if>
			   <#if mode_value ?if_exists == "livesearch">
		            <#include "/${parameters.templateDir}/path-xhtml/livesearch.ftl"/>
		       <#else>
			        <#include "/${parameters.templateDir}/path-xhtml/text.ftl"/>
		       </#if>
  </#list>
  </td><#t/>
  </tr><#t/>
  <#if (y > 5)>
  </table><#t/>
  </#if>
  </table><#t/>
  <#if parameters.accountLabel?if_exists != "">
     </fieldset><#t/>
  </#if>
<#recover>
${_error?default('Error FR Occurred Please Contact Administrator')}
</#attempt>