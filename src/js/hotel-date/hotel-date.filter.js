(function() {
	'use strict';
	
	angular.module("itaca.filters").filter('hotelDate', HotelDateFilter);
	
	/* @ngInject */
	function HotelDateFilter(dateFilter, AppOptions) {
		return function(date, format, timeZoneId) {
			if (!timeZoneId) {
				if (AppOptions.hotel && AppOptions.hotel.addressInfo && AppOptions.hotel.addressInfo.timeZoneId) {
					timeZoneId = AppOptions.hotel.addressInfo.timeZoneId;
				}
			}
			
			var _date = moment(date).tz(timeZoneId);
			_date = moment(_date).utcOffset(0,true).local();
			return dateFilter(_date.toDate(), format);
		};
	}
})();