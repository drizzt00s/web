requirejs.config({
	baseUrl:'/javascript/libs',
	paths: {
		modules:'../modules'
	},
	shim: {
		'underscore': {
			exports: '_'
		},
		'jquery': {
			exports: '$'
		},
		'angular':{
			exports: 'angular'
		}
	}
});

var modules = [
'jquery', 
'underscore', 
'angular',
'angular-resource',
'angular-route',
'modules/userEdit', 
'modules/Compents', 
'modules/cookieHelp', 
'modules/socket', 
'modules/message',
'modules/index',
'modules/header',
'modules/agMain',
'modules/login',
'modules/allControllers',
];



require(modules, function ($, _, angular) {  
		//alert($);
	//	alert(_);
	alert(angular);
});