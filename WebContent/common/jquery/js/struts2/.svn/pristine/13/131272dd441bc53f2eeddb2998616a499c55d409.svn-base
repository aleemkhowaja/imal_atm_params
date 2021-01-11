/*!
 * jquery.tree.struts2.js
 *
 * Integration of trees with struts 2
 *
 * Requires use of jquery.struts2.js
 *
 * Copyright (c) 2010 Johannes Geppert http://www.jgeppert.com
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */

/*global jQuery, window,  */
(function ($) {
	"use strict";

	/**
	 * Bind a Tree to Struts2 Component
	 */
	$.struts2_jquery_tree = {
			
			handler : {
				show_checkboxes:'_s2j_show_checkboxes',
				hide_checkboxes:'_s2j_hide_checkboxes',
				check_all:'_s2j_check_all',
				uncheck_all :'_s2j_uncheck_all'
			},

		// Render a Tree
		tree : function ($elem, o) {
			var self = this, path = null;
			if (!self.loadAtOnce) {
				self.require("js/base/jquery.cookie" + self.minSuffix + ".js");
			}
			self.require("js/jstree/jquery.hotkeys" + self.minSuffix + ".js");
			self.require("js/jstree/jquery.jstree" + self.minSuffix + ".js");
			o.plugins = [];
			if (o.treetheme) {
				o.plugins.push("themes"); 
				o.themes = {};
				o.themes.theme = o.treetheme;
				if (!$.scriptPath) {
					path = '';
				} else { 
					path = $.scriptPath;
				}
                o.themes.dots = o.dots;
                o.themes.icons = o.icons;
                /**
                 * [PathSolutions-MarwanMaddah] added to change the location of Css that will be loaded 
                 * based on the direction
                 * @param {Object} n
                 * @return {TypeName} 
                 */
                var _rtl = "";
                if(o.rtl == true)
                {
                  _rtl = "-rtl";
                }
				o.themes.url = path + "js/jstree/themes/"+o.treetheme+_rtl+"/style.css";
				
			}	else {
				o.plugins.push("themeroller"); 
			}
			if (o.contextmenu) {
				o.plugins.push("crrm"); 
				o.plugins.push("contextmenu"); 
			}
			if (o.types) {
				o.plugins.push("types"); 
			}
			if (o.checkbox) {
				o.plugins.push("ui"); 
				o.plugins.push("checkbox");
				o.checkbox = { override_ui : true, real_checkboxes : true, real_checkboxes_names : function (n) { return [o.name, n.attr ? n.attr("id") : 0 ] }};
				if(o.two_state) { o.checkbox.two_state = true; }
				$elem.bind('loaded.jstree', function (event, data){
					$elem.find('li').each(function(i) {
						if($(this).data('checked')==true){
							$elem.jstree("check_node", $(this), { triggerChange: false} );
						}
					}); 
				}); 
			}
			
			if(o.checkAllTopics) {
				self.subscribeTopics($elem, o.checkAllTopics, self.handler.check_all, o);
			}
			if(o.uncheckAllTopics) {
				self.subscribeTopics($elem, o.uncheckAllTopics, self.handler.uncheck_all, o);
			}
			if(o.checkShowTopics) {
				self.subscribeTopics($elem, o.checkShowTopics, self.handler.show_checkboxes, o);
			}
			if(o.checkHideTopics) {
				self.subscribeTopics($elem, o.checkHideTopics, self.handler.hide_checkboxes, o);
			}

			
			if (o.url){
				o.json_data = {};
				o.json_data.ajax = {};
				o.json_data.ajax.url = o.url;
				o.json_data.ajax.data = function (n) { 
					return { id : n.attr ? n.attr("id") : 0 }; 
				};
				if (o.onsuc) {
					o.json_data.ajax.complete  =  function(data, status, request) {
						$.each(o.onsuc.split(','), function(i, stopic) {
							var orginal = {};
							orginal.data = data;
							orginal.status = status;
							orginal.request = request;
	
							self.publishTopic($elem, stopic, orginal);
							self.publishTopic($elem, o.onalw, orginal);
						});
					};
				}
				if (o.oncom) {
					o.json_data.ajax.complete  =  function(request, status) {
						$.each(o.oncom.split(','), function(i, ctopic) {
							var orginal = {};
							orginal.request = request;
							orginal.status = status;
	
							self.publishTopic($elem, ctopic, orginal);
							self.publishTopic($elem, o.onalw, orginal);
						});
					};
				}
				if (o.onerr) {
					o.json_data.ajax.error  =  function(request, status, error) {
						$.each(o.onerr.split(','), function(i, etopic) {
							var orginal = {};
							orginal.request = request;
							orginal.status = status;
							orginal.error = error;
	
							self.publishTopic($elem, etopic, orginal);
							self.publishTopic($elem, o.onalw, orginal);
						});
					};
				}
				o.plugins.push("json_data");
			}	else {
				o.plugins.push("html_data");
			}
			
			if(o.onclick || (o.url && o.nodeHref)) {
				o.plugins.push("ui"); 
				$elem.bind('select_node.jstree', function (event, data){
					var orginal = {}, url;
					orginal.data = data;
					orginal.event = event;
					self.publishTopic($elem, o.onclick, orginal);
					if(o.url && o.nodeHref){
						url = self.addParam(o.nodeHref, o.nodeHrefParamName+"="+data.rslt.obj.attr("id"));
						if(o.nodeTargets) {
							// Handle AJAX Requests
							$.each(o.nodeTargets.split(','), function(i, target) {
								$(self.escId(target)).load(url);
							});
						}
						else {
							// Handle Normal Requests
							window.location.href = url;
						}
					}
		    });
		  }
			
		  ////[PathSolutions Denisk] publishing double Click Event	
		 if(o.onDblClick) 
		  {
			  $elem.bind("dblclick.jstree",  function (event)
			  {
				  var orginal = {};
				  orginal.data = {rslt:{obj:{}}};
				  orginal.event = event;
				  var node = $(event.target).closest("li");
				  orginal.data.rslt.obj = $(node[0]);
				  self.publishTopic($elem, o.onDblClick, orginal);
		      });
		  }
			
			//[PathSolution Denisk] publishing after check/uncheck is finished in case tree with check boxes
			if(o.checkbox && o.afterNodeCheckUncheckedTopic)
			{
				$elem.bind('check_node.jstree uncheck_node.jstree', function (event, data){
					var orginal = {};
					orginal.data = data;
					orginal.event = event;
					self.publishTopic($elem, o.afterNodeCheckUncheckedTopic, orginal);
				});
			}
			/////
			
			if(o.openload) {
				$elem.bind('loaded.jstree', function (event, data){
				// PathSolutions adding flag fromLoad to control which nodes to eb opned/closed
					$elem.jstree('open_all',undefined,undefined,undefined,{fromLoad:true}); 
				});
			}
			/*
			 * [PathSolutions-Khaled]: to dislpay only the first level in case openAllOnLoad = false or not exists
			 */
			else {
				$elem.bind('loaded.jstree', function(event, data) {
				// PathSolutions adding flag fromLoad to control which nodes to eb opned/closed
					$elem.jstree('close_all',undefined,undefined,{fromLoad:true});
				});
			}

			if(o.openrefresh) {
				$elem.bind('refresh.jstree', function (event, data){
					$elem.jstree('open_all'); 
		    });
		  }
			
		  if (o.animation) {
			  o.plugins.push("core"); 
			  o.core = {};
			  o.core.animation = o.animation;
		  }
		  
		 	/*
			 * [PathSolutions-Khaled]: disable checking/unchecking nodes
			 */
		    /**
		     * [PathSolutions-MarwanMaddah]: changed the selector to be based on tree id
		     * to avoid the conflicts in case there are multi tree in the same container.
		     */
			if (o.disabled) {
				$elem.bind('loaded.jstree', function(event, data) {
					$('#'+o.id).find('a').click(function() {
						return false;
					});
					//
					// [PathSolutions-Khaled]: change the style of the checbox to be displayed as disabled
					//
					$('#'+o.id).find('.jstree-checked > a > ins:not(.jstree-icon)').removeClass('jstree-checkbox').addClass('jstree-checkbox-disabled');
				    $('#'+o.id).find('.jstree-undetermined > a > ins:not(.jstree-icon)').removeClass('jstree-checkbox').addClass('jstree-checkbox-undetermined-disabled');
				});
			}

			// PathSolutions [Denisk]: Drag and drop of Nodes within Same tree
			if(o.dndInSameTreeEnabled)
			{
				// drag and drop within same tree need crrm [copy, rename, remove, move]. 
				// since if contextmenu available the crrm already added above
				if(!o.contextmenu)
				{
					o.plugins.push("crrm");
				}
				// dnd is needed for node moving in the same tree however the drop_target and drag_target should be set to false
				// since those are used for dragging between different trees
				o.plugins.push("dnd"); 
				o.dnd = { drop_target : false,
						  drag_target : false	
						}
				// if drag and drop is applicable for multi select nodes then flag is set to consider all selected nodes in start_drag method
				// not yet applied at tree tag level, to make the tree for now unique node drag enabled by default
				if(o.dndMultiSelectDragEnable)
				{
					o.dnd.multi_select_drag_all_nodes = o.dndMultiSelectDragEnable;
				}

				
				if(o.dndCheckMoveAllowedFunc)
				{
					// check if move allowed method exists to validate if drag is allowed to be performed
					o.crrm = {move : { check_move : function(theObj){return o.dndCheckMoveAllowedFunc(theObj);}}
							}
				}
				
				// changing the parentNodeCode after move is done and mark as changed
				$elem.bind("move_node.jstree", function(e, data)
				{
					var moved_nodeId = data.rslt.o.attr("id");
					var moved_nodeParCode = $("#"+moved_nodeId).attr("parentNodeCode");
					$("#"+moved_nodeId).attr("parentNodeCode",$("#"+moved_nodeId).parent().closest("li").attr("nodeCode"))
					// putting initial parent Code for the node that moved for first time.
					if(!$("#"+moved_nodeId).attr("initParentCode"))
					{
						$("#"+moved_nodeId).attr("initParentCode",moved_nodeParCode);
					}
					$("#"+moved_nodeId).attr("moved","true");
					
					// call move complete custom function
					if(o.dndMoveCompleteFunc)
					{
						o.dndMoveCompleteFunc(data);
					}
				});
			}// End PathSolutions
		
		  $elem.jstree(o);

		},
		treeitem : function($elem, o) {
			var self = this;
			self.anchor($elem, o);
		}
	};
	
	/**
	 * handler to show checkboxes
	 */
	$.subscribeHandler($.struts2_jquery_tree.handler.show_checkboxes, function(event, data) {
		$(this).jstree("show_checkboxes");
	});
	
	/**
	 * handler to hide checkboxes
	 */
	$.subscribeHandler($.struts2_jquery_tree.handler.hide_checkboxes, function(event, data) {
		$(this).jstree("hide_checkboxes");
	});
	
	/**
	 * handler to check all tree nodes
	 */
	$.subscribeHandler($.struts2_jquery_tree.handler.check_all, function(event, data) {
		$(this).jstree("check_all");
	});
	
	/**
	 * handler to uncheck all tree nodes
	 */
	$.subscribeHandler($.struts2_jquery_tree.handler.uncheck_all, function(event, data) {
		$(this).jstree("uncheck_all");
	});

	// Extend it from orginal plugin
	$.extend(true, $.struts2_jquery_tree, $.struts2_jquery);
	$.struts2_jquery_tree.debugPrefix = "[struts2_jquery_tree] ";

})(jQuery);

/**
 * <strong>[PathSolutions] - Khaled</strong> <br/>
 * 
 * Function used when Tree tag populated having enableAddNode set to true.
 * This will create a dialog having two inputs available for the user.
 * 
 * @param {Object} args contains:
 *  obj
 *  jstree
 *  funct
 *  title_lbl
 *  nodeCode_lbl
 *  add_lbl
 *  cancel_lbl
 */
function createAddNodeDialog(args)
{
	var $dialogDiv = $('<div id="temp_dialog_add_node_div"><form><fieldset><table><tr><td>' +
	'<label for="tdand_title">'+ args.title_lbl + '</label></td><td><input type="text" name="title" id="tdand_title" ' +
	'class="ui-widget-content ui-corner-all" /></td></tr><tr><td><label for="tdand_nodeCode">' + args.nodeCode_lbl + '</label>' +
	'</td><td><input type="text" name="nodeCode" id="tdand_nodeCode" class="ui-widget-content ui-corner-all" />' +
	'</td></tr><table></fieldset></form></div>').appendTo('body');
	
	var dialog = $('#temp_dialog_add_node_div').dialog({ modal: true });
	var dialogOptions = {
							modal : true,
							autoOpen : false,
							show : 'slide',
							title: args.add_lbl,
							position : 'center',
							dialogClass : 'no-close',
							closeOnEscape : false,
							'height' : returnMaxHeight(200),
							'width' : returnMaxWidth(320),
							buttons : [
									{
										text : args.add_lbl,
										click : function() {
											args.jstree.create(args.obj, null, null, null, true, $('#tdand_nodeCode').val(), $('#tdand_title').val());
											$('#temp_dialog_add_node_div').dialog('destroy');
											$('#temp_dialog_add_node_div').remove();
											// Call the function
											window[args.funct](args.obj);
										}
									},
									{
										text : args.cancel_lbl,
										click : function() {
											
											$('#temp_dialog_add_node_div').dialog('destroy');
											$('#temp_dialog_add_node_div').remove();
										}
									}]
						};
	
	$('#temp_dialog_add_node_div').dialog(dialogOptions);
	$('#temp_dialog_add_node_div').dialog('open');
}

/**
 * Get the user confirmation before delete a node
 * 
 * @param {Object} jstree
 * @param {Object} obj
 * @param {Object} removeFunName
 */
function tree_confirmBeforeDeleteNode(args) {
	_showConfirmMsg(Confirm_Delete_Process_key, confirm_msg_title, function(yesNo) {
		if(yesNo) {
			args.jstree.remove(args.obj);
			// Call the function
			if(args.removeFunName)
				window[args.removeFunName](args.obj);
		}
	}, 'yesNo');
}