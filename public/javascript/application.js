define(['angularAMD',
		'angular',
		'jquery',
		'ngStrap',
		//libs

		'webController',
		//sub module that all constrollers are registered with

		'api',
		'constant',
		'errorMsg',
		'localStore',
		'loginHelp',
		'showError',
		'utility',
		'validation',
		//services

		'breadcrumb',
		'cppreview',
		'toolist',
		'onlinetalk',
		'pickaddress',
		'pickbirthday',
		'pickeducation',
		'pickheight',
		'pickincome',
		'profile',
		'register',
		'spotlight',
		'userstatus',
		//directives

		'landing',
		'register',
		'home',
		'edit',
		'login',
		'matchCondition',
		'inbox',
		'sendMsg',
		'msgDetail',


		'userDetail'
		//controllers

		], function (angularAMD) {
    var app = angular.module('web',['mgcrea.ngStrap','web.controller']);
    app.run(['$rootScope', function($rootScope){}]);

	return angularAMD.bootstrap(app);
});