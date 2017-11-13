(function() {
	'use strict';
	
	angular.module("itaca.filters").filter('beautifyCard', BeautifyCardFilter);
	
	/* @ngInject */
	function BeautifyCardFilter(ReservationUtils) {
		return function(val) {
			return ReservationUtils.beautifyCardPan(val);
		};
	}
})();