'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const tslib_1 = require('tslib')
const fs = require('fs')
const util_1 = require('util')
const path_1 = require('path')
const case_converter_1 = require('./utils/case-converter')
const format_html_1 = require('./utils/format-html')
const cosmiconfig = require('cosmiconfig')
const { normalize } = require('normalize-diacritics')
const widget_factory_1 = require('./widgets/widget-factory')
class HtmlUIPrototyper {
	constructor(_fs = fs, _outputDir) {
		this._fs = _fs
		this._outputDir = _outputDir
		this._appConfig = this.getAppConfig()
		this._widgetFactory = new widget_factory_1.default(this._appConfig)
	}
	generate(features) {
		return tslib_1.__awaiter(this, void 0, void 0, function*() {
			const createFilePromises = []
			for (let feature of features) {
				const elements = feature.uiElements.map(uiElement =>
					this._widgetFactory.create(uiElement)
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
			fileName = yield normalize(
				case_converter_1.convertCase(fileName, 'snake')
			)
			const head = this._widgetFactory.createHead().renderToString()
			const body = this._widgetFactory
				.createBody(widgets)
				.renderToString()
			const fileContent = format_html_1.formatHtml(
				`<html>${head}${body}</html>`
			)
			const path = path_1.format({
				dir: this._outputDir,
				name: fileName,
				ext: '.html',
			})
			yield util_1.promisify(fs.writeFile)(path, fileContent)
			return path
		})
	}
	getAppConfig() {
		try {
			const explorer = cosmiconfig()
			const configFile = explorer.loadSync('concordialang-ui-html.json')
			const appConfig = configFile.config
			return appConfig
		} catch (e) {
			throw new Error('Config file not found')
		}
	}
}
exports.default = HtmlUIPrototyper
