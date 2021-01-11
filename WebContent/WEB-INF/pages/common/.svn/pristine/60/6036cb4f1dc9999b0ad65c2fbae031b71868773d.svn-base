<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@taglib prefix="pt" uri="/path-toolbar-tags"%>
<%-- <ps:hidden id="dynFileExt_${_pageRef}" name="dynFilesDetCO.dfFileStructVO.FILE_EXT"/>  --%>
<ps:hidden id="dynFileLocation_${_pageRef}" name="dynFilesDetCO.dfDataFileVO.FILE_LOCATION"/> 
<fieldset class="ui-widget-content ui-corner-all">
    <ps:hidden name="dynFilesDetCO.dfFileStructVO.FILE_TYPE" id="fileType_${_pageRef}"/>
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
			<td colspan="1">
				<ps:label key="File_Structure_key" />
			</td>
			<td  colspan="1">
				<ps:textfield id="fileStructCode_${_pageRef}"
					name="dynFilesDetCO.dfFileStructVO.STRUCT_CODE"  readonly="true" tabindex="-1" ></ps:textfield>
			</td>
			<td colspan="3">
				<ps:textfield id="fileStructDesc_${_pageRef}"
					name="dynFilesDetCO.dfFileStructVO.STRUCT_DESC"  readonly="true" tabindex="-1"></ps:textfield>
			</td>
			<td colspan="5">
			</td>
		</tr>	
		<tr>
			<td colspan="1">
				<ps:label key="File_Name_key" />
			</td>
			<td colspan="4">
			<ps:if test="dynFilesDetCO==null||dynFilesDetCO.dfDataFileVO.ALLOW_FILE_NAME_CHG==0">
				<ps:textfield id="fileName_${_pageRef}"	name="dynFilesDetCO.dfDataFileVO.FILE_NAME" readonly="true" tabindex="-1" ></ps:textfield>
			</ps:if>
			<ps:else>
				<ps:textfield id="fileName_${_pageRef}"	name="dynFilesDetCO.dfDataFileVO.FILE_NAME"   ></ps:textfield>
			</ps:else>
			</td>
		</tr>
		<ps:if test="dynFilesSC.structType==2">
			<tr>
				<td colspan="1">
					<ps:label key="File_Location_key" />
				</td>
				<td colspan="4">	
				    <ps:if test="dynFilesDetCO==null||dynFilesDetCO.dfDataFileVO.ALLOW_FILE_NAME_CHG==0">			
						<ps:file id="uploadScript_${_pageRef}" name="upload" onchange="validateFileName(this);" onclick="doHideGridAndButton(this);"></ps:file>
					</ps:if>
					<ps:else>
						<ps:file id="uploadScript_${_pageRef}" name="upload"  onchange="updateFileName(this);" onclick="doHideGridAndButton(this);"></ps:file>
					</ps:else>		
				</td>
				
			</tr>
		</ps:if>
	 </table> 
 </fieldset> 
 		
	<!-- File option section [begin] -->
 <ps:if test="!dynFilesDetCO.DfMiscSQLListCO.isEmpty()">	
	<fieldset class="ui-widget-content ui-corner-all">
    <table width="100%">
    	<tr>
			<td colspan="4">  </td>
		</tr>
		<tr>
		  <td width="15%">
			<ps:label key="File_Options_key" />
		  </td>
		  <td width="45%">		 			
		    <div id="fileOptionSection_${_pageRef}" class="collapsibleContainer" title="" >
				<table width="100%" border="0">	
					<ps:iterator value="dynFilesDetCO.dfMiscSQLListCO" status="row">
						<tr >
							<td class="ui-state-default "  >
								<ps:checkbox  name="fileOptions[%{#row.index}]"	></ps:checkbox>
							</td>
							<td class="ui-state-default" style="font-weight: normal;" >						 
								<ps:hidden name="dynFilesDetCO.dfMiscSQLListCO[%{#row.index}].dfSrcSQLStructVO.SOURCE_SQL_NO"/>
								<ps:hidden name="dynFilesDetCO.dfMiscSQLListCO[%{#row.index}].dfSrcSQLStructVO.SOURCE_SQL_DESC"/>
								<ps:hidden name="dynFilesDetCO.dfMiscSQLListCO[%{#row.index}].dfSrcSQLStructVO.SOURCE_SQL_TEXT"/>
								<ps:property value="dfSrcSQLStructVO.SOURCE_SQL_DESC"/>							 
							</td>
							<td class="ui-state-default ui-th-column ui-th-ltr">
								<ps:hidden name="dynFilesDetCO.dfMiscSQLListCO[%{#row.index}].dfFileMiscSQLVO.BF_AF_FLAG"/>
								<ps:if test="dfFileMiscSQLVO.BF_AF_FLAG==1">
						 	<ps:text name="Before_Processing_key" />			
						</ps:if>
								<ps:else>
		    				<ps:text name="After_Processing_key" />	
						</ps:else>
							</td>
						</tr>
					</ps:iterator>
				</table>
			 </div>			
			</td>
			<td width="40"></td>			 
		</tr>
	  </table>
	 </fieldset>
  </ps:if>

	<!-- File option section [end] -->
	
	<!-- File param section [begin] -->
  <ps:if test="!dynFilesDetCO.dfFileParmVO.isEmpty()">
	<fieldset class="ui-widget-content ui-corner-all">
	  <table width="100%">
		<tr>
			<td colspan="4">  </td>
		</tr>
		<tr>
			<td width="15%">
				<ps:text name="Export_Input_Parameters_key"></ps:text>
			</td>
			<td width="45%">
			<div id="fileParamSection_${_pageRef}" class="collapsibleContainer" title="">
				<table width="100%" border="0">
					<tr>
						<th width="10%" class="ui-state-default ui-th-column ui-th-ltr">
							<ps:text name="Parameter_No_key"/>
						</th>
						<th class="ui-state-default ui-th-column ui-th-ltr">
							<ps:text name="Parameter_Description_key"/>
						</th>
						<th class="ui-state-default ui-th-column ui-th-ltr">
							<ps:text name="Parameter_Value_key"/>
						</th>
					</tr>
					<ps:iterator value="dynFilesDetCO.dfFileParmVO" status="status">
						<tr>
							<td class=" ">
								<ps:textfield id=""
									name="dynFilesDetCO.dfFileParmVO[%{#status.index}].PARM_NO"  readonly="true" tabindex="-1" ></ps:textfield>
							</td>
							<td class=" ">
								<ps:textfield id=""
									name="dynFilesDetCO.dfFileParmVO[%{#status.index}].PARM_DSC"  readonly="true" tabindex="-1"	></ps:textfield>

							</td>
							<td class="">
						 					 	
								<ps:if test="dynFilesDetCO.dfFileParmVO[#status.index].PARM_TYPE ==1">	<!-- DATE TYPE -->							 
									<psj:datepicker  id="defaultValue_${_pageRef}_%{#status.index}"  	name="dynFilesDetCO.dfFileParmVO[%{#status.index}].DEFAULT_VALUE"   	buttonImageOnly="true"  required="%{dynFilesDetCO.dfFileParmVO[#status.index].PARM_STATUS !=2}"  readonly="%{dynFilesDetCO.dfFileParmVO[#status.index].PARM_STATUS ==2}" />
								</ps:if>
								<ps:elseif  test="dynFilesDetCO.dfFileParmVO[#status.index].PARM_TYPE==2"><!-- DATE_TIME_TYPE -->	
									<psj:datepicker id="defaultValue_${_pageRef}_%{#status.index}"   	name="dynFilesDetCO.dfFileParmVO[%{#status.index}].DEFAULT_VALUE" timepicker="true"	buttonImageOnly="true" required="%{dynFilesDetCO.dfFileParmVO[#status.index].PARM_STATUS !=2}" readonly="%{dynFilesDetCO.dfFileParmVO[#status.index].PARM_STATUS ==2}"  />
								</ps:elseif>
								<ps:elseif  test="dynFilesDetCO.dfFileParmVO[#status.index].PARM_TYPE==3"><!-- DECIMAL_TYPE -->	
									<ps:textfield id="defaultValue_${_pageRef}_%{#status.index}"  	name="dynFilesDetCO.dfFileParmVO[%{#status.index}].DEFAULT_VALUE" mode="number" nbFormat="#,###.00"  required="%{dynFilesDetCO.dfFileParmVO[#status.index].PARM_STATUS !=2}" readonly="%{dynFilesDetCO.dfFileParmVO[#status.index].PARM_STATUS ==2}"  ></ps:textfield>
								</ps:elseif>
								<ps:elseif  test="dynFilesDetCO.dfFileParmVO[#status.index].PARM_TYPE==4"><!-- NUMBER_TYPE -->	
									<ps:textfield id="defaultValue_${_pageRef}_%{#status.index}"  	name="dynFilesDetCO.dfFileParmVO[%{#status.index}].DEFAULT_VALUE" mode="number"   maxlength="20"  required="%{dynFilesDetCO.dfFileParmVO[#status.index].PARM_STATUS !=2}" readonly="%{dynFilesDetCO.dfFileParmVO[#status.index].PARM_STATUS ==2}" ></ps:textfield>
								</ps:elseif>
								<ps:elseif  test="dynFilesDetCO.dfFileParmVO[#status.index].PARM_TYPE==5"><!-- STRING_TYPE -->	
									<ps:textfield id="defaultValue_${_pageRef}_%{#status.index}"  	name="dynFilesDetCO.dfFileParmVO[%{#status.index}].DEFAULT_VALUE"  required="%{dynFilesDetCO.dfFileParmVO[#status.index].PARM_STATUS !=2}" readonly="%{dynFilesDetCO.dfFileParmVO[#status.index].PARM_STATUS ==2}" ></ps:textfield>
								</ps:elseif>
								<ps:elseif  test="dynFilesDetCO.dfFileParmVO[#status.index].PARM_TYPE==6"><!-- TIME_TYPE  -->	
										<psj:datepicker id="defaultValue_${_pageRef}_%{#status.index}"  	name="dynFilesDetCO.dfFileParmVO[%{#status.index}].DEFAULT_VALUE" timepickerOnly="true"	buttonImageOnly="true"  required="%{dynFilesDetCO.dfFileParmVO[#status.index].PARM_STATUS !=2}"  readonly="%{dynFilesDetCO.dfFileParmVO[#status.index].PARM_STATUS ==2}" />
								</ps:elseif>
							</td>
						</tr>
					</ps:iterator>						
				</table>
		 	</div>
		 </td>
		 <td width="40%"></td>
		</tr>	 
		</table>
		</fieldset>		 				
	 </ps:if>	 
  <!-- File param section [end] -->
  
  <!-- Tag grid section [begin] -->
  <ps:if test="dynFilesDetCO.dfFileTagParametersCO!=null&&!dynFilesDetCO.dfFileTagParametersCO.isEmpty()">  
		<fieldset class="ui-widget-content ui-corner-all">			
			  	<table width="100%">
					<tr>
						<td width="15%">
							<ps:label key="Report_Tags_Criteria_key" />
						</td>					 
						<td width="45%">							 
							  <%@include file="DynFileTagGrid.jsp" %>							  
						</td>
						<td width="40%">
						</td>
					</tr>
				</table>
			
		</fieldset>
 </ps:if>
 <!-- Tag grid section [end] -->
  
 
  <!-- Import grid section [begin] -->    
	<ps:if test="dynFilesSC.structType==2">	  	 
		<div id="importGridSection_${_pageRef}" style="padding: 5px" hidden="true" >
			<ps:include value="DynFileImportGrid.jsp"></ps:include>
		</div>			 		
	</ps:if>	 
   <!-- Import grid section [end] -->
   
   <!-- Toolbar  [begin] -->   	 
	 <pt:toolBar  id="dynFileToolbar_${_pageRef}"    >
	 	<ps:if test="dynFilesSC.structType==2"> 
	  		 <psj:submit button="true" onclick="uploadFile(0);" type="button" buttonIcon="ui-icon-folder-open"  >
	                    <ps:label key="View_key"/>
	          </psj:submit>
	          <psj:submit id="saveScriptBtn_${_pageRef}" button="true"   onclick="saveScript();" cssStyle="display:none" type="button" buttonIcon="ui-icon-script"  >
	                    <ps:label key="Save_Script_key"/>
	          </psj:submit>
	          <ps:if test="dynFilesDetCO.dfDataFileVO.RUN_SCRIPT==0"> 
		          <psj:submit id="runScriptBtn_${_pageRef}" button="true" onclick="runScript();" cssStyle="display:none" type="button" buttonIcon="ui-icon ui-icon-circle-triangle-e" >
		                    <ps:label key="Run_Script_key"/>
		          </psj:submit>
	          </ps:if>	         
		      <psj:submit id="saveExecLogBtn_${_pageRef}" button="true" onclick="saveLog();"  cssStyle="display:none" type="button" buttonIcon="ui-icon-disk"  >
		                   <ps:label key="Save_Log_key"/>
		      </psj:submit>
	          
	          
	    </ps:if>
	    <ps:if test="dynFilesSC.structType==1">
	    	<psj:submit button="true" onclick="generateFileExport()" type="button" buttonIcon="ui-icon-folder-open"  >
	                      <ps:label key="Generate_key"/>
	        </psj:submit>
	    </ps:if>    
	  </pt:toolBar>	    
  <!-- Toolbar  [end] -->     


<script>	
var enableProgressBar = '<ps:property value="%{#request.enableProgressBar}"  escapeHtml="false" escapeJavaScript="true"/>';

$(document).ready(function() {
	$("#fileParamSection_"+_pageRef+".collapsibleContainer").collapsiblePanel();	 
	$("#fileOptionSection_"+_pageRef+".collapsibleContainer").collapsiblePanel();
	if($("#fileName_"+_pageRef).attr("readonly"))
		$("#uploadScript_${_pageRef}").focus();
	else
		$("#fileName_"+_pageRef).focus();

});
var dynFileMaint_sessionTimoutValue = <%= session.getMaxInactiveInterval() %>;
</script>

