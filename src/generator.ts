import { Feature, Prototyper, Widget } from 'concordialang-ui-core'
import * as fs from 'fs'
import { promisify } from 'util'
import { format } from 'path'
const pretty = require('pretty')

import WidgetFactory from './widgets/widget-factory'

export default class Generator implements Prototyper {
	constructor(private _fs: any = fs, private _outputDir: string) {
	}

	public async generate(features: Feature[]): Promise<string[]> {
		const factory = new WidgetFactory()
		let createFilePromises: Promise<string>[] = []

		for (let feature of features) {
			const elements: Widget[] = feature.uiElements.map(uiElement => (factory.create(uiElement)))
			createFilePromises.push(this.createHtmlFile(feature.name, elements))
		}

		return Promise.all(createFilePromises)
	}

	private async createHtmlFile(fileName: string, widgets: Widget[]): Promise<string> {
		let content = widgets.reduce((result, widget) => {
			return result + widget.renderToString() + '\n'
		}, '')

		content = pretty(`<form>\n${content}</form>`, {ocd: true})

		const path = format({ dir: this._outputDir, name: fileName, ext: '.html' })
		return promisify(fs.writeFile)(path, content).then(() => (path))
	}
}
