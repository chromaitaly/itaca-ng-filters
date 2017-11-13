(function() {
	'use strict';
	
	angular.module("itaca.filters").filter('float', FloatFilter);
	
	/* @ngInject */
	function FloatFilter() {
		return function(val, format) {
			return parseFloat(val).toFixed(angular.isNumber(format) ? format : 2);
		}
	}
})();