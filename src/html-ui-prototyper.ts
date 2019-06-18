import { Feature, Prototyper, Widget } from 'concordialang-ui-core'
import * as fs from 'fs'
import { promisify } from 'util'
import { format } from 'path'
const prettier = require('prettier')
const cosmiconfig = require('cosmiconfig')

import WidgetFactory from './widgets/widget-factory'

export default class HtmlUIPrototyper implements Prototyper {
	constructor(private _fs: any = fs, private _outputDir: string) {
	}

	public async generate(features: Feature[]): Promise<string[]> {
		// search for a ".configrc.json"
		// TODO: replace "config" with the CLI name
		const explorer = cosmiconfig('config')
		let config = explorer.searchSync()

		// TODO: lançar exceção se arquivo não existir
		// TODO: extrair "config" de config
		const factory = new WidgetFactory(config.config)
		let createFilePromises: Promise<string>[] = []

		for (let feature of features) {
			const elements: Widget[] = feature.uiElements.map(uiElement => (factory.create(uiElement)))
			createFilePromises.push(this.createHtmlFile(feature.name, elements))
		}

		return Promise.all(createFilePromises)
	}

	private async createHtmlFile(fileName: string, widgets: Widget[]): Promise<string> {
		let content = widgets.reduce((result, widget) => {
			return result + widget.renderToString()
		}, '')

		content = prettier.format(`<form>\n${content}</form>`, {parser: 'html', htmlWhitespaceSensitivity: 'ignore'})

		const path = format({ dir: this._outputDir, name: fileName, ext: '.html' })
		await promisify(fs.writeFile)(path, content)
		return path
	}
}
