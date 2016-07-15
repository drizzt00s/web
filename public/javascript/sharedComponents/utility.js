agMain.factory('utility', function(){
	return {
		trimAge:function(d){
			if(d && d instanceof Array){
				for(var i = 0 ; i < d.length; i++){
					d[i]['age'] = d[i]['age'] + '岁';
				}
				return d;
			}
		},
		trimProfileUrl:function(d){
			if(d && d instanceof Array){
				for(var i = 0 ;i < d.length; i++){
					if(d[i]['profile'].length > 0){
						var falseName = d[i]['account'];
						d[i]['profile'] = '/uploads/pic/' + falseName + '/' + d[i]['profile'];
					} else if(d[i]['profile'].length <=0 ){
						d[i]['profile'] = '/uploads/pic/default/unknown.png';
					}
				}
				return d;
			}

		},
		trimeProfileUrlObject:function(d){
			if(d){
				if(!(d.profile)){
					d.profile = '/uploads/pic/default/unknown.png';
				} else {
					var falseName = d.falseName;
					d.profile = '/uploads/pic/' + falseName + '/' + d['profile'];
				}
				return d;
			}
		}
	}
});