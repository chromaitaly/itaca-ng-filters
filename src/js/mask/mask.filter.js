(function() {
	'use strict';
	
	angular.module("itaca.filters").filter('mask', MaskFilter);
	
	/* @ngInject */
	function MaskFilter() {
		return function(val) {
			return val.replace(/.(?=.{4,}$)/g, '*');
		}
	}
})();