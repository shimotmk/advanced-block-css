const config = require( '@wordpress/scripts/config/jest-e2e.config' );

const jestE2EConfig = {
	...config,
	rootDir: '../../',
	setupFilesAfterEnv: [
		'<rootDir>/test/e2e/config/bootstrap.js',
		'@wordpress/jest-console',
		'@wordpress/jest-puppeteer-axe',
	],
};

module.exports = jestE2EConfig;
