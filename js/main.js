"use strict";

(function () {
	var a = ["Hydrogen", "Helium", "Lithium", "Beryl­lium"];

	var a2 = Symbol();

	console.log(a2);

	var a3 = a.map(function (s) {
		return s.length;
	});
})();