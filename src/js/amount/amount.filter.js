(function() {
	'use strict';
	
	angular.module("itaca.filters").filter('chAmount', AmountFilter);
	
	/* @ngInject */
	function AmountFilter($sce, chCurrencyFilter) {
		return function(amount, showDiscount, hideZero) {
			var text = null;
			if (amount) {
				text = "<span>";
				var type = amount.type || "PRICE";
				var finalAmount = _.isNil(amount.finalAmount) ? amount.initialAmount : amount.finalAmount;
				
				if (!finalAmount && hideZero) {
					return null;
				}
				
				finalAmount = finalAmount || 0;
				
				if (showDiscount && amount.initialAmount) {
					if (type == "PRICE" && amount.initialAmount > finalAmount) {
						text += "<small class=\"text-gray-light text-striked\">" + chCurrencyFilter(amount.initialAmount) + "</small>&nbsp;";
							
					} else if (type == "PERCENTAGE" && amount.initialAmount < finalAmount) {
						text += "<small class=\"text-gray-light text-striked\">" + amount.initialAmount + "%</small>&nbsp;";						
					}					
				}
				
				text += "<span>";
				
				if (type == "PRICE") {
					text += chCurrencyFilter(finalAmount);
						
				} else if (type == "PERCENTAGE") {
					text += finalAmount + "%";
				}
				
				text += "</span></span>";
			}
			
			return $sce.trustAsHtml(text);
		}
	}
})();