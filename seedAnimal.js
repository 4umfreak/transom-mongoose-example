module.exports = function() {
	const fruit = ['Apple', 'Banana', 'Pear', 'Cherry', 'Pineapple', 'Orange'];
	const things = ['Book', 'Slipper', 'Pencil', 'Bus', 'Chair', 'Phone'];
	const species = ['pig', 'sheep', 'horse', 'cat', 'dog', 'chicken'];

	function randomish(args) {
		const result = [];
		Array.prototype.map.call(arguments, function(arr){
			result.push(arr[Math.floor(Math.random() * arr.length)]);
		});
		return result.join(' ');
	}

	const animals = [];
	for (var i=0; i < 1200; i++) {
		animals.push({
			name: randomish(fruit, things),
			species: randomish(species),
			license: i + 1000
		});
	}
	return animals;
};