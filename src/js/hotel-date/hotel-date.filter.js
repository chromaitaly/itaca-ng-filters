(function() {
	'use strict';
	
	angular.module("itaca.filters").filter('hotelDate', HotelDateFilter);
	
	/* @ngInject */
	function HotelDateFilter(offsetDateFilter, DateUtils, AppOptions) {
		return function(date, format, timeZoneId) {
			if (!timeZoneId) {
				if (AppOptions.hotel && AppOptions.hotel.addressInfo && AppOptions.hotel.addressInfo.timeZoneId) {
					timeZoneId = AppOptions.hotel.addressInfo.timeZoneId;
				}
			}
			
			var tz = moment.tz.zone(timeZoneId);
			
			return offsetDateFilter(date, format, DateUtils.secondsToOffsetString(tz ? tz.utcOffset(Date.now()) * 60 : AppOptions.defaultOffset));	
		};
	}
})();