import React from 'react';
import axios from 'axios';

var axios = require('axios');

module.exports = {
	fetchPopularRepos: function (term) {
		varEncodedURI = window.encodeURI(`http://www.reddit.com/r/lfg.json`);

		return axios.get(encodeURI)
		.then(function (response) {
			return response.data.items;
		});
	}
}

fetchPopularRepos('term')