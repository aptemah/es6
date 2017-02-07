(function(){

	var a = [
		"Hydrogen",
		"Helium",
		"Lithium",
		"Beryl­lium"
	];


	function symbol1 () {
		var symbolName1 = Symbol('symbolName1');
		var symbolName2 = Symbol('symbolName2');
		console.log(symbolName1);
		console.log(symbolName2);
	}
	symbol1();

	//Простая форма записи, возвращает то что после стрелки
	function arrow1 () {
		var b = a.filter( item => item == "Lithium");
		console.log(b);
	}
	arrow1();

	//когда больше одного аргумента, их нужно объединить в скобки
	function arrow2 () {
		var c = a.filter( (item, index, array) => item == array[1]);
		console.log(c);
	}
	arrow2();

	//когда блок функции мы оборачиваем в фигурные скобки, нужно явно писать return
	function arrow3 () {
		var c = a.filter( (item, index, array) => {return item == array[3]});
		console.log(c);
	}
	arrow3();

	//Когда нам нужно вернуть объект, нужно обернуть его в скобки
	function arrow4 () {
		var c = a.map( item => ({'item' : item + ' new'}));
		console.log(c);
	}
	arrow4();

	//Стрелочные функции не переопределяют объект this
	function arrow5 () {
		var newObj = {};
		newObj.funcES5 = function () {
			a.forEach(function(){
				console.log(this)
			});
		}
		newObj.funcES5();

		newObj.funcES6 = function () {
			a.forEach( () => {console.log(this)})
		}
		newObj.funcES6();
	}
	arrow5();




})();