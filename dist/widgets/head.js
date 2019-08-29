'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const concordialang_ui_core_1 = require('concordialang-ui-core')
const Mustache = require('mustache')
class Head extends concordialang_ui_core_1.Widget {
	constructor(_config) {
		super(null, '')
		this._config = _config
	}
	renderToString() {
		let headContent = ''
		if (!this._config) return headContent
		if (this._config.externalLinks) {
			const linkTemplate = '<link src="{{src}}">'
			const linkPattern = /^<link.*>$/
			headContent += this.formatExternalSources(
				this._config.externalLinks,
				linkTemplate,
				linkPattern
			)
		}
		if (this._config.externalScripts) {
			const scriptTemplate = '<script src="{{src}}"></script>'
			const scriptPattern = /^<script.*><\/script>$/
			headContent += this.formatExternalSources(
				this._config.externalScripts,
				scriptTemplate,
				scriptPattern
			)
		}
		return '<head>' + headContent + '</head>'
	}
	formatExternalSources(externalSources, widgetTemplate, widgetPattern) {
		let formattedSources = ''
		if (externalSources) {
			for (let source of externalSources) {
				if (!source.match(widgetPattern)) {
					formattedSources += Mustache.render(widgetTemplate, {
						src: source,
					})
				} else {
					formattedSources += source
				}
			}
		}
		return formattedSources
	}
}
exports.default = Head
