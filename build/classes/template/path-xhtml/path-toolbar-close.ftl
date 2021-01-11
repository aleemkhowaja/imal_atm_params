<#assign psj=JspTaglibs["/WEB-INF/tld/path-struts-jquery-tags.tld"]/>
<#assign ps=JspTaglibs["/WEB-INF/tld/path-struts-tags.tld"]/>

<#assign index=0 />
<@s.iterator value="parameters.customButtonList">
    <#assign visible = parameters.customButtonList.get(index).VISIBILITY_EXPRESSION?default('')/>
    <#if ACCESS_PROG_REF ?if_exists != "">
    	<#if ICON_IMAGE?has_content>
    		<@psj.submit id="customBtnId_${index}_${parameters.pageRef}" customBtnId="${BTN_ID?html}"  button="true" onclick="customBtnActionCall('customBtnId_${index}_${parameters.pageRef}','${APPLY_FORM_VALIDATION_YN?default(0)}')" freezeOnSubmit="true" buttonIconUrl="${base}/path/buttoncustomization/ButtonCustomizationMaint_returnIconImage?sysParamBtnCustVO.BTN_ID=${BTN_ID?html}&date=${(MODIFIED_DATE?string('yyyy-MM-dd-HH-mm-ss'))!}" progRef="${ACCESS_PROG_REF?html}" allowView="${visible}">
				<@ps.text name="${LABEL_KEY?html}"></@ps.text>
			</@psj.submit>
    	<#else>
   			<@psj.submit id="customBtnId_${index}_${parameters.pageRef}" customBtnId="${BTN_ID?html}"  button="true" onclick="customBtnActionCall('customBtnId_${index}_${parameters.pageRef}','${APPLY_FORM_VALIDATION_YN?default(0)}')" freezeOnSubmit="true" buttonIcon="ui-icon ui-icon-triangle-1-e" progRef="${ACCESS_PROG_REF?html}" allowView="${visible}">
				<@ps.text name="${LABEL_KEY?html}"></@ps.text>
			</@psj.submit>
 		</#if>
    <#else>
    	<#if ICON_IMAGE?has_content>
    		<@psj.submit id="customBtnId_${index}_${parameters.pageRef}" customBtnId="${BTN_ID?html}"  button="true" onclick="customBtnActionCall('customBtnId_${index}_${parameters.pageRef}','${APPLY_FORM_VALIDATION_YN?default(0)}')" freezeOnSubmit="true" buttonIconUrl="${base}/path/buttoncustomization/ButtonCustomizationMaint_returnIconImage?sysParamBtnCustVO.BTN_ID=${BTN_ID?html}&date=${(MODIFIED_DATE?string('yyyy-MM-dd-HH-mm-ss'))!}" allowView="${visible}">
    			<@ps.text name="${LABEL_KEY?html}"></@ps.text>
    		</@psj.submit>
    	<#else>
   			<@psj.submit id="customBtnId_${index}_${parameters.pageRef}" customBtnId="${BTN_ID?html}"  button="true" onclick="customBtnActionCall('customBtnId_${index}_${parameters.pageRef}','${APPLY_FORM_VALIDATION_YN?default(0)}')" freezeOnSubmit="true" buttonIcon="ui-icon ui-icon-triangle-1-e" allowView="${visible}">
    			<@ps.text name="${LABEL_KEY?html}"></@ps.text>
    		</@psj.submit>
 		</#if>
    </#if>	
<#assign index=index+1 />    
</@s.iterator>

</div>