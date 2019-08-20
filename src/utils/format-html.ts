const prettier = require('prettier')

export function formatHtml(html: string) {
	return prettier.format(html, { parser: 'html', htmlWhitespaceSensitivity: 'ignore' })
}
