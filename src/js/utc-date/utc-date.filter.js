(function() {
	'use strict';

	angular.module("itaca.filters").filter('utcDate', UtcDateFilter);

	/* @ngInject */
	function UtcDateFilter(dateFilter) {
		return function(date, format) {
			return dateFilter(date, format, "UTC");
		}
	}
})();