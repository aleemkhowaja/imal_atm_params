<#assign href=parameters.href?default("")/>
<div id= "${parameters.id?html}">
</div>
<script type='text/javascript'><#t/>
	jQuery(document).ready(function(){ <#t/>
		$.struts2_jquery.require("/common/jquery/js/plugins/jquery.kanbanboard.js","",'${base}');
		$('#${parameters.id?html}').kanbanboard("initKanbanBoard", 
			'${id?html}', 
			'${dragAndDropEvent?html}',
			'${expandCollapseEvent?html}', 
			'${enableDragAndDrop?html}', 
			'${enableExpandCollapse?html}', 
			'${_pageRef?html}', 
			'${itemClickListener?html}',
			'${href?default('')}');
	});<#t/>
</script><#t/>
