agMain.factory('showError', function(){
	return {
		displayError:function(errorObj){
			for(var i = 0 ; i < errorObj.length; i ++){
				this.InsertError(errorObj[i]);
			}
		},

		InsertError:function(eachErrorObj){
			var errBubble = $("<div></div>");
			errBubble.addClass('roundBorder').addClass('vlidationError');
			for(var key in eachErrorObj){
				errBubble.text(eachErrorObj[key]);

				var arrow = $("<div></div>").addClass('errorArrow');
				arrow.prependTo(errBubble);

				var errContainer = $('.' + key).find('span.error');
				if(errContainer.find('.vlidationError').length == 0){
					errContainer.append(errBubble);
				}
				
			}

		},

		reset:function(){
			$('.vlidationError').remove();
		},

		removeError:function(errorBubble){
			errorBubble.remove();
		}

	};
});