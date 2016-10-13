agMain.factory('showError', function(){
	return {
		displayError:function(errorObj, whichPage){
			for(var i = 0 ; i < errorObj.length; i ++){

				if(whichPage === 'landing'){
					this.insertErrorSimple(errorObj[i]);
				} else{
					this.InsertError(errorObj[i]);
				}
				
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

		insertErrorSimple:function(errorObj){
				for( r in errorObj){
					var error = errorObj[r];
					var errContainer = $('.' + r).find('.error');
					errContainer.text(error);
				}
		},

		reset:function(){
			$('.vlidationError').remove();
			$(".error").text('');
		},

		removeError:function(errorBubble){
			errorBubble.remove();
		}

	};
});