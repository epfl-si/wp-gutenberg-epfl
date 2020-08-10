/**
 * jQuery changeElementType
 *
 * @author Karen Ziv <me@karenziv.com>
 */

;(function($, window, document, undefined) {

    'use strict';
  
      // Create the defaults once
      var pluginName = 'changeElementType';
      var defaults = {
          keepEvents: true
      };
  
      // The actual plugin constructor
      function Plugin(element, newType, options) {
          this.element = element;
      this.newType = newType;
  
          // jQuery has an extend method which merges the contents of two or
          // more objects, storing the result in the first object. The first object
          // is generally empty as we don't want to alter the default options for
          // future instances of the plugin
          this.settings = $.extend( {}, defaults, options );
          this._defaults = defaults;
          this._name = pluginName;
          this.init();
      }
  
      $.extend(Plugin.prototype, {
          init: function() {
  
        // Make sure the tag name is actually different
        if (this.element.tagName === this.newType.toUpperCase()) {
          return this.element;
        }
  
        // Collect the element attributes
        var attrs = {};
        $.each(this.element.attributes, function(idx, attr) {
          attrs[attr.nodeName] = attr.nodeValue;
        });
  
        // Get the events bound to this element
        if (this.settings.keepEvents) {
          // We need to clone the events object using extend instead of just assigning
          // because replaceWith will nullify the reference caused in pure assignment.
          var events = $.extend(true, {}, $._data(this.element, 'events'));
        }
  
        // Build the new element and replace the old one
        var newElement = $("<" + this.newType + "/>", attrs).append($(this.element).contents());
        $(this.element).replaceWith(newElement);
  
        // Reattach any events that were lost in replaceWith
        if (typeof events != 'undefined') {
          $.each(events, function(event, handlers) {
              $.each(handlers, function(j, handler) {
              newElement.bind(event, handler);
            });
          });
        }
  
        return newElement;
          }
      });
  
      $.fn[ pluginName ] = function(newType, options) {
          return this.each(function() {
              if (!$.data(this, 'plugin_' + pluginName)) {
                  $.data(this, 'plugin_' +
                              pluginName, new Plugin(this, newType, options));
              }
          });
      };
  
  })(jQuery, window, document);
  