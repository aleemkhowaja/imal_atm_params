/*
 * dashboard 1.0
 * http://connect.gxsoftware.com/dashboardplugin/demo/dashboard.html
 *
 * Copyright (c) 2010 Mark Machielsen
 *
 * Dual licensed under the MIT and GPL licenses (same as jQuery):
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */
 
(function($) { // Create closure.
	
  // Constructor for dashboard object.
  $.fn.dashboard = function(options) {
    // Public properties of dashboard.
    var dashboard = {};
    var loading;
    var widgetDirectoryUrl;
    dashboard.layout;
    dashboard.element = this;
    dashboard.id = this.attr("id");
    dashboard.widgets = {};
    dashboard.widgetsToAdd = {};
    dashboard.widgetCategories = {};
    dashboard.initialized = false;
    dashboard.isSaved = false;//[pathSolutions-MarwanMaddah]:used to manage and avoid duplication on saveLayout request.
    dashboard.isEmpty=false;

    // Public methods
    dashboard.serialize = function() { 
      dashboard.log('entering serialize function',1);
      var r = '{"layout": "' + dashboard.layout.id + '", "data" : [';
      // add al widgets in the right order
      var i=0;
      if ($('.' + opts.columnClass).length == 0) dashboard.log(opts.columnClass  + ' class not found',5);
      $('.' + opts.columnClass).each(function() {
        $(this).children().each(function() {
          if ($(this).hasClass(opts.widgetClass)) {
            if (i > 0) { r+= ','; }
            r+= (dashboard.getWidget($(this).attr("id"))).serialize();
            i++;
          }
        });    
      });
      r+= ']}';
      return r;    
    }

    dashboard.log = function(msg, level) {
      if (level >= opts.debuglevel && typeof console != 'undefined') {
        var l = '';
        if (level == 1) l = 'INFO';
        if (level == 2) l = 'EVENT';
        if (level == 3) l = 'WARNING';
        if (level == 5) l = 'ERROR';
        console.log(l + ' - ' + msg);      
      }    
    }
        
    dashboard.setLayout = function(layout) {   
      if (layout != null) {
        dashboard.log('entering setLayout function with layout ' + layout.id,1);
      } else {
        dashboard.log('entering setLayout function with layout null',1);
      }      
      dashboard.layout = layout;

      loading.remove();
      if (dashboard.layout != null) {
        if (typeof opts.layoutClass != 'undefined') {
          this.element.find('.' + opts.layoutClass).addClass(dashboard.layout.classname);
        } else {
          this.element.html(dashboard.layout.html);
        }
      }
      
      // make the columns sortable, see http://jqueryui.com/demos/sortable/ for explaination
      $('.' + opts.columnClass).sortable({
        connectWith: $('.' + opts.columnClass),
        opacity: opts.opacity,
        handle: '.' + opts.widgetHeaderClass,
        over: function(event, ui) { 
          $(this).addClass("selectedcolumn");
        },
        out: function(event, ui) {
          $(this).removeClass("selectedcolumn");
        },
        receive: function(event, ui) {
          // update the column attribute for the widget
          var w = dashboard.getWidget(ui.item.attr("id"));
          w.column = getColumnIdentifier($(this).attr("class"));

          dashboard.element.trigger("dashboardStateChange",{"stateChange":"widgetMoved","widget":w});

          dashboard.log('widgetDropped event thrown for widget ' + w.id,2);
          w.element.trigger("widgetDropped",{"widget":w});
          //Pathsolutions set flag to know inside the stop that no need to trigger the dashboardStateChange
          w.widgetDropped = true;
        },
        deactivate: function(event, ui) { 
          // This event is called for each column
          dashboard.log('Widget is dropped: check if the column is now empty.',1);        
          var childLength = $(this).children().length;
          if (childLength == 0) {
            dashboard.log('adding the empty text to the column',1);        
            $(this).html('<div class="emptycolumn">' + (typeof drag_widget_key != "undefined" ? drag_widget_key : opts.emptyColumnHtml)+ '</div>');              
          } else {
            if (childLength == 2) {
              // remove the empty column HTML
              $(this).find('.emptycolumn').remove();          
            }
          }
        },
        start: function(event, ui) {
        	var w = dashboard.getWidget(ui.item.attr("id"));
        	//PathSolutions: setting oldPos to know if widget is moved within same column so that the saveLayout will be called
        	w.oldPos = w.element.index();
            ui.item.find('.' + opts.widgetTitleClass).addClass('noclick');
        },
        stop: function(event, ui) {
        	 var w = dashboard.getWidget(ui.item.attr("id"));
        	 if(w.widgetDropped !== true && w.oldPos != w.element.index()) //means widget moved position within same column
    		 {
	        	dashboard.element.trigger("dashboardStateChange",{"stateChange":"widgetMoved","widget":w});
    		 }
        	 w.widgetDropped = null;
            //sorting changed (within one list)
            setTimeout(function(){
              ui.item.find('.' + opts.widgetTitleClass).removeClass('noclick');
             }, 300);
        }

      });
      
      fixSortableColumns();
      
      // trigger the dashboardLayoutLoaded event
      dashboard.log('dashboardLayoutLoaded event thrown',2);        
      dashboard.element.trigger("dashboardLayoutLoaded");      
    }
    
    // This is a workaround for the following problem: when I drag a widget from column2 to column1, sometimes the widget is
    // moved to column3, which is not visible
    function fixSortableColumns() {
      dashboard.log('entering fixSortableColumns function',1);
      $('.nonsortablecolumn').removeClass('nonsortablecolumn').addClass(opts.columnClass);            
      $('.' + opts.columnClass).filter(function() {return $(this).css("display") == 'none'}).addClass('nonsortablecolumn').removeClass(opts.columnClass);              
    }
    
    function getColumnIdentifier(classes) {
      dashboard.log('entering getColumnIdentifier function',1);
      var r;
      var s = classes.split(" ");
      for (var i = 0;i < s.length;i++) {
        if (s[i].indexOf(opts.columnPrefix) === 0) { r = s[i] };
      };
      return r.replace(opts.columnPrefix,'');
    }

    dashboard.loadLayout = function() {    
      dashboard.log('entering loadLayout function',1);
      if (typeof opts.json_data.url != 'undefined' && opts.json_data.url.length > 0) {
        // ajax option
        dashboard.log('Getting JSON feed : ' + opts.json_data.url,1);
        $.getJSON(opts.json_data.url, function(json) {
          if (json == null) {
          	if(typeof invalid_widget_url != "undefined")
   	        	_showErrorMsg(invalid_widget_url);
			else 
	            alert('Invalid widget URL',5);

            return;
          }
          // set the layout
          var currentLayout = (typeof dashboard.layout != 'undefined') ? dashboard.layout : getLayout(json.layout);
          dashboard.setLayout(currentLayout);
          dashboard.loadWidgets(json.data);
          dashboard.isEmpty = json.emptyDash;
        }).complete(function(){ // PathSolutions addded height calculation
        	if(typeof opts.json_data.completeFn != "undefined" && $.isFunction(opts.json_data.completeFn ))
        		opts.json_data.completeFn.call();	

		});       
      } else {
        // set the layout
        var currentLayout = (typeof dashboard.layout != 'undefined') ? dashboard.layout : getLayout(json.layout);
        dashboard.setLayout(currentLayout);
        dashboard.loadWidgets(opts.json_data.data);
      }
    };
    
    dashboard.addWidget = function(obj, column) {
    	//pathsolution: checking on url if it contains javascript and escape html for the title
    	var url = obj.url;
 		if(url!='undefined' && url!=null && url.trim().toLowerCase().indexOf("javascript:")==0)
 		{
 		   _showErrorMsg(invalid_widget_url);
 		   return false;
 		}
 		obj.title = escapeHtml(obj.title);
 		
      dashboard.log('entering addWidget function',1);
      // add the widget to the column
      var wid = obj.id;
	  var wPos;
      // check if the widget is already registered and available in the dom
      if (typeof dashboard.widgets[wid] != 'undefined' && $('#' + wid).length > 0) {
        var wi = $('#' + wid);
        column = dashboard.widgets[wid].column;

        // add it to the column
        wi.appendTo(column);    

      } else {
        // build the widget    
        dashboard.log('Applying template : ' + opts.widgetTemplate,1);
        
        if ($('#' + opts.widgetTemplate).length == 0) dashboard.log('Template "' + opts.widgetTemplate + ' not found',5);
        var widgetStr = tmpl($('#' + opts.widgetTemplate).html(), obj);
        var wi = $(widgetStr);
   		wPos = column.children().length;
        // add it to the column
        wi.appendTo(column);    
        dashboard.widgets[wid] = widget({
          id: wid,
          element: wi,
          column: obj.column,
          url: (typeof obj.url != 'undefined' ? obj.url : null),
          editurl: obj.editurl,
          title: obj.title,
          open: obj.open,
          userDefinedType:obj.userDefinedType, //PathSolutions
          repUrl:obj.repUrl,
          metadata: obj.metadata,
          customHeight: obj.customHeight,
          widgetPosition:wPos,
          widgetHeaderHeight: wi.find('.' + opts.widgetHeaderClass).outerHeight(true),
          widgetContentHeight: wi.find('.' + opts.widgetContentClass).innerHeight()
        });
      }

      dashboard.log('widgetAdded event thrown for widget ' + wid,2);        
      dashboard.widgets[wid].element.trigger("widgetAdded", {"widget":dashboard.widgets[wid]});

      if (dashboard.initialized && (typeof obj.userDefinedType == "undefined" || obj.userDefinedType != "1")) { //USER DEFINED TYPES DO NOT CALL SAVELAYOUT DIRECTLY,IT WILL BE CALLED FROM saveCustomWidget METHOD
    	dashboard.log('dashboardStateChange event thrown for widget ' + wid,2);        
    	/**
    	 * [PathSolutions-MarwanMaddah]:
    	 * the trigger has been stopped to avoid the duplication of saveLoyout request on widget Drag/Drop.
    	 * based on a flag that will be true in case the dashboard entered in the save process before
    	 **/
    	if(typeof dashboard.isSaved !="undefined" && dashboard.isSaved !=null && dashboard.isSaved == false)
    	{    		
    		dashboard.element.trigger("dashboardStateChange",{"stateChange":"widgetAdded","widget":wi});
    	}
      }
      //Pathsolutions: TP#501219 added to enable resize (drag) and update widget size
	  //use handle "s" to enable dragging on the widget bottom.
      $( "#"+wid ).resizable({handles: {'s': '#resizeDragSouthHandle_'+wid},
    	//use also resize to resize widget content along with the widget div
      	alsoResize:'#widgetcontent_'+wid,
      	//set minimum height to 75px
      	minHeight: '75',
      	//on stop of dragging(mouse up) save the current widget height
      	stop: function(event, ui){
      		dashboard.resizeWidget(wid,$( "#"+wid ).height());
      		saveLayout();
      	}});
    };
    //PathSolutions:escape html.
    function escapeHtml(text) {
        var div = document.createElement('div');
        div.innerText = text;
        return div.innerHTML;
    }
    	//PathSolutions: new method resizeWidget
     dashboard.resizeWidget = function(wid, newHeight, toUpdate) {
    	 dashboard.log('entering resizeWidget function',1);
      	// add the widget to the column
		var wi = dashboard.getWidget(wid);
		wi.widgetContentHeight = newHeight - wi.widgetHeaderHeight;
		wi.element.find('.' + opts.widgetContentClass).outerHeight(wi.widgetContentHeight );//setting outerheight because of padding
		if(wi.element.find("iframe").length > 0)
    	{
			var iframeHeight = wi.element.find('.' + opts.widgetContentClass).height() - 2;
    		$(wi.element.find("iframe")[0]).height(iframeHeight);
    	}
		wi.element.attr("initHeight",wi.element.height());
		wi.customHeight = newHeight;
		if(toUpdate === true)
		{
		 	dashboard.element.trigger("dashboardStateChange",{"stateChange":"widgetResize","widget":wi});
		}
    };        

    dashboard.loadWidgets = function(data) {
      dashboard.log('entering loadWidgets function',1);
      dashboard.element.find('.' + opts.columnClass).empty();

	  var wi; 
      // This is for the manual feed
      $(data).each(function() {
        var column = this.column;
        dashboard.addWidget(this, dashboard.element.find('.' + opts.columnPrefix + column));
        //PathSolutions: adjust to customized height
        if(typeof this.customHeight != "undefined" && this.customHeight != "")
    	{
    		dashboard.resizeWidget(this.id,this.customHeight);
    	}
        //Pathsolutions: open widget in minimize mode 
        if(this.open === false)
    	{
        	wi = dashboard.getWidget(this.id);
			wi.open = false;
        	wi.element.trigger("widgetHide", {"widget":wi});
	        // show the open link, hide the close link
        	wi.element.find('.widgetOpen').show();
        	wi.element.find('.widgetClose').hide();  	
    	}
      }); // end loop for widgets
      
      // check if there are widgets in the temp dashboard which needs to be moved
      // this is not the correct place, but otherwise we are too late
      
      // check if there are still widgets in the temp
      $('#tempdashboard').find('.' + opts.widgetClass).each(function() {
        // append it to the first column
        var firstCol = dashboard.element.find('.' + opts.columnClass + ':first');
        $(this).appendTo(firstCol);
        
        // set the new column
        dashboard.getWidget($(this).attr("id")).column = firstCol.attr("id");
      });
      $('#tempdashboard').remove();

      // add the text to the empty columns
      $('.' + opts.columnClass).each(function() {
        if ($(this).children().length == 0) {
          $(this).html('<div class="emptycolumn">' + (typeof drag_widget_key != "undefined" ? drag_widget_key : opts.emptyColumnHtml)+ '</div>'); 
        }
      });            
      
      dashboard.initialized = true;
    };
    
    dashboard.init = function() {
      dashboard.log('entering init function',1);
      // load the widgets as fast as we can. After that add the binding
      dashboard.loadLayout();    
    }
    
    dashboard.getWidget = function(id) {
      dashboard.log('entering getWidget function',1);
      var wi = dashboard.widgets[id];
      if (typeof wi != 'undefined') {
        return wi;
      } else {
        return null;
      }
    }
    
    
    // Merge in the caller's options with the defaults.
    var opts = $.extend({}, $.fn.dashboard.defaults, options);
    var addOpts = $.extend({}, $.fn.dashboard.defaults.addWidgetSettings, options.addWidgetSettings);
    var layoutOpts = $.extend({}, $.fn.dashboard.defaults.editLayoutSettings, options.editLayoutSettings);
    if(typeof loading_key != "undefined")
      	opts.loadingHtml = '<div class="loading"><img alt="Loading, please wait" src="../common/images/loading.gif" /><p>'+loading_key+'</p></div>';
    // Execution 'forks' here and restarts in init().  Tell the user we're busy with a loading.
    var loading = $(opts.loadingHtml).appendTo(dashboard.element);
    
    /**
     * widget object
     *    Private sub-class of dashboard
     * Constructor starts
     */
    function widget(widget) {
    
      dashboard.log('entering widget constructor',1);
      // Merge default options with the options defined for this widget.
      widget = $.extend({}, $.fn.dashboard.widget.defaults, widget);
      
      // public functions
      widget.openContent = function() {
        // hide the open link, show the close link
        widget.element.find('.widgetOpen').hide();
        widget.element.find('.widgetClose').show();

        dashboard.log('entering openContent function',1);
        widget.open = true;
        if (!widget.loaded) {        	
    	  widget.element.attr("initHeight",widget.element.height()); //setting initial height to be used on fullscreen closing	
          // load the content in the widget if the state == open
          if (this.url != '' && this.url != null && typeof this.url != 'undefined') {
            // add the loading
            $(opts.loadingHtml).appendTo(widget.element.find('.' + opts.widgetContentClass));

            dashboard.log('widgetShow event thrown for widget ' + widget.id,2);        
            widget.element.trigger("widgetShow", {"widget":widget});
            //PathSolutions type not 0 external url
            /**
             * [PathSolutions-MarwanMaddah]: in case the Url is related to a report, it has to be load in a div. 
             */
            if(this.userDefinedType != "0" && this.repUrl !="1") //user custom widgets have external urls  
        	{
            	var iframeHeight = widget.element.find('.' + opts.widgetContentClass).height() - 2;
            	var theUrl  = this.url;
            	// if url starts with / then it could be application specific then context root to be added
            	if(theUrl.charAt(0) == "/")
            	{
            		theUrl = contextPath+theUrl;
            	}
            	else if(theUrl.indexOf("www.") == 0)
            	{
            		//add http on url
            		theUrl= "http://"+theUrl;
            	}
            	widget.element.find('.' + opts.widgetContentClass).html("<iframe id='iframId_' height='"+iframeHeight+"' src='"+theUrl+"' frameborder='0' width='100%' ></iframe>");
        	}
            else
            widget.element.find('.' + opts.widgetContentClass).load(contextPath+this.url, function(response, status, xhr) {
              if (status == "error") {            	  
                widget.element.find('.' + opts.widgetContentClass).html(typeof widget_not_avail_key != "undefined" ? widget_not_avail_key : opts.widgetNotFoundHtml);
              }
              widget.loaded = true;
              dashboard.log('widgetLoaded event thrown for widget ' + widget.id,2);        
              widget.element.trigger("widgetLoaded", {"widget":widget});
            });
          } else {          
            dashboard.log('widgetShow event thrown for widget ' + widget.id,2);        
            widget.element.trigger("widgetShow", {"widget":widget});

            dashboard.log('widgetLoaded event thrown',2);                  
            widget.element.trigger("widgetLoaded", {"widget":widget});
          }
        } else {
          dashboard.log('widgetShow event thrown for widget ' + widget.id,2);        
          widget.element.trigger("widgetShow", {"widget":widget});
        }
        if (dashboard.initialized && !widget.widgetRefresh) {
          dashboard.log('dashboardStateChange event thrown for widget ' + widget.id,2);        
          dashboard.element.trigger("dashboardStateChange",{"stateChange":"widgetOpened","widget":widget});        
        }
        widget.widgetRefresh = false;
      };
      widget.refreshContent = function() {
        dashboard.log('entering refreshContent function',1);
        widget.loaded = false;
        //pathsolutions: adding widget refresh not to call save when refresh is clicked
        widget.widgetRefresh = true;
        if (widget.open) {
          widget.openContent();
        }
      }
      widget.setTitle = function(newTitle){
        dashboard.log('entering setTitle function',1);
        widget.title=newTitle;
        widget.element.find('.' + opts.widgetTitleClass).html(newTitle);
        if (dashboard.initialized) {
          dashboard.log('dashboardStateChange event thrown for widget ' + widget.id,2);        
          dashboard.element.trigger("dashboardStateChange",{"stateChange":"titleChanged","widget":widget}); 
        }          
      }
      widget.closeContent = function() {
        dashboard.log('entering closeContent function',1);
        widget.open = false;

        dashboard.log('widgetHide event thrown for widget ' + widget.id,2);        
        widget.element.trigger("widgetHide", {"widget":widget});

        // show the open link, hide the close link
        widget.element.find('.widgetOpen').show();
        widget.element.find('.widgetClose').hide();

        dashboard.log('dashboardStateChange event thrown for widget ' + widget.id,2);
        dashboard.element.trigger("dashboardStateChange",{"stateChange":"widgetClosed","widget":widget});
      };
      widget.addMetadataValue = function(name, value) {    	
        dashboard.log('entering addMetadataValue function',1);
        if (typeof widget.metadata == 'undefined') {
          widget.metadata = {};
        }
        widget.metadata[name] = value;
        dashboard.log('dashboardStateChange event thrown for widget ' + widget.id,2);
        dashboard.element.trigger("dashboardStateChange",{"stateChange":"metadataChanged","widget":widget});
      };
      widget.openMenu = function() {
        dashboard.log('entering openMenu function',1);
        widget.element.find('.' + opts.menuClass).show();
      };
      widget.closeMenu = function() {
        dashboard.log('entering closeMenu function',1);
        widget.element.find('.' + opts.menuClass).hide();
      };
      widget.remove = function() {
        dashboard.log('entering remove function',1);
        //pathsolutions: if deleted widget was opened in maximized screen mode return to minimize mode before delete
        if (widget.fullscreen) {
    	    widget.element.trigger('widgetCloseFullScreen', {"widget":widget});
      	}
        widget.element.remove();      
        dashboard.log('widgetDeleted event thrown for widget ' + widget.id,2);        
        widget.element.trigger('widgetDeleted', {"widget":widget});        

        dashboard.log('dashboardStateChange event thrown for widget ' + widget.id,2);
        dashboard.element.trigger("dashboardStateChange",{"stateChange":"widgetRemoved","widget":widget});
      };
      widget.serialize = function() {
        dashboard.log('entering serialize function',1);  
        //Pathsolutions titlekey added      
        var r = '{"titlekey" : "'+widget.titlekey+'",  "title" : "' + widget.title + '", "id" : "' + widget.id + '", "column" : "' + widget.column + '","editurl" : "' + widget.editurl + '","open" : ' + widget.open + ',"url" : "' + widget.url + '"';
        //PathSolutions Adding Translation of labels in Widget
        r += ',"customize_key_trans" : "'+widget.customize_key_trans+'"'+
        	 ',"assign_key_trans" : "'+widget.assign_key_trans+'"';
        
        if (typeof widget.metadata != 'undefined') {
        
          r+= ',"metadata":{'
          var obj = widget.metadata;
          var i=0;
          for(var item in obj) {
            if (i > 0) { r+= ',' };
            
            // FIXME: support for more than string, eg numbers subobjects
            r+= '"' + item + '":"' + obj[item] + '"';
            i++;
          }
          r+= '}'
          
        }
        
        r += '}';
        return r;      
      };
      widget.openFullscreen = function() {
    	  
    	widget.widgetPosition = widget.element.index();
        dashboard.log('entering openFullscreen function',1);
        widget.fullscreen = true;

        // hide the layout div first
        var layoutDiv = $('.' + opts.columnClass);
        layoutDiv.hide();

        // move the widget that is maximized to a new fullscreen ul
        //Pathsolutions: used div instead of ul
        var fs = $('<div id="fullscreen_' + dashboard.id + '"></div>');
        fs.appendTo(dashboard.element);
        widget.element.outerHeight(dashboard.element.innerHeight() - 10); //where 10 is the margin in css, used outerheight since also takes in consideration padding so on maximize no external scrollbar only inside widget 
//        widget.element.parent().attr("id", "placeholder");
        widget.element.parent().addClass("placeholder");
        widget.element.appendTo(fs);
        
        //Pathsolutions: maximizing to full column height and modifying css class
        widget.widgetContentHeight = widget.element.height() - widget.widgetHeaderHeight;
        widget.element.find('.' + opts.widgetContentClass).height(widget.widgetContentHeight)
        if(widget.element.find("iframe").length > 0)
    	{
    		var iframeHeight = widget.element.find('.' + opts.widgetContentClass).height() - 2;
    		$(widget.element.find("iframe")[0]).height(iframeHeight);
    	}
		//calling resizeGrids after opening full screen
        resizeGrids();
      };
      widget.closeFullscreen = function() {
        dashboard.log('entering closeFullscreen function',1);
        widget.fullscreen = false;

        // move the widget back to the placeholder
        //PathSolutions: changed closing of full screen widget
//        var placeholder = $('#placeholder');
        var placeholder = $('.placeholder');
        
         //Pathsolutions: resetting height to initial widgetcontent size and resetting to default css class

        var initHeight = widget.element.attr("initHeight");
        
        if(placeholder.children().length <= widget.widgetPosition)
    	{
	        widget.element.appendTo(placeholder);
    	}
        else
    	{
	        widget.element.insertBefore(placeholder.children()[widget.widgetPosition]);
    	}
        placeholder.removeClass("placeholder")
       

        widget.element.height(initHeight );//default height of widget either in css or custom height
        dashboard.resizeWidget(widget.id,initHeight );
        
        // remove the fullscreen
        $('#fullscreen_' + dashboard.id).remove();

        // and show the layout div
        var layoutDiv = $('.' + opts.columnClass);
        layoutDiv.show();
      };
      widget.openSettings = function() {
        dashboard.log('entering openSettings function',1);
        widget.element.trigger("editSettings", {"widget":widget});
      };
      
      // called when widget is initialized
      if (widget.open) {
        widget.openContent();
      }

      widget.initialized = true;

      dashboard.log('widgetInitialized event thrown',2);                  
      widget.element.trigger("widgetInitialized", {"widget":widget});

      return widget;
    };
    

    // FIXME: can this be done easier??
    function getLayout(id) {
      dashboard.log('entering getLayout function',1);
      var r = null;
      var first = null;
      if (typeof opts.layouts != 'undefined') {

        $.each(opts.layouts,function(i, item) {
          if (i == 0) { first = item; }
          if (item.id == id) {
            r = item;
          }
        });
      }
      if (r == null) { r = first }
      return r;
    }
    
    
    $('#' + dashboard.id + ' .menutrigger').live('click', function() {
      dashboard.log('widgetOpenMenu event thrown for widget ' + widget.id,2);
      var wi = dashboard.getWidget($(this).closest('.' + opts.widgetClass).attr("id"));
      
      wi.element.trigger('widgetOpenMenu', {"widget":wi});      
      return false;
    });
        
    // add event handlers to the menu
    $('#' + dashboard.id + ' .' + opts.widgetFullScreenClass).live('click',function(e) {        
      // close the menu
      dashboard.log('widgetCloseMenu event thrown for widget ' + widget.id,2);        
      var wi = dashboard.getWidget($(this).closest('.' + opts.widgetClass).attr("id"));
      wi.element.trigger('widgetCloseMenu', {"widget":wi});      
            
      if (wi.fullscreen) {
        dashboard.log('widgetCloseFullScreen event thrown for widget ' + wi.id,2);        
        wi.element.trigger('widgetCloseFullScreen', {"widget":wi});
      } else {
        dashboard.log('widgetOpenFullScreen event thrown for widget ' + wi.id,2);        
        wi.element.trigger('widgetOpenFullScreen', {"widget":wi});
      }
      return false;
    });

    $('#' + dashboard.id + ' .controls li').live('click',function(e) {        
      // close the menu
      dashboard.log('widgetCloseMenu event thrown for widget ' + widget.id,2);        

      var wi = dashboard.getWidget($(this).closest('.' + opts.widgetClass).attr("id"));
      wi.element.trigger('widgetCloseMenu', {"widget":wi});      
      
      // use the class on the li to determine what action to trigger
      dashboard.log($(this).attr('class') + ' event thrown for widget ' + widget.id,2);        
      
      var wi = dashboard.getWidget($(this).closest('.' + opts.widgetClass).attr("id"));
      wi.element.trigger($(this).attr('class'), {"widget":wi});
      return false;
    });
    
    // add the menu events (by default triggers are connected in dashboard_jsonfeed)
    $('#' + dashboard.id + ' .' + opts.widgetClass).live('widgetCloseMenu',function(e,o) {
      dashboard.log("Closing menu " + $(this).attr("id"),1);
      o.widget.closeMenu();
    });

    $('#' + dashboard.id + ' .' + opts.widgetClass).live('widgetOpenMenu',function(e,o) {
      dashboard.log("Opening menu " + $(this).attr("id"),1);
      o.widget.openMenu();
    });

    $('#' + dashboard.id + ' .' + opts.widgetClass).live('widgetDelete',function(e,o) {
    	//PathSolutions: used _showConfirmMsg  
        _showConfirmMsg (typeof confirm_del_widget_key != "undefined" ? confirm_del_widget_key  :opts.deleteConfirmMessage, "",function(res)
        {
	  		if(res)
  			{
				dashboard.log("Removing widget " + $(this).attr("id"),1);
				o.widget.remove();
  			}
        },"res");  
        
    });

    $('#' + dashboard.id + ' .' + opts.widgetClass).live('widgetRefresh',function(e,o) {
      o.widget.refreshContent();
    });
    
    $('#' + dashboard.id + ' .' + opts.widgetClass).live('widgetCustomize',function(e,o) {
     openWrkspaceCustDlg(o.widget.id);
    });    
    
    $('#' + dashboard.id + ' .' + opts.widgetClass).live('widgetAssign',function(e,o) {
     openAssignWidgetDlg(o.widget.id);
    });
    
    $('#' + dashboard.id + ' .' + opts.widgetClass).live('widgetSetTitle',function(event, o) {
      o.widget.setTitle(o.title);
    });

    $('#' + dashboard.id + ' .' + opts.widgetClass).live('widgetClose',function(e,o) {
      dashboard.log("Closing widget " + $(this).attr("id"),1);
      o.widget.closeContent();
    });

    $('#' + dashboard.id + ' .' + opts.widgetClass).live('widgetOpen',function(e,o) {
      dashboard.log("Opening widget " + $(this).attr("id"),1);
      o.widget.openContent();
    });

    $('#' + dashboard.id + ' .' + opts.widgetClass).live('widgetShow',function() {    
      $(this).find('.' + opts.widgetContentClass).show();
    });

    $('#' + dashboard.id + ' .' + opts.widgetClass).live('widgetHide',function() {    
      $(this).find('.' + opts.widgetContentClass).hide();
    });

    $('#' + dashboard.id + ' .' + opts.widgetClass).live('widgetAddMetadataValue',function(e,o) {
      dashboard.log("Changing metadata for widget " + $(this).attr("id") + ", metadata name: " + o.name + ", value: " + o.value, 1);
      o.widget.addMetadataValue(o.name, o.value);
    });
    
    // Define a toggle event when clicking at the header
    $('#' + dashboard.id + ' .' + opts.widgetTitleClass).live('click',function(e) {
      dashboard.log("Click on the header detected for widget " + $(this).attr("id"),1);
      if (!$(this).hasClass('noclick')) {
        var wi = dashboard.getWidget($(this).closest('.' + opts.widgetClass).attr("id"));
        if (wi.open) {
          dashboard.log('widgetClose event thrown for widget ' + wi,2);        
          wi.element.trigger('widgetClose', {"widget":wi});      
        } else {
          dashboard.log('widgetOpen event thrown for widget ' + wi,2);        
          wi.element.trigger('widgetOpen', {"widget":wi});
        }
      }
      return false;
    });
    
    $('#' + dashboard.id + ' .' + opts.widgetHeaderClass).live('mouseover',function () {
      $(this).find('.' + opts.iconsClass).removeClass("hidden");
    });
        
    $('#' + dashboard.id + ' .' + opts.widgetHeaderClass).live('mouseout', function () {
      $(this).find('.' + opts.iconsClass).addClass("hidden");
    });

    $('body').click(function() {
      $('.' + opts.menuClass).hide();
    });

    $('#' + dashboard.id + ' .' + opts.widgetClass).live('widgetOpenFullScreen',function(e,o) {
      o.widget.openFullscreen();
    });

    $('.' + opts.widgetClass).live('widgetCloseFullScreen',function(e,o) {
      o.widget.closeFullscreen();      
    });

    $('#' + dashboard.id + ' .' + opts.widgetClass).live('widgetEdit',function(e,o) {
      o.widget.openSettings();      
    });
        
    if ($('#' + addOpts.dialogId).length == 0) dashboard.log('Unable to find ' + addOpts.dialogId,5);
    $('#' + addOpts.dialogId).dialog({
      autoOpen: false,
      height: 514,
      width: 750,
      modal: true,
      buttons: {
        Cancel: function() {
          $(this).dialog('close');
        }
      },
      close: function() {
        //close
      }
    });

    if ($('#' + layoutOpts.dialogId).length == 0) dashboard.log('Unable to find ' + layoutOpts.dialogId,5);
    $('#' + layoutOpts.dialogId).dialog({
      autoOpen: false,
      height: 300,
      width: 600,
      modal: true
    });

    $('.' + layoutOpts.openDialogClass).live('click', function(){
      dashboard.log('dashboardOpenLayoutDialog event thrown',2);        
      dashboard.element.trigger("dashboardOpenLayoutDialog");
      return false;
    });
    
    dashboard.element.live('dashboardOpenLayoutDialog', function(){        
      dashboard.log('Opening dialog ' + layoutOpts.dialogId,1);
      $('#' + layoutOpts.dialogId).dialog('open');

      // add the layout images
      var h = $('#' + layoutOpts.dialogId).find('.' + layoutOpts.layoutClass);
      h.empty();
      if (h.children().length == 0) {
        dashboard.log('Number of layouts : ' + opts.layouts.length,1);
        $.each(opts.layouts,function(i, item) {
          dashboard.log('Applying template : ' + layoutOpts.layoutTemplate,1);
          if ($('#' + layoutOpts.layoutTemplate).length == 0) dashboard.log('Template "' + layoutOpts.layoutTemplate + ' not found',5);
          h.append(tmpl($('#' + layoutOpts.layoutTemplate).html(), item));
        });
      }
      
      // set the selected class for the selected layout
      $('.' + layoutOpts.selectLayoutClass).removeClass(layoutOpts.selectedLayoutClass);
      $('#' + dashboard.layout.id).addClass(layoutOpts.selectedLayoutClass);
      
      bindSelectLayout();
    });


    dashboard.element.live('dashboardStateChange', function(){
       //if (typeof opts.stateChangeUrl != 'undefined' && opts.stateChangeUrl != null && opts.stateChangeUrl != '') {
    //PathSolutions: call save directly upon modifications
    var dataToSend = returnUserLayoutUpdates();
    if(dataToSend && !dashboard.isSaved)
	{
        $.ajax({type: 'POST',
          url: jQuery.contextPath+ "/pathdesktop/portalDashboardAction_saveLayout",/*opts.stateChangeUrl,*/
          data: {userPortalUpdates : dataToSend}/*{ dashboard: dashboard.element.attr("id"), settings: dashboard.serialize() }*/,
          success: function(data){
        	//[PathSolutions] jquery-3.3.1 migration - point 24 - fix Object doesn't support property or method 'indexOf' when data is json object and not string
            if (typeof data === "string" && (data == "NOK" || data.indexOf('<response>NOK</response>') != -1)){
              dashboard.log('dashboardSaveFailed event thrown',2);
              dashboard.element.trigger("dashboardSaveFailed");
            } else {
              dashboard.log('dashboardSuccessfulSaved event thrown',2);
              dashboard.element.trigger("dashboardSuccessfulSaved");
              /**
               * [PathSolutions - MarwanMaddah]
               * flag added at this level to avoid duplication of the saveLayout call
               * this issue cause a problem in case of add widget, 2 save will requested in parallel 
               * the second one will return a UNIQUE CONSTRAINT  problem.
               */
              if(typeof dashboard.isSaved != "undefined")
              {
            	  dashboard.isSaved = true;
              }
              
            }
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            dashboard.log('dashboardSaveFailed event thrown',2);
            dashboard.element.trigger("dashboardSaveFailed");
          },
          dataType: "json"
        });
    }
    if(typeof dashboard.isSaved != "undefined")
    {
  	  dashboard.isSaved = true;
    }
     // }
    });
    

    dashboard.element.live('dashboardCloseLayoutDialog', function(){   
      // close the dialog
      $('#' + layoutOpts.dialogId).dialog('close');
    });

    // FIXME: why doesn't the live construct work in this case
    function bindSelectLayout() {
      if ($('.' + layoutOpts.selectLayoutClass).length == 0) dashboard.log('Unable to find ' + layoutOpts.selectLayoutClass,5);
      $('.' + layoutOpts.selectLayoutClass).bind('click', function(e){    
        var currentLayout = dashboard.layout;
        
        dashboard.log('dashboardCloseLayoutDialog event thrown',2);        
        dashboard.element.trigger('dashboardCloseLayoutDialog');

        // Now set the new layout
        var newLayout = getLayout($(this).attr("id"));
        dashboard.layout = newLayout;

        // remove the class of the old layout
        if (typeof opts.layoutClass != 'undefined') {
          dashboard.element.find('.' + opts.layoutClass).removeClass(currentLayout.classname).addClass(newLayout.classname);
          
          fixSortableColumns();
          
          // check if there are widgets in hidden columns, move them to the first column
          if ($('.' + opts.columnClass).length == 0) dashboard.log('Unable to find ' + opts.columnClass,5);
          dashboard.element.find('.nonsortablecolumn').each(function() {
            // move the widgets to the first column
            $(this).children().appendTo(dashboard.element.find('.' + opts.columnClass + ':first'));

            $('.emptycolumn').remove();
            // add the text to the empty columns
            $('.' + opts.columnClass).each(function() {
              if ($(this).children().length == 0) {
                $(this).html('<div class="emptycolumn">' + (typeof drag_widget_key != "undefined" ? drag_widget_key : opts.emptyColumnHtml)+ '</div>');
              }
            });            
            
            
          });
          
        } else {
          // set the new layout, but first move the dashboard to a temp
          var temp = $('<div style="display:none" id="tempdashboard"></div>');
          temp.appendTo($("body"));

          dashboard.element.children().appendTo(temp);

          // reload the dashboard
          dashboard.init();
        }
		//calling resizeGrids after loading new layout
        resizeGrids();
        // throw an event upon changing the layout. 
        dashboard.log('dashboardChangeLayout event thrown',2);        
        dashboard.element.trigger('dashboardLayoutChanged');
        //PathSolutions: to trigger save upon layout modification
        dashboard.element.trigger('dashboardStateChange',{"stateChange":"dashboardLayout"});

      });
      return false;
    }    

    $('.' + addOpts.selectCategoryClass).live('click', function(){     
      dashboard.log('addWidgetDialogSelectCategory event thrown',2);        
      dashboard.element.trigger('addWidgetDialogSelectCategory', {"category":$(this)});          
      return false;
    });

    dashboard.element.live('addWidgetDialogSelectCategory', function(e, obj){
      // remove the category selection
      $('.' + addOpts.selectCategoryClass).removeClass(addOpts.selectedCategoryClass);
      
      // empty the widgets div
      $('#' + addOpts.dialogId).find('.' + addOpts.widgetClass).empty();
    
      // select the category
      $(obj.category).addClass(addOpts.selectedCategoryClass);
      
      // get the widgets
      url = dashboard.widgetCategories[$(obj.category).attr("id")];

      dashboard.log('Getting JSON feed : ' + url,1);
      $.getJSON(url, {"cache":true}, function(json) {      
        // load the widgets from the category        
        if (json.data == 0) dashboard.log('Empty data returned',3);

        var items = json.data;

        if (typeof json.data.length == 'undefined') {
          items = new Array(json.data);
        }

        $.each(items, function(i,item){
          dashboard.widgetsToAdd[item.id] = item;

          dashboard.log('Applying template : ' + addOpts.widgetTemplate,1);
          if ($('#' + addOpts.widgetTemplate).length == 0) dashboard.log('Template "' + addOpts.widgetTemplate + ' not found',5);
          var html = tmpl($('#' + addOpts.widgetTemplate).html(), item);
          $('#' + addOpts.dialogId).find('.' + addOpts.widgetClass).append(html);        
        });
      });
      
      dashboard.log('addWidgetDialogWidgetsLoaded event thrown',2);        
      dashboard.element.trigger('addWidgetDialogWidgetsLoaded');    
    });


    $('.' + addOpts.addWidgetClass).live('click', function(){      
      var widget = dashboard.widgetsToAdd[$(this).attr("id").replace('addwidget','')];
      dashboard.log('dashboardAddWidget event thrown',2);        
      dashboard.element.trigger('dashboardAddWidget', {"widget":widget});    

      dashboard.log('dashboardCloseWidgetDialog event thrown',2);        
      dashboard.element.trigger('dashboardCloseWidgetDialog');
      return false;
    });

    $('.' + addOpts.openDialogClass).live('click', function(){
      dashboard.log('dashboardOpenWidgetDialog event thrown',2);        
      dashboard.element.trigger('dashboardOpenWidgetDialog');
      return false;
    });
    
    dashboard.element.live('dashboardCloseWidgetDialog', function(){   
      // close the dialog
      $('#' + addOpts.dialogId).dialog('close');
    });
        
    dashboard.element.live('dashboardOpenWidgetDialog', function(){
    
      //remove existing categories/widgets from the DOM, to prevent duplications
      $('#' + addOpts.dialogId).find('.' + addOpts.categoryClass).empty();
      $('#' + addOpts.dialogId).find('.' + addOpts.widgetClass).empty();

      dashboard.log('Opening dialog ' + addOpts.dialogId,1);
      $('#' + addOpts.dialogId).dialog('open');

      dashboard.log('Getting JSON feed : ' + addOpts.widgetDirectoryUrl,1);
      $.getJSON(addOpts.widgetDirectoryUrl, function(json) {
        if (json.category == 0) dashboard.log('Empty data returned',3);
        $.each(json.categories.category, function(i,item){
          // Add the categories to the dashboard
          dashboard.widgetCategories[item.id] = item.url;
        
          dashboard.log('Applying template : ' + addOpts.categoryTemplate,1);
          if ($('#' + addOpts.categoryTemplate).length == 0) dashboard.log('Template "' + addOpts.categoryTemplate + ' not found',5);
          var html = tmpl($('#' + addOpts.categoryTemplate).html(),item);
          $('#' + addOpts.dialogId).find('.' + addOpts.categoryClass).append(html);
        });
        dashboard.log('addWidgetDialogCategoriesLoaded event thrown',2);
        dashboard.element.trigger('addWidgetDialogCategoriesLoaded');

        dashboard.log('addWidgetDialogSelectCategory event thrown',2);
        dashboard.element.trigger('addWidgetDialogSelectCategory', {"category":$('#' + addOpts.dialogId).find('.' + addOpts.categoryClass + '>li:first')});

      });
            
    });
     
    return dashboard;
  };

    
  // Public static properties of dashboard.  Default settings.
  $.fn.dashboard.defaults = {
    debuglevel:3,
    json_data: {},
    loadingHtml: '<div class="loading"><img alt="Loading, please wait" src="../common/images/loading.gif" /><p>Loading...</p></div>',
    emptyColumnHtml: 'Drag your widgets here',
    widgetTemplate: 'widgettemplate',
    columnPrefix: 'column-',
    opacity:"0.2",
    deleteConfirmMessage: "Are you sure you want to delete this widget?",
    widgetNotFoundHtml: "The content of this widget is not available anymore. You may remove this widget.",
    columnClass: 'column',
    widgetClass: 'widget',
    menuClass: 'controls',
    widgetContentClass: 'widgetcontent',
    widgetTitleClass: 'widgettitle',
    widgetHeaderClass: 'widgetheader',
    widgetFullScreenClass: 'widgetopenfullscreen',
    iconsClass: 'icons',
    stateChangeUrl: '',
    
    addWidgetSettings: {
      openDialogClass: 'openaddwidgetdialog',
      addWidgetClass: 'addwidget',
      selectCategoryClass: 'selectcategory',
      selectedCategoryClass: 'selected',
      categoryClass: 'categories',
      widgetClass: 'widgets',
      
      dialogId: 'addwidgetdialog',
      
      categoryTemplate: 'categorytemplate',
      widgetTemplate: 'addwidgettemplate'
    },
    editLayoutSettings: {
      dialogId: 'editLayout',
      layoutClass: 'layoutselection',
      selectLayoutClass: 'layoutchoice',
      selectedLayoutClass: 'selected',
      openDialogClass: 'editlayout',
      layoutTemplate: 'selectlayouttemplate'
    }
    

  };

  // Default widget settings.
  $.fn.dashboard.widget = {
    defaults: {
      open: true,
      fullscreen: false,
      loaded: false,
      url: '',
      metadata: {}
    }
  };

})(jQuery); // end of closure


// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
  var cache = {};
 
  this.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.

    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :
     
      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
       
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +
       
        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
   
    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();
