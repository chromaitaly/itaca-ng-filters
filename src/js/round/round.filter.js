(function() {
	'use strict';
	
	angular.module("itaca.filters").filter('round', RoundFilter);
	
	/* @ngInject */
	function RoundFilter() {
		return function(val) {
			return Math.round(val);
		}
	}
})();