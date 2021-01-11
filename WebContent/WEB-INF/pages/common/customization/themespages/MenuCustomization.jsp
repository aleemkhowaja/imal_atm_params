<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<div class="ui-state-default menu-title" style="height: 18px;">
	<div>
		<span>Menu Options</span><span class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
		customClass=".menu-title"
		title="<ps:text name='desktop_menu_options_header_key'/>"
		onclick="themeCustomization_customizeClass(this)">
	</div>
</div>
<div class="accordionmenu ui-accordion" id="appMenu">

	<div>
	   <h3 class="accordionheader ui-widget-header">
	
		<a id="GLBVIEW001"  href="#">
	      <span class="accordprefix" menuvar="GLBVIEW001"><span class="ui-icon ui-icon-newwin"></span></span>      
	       <span>360 Degrees view</span>
	      <span class="accordsuffix"></span> 
		</a>
	
	  </h3> 
	
	</div>
	<div>
	   <h3 id="selectedH3" class="accordionheader ui-widget-header ">
	
		<a id="selecteda" href="#">
	      <span class="accordprefix" menuvar="GLBVIEW001"><span class="ui-icon ui-icon-newwin"></span></span>  
	       <span>360 Degrees view Selected</span>
	       <span class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
			customClass=".path-selected-menu a"
			title="<ps:text name='selected_menu_key'/>"
			onclick="themeCustomization_customizeClass(this)" /> 
	      <span class="accordsuffix"></span> 
		</a>
	
	  </h3> 
	
	</div>
	<div>
		<h3
			class="h3__CATEG_6 accordionheader  ui-widget-header rootheaderappMenu openedrootheader"
			headerindex="0h">
			<span class="accordprefix"><span
				class="ui-icon ui-icon-triangle-1-s"></span> </span>Parameters<span class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
			customClass=".accordionheader:not(.path-selected-menu), .accordionmenu h3:not(.path-selected-menu) a, .accordionmenu h3:not(.path-selected-menu) td"
			title="<ps:text name='desktop_menu_item_bkg_text_key'/>"
			onclick="themeCustomization_customizeClass(this)" />
			<span class="accordsuffix"></span>
		</h3>
			<ul class="rootcontentappMenu" style="display: block;"
				contentindex="0c">


				<div>
					<li>
						<a class="a_J00 subLevelHeader_J00" headerindex="0h"><span
							class="accordprefix"><span
								class="ui-icon ui-icon-triangle-1-se"></span> </span>Parameters<span
							class="accordsuffix"></span><span class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
							customClass=".accordionmenu ul li a, .accordionmenu ul li a table"
							title="<ps:text name='desktop_submenu_item_bkg_text_key'/>"
							onclick="themeCustomization_customizeClass(this)" /> </a>
							
							<ul class="subLevelContentHeader_J00" style="display: block;"
								contentindex="0c">


								<div>
									<li>
										<a class="a_P00101 subLevelHeader_P00101" headerindex="0h"><span
											class="accordprefix"><span
												class="ui-icon ui-icon-triangle-1-se"></span> </span>Security Type<span
											class="accordsuffix"></span> </a>
										<ul class="subLevelContentHeader_P00101"
											style="display: block;" contentindex="0c">


											<div>
												<li>

													<a id="P00101MT" href="#"> <span class="accordprefix"
														menuvar="P00101MT"><span
															class="ui-icon ui-icon-newwin"></span> </span> <span>Maintenance</span>
														<span class="accordsuffix"></span> </a>

												</li>

											</div>



											<div>
												<li>

													<a id="P00101P" href="#"> <span class="accordprefix"
														menuvar="P00101P"><span
															class="ui-icon ui-icon-newwin"></span> </span> <span>Authorize</span>
														<span class="accordsuffix"></span> </a>

												</li>

											</div>



											<div>
												<li>

													<a id="P00101A" href="#"> <span class="accordprefix"
														menuvar="P00101A"><span
															class="ui-icon ui-icon-newwin"></span> </span> <span>Update
															After Authorize</span> <span class="accordsuffix"></span> </a>

												</li>

											</div>



											<div>
												<li>

													<a id="P00101L" href="#"> <span class="accordprefix"
														menuvar="P00101L"><span
															class="ui-icon ui-icon-newwin"></span> </span> <span>List</span>
														<span class="accordsuffix"></span> </a>

												</li>

											</div>




										</ul>

									</li>

								</div>



								<div>
									<li>
										<a class="a_J003 subLevelHeader_P00101" headerindex="1h"><span
											class="accordprefix"><span
												class="ui-icon ui-icon-triangle-1-e"></span> </span>Portfolio
											Information File<span class="accordsuffix"></span> </a>
										<ul class="subLevelContentHeader_P00101"
											style="display: none;" contentindex="1c">
											<li>
												<a class="subLevelHeader_P00101hiddenajaxlink"
													<span class="accordprefix" menuvar="J003"> <span
												class="ui-icon ui-icon-newwin"></span>
						</span> Portfolio Information File
						<span class="accordsuffix"></span>
						</a>
					</li>
			</ul>

			</li>
	</div>
	</ul>
	</li>
</div>
</ul>
</div>
<div>
	<h3
		class="h3__CATEG_2 accordionheader ui-widget-header rootheaderappMenu"
		headerindex="1h">
		<span class="accordprefix"><span
			class="ui-icon ui-icon-triangle-1-e"></span> </span>Transactions
		<span class="accordsuffix"></span>
	</h3>
	<ul class="rootcontentappMenu" style="display: none;" contentindex="1c">
		<li>
			<a class="rootheaderappMenuhiddenajaxlink"
				<span class="accordprefix" menuvar="_CATEG_2"><span
						class="ui-icon ui-icon-newwin"></span></span>
				Transactions <span class="accordsuffix"></span> </a>
		</li>
	</ul>

</div>
</div>
<script>
var theTheme = (typeof themeName != "undefined" && themeName != "") ? themeName : "cupertino";
$("#selectedH3").addClass("path-selected-menu-"+theTheme).addClass("path-selected-menu");
$("#selecteda").addClass("path-selected-menu-"+theTheme).addClass("path-selected-menu");

</script>