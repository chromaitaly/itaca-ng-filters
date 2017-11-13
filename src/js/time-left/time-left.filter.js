(function() {
	'use strict';
	
	angular.module("itaca.filters").filter('timeLeft', TimeLeftFilter);
	
	/* @ngInject */
	function TimeLeftFilter() {
		return function(date, units, suffix, ceil) {
			if (ceil) {
				var value = moment.duration(moment(date).diff(moment())).as(units);
				return moment.duration(Math.ceil(value), units).humanize(suffix);
			
			} else {
				return moment.duration(moment(date).diff(moment(), units), units).humanize(suffix);
			}
		};
	}
})();