import { Widget } from 'concordialang-ui-core'
import * as Mustache from 'mustache'

import { AppConfig } from '../interfaces/app-config'

export default class Head extends Widget {
	constructor(private _config: AppConfig) {
		super(null, '')
	}

	public renderToString(): string {
		let headContent = ''
		if (!this._config) return headContent

		if (this._config.externalLinks) {
			const linkTemplate = '<link src="{{src}}">'
			const linkPattern = /^<link.*>$/
			headContent += this.formatExternalSources(this._config.externalLinks, linkTemplate, linkPattern)
		}

		if (this._config.externalScripts) {
			const scriptTemplate = '<script src="{{src}}"></script>'
			const scriptPattern = /^<script.*><\/script>$/
			headContent += this.formatExternalSources(this._config.externalScripts, scriptTemplate, scriptPattern)
		}

		return '<head>' + headContent + '</head>'
	}

	private formatExternalSources(externalSources: string[], widgetTemplate: string, widgetPattern: RegExp): string {
		let formattedSources = ''

		if (externalSources) {
			for (let source of externalSources) {
				if (!source.match(widgetPattern)) {
					formattedSources += Mustache.render(widgetTemplate, { src: source })
				} else {
					formattedSources += source
				}
			}
		}

		return formattedSources
	}
}
