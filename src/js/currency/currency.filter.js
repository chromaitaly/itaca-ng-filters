(function() {
	'use strict';
	
	angular.module("itaca.filters").filter('chCurrency', CurrencyFilter);
	
	/* @ngInject */
	function CurrencyFilter($filter, iso4217, Currency, AppOptions) {
		
		var chCurrency = function(amount, currencyISO, baseCurrencyISO){
			
			baseCurrencyISO = baseCurrencyISO || AppOptions.defaultCurrency || "EUR";
			currencyISO = currencyISO || Currency.current.iso || "EUR";

			var currency = iso4217.getCurrencyByCode(currencyISO);
			
			if (_.isNil(currency)) {
				currency = {iso : 'EUR', symbol: "€", rate : 1, fraction: 2};
			} 
			
			// estraggo il simbolo della valuta 
			var symbol;
			
			if(currency.symbol){
				// se il simbolo è univoco uso quello altrimenti uso anche la ISO 
				if(currency.symbol == '$' && currencyISO != 'USD'){
					symbol = currency.symbol + currencyISO;
					
				} else if(currency.symbol == '¥' && currencyISO != 'JPY'){
					symbol = currency.symbol + currencyISO;
					
				} else{
					symbol = currency.symbol;
				}
			} else {
				symbol = currencyISO;
			}
			
			var currencyRate = 1;
			if (currencyISO != baseCurrencyISO) {
				var exchange = Currency.getExchangeForCurrencyCached(baseCurrencyISO);
				
				if (!exchange) {
					// lancio la richiesta e al prossimo digest cycle sarà nel cookie
					Currency.getExchangeForCurrency(baseCurrencyISO);
				
				} else {			
					currencyRate = _.find(exchange.rates, function(value, key) {
						return key == currencyISO;
					});
				}				
			} 
					
			// calcolo valuta
			amount = amount * currencyRate;
					
			return $filter('currency')(amount, symbol, currency.fraction);
		};
		
		chCurrency.$stateful = true;
		
		return chCurrency;	
	}
})();