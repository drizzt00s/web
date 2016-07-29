agMain.factory('validation', function(){
	return {
		isEmpty:function(value) {
			return (value === null) || (value === undefined) || (angular.isArray(value) && value.length === 0) || ((value + "") === "") || (typeof value === "object" && !hasProperty(value));
		}


	}
});