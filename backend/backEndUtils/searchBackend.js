const Fuse = require('fuse.js');
const axios = require('axios');

const fuseOptions = {
	shouldSort: true,
	keys: [
		"name",
		"type"
	]
};

const searchAlgorithm = async (input) => {
	const response = await axios.get("http://localhost:8000/api/getDictionary");
	const dictionary = response.data.dictionary[0].items;
	const fuse = new Fuse(dictionary, fuseOptions);
	const log = fuse.search(input).slice(0, 20).map(ser => console.log(ser.item));
	// return fuse.search(name)[0].item;
};

module.exports = searchAlgorithm;

