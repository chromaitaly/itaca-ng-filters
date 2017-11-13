(function() {
	'use strict';
	
	angular.module("itaca.filters").filter('floor', FloorFilter);
	
	/* @ngInject */
	function FloorFilter() {
		return function(val) {
			return Math.floor(val);
		}
	}
})();