(function() {
	'use strict';
	
	angular.module("itaca.filters").filter('abs', AbsFilter);
	
	/* @ngInject */
	function AbsFilter() {
		return function(val) {
			return Math.abs(val);
		}
	}
})();