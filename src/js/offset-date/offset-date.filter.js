(function() {
	'use strict';
	
	angular.module("itaca.filters").filter('offsetDate', OffsetDateFilter);
	
	/* @ngInject */
	function OffsetDateFilter(dateFilter, DateUtils, AppOptions) {
		return function(date, format, offsetSeconds) {
			offsetSeconds = Number(offsetSeconds || AppOptions.defaultOffset);
			return dateFilter(date, format, DateUtils.secondsToOffsetString(offsetSeconds));
		}
	}
})();