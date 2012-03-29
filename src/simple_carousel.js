/**
 * Very simple image gallery / carousel. 
 * It just creates previous and next buttons on the image 
 * and allows you to navigate between your images.
 * 
 * suleyman [at] melikoglu.info
 */

(function($) {
	// Reference of the this object,
	// Having a reference sounds like a bad idea but I don't know any workaround atm
	var self = null;
	var methods = {
		init : function(options) {
			self = this;

			return this.each(function() {
				// hide each pictures
				self.children("img").hide();

				// show the 1st one
				self.children("img:first").show().addClass("carousel-current");

				// show buttons
				methods.show_buttons($(this));

				// attach button events
				self.children(".storyviewnextphoto").children("a").bind("click.simpleCarousel", methods.next);
				self.children(".storyviewprevphoto").children("a").bind("click.simpleCarousel", methods.prev);
			});
		},
		destroy : function() {
			return this.each(function() {
				// unbind button events
				self.children(".storyviewnextphoto a").unbind("simpleCarousel");
				self.children(".storyviewprevphoto a").unbind("simpleCarousel");
			});
		},
		show_buttons : function() {
			// hide buttons first
			self.children(".storyviewnextphoto").hide();
			self.children(".storyviewprevphoto").hide();

			// determine the currently displaying picture
			var current = self.children("img:visible");

			// if there is next picture, display next button
			var next_img = current.next("img");
			if(next_img.length >= 1) {
				self.children(".storyviewnextphoto").show();
			}

			// if there is a previous picture, display prev button
			var prev_img = current.prev("img");
			if(prev_img.length >= 1) {
				self.children(".storyviewprevphoto").show();
			}
		},
		next : function() {
			// displaying the next image

			// get the current image
			var current = self.children("img:visible");

			// hide the current one, show the next one
			methods.navigation(current, current.next("img"));

			// reset the buttons
			methods.show_buttons();

			return false;
		},
		prev : function(content) {
			// displaying the previous image

			// get the current image
			var current = self.children("img:visible");

			// hide the current one, show the next one
			methods.navigation(current, current.prev("img"));

			// reset the buttons
			methods.show_buttons();

			return false;
		},
		navigation : function(current, element_to_show) {
			// check if the image is available
			if(element_to_show.length >= 1) {
				current.hide().removeClass(".carousel-current");
				element_to_show.show().addClass(".carousel-current");
			}
		}
	};

	$.fn.simpleCarousel = function(method) {

		// Method calling logic
		if(methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if( typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist');
		}

	};
})(jQuery);
