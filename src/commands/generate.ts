import { Command, flags } from '@oclif/command'
import { ProcessResult } from 'concordialang-ui-core'
import * as fs from 'fs'

import HtmlUIPrototyper from '../html-ui-prototyper'
import Printer from '../utils/printer'

export default class Generate extends Command {
	static description = 'Generate html files'

	static flags = {
		help: flags.help({ char: 'h' }),
		features: flags.string({ description: 'processed features from ast', required: true }),
		outputDir: flags.string({ description: 'location where output files will be saved', required: true })
	}

	async run() {
		const printer: Printer = new Printer()
		try {
			const { flags } = this.parse(Generate)
			if (!flags.features) throw new Error('Missing flag --features')

			const processResult: ProcessResult = JSON.parse(flags.features) as ProcessResult
			if (processResult.features.length === 0) throw new Error('No features found')

			const generator = new HtmlUIPrototyper(fs, flags.outputDir)
			const result: string[] = await generator.generate(processResult.features)
			printer.printGeneratedFiles(result)
		} catch (e) {
			printer.printErrorMessage(e.message)
		}
	}
}
