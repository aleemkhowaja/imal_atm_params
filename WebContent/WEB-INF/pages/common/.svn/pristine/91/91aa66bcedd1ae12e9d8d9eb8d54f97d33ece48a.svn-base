<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>

<div id="welcomeScreenCustomDet">
	<table CELLPADDING="0" CELLSPACING="0" border="0" width="653">
		<tr>
			<td class="path-welcome-left-pane display-icons" align="center">
				<span
					class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
					customClass=".path-welcome-left-pane"
					title="<ps:text name='welcome_left_pane_key'/>"
					onclick="themeCustomization_customizeClass(this)" />
					<table>
						<tr>
							<td class="path-welcome-left-pane" align="center">
								<div style="width: 90px; height: 60px;" class="pathLogoImage" />
							</td>
						</tr>
						<tr>
							<td align="center">
								<span
									class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
									customClass=".path-welcome-wlc-font"
									title="<ps:text name='welcome_text_key'/>"
									onclick="themeCustomization_customizeClass(this)" />
							</td>
						</tr>
						<tr>
							<td class="path-welcome-left-pane" align="center">

								<ps:label key="welcome_details_key" name="welcome_details_key"
									cssClass="path-welcome-wlc-font"></ps:label>
							</td>
						</tr>
					</table>
			</td>
			<td class="path-welcome-right-pane display-icons">
				<span
					class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
					customClass=".path-welcome-right-pane"
					title="<ps:text name='welcome_right_pane_key'/>"
					onclick="themeCustomization_customizeClass(this)" />
					<table>
						<tr>
							<td class="path-welcome-right-pane">
								<table>
									<tr>
										<td>
											<span
												class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
												customClass=".path-welcome-msg-font"
												title="<ps:text name='welcome_msgs_key'/>"
												onclick="themeCustomization_customizeClass(this)" /> <image
													src="${pageContext.request.contextPath}/common/images/new_info_icon.png" />
										</td>
										<td class="path-welcome-msg-font">
											Information text messages
										</td>
									</tr>
								</table>
								<br />
								<table>
									<tr>
										<td>
											<image
												src="${pageContext.request.contextPath}/common/images/new_warning_icon.png" />
										</td>
										<td class="path-welcome-msg-font">
											Warning text messages
										</td>
									</tr>
								</table>
							</td>
						</tr>
						<tr>
							<td class="right path-welcome-right-pane"
								style="padding-right: 10px; padding-bottom: 5px; background-color: #E4E9ED">
								<br />
							</td>
						</tr>
					</table>
			</td>
		</tr>
	</table>
</div>
<script>
$(document).ready(function() {

	$('#welcomeScreenCustomDet span.customization-icon').hide();

	$('#welcomeScreenCustomDet td.display-icons').mouseover(function() {
		$('#welcomeScreenCustomDet span.customization-icon').show();
	}).mouseout(function() {
		$('#welcomeScreenCustomDet span.customization-icon').hide();
	});
});
</script>