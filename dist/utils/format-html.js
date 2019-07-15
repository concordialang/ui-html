'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const prettier = require('prettier')
function formatHtml(html) {
	return prettier.format(html, {
		parser: 'html',
		htmlWhitespaceSensitivity: 'ignore',
	})
}
exports.formatHtml = formatHtml
