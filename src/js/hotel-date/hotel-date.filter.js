(function() {
	'use strict';
	
	angular.module("itaca.filters").filter('hotelDate', HotelDateFilter);
	
	/* @ngInject */
	function HotelDateFilter(dateFilter, AppOptions) {
		return function(date, format, timeZoneId) {
			if (!timeZoneId) {
				if (AppOptions.currentHotel && AppOptions.currentHotel.addressInfo && AppOptions.currentHotel.addressInfo.timeZoneId) {
					timeZoneId = AppOptions.currentHotel.addressInfo.timeZoneId;
				}
			}
			
			var _date = timeZoneId ? moment(date).tz(timeZoneId) : moment(date);
			_date = moment(_date).utcOffset(0,true).local();
			
			return dateFilter(_date.toDate(), format);
		};
	}
})();