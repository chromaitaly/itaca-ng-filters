(function() {
	'use strict';

	angular.module("itaca.filters").filter('utcTimeAgo', UtcTimeAgoFilter);

	/* @ngInject */
	function UtcTimeAgoFilter(amTimeAgoFilter) {
		return function(value, suffix) {
			return amTimeAgoFilter(moment(value).utcOffset(0, true), suffix);
		}
	}
})();