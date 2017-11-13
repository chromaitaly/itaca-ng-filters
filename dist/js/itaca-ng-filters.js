/*****************************************************************/
/** itaca-ng-filters v1.0.0 13-11-2017	**/
/** itaca-ng-filters, logos and all images are registered     	**/
/** trademarks of Chroma Italy Hotels srl.                     	**/
/** All rights reserved.                                     	**/
/** Registration code: 21-11-2016/011058        	**/
/** 						                                 	**/
/**                               Chroma Italy Hotels srl ® 2017	**/
/*****************************************************************/
(function() {
    "use strict";
    angular.module("itaca.filters", [ "ngMaterial", "itaca.utils", "itaca.services", "isoCurrency" ]);
})();

(function() {
    "use strict";
    angular.module("itaca.filters").filter("abs", AbsFilter);
    function AbsFilter() {
        return function(val) {
            return Math.abs(val);
        };
    }
})();

(function() {
    "use strict";
    BeautifyCardFilter.$inject = [ "ReservationUtils" ];
    angular.module("itaca.filters").filter("beautifyCard", BeautifyCardFilter);
    function BeautifyCardFilter(ReservationUtils) {
        return function(val) {
            return ReservationUtils.beautifyCardPan(val);
        };
    }
})();

(function() {
    "use strict";
    angular.module("itaca.filters").filter("capitalize", CapitalizeFilter);
    function CapitalizeFilter() {
        return function(input, all) {
            var reg = all ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
            return !!input ? input.replace(reg, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }) : "";
        };
    }
})();

(function() {
    "use strict";
    angular.module("itaca.filters").filter("ceil", CeilFilter);
    function CeilFilter() {
        return function(val) {
            return Math.ceil(val);
        };
    }
})();

(function() {
    "use strict";
    CurrencyFilter.$inject = [ "$filter", "iso4217", "Currency", "AppOptions" ];
    angular.module("itaca.filters").filter("chCurrency", CurrencyFilter);
    function CurrencyFilter($filter, iso4217, Currency, AppOptions) {
        var chCurrency = function(amount, currencyISO, baseCurrencyISO) {
            baseCurrencyISO = baseCurrencyISO || AppOptions.defaultCurrency || "EUR";
            currencyISO = currencyISO || Currency.current.iso || "EUR";
            var currency = iso4217.getCurrencyByCode(currencyISO);
            if (_.isNil(currency)) {
                currency = {
                    iso: "EUR",
                    symbol: "€",
                    rate: 1,
                    fraction: 2
                };
            }
            var symbol;
            if (currency.symbol) {
                if (currency.symbol == "$" && currencyISO != "USD") {
                    symbol = currency.symbol + currencyISO;
                } else if (currency.symbol == "¥" && currencyISO != "JPY") {
                    symbol = currency.symbol + currencyISO;
                } else {
                    symbol = currency.symbol;
                }
            } else {
                symbol = currencyISO;
            }
            var currencyRate = 1;
            if (currencyISO != baseCurrencyISO) {
                var exchange = Currency.getExchangeForCurrencyCached(baseCurrencyISO);
                if (!exchange) {
                    Currency.getExchangeForCurrency(baseCurrencyISO);
                } else {
                    currencyRate = _.find(exchange.rates, function(value, key) {
                        return key == currencyISO;
                    });
                }
            }
            amount = amount * currencyRate;
            return $filter("currency")(amount, symbol, currency.fraction);
        };
        chCurrency.$stateful = true;
        return chCurrency;
    }
})();

(function() {
    "use strict";
    angular.module("itaca.filters").filter("float", FloatFilter);
    function FloatFilter() {
        return function(val, format) {
            return parseFloat(val).toFixed(angular.isNumber(format) ? format : 2);
        };
    }
})();

(function() {
    "use strict";
    angular.module("itaca.filters").filter("floor", FloorFilter);
    function FloorFilter() {
        return function(val) {
            return Math.floor(val);
        };
    }
})();

(function() {
    "use strict";
    HotelDateFilter.$inject = [ "offsetDateFilter", "DateUtils", "AppOptions" ];
    angular.module("itaca.filters").filter("hotelDate", HotelDateFilter);
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

(function() {
    "use strict";
    MaskCardFilter.$inject = [ "ReservationUtils" ];
    angular.module("itaca.filters").filter("maskCard", MaskCardFilter);
    function MaskCardFilter(ReservationUtils) {
        return function(val) {
            return ReservationUtils.maskCardPan(val);
        };
    }
})();

(function() {
    "use strict";
    angular.module("itaca.filters").filter("mask", MaskFilter);
    function MaskFilter() {
        return function(val) {
            return val.replace(/.(?=.{4,}$)/g, "*");
        };
    }
})();

(function() {
    "use strict";
    OffsetDateFilter.$inject = [ "dateFilter", "DateUtils", "AppOptions" ];
    angular.module("itaca.filters").filter("offsetDate", OffsetDateFilter);
    function OffsetDateFilter(dateFilter, DateUtils, AppOptions) {
        return function(date, format, offsetSeconds) {
            offsetSeconds = Number(offsetSeconds || AppOptions.defaultOffset);
            return dateFilter(date, format, DateUtils.secondsToOffsetString(offsetSeconds));
        };
    }
})();

(function() {
    "use strict";
    angular.module("itaca.filters").filter("round", RoundFilter);
    function RoundFilter() {
        return function(val) {
            return Math.round(val);
        };
    }
})();

(function() {
    "use strict";
    angular.module("itaca.filters").filter("timeDiff", TimeDiffFilter);
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

(function() {
    "use strict";
    angular.module("itaca.filters").filter("timeLeft", TimeLeftFilter);
    function TimeLeftFilter() {
        return function(date, units, suffix, ceil) {
            if (ceil) {
                var value = moment.duration(moment(date).diff(moment())).as(units);
                return moment.duration(Math.ceil(value), units).humanize(suffix);
            } else {
                return moment.duration(moment(date).diff(moment(), units), units).humanize(suffix);
            }
        };
    }
})();

(function() {
    "use strict";
    UseFilterFilter.$inject = [ "$filter" ];
    angular.module("itaca.filters").filter("useFilter", UseFilterFilter);
    function UseFilterFilter($filter) {
        return function() {
            var filterName = [].splice.call(arguments, 1, 1)[0];
            return $filter(filterName).apply(null, arguments);
        };
    }
})();

(function() {
    "use strict";
    UtcDateFilter.$inject = [ "dateFilter" ];
    angular.module("itaca.filters").filter("utcDate", UtcDateFilter);
    function UtcDateFilter(dateFilter) {
        return function(date, format) {
            return dateFilter(date, format, "UTC");
        };
    }
})();