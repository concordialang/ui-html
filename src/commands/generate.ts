import {Command, flags} from '@oclif/command'
import { ProcessResult } from '../../../ui-core/src'

import Generator from '../classes/generator'
import { HtmlElement } from '../classes/html-elements';

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
      await generator.generate(processResult.features)
    }
  }
}
