(function() {
	'use strict';
	
	angular.module("itaca.filters").filter('ceil', CeilFilter);
	
	/* @ngInject */
	function CeilFilter() {
		return function(val) {
			return Math.ceil(val);
		}
	}
})();