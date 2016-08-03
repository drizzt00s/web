agMain.factory('validation', function(errorMsg){
	return {
		isEmpty:function(value) {
			return (value === null) || (value === undefined) || (angular.isArray(value) && value.length === 0) || ((value + "") === "") || (typeof value === "object" && !hasProperty(value));
		},

		isDefault:function(value){
			return (value === '请选择年' || value === '请选择月' || value === '请选择日')
		},

		checkEmpty:function(object){
			var storeError = [];
			for(var key in object){
				var isEmpty = this.isEmpty(object[key]);
				if(isEmpty){
					var errObj = {};
					errObj[key] = errorMsg.getError(key, 'empty');
					storeError.push(errObj);
				}
			}
			return storeError;
		}





	};
});