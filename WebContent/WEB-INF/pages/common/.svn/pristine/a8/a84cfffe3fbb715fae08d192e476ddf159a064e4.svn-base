<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@page import="com.path.bo.common.ConstantsCommon"%>
<%@page import="com.path.bo.common.CommonMethods"%>
<%@page import="com.path.bo.common.PluginsConstants"%>

<%if(CommonMethods.returnActivexDownloadEnabled()){%>
<object name="PathCtrl" style='display:none' id='PathCtrl' classid='<%=PluginsConstants.IRIS_CLSID%>' codebase='../login/pathIRISCtrl.cab#version=<%=PluginsConstants.IRIS_AX_VERSION%>'></object>
<%}%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

		<script>
		var currIrisPageRef = '<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>';
$.struts2_jquery.require("IrisApplication.js", null, jQuery.contextPath
		+ "/common/js/irisapplication/");
</script>
		<ps:if test="noInfoBar == null ">
		  <jsp:include page="/WEB-INF/pages/common/login/InfoBar.jsp" />
		</ps:if>
		<ps:form id="irisApplicationMaintForm_">
		
			<ps:if test="noInfoBar != null "> <%/*in case coming from header icon so opened as dialog*/ %>
			  <table border="0" cellpadding="1" cellspacing="0" width="595">
			</ps:if>  
			<ps:if test="noInfoBar == null">
				<table border="0" cellpadding="1" cellspacing="0" >
			</ps:if>  
				<tr>
					<td>
						<ps:label key="Id_Iris_key" />
					</td>
					<td>
						<ps:textfield  cssStyle="width:60"  id="irisId_${_pageRef}"
							mode="number"
							nbFormat="####"  readonly="true"
							/>
					</td>
					<td>
						<ps:label key="Selected_CIF_No_key" />
					</td>
					<td>
						<ps:hidden id="selectedCifName_${_pageRef}" ></ps:hidden>
						<ps:textfield cssStyle="width:60" name="criteria.cif_no" id="selectedCif_${_pageRef}"
							 mode="number"
							nbFormat="####" readonly="true" leadZeros="6"
							 />
					</td>
					<td >
						<psj:a button="true" onclick="scanIris()">
							<ps:text name="%{getText('Scan_key')}"></ps:text>
						</psj:a>
					</td>
					<td >
						<psj:a button="true" onclick="clearScan()">
							<ps:text name="%{getText('Clear_Close_key')}"></ps:text>
						</psj:a>
					</td>
					<td >
						<psj:a button="true" onclick="iris_useCIF()">
							<ps:text name="%{getText('use_key')}"></ps:text>
						</psj:a>
					</td>
					<% /*  
					<td >
						<psj:a button="true" onclick="iris_searchCIF()">
							<ps:text name="%{getText('infoBar_search_key')}"></ps:text>
						</psj:a>
					</td>
					*/%>
				</tr>
				<ps:if test="noInfoBar != null" >
				<tr >
				 <td colspan="8">
				  
					<%@include file="IrisCifDetailsGrid.jsp"%>
					
				</td>
				</tr>
				</ps:if>
			</table>
			<ps:if test="noInfoBar == null">
				<table border="0"  width="100%" cellpadding="1" cellspacing="0">
				<tr>
					<td><%@include file="IrisCifDetailsGrid.jsp"%></td>
				</tr>
				</table>
			</ps:if>
			
				
		</ps:form>
