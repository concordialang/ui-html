const Table = require('cli-table3')
const colors = require('colors')

/* tslint:disable:no-console */
export default class Printer {
	public printGeneratedFiles(files: string[]) {
		const table = new Table({
			head: [colors.green('#'), colors.green('Generated files')]
		})

		for (let i = 0; i < files.length; i++) {
			const counter = i + 1
			table.push([counter, files[i]])
		}

		console.log(table.toString())
	}

	public printErrorMessage(message: string) {
		console.log(colors.red(message))
	}
}
