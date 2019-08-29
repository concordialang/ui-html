import { Feature, Prototyper, Widget } from 'concordialang-ui-core'
import * as fs from 'fs'
import { promisify } from 'util'
import { format } from 'path'
import { convertCase } from './utils/case-converter'
import { formatHtml } from './utils/format-html'

const cosmiconfig = require('cosmiconfig')
const { normalize } = require('normalize-diacritics')

import { AppConfig } from './interfaces/app-config'
import WidgetFactory from './widgets/widget-factory'

export default class HtmlUIPrototyper implements Prototyper {
	private _widgetFactory: WidgetFactory
	private _appConfig: AppConfig

	constructor(private _fs: any = fs, private _outputDir: string) {
		this._appConfig = this.getAppConfig()
		this._widgetFactory = new WidgetFactory(this._appConfig)
	}

	public async generate(features: Feature[]): Promise<string[]> {
		const createFilePromises: Promise<string>[] = []

		for (let feature of features) {
			const elements: Widget[] = feature.uiElements.map(uiElement => (this._widgetFactory.create(uiElement)))
			createFilePromises.push(this.createHtmlFile(feature.name, elements))
		}

		return Promise.all(createFilePromises)
	}

	private async createHtmlFile(fileName: string, widgets: Widget[]): Promise<string> {
		fileName = await normalize(convertCase(fileName, 'snake'))

		const head: string = this._widgetFactory.createHead().renderToString()
		const body: string = this._widgetFactory.createBody(widgets).renderToString()

		const fileContent: string = formatHtml(`<html>${head}${body}</html>`)
		const path = format({ dir: this._outputDir, name: fileName, ext: '.html' })

		await promisify(fs.writeFile)(path, fileContent)
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
