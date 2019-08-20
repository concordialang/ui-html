import { Feature, Prototyper, Widget } from 'concordialang-ui-core'
import * as fs from 'fs'
import { promisify } from 'util'
import { format } from 'path'
import { convertCase } from './utils/case-converter'
import { formatHtml } from './utils/format-html'

const cosmiconfig = require('cosmiconfig')
const { normalize } = require('normalize-diacritics')

import WidgetFactory from './widgets/widget-factory'
import { AppConfig } from './interfaces/app-config'

export default class HtmlUIPrototyper implements Prototyper {
	constructor(private _fs: any = fs, private _outputDir: string) {
	}

	public async generate(features: Feature[]): Promise<string[]> {
		const appConfig: AppConfig = this.getAppConfig()
		const factory = new WidgetFactory(appConfig)
		const createFilePromises: Promise<string>[] = []

		for (let feature of features) {
			const elements: Widget[] = feature.uiElements.map(uiElement => (factory.create(uiElement)))
			createFilePromises.push(this.createHtmlFile(feature.name, elements))
		}

		return Promise.all(createFilePromises)
	}

	private async createHtmlFile(fileName: string, widgets: Widget[]): Promise<string> {
		fileName = await normalize(convertCase(fileName, 'snake'))

		let content = widgets.reduce((result, widget) => {
			return result + widget.renderToString()
		}, '')

		content = formatHtml(`<form>${content}</form>`)

		const path = format({ dir: this._outputDir, name: fileName, ext: '.html' })
		await promisify(fs.writeFile)(path, content)
		return path
	}

	private getAppConfig(): AppConfig {
		try {
			const explorer = cosmiconfig()
			const configFile = explorer.loadSync('concordialang-ui-html.json')
			const appConfig: AppConfig = configFile.config
			return appConfig
		} catch (e) {
			throw new Error('Config file not found')
		}
	}
}
