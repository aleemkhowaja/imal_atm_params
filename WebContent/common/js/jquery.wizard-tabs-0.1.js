/**
 *  WizardTabs Plugin 0.1
 *
 *  Copyright 2011,
 *  Author: Bruno Felix, White Road Software
 *  Licenced under the MIT license.
 *  http://www.opensource.org/licenses/mit-license.php
 *
 *  Depends:
 *    jquery.ui.tabs
 *    jquery.ui.button
 *  */

(function( $ ){
    /**
     * The plugin already provides some sensible defaults that enable the user to use it without
     * any kind of configuration.
     * */
    var defaults = {
        prevLabel: "Previous",
        nextLabel: "Next",
        submitLabel: "Submit",
        defaultPrevIcon: "ui-icon-circle-arrow-w",
        defaultNextIcon: "ui-icon-circle-arrow-e",
        defaultSubmitIcon: "ui-icon-circle-check",
        endActionEnabled: true,
        submitAction: function(){ alert("Please remember to set the submit action."); }
    };

    var opts = {};
    var buttonSize = 0;
    var sufix = "";

    var methods = {
        /**
         * The init is the only public method that this plugin exposes. Its options require the following fields:
         * submitAction - the action to be executed when the submit button is clicked.
         * */
        init : function( options ){
            var $baseElem = this;
            
            sufix = Math.ceil(Math.random()*2048);
            
            $.extend(opts, defaults, options);

            return this.each(function(){
                var links = [];
                $baseElem.find("ul:first li a").each(function() {
                    links.push($(this));
                });

                var $prev = null;
                
                var length = links.length;
                for (var i = 0; i < length; i++) {
                    var leftId = "btnContainerLeft" + i + sufix;
                    var rightId = "btnContainerRight" + i + sufix;
                    var $baseDiv = $(links[i].attr("href"));
                    $baseDiv.css("overflow-y", "auto");
                    
                    //Depending if the height is fixed, the buttons are absolutelly positioned.
                    if(opts.height !== undefined){
                      $baseDiv.append("<div style='position: absolute; bottom: 10px; width: 95%; text-align:center; margin:auto;'><div id='"+leftId+"' style='float:left;text-align:left; padding:10px;'></div><div id='"+rightId+"' style='float:right;text-align:right; padding:10px;'></div></div>");
                    }else{
                      $baseDiv.append("<div style='text-align:top; margin:auto;'><div id='"+leftId+"' style='float:left;text-align:left; padding:10px;'></div><div id='"+rightId+"' style='float:right;text-align:right; padding:10px;'></div></div>");
                    }

                    var $containerLeft = $("#" + leftId);
                    var $containerRight = $("#" + rightId);
                    if (i > 0) {
                        _generatePrevBtn($prev, $containerLeft);
                    }

                    
                    if (i < length - 1) {
                        var $next = links[i + 1];
                        _generateNextBtn($next, $containerRight);
                    }

                    if(opts.endActionEnabled){
                        if (i == length - 1) {
                            _generateSubmit($containerRight);
                        }
                    }
                    $prev = links[i];
                    $containerLeft.parent().append("<div style='clear: both;'></div>");
                    $containerRight.parent().append("<div style='clear: both;'></div>");

                    if(buttonSize == 0){
                        buttonSize = parseInt($containerRight.css("font-size"), 10) * 5;
                    }
                    //If the container height is fixed, then we cannot exceed it, so we trim the content divs.
                    if(opts.height !== undefined){
                        //TODO: be careful - the value of 2 * buttonsite may not be correct!
                        var reduced = Math.abs(opts.height - (2*buttonSize));
                        $baseDiv.height(reduced);
                    }
                }

                $baseElem.tabs();
                //Setting height for the whole container.
                if(opts.height !== undefined){
                    $baseElem.height(opts.height);
                }
                /*
                  else{
                    $baseElem.height(_getMaxHeight($baseElem, buttonSize));
                  }
                */
            });
        },
        
        /**
         * Resizes the container divs (if its size is not set by the user) and the
         * divs that have the content in order to accomodate larger buttons.         
         **/
        resize: function(){
          var $baseElem = this;
          return this.each(function(){
            var newBtnSize = 0;
            var dif = 0;
            var links = [];
            $baseElem.find("ul li a").each(function() {
                links.push($(this));
            });

            var $prev = null;
            var length = links.length;
            for (var i = 0; i < length; i++) {
              $baseDiv = $(links[i]);
              
              //find out the current font-size for the buttons.
              if(newBtnSize == 0){
                newBtnSize = parseInt($('#btnContainerRight' + i + sufix).css("font-size"), 10) * 5;
                dif = newBtnSize - buttonSize;
              }
              
              //If the container height is fixed, then we cannot exceed it, so we trim the content divs.
              if(opts.height !== undefined){
                var reduced = Math.abs($baseDiv.height() + dif);
                $baseDiv.height(reduced);
              }
            }
            
            /*if(opts.height === undefined){
              $baseElem.height(_getMaxHeight($baseElem, dif));
            }*/
            buttonSize = newBtnSize;
            
          });
        }
    };

    $.fn.wizardTabs = function( method) {
      if ( methods[method] ) {
        return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
      } else if ( typeof method === 'object' || ! method ) {
        return methods.init.apply( this, arguments );
      } else {
        $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
      }    
    };

    function _generateNextBtn($next, $container){
        _generateButton($container , opts.defaultNextIcon, opts.nextLabel, function(){ $next.trigger("click"); });
    }

    function _generatePrevBtn($prev, $container){
        _generateButton($container , opts.defaultPrevIcon, opts.prevLabel, function(){ $prev.trigger("click"); });
    }

    function _generateSubmit($container){
        _generateButton($container , opts.defaultSubmitIcon, opts.submitLabel, opts.submitAction);
    }

    function _generateButton($container, iconClass, text, action){
        var genId = "wizardBtn" + Math.floor(Math.random()*2048);
        var $button = $("<div id='"+genId+"'>"+text+"</div>");
        $button.button({icons:{primary: iconClass}}).click(function(){action();});
        $container.append($button);
    }

    function _getMaxHeight($elem, buttonSize){
        var max = 0;
        $elem.children("div").each(function(){
            var h = $(this).height();
            max = h > max ? h : max;
        });
        //alert("elem: " + $elem.height() + " max: " + max + " btn: " + buttonSize);
        return result = $elem.height() + buttonSize;
    }

})( jQuery );

