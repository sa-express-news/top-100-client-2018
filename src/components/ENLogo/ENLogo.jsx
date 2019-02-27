import React from 'react';

import './ENLogo.scss';

const icon = require('../../icons/en_logo.svg');

export default () => (
	<div className="ENLogo">
		<a href="https://www.expressnews.com/" target="_blank">
			<img src={icon} alt="Express News"/>
		</a>
	</div>
);
