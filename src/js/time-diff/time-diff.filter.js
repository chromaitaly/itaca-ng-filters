(function() {
	'use strict';
	
	angular.module("itaca.filters").filter('timeDiff', TimeDiffFilter);
	
	/* @ngInject */
	function TimeDiffFilter() {
		return function(date, otherDate, units, ceil) {
			otherDate = otherDate || new Date();
			if (ceil) {
				var diff = moment(date).diff(otherDate);
				return Math.ceil(moment.duration(diff).as(units));
			
			} else {
				return moment(date).diff(otherDate, units);
			}
		};
	}
})();