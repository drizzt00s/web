agMain.factory('showError', function(){
	return {
		displayError:function(errorObj){
			for(var i = 0 ; i < errorObj.length; i ++){
				this.InsertError(errorObj[i]);
			}
		},

		InsertError:function(eachErrorObj){
			var errBubble = $("<span></span>");
			errBubble.addClass('roundBorder').addClass('vlidationError');
			for(var key in eachErrorObj){
				errBubble.text(eachErrorObj[key]);
				var errContainer = $('.' + key).find('span.error');
				errContainer.append(errBubble);
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