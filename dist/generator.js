'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const tslib_1 = require('tslib')
const fs = require('fs')
const util_1 = require('util')
const path_1 = require('path')
const pretty = require('pretty')
const widget_factory_1 = require('./widgets/widget-factory')
class Generator {
	constructor(_fs = fs, _outputDir) {
		this._fs = _fs
		this._outputDir = _outputDir
	}
	generate(features) {
		return tslib_1.__awaiter(this, void 0, void 0, function*() {
			const factory = new widget_factory_1.default()
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
				return result + widget.renderToString() + '\n'
			}, '')
			content = pretty(`<form>\n${content}</form>`, { ocd: true })
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
