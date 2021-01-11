<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>

<ps:form useHiddenProps="true" id="themeCustomizationDetailsForm_ID">
	<ps:hidden name="themeVO.THEME_ID" id="theme_id_hid_id"></ps:hidden>
	<div>
		<table>
			<tr>
				<td class="required">
					<ps:label key="theme_name_key" id="theme_name_key_id"
						for="theme_name_id" required="true" />
				</td>
				<td class="fldDataEdit center">
					<ps:textfield name="themeVO.THEME_NAME" id="theme_name_id" size="25" maxlength="60"/>
				</td>
				<td class="fldDataEdit center">
					<ps:checkbox name="themeVO.IS_ACTIVE_YN" id="theme_active_id" 
						valOpt="1:0" cssClass="ui-widget-content checkboxheight"
						key="is_active_key"/>
				</td>
				<td align="left">
					<span class="ui-icon ui-icon-folder-open collapse-details" 
						title="<ps:text name='colapse_all_pannels_key'/>" style="float: left;">
					</span>
				</td>
			</tr>
		</table>
		<table>
			<tr>
				<td>
					<ps:label key="application_key"
						id="themeApplication_lookup_lbl"
						for="themeApplication_lookup" required="true"/>
				</td>
				<td>
					<ps:checkbox id="theme_isIMAL_id" 
						valOpt="1:0" cssClass="ui-widget-content checkboxheight"
						key="global_ref_key" onchange="themeCustomization_showHideApplicationLookup()"/>
				</td>
				<td>
					<div id="theme_application_livesearch">
						<input type="hidden" id="labeling_web_apps_only_filter" value="1"/>
						<psj:livesearch id="themeApplication_lookup" relatedDescElt="theme_appDesc"
							required="true" cssStyle="text-transform:uppercase; float:left;"  size="8" 
							name="themeCustomizationCO.themeVO.APP_NAME"
							paramList="webAppsOnly:labeling_web_apps_only_filter"
							actionName="${pageContext.request.contextPath}/pathdesktop/ApplicationsLookup_constructLookup"
							resultList="APP_NAME:themeApplication_lookup"
							searchElement="APP_NAME" autoSearch="false" maxlength="4"
							dependencySrc="${pageContext.request.contextPath}/pathdesktop/ApplicationDependencyAction_applicationDepend"
							parameter="appVO.APP_NAME:lookuptxt_themeApplication_lookup,webAppsOnly:labeling_web_apps_only_filter"
							dependency="lookuptxt_themeApplication_lookup:appVO.APP_NAME,theme_appDesc:appVO.APP_DESC" />
						<ps:textfield id="theme_appDesc" size="50" name="theme_appDesc" readonly="true" />
					</div>
				</td>
			</tr>
		</table>
		<br />
	</div>
	<ps:collapsgroup id="themeCustomizationDetailsCollapGroup">
	<ps:collapspanel id="loginPageCustomization" cssClass="collapsed details-div"
		key="login_page_key">

		<div>
			<%@include file="LoginPageCustomization.jsp"%>
		</div>

	</ps:collapspanel>
	<br/>
	<ps:collapspanel id="welcomeScreenCustomization" cssClass="collapsed details-div"
		key="welcome_customization_key">

		<div>
			<%@include file="WelcomeScreenCustomization.jsp"%>
		</div>

	</ps:collapspanel>
	<br/>
	<ps:collapspanel id="desktopPageCustomization" cssClass="collapsed details-div"
		key="desktop_page_key">

		<div>
			<%@include file="DesktopPageCustomization.jsp"%>
		</div>

	</ps:collapspanel>
	<br/>
	<ps:collapspanel id="tabsGridCustomization" cssClass="collapsed details-div"
		key="tabs_grid_key">

		<div>
			<%@include file="TabsAndGridCustomization.jsp"%>
		</div>

	</ps:collapspanel>
	<br/>
	<ps:collapspanel id="generalCustomization" cssClass="collapsed details-div"
		key="general_customization_key">

		<div>
			<%@include file="GeneralCustomization.jsp"%>
		</div>

	</ps:collapspanel>
	</ps:collapsgroup>
	<div id="customizingDialogDiv" />
</ps:form>
<script type="text/javascript">
$(document).ready(function() {
	$(".collapse-details").on("click", function(){
		if($(this).hasClass("ui-icon-folder-open")) {
			$(this).removeClass("ui-icon-folder-open");
			$(this).addClass("ui-icon-folder-collapsed");
			
			$(".details-div .collapsibleContainerContent:hidden").each(function() {
				$(this).parent().find(".collapsibleContainerTitle").click();
			});
		} else {
			$(this).removeClass("ui-icon-folder-collapsed");
			$(this).addClass("ui-icon-folder-open");
			//$(".details-div .collapsibleContainerTitle").click();
			$(".details-div .collapsibleContainerContent:visible").each(function() {
				$(this).parent().find(".collapsibleContainerTitle").click();
			});
		}
	});
});
</script>