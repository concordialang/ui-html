'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const case_converter_1 = require('./case-converter')
function formatProperties(props, caseType = 'camel') {
	const translateProp = key => {
		switch (key) {
			case 'format':
				return 'pattern'
			default:
				return key
		}
	}
	const getValueOf = key =>
		case_converter_1.convertCase(props[key].toString(), caseType)
	const format = (result, key) => {
		const value = getValueOf(key)
		const htmlProp = translateProp(key)
		return result + `${htmlProp}="${value}"` + ' '
	}
	return Object.keys(props)
		.reduce(format, '')
		.trimRight()
}
exports.formatProperties = formatProperties
