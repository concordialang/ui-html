'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const Table = require('cli-table3')
const colors = require('colors')
/* tslint:disable:no-console */
class Printer {
	printGeneratedFiles(files) {
		const table = new Table({
			head: [colors.green('#'), colors.green('Generated files')],
		})
		for (let i = 0; i < files.length; i++) {
			const counter = i + 1
			table.push([counter, files[i]])
		}
		console.log(table.toString())
	}
	printErrorMessage(message) {
		console.log(colors.red(message))
	}
}
exports.default = Printer
