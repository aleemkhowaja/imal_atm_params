/*!
 * path.gtree.js
 *
 * Copyright 2015, Path Solutions Path Solutions retains all ownership rights to
 * this source code 
 * 
 * Author: Khaled Hussein
 *
 */
(function($) {

	"use strict";

	/*
	 * Path gTree object
	 */
	$.path_gTree = {

		// Render the graphical tree
		gTree : function(id, options) {

			//PathSolutions, to fix the display of the tree under chrome we need to add the below method. the problem doesn't exists in IE or Firefox.
		    //the issue was described in following thread: http://jointjs.com/blog/get-transform-to-element-polyfill.html
			//the below method should be added before loading jointWithoutjQuery.js file
			if($.browser.chrome)
			{	
				SVGElement.prototype.getTransformToElement = SVGElement.prototype.getTransformToElement || function(toElement) {
			    	return toElement.getScreenCTM().inverse().multiply(this.getScreenCTM());
				};
			}
			
			var self = this;

			// require the needed files
			self.requireCss("js/joint/joint.css");
			self.require("js/joint/jointWithoutjQuery.js");
			self.require("js/joint/joint.layout.DirectedGraph.min.js");

			// Declare Path Custom Shapes
			joint.shapes.path = {};

			// Path Custom Rectangle Shape
			joint.shapes.path.Rect = joint.shapes.basic.Rect
					.extend( {
						// Note the `<a>` SVG element surrounding the markup.
						markup : '<a><g class="rotatable"><g class="scalable"><rect/></g></g></a>',
						defaults : joint.util.deepSupplement( {
							type : 'path.Rect'
						}, joint.shapes.basic.Rect.prototype.defaults)
					});

			// Path Custom Rectangle view (add support for Add/Remove)
			joint.shapes.path.RectView = joint.dia.ElementView
					.extend( {

						template : '',

				initialize : function() 
				{
					//PathSolutions, the template string of the node should be initialized as empty, and when initializing the tree, the template will be defined dynamically based on the editable flag.	
					var treeNodeArray = [];
					treeNodeArray.push('<div class="path-rect-node" >');
					treeNodeArray.push('<div class="path-rect-node-icons">');
					if(options.editable == 'true')
					{
						var cssClassAdd = 'ui-icon-plusthick';
						if(options.cssClassAdd != undefined && options.cssClassAdd != null && options.cssClassAdd != '')
						{
							cssClassAdd = options.cssClassAdd;
						}
						treeNodeArray.push('<span class="ui-icon ' + cssClassAdd + ' path-gtree-add" title="');
						treeNodeArray.push(options.addLabel);
						treeNodeArray.push('"/>');
						
						
						var cssClassDelete = 'ui-icon-minusthick';
						if(options.cssClassDelete != undefined && options.cssClassDelete != null && options.cssClassDelete != '')
						{
							cssClassDelete = options.cssClassDelete;
						}
						treeNodeArray.push('<span class="ui-icon ' + cssClassDelete + ' path-gtree-remove" title="');
						treeNodeArray.push(options.removeLabel);
						treeNodeArray.push('"/>');
						if(options.hideNodeRenameBtn != 'true')
						{
							var cssClassRename = 'ui-icon-comment';
							if(options.cssClassRename != undefined && options.cssClassRename != null && options.cssClassRename != '')
							{
								cssClassRename = options.cssClassRename;
							}
							treeNodeArray.push('<span class="ui-icon ' + cssClassRename + ' path-gtree-rename" title="');
							treeNodeArray.push(options.renameLabel);
							treeNodeArray.push('"/>');
						}	
						if(options.customNodeDetailsFunc != undefined && options.customNodeDetailsFunc != null && options.customNodeDetailsFunc != '')
						{
							var cssClassInfo = 'ui-icon-notice';
							if(options.cssClassInfo != undefined && options.cssClassInfo != null && options.cssClassInfo != '')
							{
								cssClassInfo = options.cssClassInfo;
							}
							treeNodeArray.push('<span class="ui-icon ' + cssClassInfo + ' path-gtree-details" title="');
							treeNodeArray.push(options.detailsButtonLbl);
							treeNodeArray.push('"/>');
						}
						if(options.hideAddLinkBtn != 'true')
						{
							var cssClassLink = 'ui-icon-play';
							if(options.cssClassLink != undefined && options.cssClassLink != null && options.cssClassLink != '')
							{
								cssClassLink = options.cssClassLink;
							}
							treeNodeArray.push('<span class="ui-icon ' + cssClassLink + ' path-gtree-link" title="');
							treeNodeArray.push(options.linkLabel);
							treeNodeArray.push('"/>');
						}
					}
					treeNodeArray.push('</div>');
					treeNodeArray.push('<div class="path-gtree-text" style="position: absolute; text-align: center; vertical-align: middle; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">');
					treeNodeArray.push('</div>');
					treeNodeArray.push('</div>');
					
					this.template = treeNodeArray.join('');
						
					_.bindAll(this, 'updateBox');
					joint.dia.ElementView.prototype.initialize.apply(
									this, arguments);

					this.$box = $(_.template(this.template)());
        			
        			// show the icons
        			this.$box.on('mouseover', _.bind(function(evt){ this.showMenuBox();}, this));
        			
        			// hide the icons
        			this.$box.on('mouseout', _.bind(function(evt){ this.hideMenuBox();}, this));
        			
        			this.$box.find('.path-gtree-add').on('click', _.bind(function(evt) {
        					this.addNodeDialog(this.paper.model, this.model.id);
				        }, this));
        			if(options.hideAddLinkBtn != 'true')
					{
        				this.$box.find('.path-gtree-link').on('click', _.bind(function(evt) {
        					this.addLinkDialog(this.paper.model, this.model.id);
        				}, this));
					}
        			if(options.hideNodeRenameBtn != 'true')
					{
        				this.$box.find('.path-gtree-rename').on('click', _.bind(function(evt) {
        					this.renameNodeDialog(this.paper.model, this.model.id);
				        }, this));
					}
        			if(options.customNodeDetailsFunc != undefined && options.customNodeDetailsFunc != null && options.customNodeDetailsFunc != '')
					{
        				this.$box.find('.path-gtree-details').on('click', _.bind(function(evt) {
        					this.openNodeDetails(this.paper.model, this.model.id);
				        }, this));
					}
        			// Khaled: show confirmation message before delete
        			this.$box.find('.path-gtree-remove').on('click', _.bind(function(evt){
        					var self = this;
        					var descendersMap = new Object();
        					var descendersArray = this.paper.model.gTree.getCellDescenders(graph,this.model);
        					if(descendersArray != undefined && descendersArray != null && descendersArray.length > 0)
        					{	
	        					$.each( descendersArray , function( index, node ) {
	        						descendersMap[node.id] = node;
	        					});
        					}
        					_showConfirmMsg(Confirm_Delete_Process_key, confirm_msg_title, function(yesNo) {
								if(yesNo) {
									self.removeModel(self.model);
									if(options.deleteNodeCallBack != undefined && options.deleteNodeCallBack != null && options.deleteNodeCallBack != '')
									{
										var deleteNodeCallBack = window[options.deleteNodeCallBack];
										deleteNodeCallBack(graph, self.model, descendersMap);
									}
								}
							}, 'yesNo');
        				}, this));
        			
        			/* 
        			 * Fixing the position
        			 * Put 10px to the left and 10px to the right, so get the width -20 and set it as div width
        			 * set left:10px to take into consideration the width above and to accurately set the position
        			*/
        			this.$box.find('.path-gtree-text').text(this.model.attr('text/text'));
        			this.$box.find('.path-gtree-text').prop('title', this.model.attr('text/text'));
        			
        			/* Make sure events are propagated to the JointJS element so, e.g. dragging works.*/
        			this.$box.css({'pointer-events': 'none'});
        			
        			// Update the box position whenever the underlying model changes.
			        this.model.on('change', this.updateBox, this);
			        // Remove the box when the model gets removed from the graph.
			        this.model.on('remove', this.removeBox, this);
			        
			        this.updateBox();
			        
			        if(graph.gTree == undefined)
                    {
                           graph.gTree = this;
                    }
				},
			    render: function() {
			        joint.dia.ElementView.prototype.render.apply(this, arguments);
			        this.paper.$el.prepend(this.$box);
			        this.updateBox();
			        this.hideMenuBox();
			        //PathSolutions, in case of chrome browser we need to reset the top of the node's label after the prepend() to get a correct value of the font-size 
			        var $pathGtreeDiv = this.$box.find('.path-gtree-text');
			        var fontSize = $pathGtreeDiv.css('font-size');
			        $pathGtreeDiv.attr('forGraphicalNodeId',this.model.id);
			        if(options.onDblClickTopic)
					{
			        	var nodeModel = this.model;
			        	$pathGtreeDiv.dblclick(function() 
			        		{
			        			window[options.onDblClickTopic](nodeModel.id, nodeModel);
			        		}
			        	);
					}
			        
        			fontSize = fontSize.substring(0, fontSize.length-2);
        			this.$box.find('.path-gtree-text').css({ 
        				'color': this.model.attr('text/fill'),
        				'left': '10px',
        				'top': (this.model.get('size').height/2 - fontSize/2) + 'px'});
        			
        			var textDiplayLength = this.model.attr('text/textDiplayLength');
        			var nodeText = this.model.attr('text/text');
        			//in case the property textDiplayLength is not defined or it is less than 10, then the default display is applied
        			if(typeof textDiplayLength == "undefined" || textDiplayLength == undefined 
        					|| textDiplayLength == null || textDiplayLength == '' 
        						|| isNaN(textDiplayLength) || parseInt(textDiplayLength) <= 10 )
        			{
        				this.$box.find('.path-gtree-text').css('width', (this.model.get('size').width - 20) + 'px'); 
        			}
        			else
        			{
        				//truncate the text to the specified number of characters in textDiplayLength
        				var truncateText = nodeText.substring(0, parseInt(textDiplayLength));
        				//set the truncated text inside the div to find the new width 
        				this.$box.find('.path-gtree-text').html(truncateText);
        				//get the new width value
        				var truncateWidth = this.$box.find('.path-gtree-text').css('width');
        				var truncateWidthValue =  parseInt(truncateWidth.substring(0, truncateWidth.length-2));
        				//apply the new width to the div containing the text, add 10px to be sure that the text will be completely displayed and that we will not be truncated and get ... at the end
        				this.$box.find('.path-gtree-text').css('width',truncateWidthValue + 10 + 'px');
        				//apply the new width to the rect tag inside the svg node, add 70px because the text div has left and right padding 
        				$(this.el).find('rect').attr('width', truncateWidthValue + 70 + 'px');
        				//rest the text to origin non truncated value
        				this.$box.find('.path-gtree-text').html(nodeText);
        				//adjust the new width of the node
        				this.model.attributes.size.width = truncateWidthValue;
        			}
        			
				    return this;
			    },
			    updateBox: function() {
			        // Set the position and dimension of the box so that it covers the JointJS element.
			        var bbox = this.model.getBBox();
			        this.$box.css({ width: bbox.width, height: bbox.height, left: bbox.x, top: bbox.y, transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)' });
			    },
			    removeBox: function(evt) {
			        this.$box.remove();
			    },
			    removeModel: function(model) {
			    	var graph = this.paper.model;
			        var descenders = this.getCellDescenders(graph, model);
			        
			        model.remove();
			        
			        _.each(descenders, function(descender) {
			        	descender.remove();
			        });
			    	
			        this.markChange(graph);
			    },
			    showMenuBox: function() {
					this.$box.find(".path-rect-node-icons").css({'display': 'block'});
			    },
			    hideMenuBox: function() {
			    	this.$box.find(".path-rect-node-icons").css({'display': 'none'});
			    },
				mouseover: function(evt){
					joint.dia.ElementView.prototype.mouseover.apply(this, arguments);
					this.showMenuBox();
				} ,
				mouseout: function(evt){
					joint.dia.ElementView.prototype.mouseout.apply(this, arguments);
					this.hideMenuBox();
				},
				openNodeDetails: function(graph, nodeId){
					if(options.customNodeDetailsFunc)
					{
						var customNodeDetailsFunc = window[options.customNodeDetailsFunc];
						customNodeDetailsFunc(graph, nodeId, this);
						return;
					}
				},
				addNodeDialog: function(graph, nodeId){
					if(options.customAddDialog)
						{
						var customAddDialogFunc = window[options.customAddDialog];
						customAddDialogFunc(graph, nodeId, this);
						return;
						}
					var node = graph.getCell(nodeId);
					var self = this;
	
					var $dialogDiv = $('<div id="temp_dialog_gtree_add_node_div"><form><fieldset><table><tr><td>' +
							'<label for="temp_gtree_name">'+ options.gtreeNameLbl + '</label></td><td><input type="text" name="name" id="temp_gtree_name" ' +
							'class="ui-widget-content ui-corner-all" /></td></tr><table></fieldset></form></div>').appendTo('body');
					var dialog = $('#temp_dialog_gtree_add_node_div').dialog({ modal: true });
					
					var dialogOptions = {
							modal : true,
							autoOpen : false,
							show : 'slide',
							title: options.addLabel,
							position : 'center',
							dialogClass : 'no-close',
							closeOnEscape : false,
							'height' : returnMaxHeight(150),
							'width' : returnMaxWidth(250),
							buttons : [
									{
										text : options.okButtonLbl,
										click : function() {
											self.addNode(graph,node, $('#temp_gtree_name').val());
											$('#temp_dialog_gtree_add_node_div').dialog('destroy');
											$('#temp_dialog_gtree_add_node_div').remove();
										}
									},
									{
										text : options.cancelButtonLbl,
										click : function() {
											
											$('#temp_dialog_gtree_add_node_div').dialog('destroy');
											$('#temp_dialog_gtree_add_node_div').remove();
										}
									}
								]
					};
					$('#temp_dialog_gtree_add_node_div').dialog(dialogOptions);
					$('#temp_dialog_gtree_add_node_div').dialog('open');
				},
				addLink: function(graph, fromNodeId, toNodeId, linkText){
					
					var link = new joint.dia.Link(
						{
					      "angle": 0,
					      "attrs": {
					        ".connection": {
					          "stroke": "black"
					        },
					        ".marker-target": {
					          "d": "M 10 0 L 0 5 L 10 10 z"
					        }
					      },
					      "labels": [
					        {
					          "position": 0.5,
					          "attrs": {
					            "text": {
					              "font-size": "11",
					              "font-family": "arial",
					              "text": linkText
					            }
					          }
					        }
					      ],
					      "source": {
					        "id": fromNodeId
					      },
					      "target": {
					        "id": "3"
					      },
					      "type": "link"
					});
					
					if(toNodeId != undefined && toNodeId != null
							&& toNodeId != '')
					{
						link.attributes.target = { id: toNodeId }; 
					}
					
					graph.addCell(link);
					this.markChange(graph);
					
				},
				addLinkDialog: function(graph, nodeId){
					if(options.customAddLinkDialog)
					{
						var customAddLinkDialogFunc = window[options.customAddLinkDialog];
						customAddLinkDialogFunc(graph, nodeId, this);
						return;
					}
					var node = graph.getCell(nodeId);
					var self = this;
	
					var dialogDivContent = '<div id="temp_dialog_gtree_add_link_div"><form><fieldset><table>';
					if(options.hideLinkLabelField != 'true')
					{	
						dialogDivContent += '<tr><td><label for="temp_gtree_name">'+ options.gtreeNameLbl + '</label></td><td><input type="text" name="name" id="temp_gtree_name" ' +
							'class="ui-widget-content ui-corner-all" /></td></tr>';
					}		
					dialogDivContent +=	'<tr><td><label for="temp_dest_node">'+ options.linkLabel + '</label></td><td><select id="temp_dest_node"></select></td></tr>' +
							'<table></fieldset></form></div>';
					var $dialogDiv = $(dialogDivContent).appendTo('body');
					var dialog = $('#temp_dialog_gtree_add_link_div').dialog({ modal: true });
					
					
					
					var elements = graph.getElements();
					$('#temp_dest_node').append($('<option>', {value:'', text:''}));
					$(elements).each(function( index, element ) {
							if(element.id != self.model.id)
							{
								$('#temp_dest_node').append($('<option>', {value:element.id, text:element.attributes.attrs.text.text}));
							}
					 });
					
					var dialogOptions = {
							modal : true,
							autoOpen : false,
							show : 'slide',
							title: options.linkLabel,
							position : 'center',
							dialogClass : 'no-close',
							closeOnEscape : false,
							'height' : returnMaxHeight(150),
							'width' : returnMaxWidth(250),
							buttons : [
									{
										text : options.okButtonLbl,
										click : function() {
											
											var selectedDestinationId = $("#temp_dest_node option:selected" ).val();
											var linkText = '';
											if($('#temp_gtree_name').length > 0)
											{
												linkText = $('#temp_gtree_name').val();
											}
											var fromNodeId = self.model.id;
											self.addLink(graph, fromNodeId, selectedDestinationId, linkText);
											
											$('#temp_dialog_gtree_add_link_div').dialog('destroy');
											$('#temp_dialog_gtree_add_link_div').remove();
										}
									},
									{
										text : options.cancelButtonLbl,
										click : function() {
											
											$('#temp_dialog_gtree_add_link_div').dialog('destroy');
											$('#temp_dialog_gtree_add_link_div').remove();
										}
									}
								]
					};
					$('#temp_dialog_gtree_add_link_div').dialog(dialogOptions);
					$('#temp_dialog_gtree_add_link_div').dialog('open');
				},
				renameNodeDialog: function(graph, nodeId){
					var node = graph.getCell(nodeId);
					var self = this;
					
					var previousText = self.$box.find('.path-gtree-text').text();
					var $dialogDiv = $('<div id="temp_dialog_gtree_rename_node_div"><form><fieldset><table><tr><td>' +
							'<label for="temp_gtree_rename">'+ options.gtreeNameLbl + '</label></td><td><input type="text" name="name" id="temp_gtree_rename" ' +
							'value="' + previousText + '" class="ui-widget-content ui-corner-all" /></td></tr><table></fieldset></form></div>').appendTo('body');
					var dialog = $('#temp_dialog_gtree_rename_node_div').dialog({ modal: true });
					
					var dialogOptions = {
							modal : true,
							autoOpen : false,
							show : 'slide',
							title: options.renameLabel,
							position : 'center',
							dialogClass : 'no-close',
							closeOnEscape : false,
							'height' : returnMaxHeight(150),
							'width' : returnMaxWidth(250),
							buttons : [
									{
										text : options.okButtonLbl,
										click : function() {
											self.renameNode(self, $('#temp_gtree_rename').val());
											$('#temp_dialog_gtree_rename_node_div').dialog('destroy');
											$('#temp_dialog_gtree_rename_node_div').remove();
										}
									},
									{
										text : options.cancelButtonLbl,
										click : function() {
											
											$('#temp_dialog_gtree_rename_node_div').dialog('destroy');
											$('#temp_dialog_gtree_rename_node_div').remove();
										}
									}
								]
					};
					$('#temp_dialog_gtree_rename_node_div').dialog(dialogOptions);
					$('#temp_dialog_gtree_rename_node_div').dialog('open');
				},
				addNode: function(graph, node, text){
					var newNode = node.clone();
				    var position = newNode.get('position');
				    var size = newNode.get('size');
				    position.x += size.width + 25;
				    newNode.set({'position': position});
				    newNode.attr('text/text', text);

				    var link = new joint.dia.Link({ source: { id: node.id }, target: { id: newNode.id }, "attrs":{".marker-target":{"d":"M 10 0 L 0 5 L 10 10 z"}} });
				    graph.addCell(newNode).addCell(link);
				    this.applyFixCSS();
				    this.markChange(graph);
				    return newNode.get('id');
				},
				getCustomDetails: function(graph, nodeId){
					var node = graph.getCell(nodeId);
					return $(node).data('customDetails');
				},
				putCustomDetails: function(graph, nodeId, value){
					var node = graph.getCell(nodeId);
					$(node).data('customDetails', value);
				},
				getLink: function(graph, sourceId,targetId){
					var linksArray = graph.getLinks();	
					var linkElementObj = null;
					$.each( linksArray, function( index, linkElement ) {
						if( sourceId == linkElement.attributes.source.id && 
						    targetId == linkElement.attributes.target.id)
						{
							linkElementObj = linkElement;
							return false;
						}
					});
					return linkElementObj;
				},
				getLinkCustomDetails: function(graph, sourceId,targetId){
					var linkElementObj = this.getLink(graph, sourceId,targetId);
					if(linkElementObj != null)
					{
						return $(linkElementObj).data('customDetails');
					}
					return null;
				},
				putLinkCustomDetails: function(graph, sourceId,targetId, value){
					var linkElementObj = this.getLink(graph, sourceId,targetId);
					if(linkElementObj != null)
					{
						return $(linkElementObj).data('customDetails', value);
					}
				},
				renameNode: function(self, newText){

					self.$box.find('.path-gtree-text').text(newText);
					
					// update tooltip
					self.$box.find('.path-gtree-text').prop('title', newText);
					
					// Update the text attribute in the model
					self.model.attr('text/text', newText);
					this.markChange(self.paper.model);
				},
				applyFixCSS: function(){
					$('.path-rect-node').css({position: 'absolute', 'box-sizing': 'border-box', 'z-index':2});
					/* Enable interacting with icon only. */
					$('.path-rect-node span').css({cursor: 'pointer', 'pointer-events': 'auto'});
					/* Enable interacting with the text so that the tooltip works. */
					$('.path-gtree-text').css({'pointer-events': 'auto'});
					
					// Disable remove action on links
					$('.link-tools').css({ 'display': 'none' });
					$('.tool-remove').css({ 'display': 'none' });
				},
				getCellDescenders: function( graph, node) {
					var links = graph.getConnectedLinks(node);
        			var descenders = [];
        			var cells = graph.get('cells');
        			var self = this;
        			
        			_.each(links, function(link) {
        				// We are interested in the target only
        				var target = link.get('target');
        				
        				// Discard if it is a point (vertices are consider elements too)
        				if (!target.x)
        				{
	        				var targetElement = cells.get(target.id);
	        				if (targetElement !== node) {
			                    descenders.push(targetElement);
			                    
			                    // go down for more descenders
			                    _.each(self.getCellDescenders(graph, targetElement), function(deep){descenders.push(deep);});
			                }
	        			}
        			});
        			
					return descenders;
				},
				markChange: function(graph) {
					var hidId = id + '_hid';
					var treeJson = JSON.stringify(graph.toJSON());
    				$('#' + hidId).val(treeJson);
				}
				
			});
			
			// Initialize the graph that will hold our model
			var graph = new joint.dia.Graph;

			var paper = new joint.dia.Paper( {
				el : $('#' + id),
				//PathSolutions we should not define a width,height to the paper because the svg image will be truncated 
				//width : options.width,
				//height : options.height,
				model : graph,
				gridSize : 5,
				interactive: ( options.editable == 'true' || options.editableLink == 'true' )
			});

			// Parse the Json object
			graph.fromJSON(options.cells);
			
			// Create patterns for baskground image
			this.createPatterns(paper,options);
			
						
			// Get temp node to check if the position is provided
			var tempNode = options.cells["cells"][0];

			// if the position is not provided use directed grapg to draw the tree
			if (!tempNode.hasOwnProperty('position')) {
				// Assign positions dynamically for every node
				joint.layout.DirectedGraph.layout(graph, {
					setLinkVertices : true
				});
			}
			
			//Pathsolutions. custom event added to detect the click on delete button of a link in order to update the json of the tree
			paper.on('link-remove', function(evt, self, x, y) {
				  //update the input hidden containing the json of the tree
			      var hidId = id + '_hid';
			      var treeJson = JSON.stringify(graph.toJSON());
			      $('#' + hidId).val(treeJson);
			});
			
			// Assign on Double click event listener
			if (options.onDblClickTopic || options.onLinkDblClickTopic) {

				paper.on('cell:pointerdblclick', function(cellView, evt, x, y) {
					
					if(options.onDblClickTopic && !(cellView.model instanceof joint.dia.Link))
					{
						window[options.onDblClickTopic](cellView.model.id, cellView.model);
					}
					if(options.onLinkDblClickTopic && (cellView.model instanceof joint.dia.Link))
					{
						//when double clicking a link, a vertice is automatically added on the double click position (x,y) , so we need to remove it
						var vertices = (cellView.model.get('vertices') || []).slice();
						$(vertices).each(function( index, element ) {
						    if(element.x == x && element.y == y)
						    {
						    	cellView.removeVertex(index);
						    	return false;
						    }
						  });
						window[options.onLinkDblClickTopic](cellView.sourceView.model.id,cellView.targetView.model.id,cellView.model);
					}
					
				});
			}
						
			// Listen for position changed and store it
			var hidId = id + '_hid';
			var treeJson = '';
			var $hiddenInput = $('<input/>',{type:'hidden',id:hidId,value:treeJson});
			$hiddenInput.appendTo('#' + id);
			graph.on('change', function(eventName, cell) {
    			treeJson = JSON.stringify(graph.toJSON());
    			$('#' + hidId).val(treeJson);
			});
			// to fill the input hidden with the JSON value of the gtree
			graph.trigger('change');
			
			$('#' + id).data('graph',graph);
			
			// Apply css styling in order for the icons (add/remove/rename) works
			//PathSolutions, apply the width and height that was passes in parameter to the parent div, overflow should be set to scroll to enable scrolling
			$('#' + id).css({position: 'relative', background: 'transparent', width: '100%' , height: '100%'});
			
			//create a container to wrap the svg image
			$('#' + id).wrap( "<div id='" + id + "_svgContainer' style='overflow:scroll; height:" + options.height +"; width:" + options.width + ";'></div>" );
			
			//hide the svg element to get the correct width and height of the container div  
			$('#' + id + ' svg').hide();
			var containerWidth = $('#' + id + '_svgContainer').width();
			var containerHeight = $('#' + id + '_svgContainer').height();
			$('#' + id + '_svgContainer').width(containerWidth);
			$('#' + id + '_svgContainer').height(containerHeight);
			$('#' + id + ' svg').show();
			
			$('#' + id + ' svg').css('background', 'transparent').css('min-width', '99%').css('min-height', '99%');
			$('#' + id + ' svg .link').css('z-index', 2);
			
			//Pathsolutions. Disable remove action on links in case of editableLink isn't true in the pgt:gtree tag
			if(options.editableLink != 'true')
			{	
				$('.link-tools').css({ 'display': 'none' });
				$('.tool-remove').css({ 'display': 'none' });
			}
			
			//Pathsolutions. Disable detach of links from their source/destination elements
			if(options.editable != 'true')
			{
				//$('.marker-vertices').css({ 'display': 'none' });
				$('.marker-arrowheads').css({ 'display': 'none' });
				$('.connection-wrap').css({ 'display': 'none' });
			}
		
			$('.path-rect-node').css({position: 'absolute', 'box-sizing': 'border-box', 'z-index':2});
			/* Enable interacting with icons. */
			$('.path-rect-node span').css({cursor: 'pointer', 'pointer-events': 'auto'});
			/* Enable interacting with the text so that the tooltip works. */
			$('.path-gtree-text').css({'pointer-events': 'auto'});
			//PathSolutions - in case of big number of children, the tree is truncated 
			//so we need to call the fitToContent() to adjust the svg image width and height based on max top (max bbox.y) and max left (max bbox.x) of the cells.
			paper.fitToContent();
		},
		createPatterns: function(paper,options) {
			if(paper != undefined && options != undefined && options.cells != undefined 
					&& options.cells.patterns != undefined && options.cells.patterns != null )
			{
				var patternsObj = options.cells.patterns;
				for (var patternKey in patternsObj) 
				{
					var pattern = patternsObj[patternKey];
					if(pattern.patternType == 'bgimage.pattern'
						&& pattern.imageUrl != undefined && pattern.imageUrl != null && pattern.imageUrl != '' )
					{	
						V(paper.svg).defs().append(V('<pattern id="' + pattern.patternName + '" height="100%" width="100%" patternContentUnits="objectBoundingBox"> <image height="1" width="1" preserveAspectRatio="none" xlink:href="' + jQuery.contextPath + pattern.imageUrl + '" /></pattern>'))
					}
				}              
			}
		},
		gTreeData : function(id) {
			var returnedData = null;
			if( id != undefined && id != null && id != '' )
			{
				var gtreeData = $('#' + id + '_hid').val();
				if( gtreeData != undefined && gtreeData != null && gtreeData != '' )
				{
					var gtreeDataObj = JSON.parse(gtreeData);
					var graph = $('#' + id).data('graph');
					var nodesMap = {};
					var linkesMap = {};
					$.each( gtreeDataObj.cells, function( index, nodeElement ) {
						if(nodeElement.type == 'path.Rect')  
						{
							nodesMap[nodeElement.id] = nodeElement;
							var node = graph.getCell(nodeElement.id);
							//remove attributes from node element
							delete nodeElement['attrs'];
							//remove parentId from node element
							delete nodeElement['parentId'];
							nodeElement.customDetails = $(node).data('customDetails');
							nodeElement.posX = nodeElement.position.x;
							nodeElement.posY = nodeElement.position.y;
							delete nodeElement['position'];
						}
						else if(nodeElement.type == 'link')  
						{
							linkesMap[nodeElement.source.id + '_' + nodeElement.target.id] = nodeElement;
						}
					});
					
					$.each( linkesMap, function( key, linkElement ) {
						
						var node = nodesMap[linkElement.target.id];
						if(node.parentNodesList == undefined || node.parentNodesList == null)
						{
							node.parentNodesList = [];
						}
						var parenNodeCO = {};
						parenNodeCO['parentId'] = linkElement.source.id;
						node.parentNodesList.push(parenNodeCO);
					});
					
					returnedData = $.map(nodesMap, function(v) { return v; });
				}
			}
			return returnedData;
		},
		gTreeLinksData : function(id) {
			var returnedData = null;
			if( id != undefined && id != null && id != '' )
			{
				var graph = $('#' + id).data('graph');
				var linksArray = graph.getLinks();	
				var returnedlinksArray = [];
				$.each( linksArray, function( index, linkElement ) {
					var sourceId = linkElement.attributes.source.id;
					var targetId = linkElement.attributes.target.id;
					var customDetails = $(linkElement).data('customDetails');
					var linkElemObj = {};
					linkElemObj['sourceId'] = sourceId;
					linkElemObj['targetId'] = targetId;
					linkElemObj['customDetails'] = customDetails;
					linkElemObj['vertices'] = linkElement.get('vertices');
					returnedlinksArray.push(linkElemObj);
				});
				returnedData = returnedlinksArray;
			}
			return returnedData;
		},
		updateLinkLabel : function(treeId, fromNodeId, toNodeId, labelText) {
			if(treeId != undefined && treeId != null && treeId != '')
			{
				var graph = $('#'+treeId).data('graph');
				var gTree = graph.gTree;
				var link = gTree.getLink(graph, fromNodeId, toNodeId);
				if(link != undefined && link != null)
				{
					link.label(0, { attrs: { text: { "font-family": "arial", "font-size": "11", "text": labelText } }, position:0.5 });
				}
			}	
		}
	};

	// Extend it from orginal plugin jQuery
	$.extend(true, $.path_gTree, $.struts2_jquery);
	$.path_gTree.debugPrefix = "[path_gTree] ";

})(jQuery);

