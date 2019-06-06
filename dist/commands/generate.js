'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const tslib_1 = require('tslib')
const command_1 = require('@oclif/command')
const fs = require('fs')
const generator_1 = require('../generator')
class Generate extends command_1.Command {
	run() {
		return tslib_1.__awaiter(this, void 0, void 0, function*() {
			const { flags } = this.parse(Generate)
			if (flags.features) {
				const processResult = JSON.parse(flags.features)
				const generator = new generator_1.default(fs, flags.outputDir)
				const result = yield generator.generate(processResult.features)
				this.log(JSON.stringify(result))
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
