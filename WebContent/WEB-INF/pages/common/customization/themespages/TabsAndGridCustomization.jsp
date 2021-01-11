<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<div id="tabsAndGridDiv">
<br/>
<div class="display-icons">

	<table id="grid"></table>
	<div id="pager"/>
</div>
<br/>
<div class="display-icons">
	<psj:tabbedpanel id="tabExample" selectedTab="1" collapsible="true" sortable="true"> 
		<psj:tab id="tab1" target="tone" key="screen_selected_tab_bkg_color_text_key" closable="false"></psj:tab>
		<psj:tab id="tab2" target="ttwo" key="screen_tab_bkg_color_text_key" closable="false"></psj:tab>
		
		 <div id="tone"><br/></div>
         <div id="ttwo"><br/></div>
	</psj:tabbedpanel>
</div>
<br/>
	<div class="display-icons ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
		<span class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
			customClass=".ui-dialog-title"
			title="<ps:text name='dialog_title_key'/>"
			onclick="themeCustomization_customizeClass(this)" /> <ps:label cssClass="path_btn_lbl_theme ui-dialog-title"
							key="dialog_title_key" />
	</div>
<br/>
	<div class="display-icons collapsibleContainerTitle ui-state-focus ui-corner-top">
	<span class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
			customClass=".collapsibleLabel"
			title="<ps:text name='collapsible_panel_title_key'/>"
			onclick="themeCustomization_customizeClass(this)" /> 
		<span class="collapsibleLabel"><ps:label cssClass="path_btn_lbl_theme collapsibleLabel"
							key="collapsible_panel_title_key" /></span><span
			class="collapsibleIcon"><span
			class="ui-icon ui-icon-circle-triangle-s">&nbsp;</span></span>
	</div>
	<br/>
	<div
		class="display-icons jMsgbox-mainWrap ui-widget-content ui-corner-bottom ui-corner-left ui-corner-right ui-corner-br"
		style="width: 300px; cursor: auto;">
		<div class="ui-widget-header ui-corner-top jMsgbox-headWrap"
			style="height: 15px;">
			<div class="jMsgbox-titleWrap"
				style="float: left; width: 336px; cursor: auto;">
				
				<span class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
			customClass=".jMsgbox-titleWrap"
			title="<ps:text name='messagebox_title_key'/>"
			onclick="themeCustomization_customizeClass(this)" /><ps:label cssClass="path_btn_lbl_theme jMsgbox-titleWrap"
							key="messagebox_title_key" /></div>
		</div>
		<div
			style="display: block; width: 300px; height: 50px; overflow: auto;">
			<div class="jMsgbox-contentWrap">
			<span class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
			customClass=".jMsgbox-contentWrap"
			title="<ps:text name='content_key'/>"
			onclick="themeCustomization_customizeClass(this)" />
			<ps:label cssClass="path_btn_lbl_theme jMsgbox-contentWrap"
							key="content_key" /></div>
		</div>
		<center style="padding: 3px;">
			<input type="button" id="_popup_path_sol_ok"
				class="ui-button-text fg-button ui-button ui-corner-all ui-widget ui-state-default ui-button-text-only"
				value="Ok">
		</center>
	</div>
	<!-- begin datepicker  -->
		<div id="datepickerId"
			class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all display-icons"
			style="display: block; padding: 3px; z-index: 2;">
			<div
				class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all">
				<a class="ui-datepicker-prev ui-corner-all"
					title="Prev"><span class="ui-icon ui-icon-circle-triangle-w">Prev</span></a><a
					class="ui-datepicker-next ui-corner-all"
					title="Next"><span class="ui-icon ui-icon-circle-triangle-e">Next</span></a>
				<div class="ui-datepicker-title">
				<span class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
			customClass=".ui-datepicker .ui-datepicker-header"
			title="<ps:text name='calendar_header_key'/>"
			onclick="themeCustomization_customizeClass(this)" />
					<span class="ui-datepicker-month">September</span>&nbsp;<span
						class="ui-datepicker-year">2018</span>
				</div>
			</div>
			<table class="ui-datepicker-calendar">
				<thead>
					<tr>
					<div><span class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
			customClass=".ui-datepicker-calendar thead"
			title="<ps:text name='calendar_thead_key'/>"
			onclick="themeCustomization_customizeClass(this)" /></div>
						<th class="ui-datepicker-week-end"><span title="Sunday">Su</span></th>
						<th><span title="Monday">Mo</span></th>
						<th><span title="Tuesday">Tu</span></th>
						<th><span title="Wednesday">We</span></th>
						<th><span title="Thursday">Th</span></th>
						<th><span title="Friday">Fr</span></th>
						<th class="ui-datepicker-week-end"><span title="Saturday">Sa</span></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td
							class=" ui-datepicker-week-end ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td>
						<td
							class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td>
						<td
							class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td>
						<td
							class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td>
						<td
							class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td>
						<td
							class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td>
						<td class=" ui-datepicker-week-end "><a
							class="ui-state-default excludeElementStyle" href="#">1</a></td>
					</tr>
					<tr>
						<td class=" ui-datepicker-week-end "><a
							class="ui-state-default excludeElementStyle" href="#">2</a></td>
						<td class=" "><a
							class="ui-state-default excludeElementStyle" href="#">3</a></td>
						<td class=" "><a
							class="ui-state-default excludeElementStyle" href="#">4</a></td>
						<td class=" "><a
							class="ui-state-default excludeElementStyle" href="#">5</a></td>
						<td class=" "><a
							class="ui-state-default excludeElementStyle" href="#">6</a></td>
						<td class=" "><a
							class="ui-state-default excludeElementStyle" href="#">7</a></td>
						<td class=" ui-datepicker-week-end "><a
							class="ui-state-default excludeElementStyle" href="#">8</a></td>
					</tr>
					<tr>
						<td class=" ui-datepicker-week-end "><a
							class="ui-state-default excludeElementStyle" href="#">9</a></td>
						<td class=" "><a
							class="ui-state-default excludeElementStyle" href="#">10</a></td>
						<td class=" ""><span class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
			customClass=".ui-datepicker-calendar .ui-state-default:not(.ui-state-active):not(.ui-state-highlight)"
			title="<ps:text name='default_day_key'/>"
			onclick="themeCustomization_customizeClass(this)" /><a
							class="ui-state-default excludeElementStyle" href="#">11</a></td>
						<td class="  ui-datepicker-current-day"><span class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
			customClass=".ui-datepicker-calendar .ui-state-active"
			title="<ps:text name='selected_day_key'/>"
			onclick="themeCustomization_customizeClass(this)" /><a
							class="ui-state-default ui-state-active excludeElementStyle" href="#">12</a></td>
						<td class="  ui-datepicker-today"><span class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
			customClass=".ui-datepicker-calendar .ui-state-highlight"
			title="<ps:text name='today_key'/>"
			onclick="themeCustomization_customizeClass(this)" /><a
							class="ui-state-default ui-state-highlight excludeElementStyle" href="#">13</a></td>
						<td class=" "><a
							class="ui-state-default excludeElementStyle" href="#">14</a></td>
						<td class=" ui-datepicker-week-end "><a
							class="ui-state-default excludeElementStyle" href="#">15</a></td>
					</tr>
					<tr>
						<td class=" ui-datepicker-week-end "><a
							class="ui-state-default excludeElementStyle" href="#">16</a></td>
						<td class=" "><a
							class="ui-state-default excludeElementStyle" href="#">17</a></td>
						<td class=" "><a
							class="ui-state-default excludeElementStyle" href="#">18</a></td>
						<td class=" "><a
							class="ui-state-default excludeElementStyle" href="#">19</a></td>
						<td class=" "><a
							class="ui-state-default excludeElementStyle" href="#">20</a></td>
						<td class=" "><a
							class="ui-state-default excludeElementStyle" href="#">21</a></td>
						<td class=" ui-datepicker-week-end "><a
							class="ui-state-default excludeElementStyle" href="#">22</a></td>
					</tr>
					<tr>
						<td class=" ui-datepicker-week-end "><a
							class="ui-state-default excludeElementStyle" href="#">23</a></td>
						<td class=" "><a
							class="ui-state-default excludeElementStyle" href="#">24</a></td>
						<td class=" "><a
							class="ui-state-default excludeElementStyle" href="#">25</a></td>
						<td class=" "><a
							class="ui-state-default excludeElementStyle" href="#">26</a></td>
						<td class=" "><a
							class="ui-state-default excludeElementStyle" href="#">27</a></td>
						<td class=" "><a
							class="ui-state-default excludeElementStyle" href="#">28</a></td>
						<td class=" ui-datepicker-week-end "><a
							class="ui-state-default excludeElementStyle" href="#">29</a></td>
					</tr>
					<tr>
						<td class=" ui-datepicker-week-end "><a
							class="ui-state-default excludeElementStyle" href="#">30</a></td>
						<td
							class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td>
						<td
							class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td>
						<td
							class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td>
						<td
							class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td>
						<td
							class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td>
						<td
							class=" ui-datepicker-week-end ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- end datepicker  -->
	<br/>
</div>
	
<script>
var hitTimes = 0;
function addCustomizationIconToGrid(val) {
	var value = val;
	if(hitTimes == 0) {
		value = val + '<span class="ui-icon ui-icon-wrench customization-icon" customClass=".ui-jqgrid tr.jqgrow td" ' +
		'title="<ps:text name="grid_column_value_bkg_key"/>" onclick="themeCustomization_customizeClass(this)" />';
		hitTimes++;
	}
	return value;
}
 
$(document).ready(function() {

	var colName1 = '<span class="ui-icon ui-icon-wrench customization-icon"' +
	'customClass=".ui-th-column" title="<ps:text name="grid_column_label_key"/>"' +
	'onclick="themeCustomization_customizeClass(this)" /><ps:text name="sec_code1_key"></ps:text>';
	
	var data = [['48803', "DSK1",  "02200220", "OPEN"], ['48769', "APPR", "77733337", "ENTERED"]];
	$("#grid").jqGrid({
	    datatype: "local",
	    height: 120,
	    colNames: [ colName1 , '<ps:text name="sec_code2_key"></ps:text>'
	    	, '<ps:text name="Profit_Rate_key"></ps:text>', '<ps:text name="Status_key"></ps:text>'],
	    colModel: [{
	        name: 'id',
	        index: 'id',
	        width: 40,
	        formatter: addCustomizationIconToGrid},
	    {
	        name: 'code',
	        index: 'code',
	        width: 40},
	    {
	        name: 'number',
	        index: 'number',
	        width: 50},
	    {
	        name: 'status',
	        index: 'status',
	        width: 50}
	    ],
	    /*caption: "Grid Example",*/	
	    pager : "#pager",
		rowNum : 5,
		rowList : [ 5, 10, 15 ],
		cmTemplate: { sortable: false }
	});
	
	
	var names = ['id', 'code', 'number', 'status'];
	var mydata = [];
	
	for (var i = 0; i < data.length; i++) {
	    mydata[i] = {};
	    for (var j = 0; j < data[i].length; j++) {
	        mydata[i][names[j]] = data[i][j];
	    }
	}
	
	for (var i = 0; i <= mydata.length; i++) {
	    $("#grid").jqGrid('addRowData', i + 1, mydata[i]);
	}
	
	var groupSecName = '<ps:text name="Security_key"></ps:text>';
	
	
	$("#grid").jqGrid('setGroupHeaders', {
		useColSpanStyle : true,
		groupHeaders : [ {
			startColumnName : 'id',
			numberOfColumns : 4,
			titleText : groupSecName
		}]});
	
	$("#load_grid").show();
	
	
	$('#load_grid').append('<span class="ui-icon ui-icon-wrench customization-icon floatRightLeft" ' +
			'customClass=".loading" title="<ps:text name="loading_key"/>"' +
			'onclick="themeCustomization_customizeClass(this)" />');
		
	// Append the customization icon
	$('.path-double-header').html('<span class="ui-icon ui-icon-wrench customization-icon" ' +
	'customClass=".path-double-header" title="<ps:text name="grid_double_header_key"/>"' +
	'onclick="themeCustomization_customizeClass(this)" /><span>' + groupSecName + '</span>');
	
	$('#pager_left').append('<span class="ui-icon ui-icon-wrench customization-icon" ' +
	'customClass=".ui-jqgrid .ui-jqgrid-pager td" title="<ps:text name="grid_footer_pager_buttons_color_key"/>"' +
	'onclick="themeCustomization_customizeClass(this)" />');
	
	$('#tab1').append('<span class="ui-icon ui-icon-wrench customization-icon" ' +
	'customClass=".ui-tabs-nav li, .ui-tabs-nav li a" title="<ps:text name="screen_tab_bkg_color_text_key"/>"' +
	'onclick="themeCustomization_customizeClass(this)" />');
	
	$('#tab2').append('<span class="ui-icon ui-icon-wrench customization-icon" ' +
	'customClass=".ui-tabs-nav li.ui-tabs-selected, .ui-tabs-nav li.ui-tabs-selected a" title="<ps:text name="screen_selected_tab_bkg_color_text_key"/>"' +
	'onclick="themeCustomization_customizeClass(this)" />');
	
	$('#tabsAndGridDiv span.customization-icon').hide();

	$("#tabsAndGridDiv div.display-icons").mouseover(function() {
		$('#tabsAndGridDiv span.customization-icon').show();
	}).mouseout(function() {
		$('#tabsAndGridDiv span.customization-icon').hide();
	});
});
</script>
