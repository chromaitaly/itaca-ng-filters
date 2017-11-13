(function() {
	'use strict';

	angular.module("itaca.filters").filter('useFilter', UseFilterFilter);

	/* @ngInject */
	function UseFilterFilter($filter) {
		return function() {
			var filterName = [].splice.call(arguments, 1, 1)[0];
			return $filter(filterName).apply(null, arguments);
		};
	}
})();