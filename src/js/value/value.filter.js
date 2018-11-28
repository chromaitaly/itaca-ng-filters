(function() {
	'use strict';
	
	angular.module("itaca.filters").filter('chValue', ValueFilter);
	
	/* @ngInject */
	function ValueFilter($sce, $translate, chCurrencyFilter) {
		return function(value) {
			var text = null, translate = null;
			if(value && value.unit){
				
				value.count = value.count || 0;
				
				translate = $translate.instant([
					'date.hour', 'date.hours', 
					'date.day', 'date.days', 
					'common.night', 'common.nights', 
					'date.week', 'date.weeks', 
					'date.month', 'date.months', 
					'date.year', 'date.years', 
					'common.unit', 'common.units'
				]);
				text = value.count + ' ';
				
				switch(value.unit){
					case 'CURRENCY'		: text = chCurrencyFilter(value.count); break;
					case 'PERCENTAGE'	: text = value.count.toFixed(2) + '%'; break;
					case 'HOURS'		: text += (value.count == 1) ?  translate['date.hour'] : translate['date.hours']; break;
					case 'DAYS'			: text += (value.count == 1) ?  translate['date.day'] : translate['date.days']; break;
					case 'NIGHTS'		: text += (value.count == 1) ?  translate['common.night'] : translate['common.nights']; break;
					case 'WEEKS'		: text += (value.count == 1) ?  translate['date.week'] : translate['date.weeks']; break;
					case 'MONTHS'		: text += (value.count == 1) ?  translate['date.month'] : translate['date.months']; break;
					case 'YEARS'		: text += (value.count == 1) ?  translate['date.year'] : translate['date.years']; break;
				}
				
				return $sce.trustAsHtml(text);
			}
		}
	}
})();