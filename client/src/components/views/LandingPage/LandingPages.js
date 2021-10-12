import React, { useEffect } from 'react'
import axios from 'axios';

function LandingPages() {
	useEffect(() => {
		axios.get('/api/hello')
			.then(response => console.log(response.data));
	}, []);
	return (
		<div>
			LandingPage
		</div>
	)
}

export default LandingPages
