<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>

<br />
<div id="desktop_customization_div">
	<div class="display-icons">
		<div id="ui_bar_div" class="ui-bar-b" style="height: 60">
			<table width="100%" height="100%" cellpadding="0" cellspacing="0"
				border="0">
				<tr>
					<td width="14%" class="header-top-left">
						<span class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
							customClass=".pathLogoImage"
							title="<ps:text name='path_login_image_key'/>"
							onclick="themeCustomization_customizeClass(this)" />
							<div style="width: 90px; height: 60px;" class="pathLogoImage" />
					</td>
					<td width="5%" class="header-top-center">
						<span class="ui-icon ui-icon-wrench customization-icon"
							customClass=".header-top-left,.header-top-center,.header-top-right"
							title="<ps:text name='desktop_header_style_key'/>"
							onclick="themeCustomization_customizeClass(this)" />
					</td>
					<td class="header-top-right">
						<table width="100%" height="100%" cellpadding="0" cellspacing="0"
							border="0">
							<tr>

								<td nowrap="nowrap" width="20%">
									<jsp:include page="LoginInfoUsrCustomization.jsp" />
								</td>
								<td width="5%"></td>
								<td width="2" nowrap="nowrap"
									style="width: 2px; background-color: orange;"></td>
								<td width="5">
									&nbsp;
								</td>
								<td>
									<table width="100%" height="100%" cellpadding="0"
										cellspacing="0" border="0">
										<tr>
											<td class="right" nowrap="nowrap">
												<table cellpadding="0" cellspacing="0" border="0">
													<tr>
														<td nowrap="nowrap" class="headerStyle">
															<ps:label cssClass="headerStyleLabel"
																key="customer_id_key" />
															&nbsp;:&nbsp;
														</td>
														<td class="headerStyle headerStyleValue" nowrap="nowrap">
															<span class="red_person" id="hdr_scanned_cif_no">---</span>
														</td>
													</tr>
													<tr>
														<td class="headerStyle " nowrap="nowrap">
															<ps:label cssClass="headerStyleLabel"
																key="customer_name_key" />
															&nbsp;:&nbsp;
														</td>
														<td class="headerStyle headerStyleValue" nowrap="nowrap">
															<span id="hdr_scanned_cif_name">---</span>
														</td>
													</tr>
												</table>
											</td>
											<td width="50%">
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</div>
		<table width="30%">
			<tr>
				<td>
					<jsp:include page="MenuCustomization.jsp" />
				</td>
				<td>
				<span class=" display-icons ui-icon ui-icon-wrench customization-icon floatRightLeft"
				customClass=".ui-layout-resizer"
				title="<ps:text name='layout_resizer_key'/>"
				onclick="themeCustomization_customizeClass(this)" /> 
				<div
							class="ui-state-default ui-layout-resizer ui-layout-resizer-west ui-layout-resizer-open ui-layout-resizer-west-open"
							id="" title="Resize" aria-disabled="false"
							style="position: relative; padding: 0px; margin: 0px; font-size: 1px; text-align: left; overflow: hidden; z-index: 2; cursor: w-resize; width: 4px;height:240px;">
							<div id=""
								class="ui-layout-toggler ui-layout-toggler-west ui-layout-toggler-open ui-layout-toggler-west-open"
								title="Close"
								style="position: relative; display: block; padding: 0px; margin: 0px; overflow: hidden; text-align: center; font-size: 1px; cursor: pointer; z-index: 1; visibility: visible; height: 50px; width: 6px; top: 120px; left: 0px;">
								<span
									class="content-closed ui-icon ui-icon-circle-arrow-e ui-corner-all"
									style="display: none;"></span><span
									class="content content-closed ui-layout-west-header-closed"
									style="display: none; right: 17px; left: 10px; width: 77px; margin-top: -26px;">Menu
									Options</span>
							</div>
						</div>
				</td>
			</tr>
		</table>
		<table width="100%">
			<tr>
				<td>
					<jsp:include page="AppMainFooterCustomization.jsp" />
				</td>
			</tr>
		</table>
	</div>
</div>
<br />

<script>
$(document).ready(function() {

	$('#desktop_customization_div span.customization-icon').hide();

	$("#desktop_customization_div div.display-icons").mouseover(function() {
		$('#desktop_customization_div span.customization-icon').show();
	}).mouseout(function() {
		$('#desktop_customization_div span.customization-icon').hide();
	});
});
</script>
