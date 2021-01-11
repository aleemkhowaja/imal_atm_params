<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<ps:form id="custSaveAsForm_${_pageRef}">
	<ps:hidden name="custCO.cutomizationPROG_REF" id="cust_saveas_pageref_${_pageRef}"/>
	<ps:hidden name="custCO.saveAsParentRef" id="cust_saveas_parentRef_${_pageRef}"/>
	
	<table border="0" cellpadding="1" cellspacing="0" >
			<tr>
				<td colspan="2"><ps:label key="save_as_of_screen_key"/>&nbsp;:&nbsp;(${_pageRef}) <ps:property value="custCO.screenName"/></td>
			</tr>
			<tr>
				<td><ps:label key="screen_reference_key" for="cust_saveas_screen_ref_${_pageRef}"/></td>
				<td><ps:textfield maxlength="15" size="20" id="cust_saveas_screen_ref_${_pageRef}" name="custCO.screenRef" required="true" /></td>
			</tr>
			
			<tr>
				<td><ps:label id="lbl_cust_saveas_categid_${_pageRef}"
						for="lookuptxt_cust_saveas_categid_${_pageRef}" key="category_key"></ps:label>
				</td>
				<td>
					<table border="0" cellpadding="1" cellspacing="0">
						<tr>
							<td><psj:livesearch size="17"
									id="cust_saveas_categid_${_pageRef}"
									relatedDescElt="cust_saveas_categdesc_${_pageRef}"
									name="custCO.catergoryId" mode="number"
									actionName="${pageContext.request.contextPath}/path/optCategory/categoryLookupAction_constructCategLookup"
									resultList="CATEG_ID:lookuptxt_cust_saveas_categid_${_pageRef},CATEG_DESC_ENG:cust_saveas_categdesc_${_pageRef}"
									searchElement="categId" autoSearch="false" maxlength="10"
									dependencySrc="${pageContext.request.contextPath}/path/optCategory/categoryDependencyAction_dependencyByCategory"
									parameter="categorySC.categId:lookuptxt_cust_saveas_categid_${_pageRef}"
									dependency="lookuptxt_cust_saveas_categid_${_pageRef}:categorySC.categId,cust_saveas_categdesc_${_pageRef}:categorySC.categDesc" />
							</td>
							<td><ps:textfield id="cust_saveas_categdesc_${_pageRef}" size="24"
									readonly="true" /></td>
						</tr>
					</table>
				</td>
			</tr>
		
			<tr>
				<td><ps:label key="screen_name_key" for="cust_saveas_screen_name_${_pageRef}"/></td>
				<td><ps:textfield maxlength="100" size="50" id="cust_saveas_screen_name_${_pageRef}" name="custCO.screenName" required="true" /></td>
			</tr>
			<tr>
				<td nowrap="nowrap">
					<ps:label key="save_as_duplicate_parent_key"
						id="lbl_cust_saveas_dupParent_${_pageRef}"
						for="cust_saveas_dupParent_${_pageRef}"></ps:label>
				</td>
				<td nowrap="nowrap">
				<ps:checkbox name="custCO.dupParentFlag"
						id="cust_saveas_dupParent_${_pageRef}" valOpt="1:0" onclick="saveascust_DuplicateParent(this)"/>
				  
				</td>
			</tr>
			<tr>
				<td nowrap="nowrap">
					<ps:label key="lbl_saveas_choosparnt_key"
						id="lbl_saveas_chooseParent_${_pageRef}"
						for="saveas_chooseParent_${_pageRef}"></ps:label>
				</td>
				<td nowrap="nowrap">
				<ps:checkbox name="criteria.saveAsParent"
						id="saveas_chooseParent_${_pageRef}" valOpt="1:0" onclick="saveas_ChooseParent(this)"/>
				  
				</td>
			</tr>
			<ps:if test="showSaveAsSeries != null">
			<tr>
				<td nowrap="nowrap">
					<ps:label key="save_as_series_key" for="saveas_screen_series_${_pageRef}"/>
				</td>
				<td>
					<ps:checkbox id="saveas_screen_series_${_pageRef}"
						onclick="saveas_showHideSeriesView(this)"
						name="custCO.saveAsSeries" valOpt="1:0" /> <psj:a button="true"
						tabindex="50" href="#" id="saveas_showSeriesBtnId_${_pageRef}"
						onclick="saveas_showSeries()" cssStyle="display:none;">
						<ps:label key="showSeries_key" />
					</psj:a>
				</td>
			</tr>
			</ps:if>
			<tr>
			<td colspan="2">
			  <table border="0" cellpadding="0" cellspacing="0">
				  <tr>
					<td nowrap="nowrap"><ps:label key="screen_parent_name_key" for="cust_saveas_screen_parent_name_${_pageRef}"/></td>
					<td><ps:textfield maxlength="100" size="50" id="cust_saveas_screen_parent_name_${_pageRef}" cssStyle="display:none;" name="custCO.screenParentName"/></td>
					<td>
						<psj:a button="true" tabindex="50" href="#" id="saveas_chooseParentRefBtnId_${_pageRef}"
							onclick="fav_openMenuTree()" cssStyle="display:none;">
							<ps:label key="open_key"/>
						</psj:a>
					</td>
				  </tr>
			 </table>
			 </td>
			</tr>
			<tr>
				<td class="right" nowrap="nowrap" colspan="2" >
					<psj:submit id="cust_save_as_save_${_pageRef}" button="true" freezeOnSubmit="true">
    					<ps:label key="Save_key" for="cust_save_as_save_${_pageRef}"/>
    				</psj:submit>
				</td>
			</tr>						
	</table>
</ps:form>
<ps:set name="save_as_title_key_var" value="%{getEscText('save_as_title_key')}"/>
<ps:set name="save_as_series_key_var" value="%{getEscText('save_as_series_key')}"/>
<script type="text/javascript">
var save_as_title_key = '<ps:property value="save_as_title_key_var" escapeHtml="false" escapeJavaScript="true"/>';
var save_as_series_key = '<ps:property value="save_as_series_key_var" escapeHtml="false" escapeJavaScript="true"/>';
var save_as_app_name = '<ps:property value="custCO.screenDispVO.APP_NAME" escapeHtml="false" escapeJavaScript="true"/>';
$("#custSaveAsForm_"+_pageRef).processAfterValid("cust_process_saveAs",{});
$.struts2_jquery.require("DashboardPortal.js", null, jQuery.contextPath
		+ "/common/dashboard/js/");
</script>
