require.config({
	baseUrl:'/javascript',
	paths:{
		'angular':'libs/angular',
		'angularAMD': 'libs/angularAMD',
		'jquery':'libs/jquery-1.4.2',
		'ngStrap':'libs/angular-strap',
		//libs

		'api':'services/api',
		'constant':'services/constant',
		'errorMsg':'services/errorMsg',
		'localStore':'services/localStorage',
		'loginHelp':'services/loginHelp',
		'showError':'services/showError',
		'utility':'services/utility',
		'validation':'services/validation',
		//services

		'breadcrumb':'directive/breadcrumb',
		'cppreview':'directive/cpPreview',
		'toolist':'directive/mainSideMenu',
		'onlinetalk':'directive/onlineTalk',
		'pickaddress':'directive/pickAddress',
		'pickbirthday':'directive/pickBirthday',
		'pickeducation':'directive/pickEducation',
		'pickheight':'directive/pickHeight',
		'pickincome':'directive/pickIncome',
		'profile':'directive/profile',
		'register':'directive/registerAndLogin',
		'spotlight':'directive/spotlight',
		'userstatus':'directive/userStatusBanner',
		//directive

		'webController':'sub_modules/webController',
		//sub modules controller
		'landing':'controllers/landing/landing',
		'register':'controllers/register/register',
		'home':'controllers/home/home',
		'edit':'controllers/edit/basic',
		'login':'controllers/login/login',
		'matchCondition':'controllers/research/newMatchCondition',

		'inbox':'controllers/msg/inbox',
		'sendMsg':'controllers/msg/sendMsg',


		'userDetail':'controllers/user/userDetail'

		
	},
	shim:{
		'angular': {
			exports: 'angular'
		},
		'ngStrap':['angular'],

		'landing':['angular','webController'],
		'register':['angular','webController'],
		'home':['angular','webController'],
		'edit':['angular','webController'],
		'login':['angular','webController']
	},
	 deps: ['app']
});