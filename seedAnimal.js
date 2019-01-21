module.exports = function() {
	const fruit = ['Apple', 'Banana', 'Pear', 'Cherry', 'Pineapple', 'Orange'];
	const things = ['Book', 'Slipper', 'Pencil', 'Bus', 'Chair', 'Phone'];
	const species = ['pig', 'sheep', 'horse', 'cat', 'dog', 'chicken'];

	/**
	 * Return a string built out of elements randomly selected 
	 * from passed in Arrays. Used to make up junk data.
	 */
	function randomish() {
		const result = [];
		Array.prototype.map.call(arguments, function(arr){
			result.push(arr[Math.floor(Math.random() * arr.length)]);
		});
		return result.join(' ');
	}

	const animals = [];
	for (var i=0; i < 1200; i++) {
		let randName = randomish(fruit, things);
		if (i%2 === 0) {
			// Used to demo sorting of mixed case results.
			randName = randName.toLowerCase();
		}
		animals.push({
			name: randName,
			species: randomish(species),
			license: i + 1000
		});
	}
	return animals;
};