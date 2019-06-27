import {Command, flags} from '@oclif/command'
import {ProcessResult} from 'concordialang-ui-core'
import * as fs from 'fs'

import HtmlUIPrototyper from '../html-ui-prototyper'

export default class Generate extends Command {

  static description = 'Generate html files'

  static flags = {
    help: flags.help({char: 'h'}),
	features: flags.string({description: 'processed features from ast', required: true}),
	outputDir: flags.string({description: 'location where output files will be saved', required: true})
  }

  async run() {
    const {flags} = this.parse(Generate)

    if (flags.features) {
      const processResult: ProcessResult = JSON.parse(flags.features) as ProcessResult
      const generator = new HtmlUIPrototyper(fs, flags.outputDir)
      const result = await generator.generate(processResult.features)
      this.log(JSON.stringify(result))
    }
  }
}
