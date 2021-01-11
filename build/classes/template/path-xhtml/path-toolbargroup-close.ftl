</div>

<script type="text/javascript">
	jQuery(document).ready(function () {	

					/*
						[PathSolutions] the anchor <a> is not mandatory to be added, it can be removed but then we need to adjust the line in jquery.toolbar.js to become like 
						$(self.options.content).clone( true ).find('a').addClass('tool-item gradient'); to become like 
						$(self.options.content).clone( true ).find('button.ui-button').addClass('tool-item gradient');
					*/
					$('#toolbarGrpDiv_${id?html}').find("button.ui-button").wrap("<a href='#'>");  
					           			
           			$.struts2_jquery.require("/common/jquery/js/plugins/jquery.toolbar.js","",'${base}');
           			$.struts2_jquery.requireCss("/common/style/toolbar/jquery.toolbars.css",'${base}');
           		         
					$('#toolbarGrpBtn_${id?html}').toolbar( {
						content : '#toolbarGrpDiv_${id?html}',
						position : '${position?html}',
						hideOnClick : ${hideOnClick?html},
						zIndex : 2147483647 /*the default z-index value that was used in IIS application*/
					}); 
					
	});
</script>