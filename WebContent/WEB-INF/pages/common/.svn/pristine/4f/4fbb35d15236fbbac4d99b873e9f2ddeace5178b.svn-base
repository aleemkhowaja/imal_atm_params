<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@taglib prefix="pt" uri="/path-toolbar-tags"%> 
<ps:set name="fileNotAllowed_var"			value="%{getEscText('filenotallowed_key')}"/>
<html>
<script type="text/javascript"	src="${pageContext.request.contextPath}/common/js/dynfilemanagement/DynFileManagement.js">
</script>
<script type="text/javascript">
var fileNotAllowed 			= "${fileNotAllowed_var}";	
</script>
<body> 	 
	<jsp:include page="/WEB-INF/pages/common/login/InfoBar.jsp" />
 	<ps:form id="dynaFileForm_${_pageRef}"   method="post"  enctype="multipart/form-data"  namespace="/path/fileMngmt"   >	
 	    <ps:hidden id="iv_crud_${_pageRef}" name="iv_crud"/>
 	    <ps:hidden id="strut_type_${_pageRef}" name="dynFilesSC.structType"/> 	    
 	     <ps:hidden id="fileTypeBatch_${_pageRef}"          name="dynFilesDetCO.selectedFileType"></ps:hidden> 	    	     
 	    <ps:hidden id="nbvCalcSessionTimeOut_${_pageRef}"  name="dynFilesDetCO.nbvCalcSessionTimeOut"></ps:hidden> 	     
 	    <!-- Enquiry File code [begin] -->  
 	    <fieldset class="ui-widget-content ui-corner-all">	    				 
			 <table width="100%">
			 <tr>
			 	<td width="10%"></td>
			 	<td width="10%"></td>
			 	<td width="10%"></td>
			 	<td width="10%"></td>
			 	<td width="10%"></td>
			 	<td width="10%"></td>
			 	<td width="10%"></td>
			 	<td width="10%"></td>
			 	<td width="10%"></td>
			 	<td width="10%"></td>
			 </tr>		 
				  <tr>
				    <td colspan="1"><ps:label key="Enquiry_File_Code_key"/></td>
				    <td colspan="1">
					    <psj:livesearch  name="dynFilesDetCO.dfDataFileVO.FILE_CODE"				                      
							                      id  ="enqFileCode_${_pageRef}"					                      
							                      actionName="${pageContext.request.contextPath}/pathdesktop/EnqFileLookup_enqFileLookupDef" 
							                      searchElement="dfDataFileVO.FILE_CODE"
							                      paramList="dynFilesSC.structType:strut_type_${_pageRef}"  
							                      parameter="dynFilesSC.fileCode:lookuptxt_enqFileCode_${_pageRef},dynFilesSC.structType:strut_type_${_pageRef}"
												  dependencySrc="${pageContext.request.contextPath}/path/fileMngmt/DynFileMaint_checkDynFilesFileCode"
												  dependency="lookuptxt_enqFileCode_${_pageRef}:dynFilesDetCO.dfDataFileVO.FILE_CODE,fileDesc_${_pageRef}:dynFilesDetCO.dfDataFileVO.FILE_DESC,fileExt_${_pageRef}:dynFilesDetCO.dfFileStructVO.FILE_EXT"	   
												  afterDepEvent="loadDynFileDetails();"  
												  
							                      >
						 </psj:livesearch>
					</td>
				    <td colspan="3"><ps:textfield id="fileDesc_${_pageRef}"
						name="dynFilesDetCO.dfDataFileVO.FILE_DESC" readonly="true" tabindex="-1" ></ps:textfield></td>
				    <td colspan="1" hidden="true"><ps:textfield id="fileExt_${_pageRef}"
						name="dynFilesDetCO.dfFileStructVO.FILE_EXT" readonly="true" tabindex="-1" ></ps:textfield></td>	
				    <td colspan="4">&nbsp;</td>
				  </tr>
			 </table>
		 </fieldset>	 
		 <!-- Enquiry File code [end] -->

		 <!-- Dynamic Section code [begin] -->		 
		 <div id="dynFileMaintDetails_${_pageRef}">	 			 	 
		 	<%@include file="DynFileMaintDetails.jsp" %>	 
		 </div>	 
		  <!-- Dynamic Section code [begin] -->
		  
		 
		 	
	 </ps:form>  
	
</body>
</html>

