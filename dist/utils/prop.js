'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const case_1 = require('case')
exports.PROPS_INJECTION_POINT = '%s'
function formatProperties(props, validProperties) {
	const translateProp = key => {
		switch (key) {
			case 'format':
				return 'pattern'
			default:
				return key
		}
	}
	const getFormattedProp = key => {
		let value = case_1.camel(props[key].toString())
		return `${translateProp(key)}="${value}"`
	}
	const formatValid = (result, prop) => {
		return validProperties.includes(prop)
			? result + getFormattedProp(prop) + ' '
			: result
	}
	return Object.keys(props)
		.reduce(formatValid, '')
		.trimRight()
}
exports.formatProperties = formatProperties
