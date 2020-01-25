module.exports = {
	roots: [
		'<rootDir>/src/'
	],
	watchPathIgnorePatterns: [
		'<rootDir>/node_modules/',
	],
	displayName: 'test',
	transform: {
		'^.+\\.(ts?)$': 'ts-jest',
		'^.+\\.(js?)$': 'babel-jest',
	},
	testRegex: '(test|spec)\\.(js|ts)?$',
	testPathIgnorePatterns: [
		'<rootDir>/node_modules/'
	],
	moduleFileExtensions: [
		'ts',
		'js',
	],
	browser: false,
	collectCoverage: true,
	errorOnDeprecated: true,
	timers: 'fake',
};