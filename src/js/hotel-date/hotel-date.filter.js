(function() {
	'use strict';
	
	angular.module("itaca.filters").filter('hotelDate', HotelDateFilter);
	
	/* @ngInject */
	function HotelDateFilter(offsetDateFilter, DateUtils, AppOptions) {
		return function(date, format, offsetSeconds) {
			if (offsetSeconds) {
				offsetSeconds = Number(offsetSeconds);
			
			} else {
				if (AppOptions.hotel && AppOptions.hotel.addressInfo && AppOptions.hotel.addressInfo.timeZoneId) {
					var tz = moment.tz.zone(AppOptions.hotel.addressInfo.timeZoneId);
					offsetSeconds = tz ? tz.offset(Date.now()) * 60 : AppOptions.defaultOffset;

				} else {
					offsetSeconds = AppOptions.defaultOffset;
				}
			}
			
			return offsetDateFilter(date, format, DateUtils.secondsToOffsetString(offsetSeconds));
		};
	}
})();