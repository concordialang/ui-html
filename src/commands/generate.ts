import {Command, flags} from '@oclif/command'
import {ProcessResult} from '/home/willian/Projects/tcc/ui-core'

import Generator from '../classes/generator'

export default class Generate extends Command {
  static description = 'Generate html files'

  static flags = {
    help: flags.help({char: 'h'}),
    features: flags.string({description: 'processed features from ast'}),
  }

  async run() {
    const {flags} = this.parse(Generate)

    if (flags.features) {
      const processResult: ProcessResult = JSON.parse(flags.features) as ProcessResult
      const generator = new Generator()
      const files: string[] = await generator.generate(processResult.features)
      this.log(`Html plugin received: ${files}`)
    }
  }
}
