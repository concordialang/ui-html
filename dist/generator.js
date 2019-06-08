'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const tslib_1 = require('tslib')
const fs = require('fs')
const util_1 = require('util')
const path_1 = require('path')
const prettier = require('prettier')
const cosmiconfig = require('cosmiconfig')
const widget_factory_1 = require('./widgets/widget-factory')
// TODO: use "export default"
const config_loader_1 = require('./utils/config_loader')
class Generator {
	constructor(_fs = fs, _outputDir) {
		this._fs = _fs
		this._outputDir = _outputDir
	}
	generate(features) {
		return tslib_1.__awaiter(this, void 0, void 0, function*() {
			// search for a ".configrc.json"
			// TODO: replace "config" with the CLI name
			const explorer = cosmiconfig('config')
			let config = explorer.searchSync()
			const configLoader = new config_loader_1.ConfigLoader(config)
			const factory = new widget_factory_1.default(configLoader)
			let createFilePromises = []
			for (let feature of features) {
				const elements = feature.uiElements.map(uiElement =>
					factory.create(uiElement)
				)
				createFilePromises.push(
					this.createHtmlFile(feature.name, elements)
				)
			}
			return Promise.all(createFilePromises)
		})
	}
	createHtmlFile(fileName, widgets) {
		return tslib_1.__awaiter(this, void 0, void 0, function*() {
			let content = widgets.reduce((result, widget) => {
				return result + widget.renderToString()
			}, '')
			content = prettier.format(`<form>\n${content}</form>`, {
				parser: 'html',
				htmlWhitespaceSensitivity: 'ignore',
			})
			const path = path_1.format({
				dir: this._outputDir,
				name: fileName,
				ext: '.html',
			})
			yield util_1.promisify(fs.writeFile)(path, content)
			return path
		})
	}
}
exports.default = Generator
