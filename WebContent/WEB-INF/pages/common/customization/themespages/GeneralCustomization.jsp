<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>

<div id="general_customization_div" >
	<div class="display-icons" >
		<table width="400px" style="margin-left: 40px; margin-top: 20px;" cellpadding="20">
		    <tr height="25px"></tr>
			<tr>
				<td>
					<span class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
						customClass=".ui-button, .fg-button, button:not(.excludeCommonStyle)"
						title="<ps:text name='normal_button_color_key'/>"
						onclick="themeCustomization_customizeClass(this)"/> <psj:a
							button="true" href="#" >
							<ps:text name='normal_button_color_key' />
						</psj:a>
				</td>
				<td valign="center" class="path-theme-cust-input">
				
				<%/*TP# 833986 Customization for tooltipser content color and font*/ %>
				<script type="text/javascript">
				$.struts2_jquery.requireCss("tooltipster.bundle.css",jQuery.contextPath +'/common/style/tooltipster/'); 
				</script>
				<div style="width:20px; height:20px; left:10px;top: -40px; position:relative;" >
				<span class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
					customClass=".tooltipster-box .tooltipster-content"
					title="<ps:text name='tooltipster_key'/>"
					onclick="themeCustomization_customizeClass(this)"/>
				</div>	
				<div class="tooltipster-base tooltipster-sidetip  tooltipster-top" 
					id="tooltipster-225717" 
					style="left: 11px; top: -27px; z-index: 9999999; position:relative;">
					
					<div class="tooltipster-box">
					
						<div class="tooltipster-content">
							<span>Missing Elements</span>
						</div>
					</div>
					<div class="tooltipster-arrow" style="left: 55px; margin-left: -12px;">
						<div class="tooltipster-arrow-uncropped">
							<div class="tooltipster-arrow-border"></div>
							<div class="tooltipster-arrow-background"></div>
						</div>
					</div>
				</div>
                <%/*end*/ %>
					<span class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
						style="top: -33px; left:13px; position: relative;"
						customClass=".path-theme-cust-input"
						title="<ps:text name='input_text_color_key'/>"
						onclick="themeCustomization_customizeClass(this)"/>
						<div style="top: -19px; position: relative;">
						 <ps:textfield 
							id="gen_theme_cut_input_id" size="20" value="%{getEscText('input_text_color_key')}" />
				</div>
				</td>
				<td valign="center" style="width:100%;" >
					<span class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
						customClass=".selectCompSize"
						title="<ps:text name='combo_text_color_key'/>"
						onclick="themeCustomization_customizeClass(this)"/>
					<select class="selectCompSize ui-state-focus ui-corner-all">
						<option value="A"><ps:label key="options_key"/></option>
						<option value="B"><ps:label key="Select_Option_key"/></option>
					</select>
				</td>
			</tr>
			<tr>
				<td valign="center" class="required">
					<span class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
						customClass=".required"
						title="<ps:text name='required_labels_color_key'/>"
						onclick="themeCustomization_customizeClass(this)" /> <ps:label
						required="true" key="required_labels_color_key" />
				</td>
				<td valign="center"  class="fldLabelView">
					<span class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
						customClass="label:not(.required):not(.headerStyleLabel):not(.user):not(.path-welcome-wlc-font):not(.path_btn_lbl_theme)"
						title="<ps:text name='labels_field_style_key'/>"
						onclick="themeCustomization_customizeClass(this)"/> <ps:label
							key="labels_field_style_key" />
				</td>
			</tr>
			<tr>
				<td valign="center" colspan="3" align="center">
					<ps:label key="elements_background_color" for="tCGeneral_background_div" cssClass="floatRightLeft"/>
					<div id="tCGeneral_background_div" class="ui-state-default" style="height: 20px; width:50px;">
						<span class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
							customClass=".ui-state-default:not(.excludeElementStyle):not(.ui-state-active):not(.ui-jqgrid-pager):not(.path-double-header):not(.ui-th-column):not(li):not(.ui-layout-resizer):not(.ui-toolbar):not(.menu-title), .ui-state-focus:not(.ui-widget-header)"
							title="<ps:text name='background_header_gradient_key'/>"
							onclick="themeCustomization_customizeClass(this)"/>
					</div>
				</td>
			</tr>
			<tr>
				<td valign="center" colspan="3" align="center">
					<ps:label key="screen_background_color_key" for="tCGScreen_background_div" cssClass="floatRightLeft"/>
					<div id="tCGScreen_background_div" class="ui-widget-content" style="height: 20px; width:50px;">
						<span class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
							customClass=".ui-widget-content:not(.ui-jqgrid):not(.jqgrow)"
							title="<ps:text name='screen_background_color_key'/>"
							onclick="themeCustomization_customizeClass(this)"/>
					</div>
				</td>
			</tr>
			<tr>
				<td valign="center" colspan="3" align="center">
					<ps:label key="widget_header_color_key" for="tCGWidget_header_div" cssClass="floatRightLeft"/>
					<div id="tCGWidget_header_div" class="ui-widget-header" style="height: 20px; width:50px;">
						<span class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
							customClass=".ui-widget-header:not(.accordionheader),.ui-toolbar"
							title="<ps:text name='widget_header_color_key'/>"
							onclick="themeCustomization_customizeClass(this)"/>
					</div>
				</td>
			</tr>
		</table>
	</div>
	<br />
</div>

<script>
$(document).ready(function() {

	$('#general_customization_div span.customization-icon').hide();

	$("#general_customization_div div.display-icons").mouseover(function() {
		$('#general_customization_div span.customization-icon').show();
	}).mouseout(function() {
		$('#general_customization_div span.customization-icon').hide();
	});
});
</script>
