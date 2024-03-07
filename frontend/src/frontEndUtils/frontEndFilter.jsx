import Fuse from 'fuse.js';
import axios from 'axios';

const fuseOptions = {
	// isCaseSensitive: false,
	// includeScore: false,
	shouldSort: true,
	// includeMatches: false,
	// findAllMatches: false,
	// minMatchCharLength: 1,
	// location: 0,
	// threshold: 0.6,
	// distance: 100,
	// useExtendedSearch: false,
	// ignoreLocation: false,
	// ignoreFieldNorm: false,
	// fieldNormWeight: 1,
	keys: [
		"name",
		"type"
	]
};
const searchAlgorithm=async(input)=>{
	const response=await axios.get("http://localhost:8000/api/getDictionary")
    const dictionary=response.data.dictionary[0].items
	const fuse = new Fuse(  dictionary, fuseOptions);
	const log =fuse.search(input).slice(0,20).map(ser=>console.log(ser.item))
	// return fuse.search(name)[0].item;

}

// Declare fuseDestination as a function before exporting it


export default searchAlgorithm;
