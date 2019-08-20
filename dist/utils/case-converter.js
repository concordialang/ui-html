'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const case_1 = require('case')
var CaseType
;(function(CaseType) {
	CaseType['CAMEL'] = 'camel'
	CaseType['PASCAL'] = 'pascal'
	CaseType['SNAKE'] = 'snake'
	CaseType['KEBAB'] = 'kebab'
})(CaseType || (CaseType = {}))
function convertCase(text, type) {
	switch (
		type
			.toString()
			.trim()
			.toLowerCase()
	) {
		case CaseType.CAMEL:
			return case_1.camel(text)
		case CaseType.PASCAL:
			return case_1.pascal(text)
		case CaseType.SNAKE:
			return case_1.snake(text)
		case CaseType.KEBAB:
			return case_1.kebab(text)
		default:
			return text // do nothing
	}
}
exports.convertCase = convertCase
