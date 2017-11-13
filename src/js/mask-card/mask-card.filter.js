(function() {
	'use strict';
	
	angular.module("itaca.filters").filter('maskCard', MaskCardFilter);
	
	/* @ngInject */
	function MaskCardFilter(ReservationUtils) {
		return function(val) {
			return ReservationUtils.maskCardPan(val);
		};
	}
})();