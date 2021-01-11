<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<table>
	<tr>
		<td>
			<ps:label id="lbl_smartLabel" key="newDescription_key" for="lookuptxt_labelEdit"/>
		</td>
		<td align="left">
			<psj:livesearch id="labelEdit"
				 name="criteria.currLabelKey"
				 actionName="${pageContext.request.contextPath}/pathdesktop/TranslationLookup_labelKeyLookup"
				 resultList="sysParamKeyLabelVO.KEY_LABEL_CODE:lookuptxt_labelEdit"
				 paramList="translationSC.selectedApp:3"
				 searchElement="KEY_LABEL_CODE" autoSearch="true" maxlength="100"
				 required="true"/>	  
		</td>
	</tr>
</table>
