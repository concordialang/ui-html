'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const tslib_1 = require('tslib')
const command_1 = require('@oclif/command')
const fs = require('fs')
const html_ui_prototyper_1 = require('../html-ui-prototyper')
const printer_1 = require('../utils/printer')
class Generate extends command_1.Command {
	run() {
		return tslib_1.__awaiter(this, void 0, void 0, function*() {
			const printer = new printer_1.default()
			try {
				const { flags } = this.parse(Generate)
				if (!flags.features) throw new Error('Missing flag --features')
				const processResult = JSON.parse(flags.features)
				if (processResult.features.length === 0)
					throw new Error('No features found')
				const generator = new html_ui_prototyper_1.default(
					fs,
					flags.outputDir
				)
				const result = yield generator.generate(processResult.features)
				printer.printGeneratedFiles(result)
			} catch (e) {
				printer.printErrorMessage(e.message)
			}
		})
	}
}
Generate.description = 'Generate html files'
Generate.flags = {
	help: command_1.flags.help({ char: 'h' }),
	features: command_1.flags.string({
		description: 'processed features from ast',
		required: true,
	}),
	outputDir: command_1.flags.string({
		description: 'location where output files will be saved',
		required: true,
	}),
}
exports.default = Generate
