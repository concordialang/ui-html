import {Feature, Prototyper} from '/home/willian/Projects/tcc/ui-core'

import ElementFactory from './element-factory'
import {HtmlElement} from './html-elements'

export default class Generator implements Prototyper {
  public generate(features: Feature[]): Promise<string[]> {
    const factory = new ElementFactory()
    let result: string[] = [] // just to print the output

    for (let feature of features) {
      const elements: HtmlElement[] = []

      for (let element of feature.elements) {
        const htmlElement = factory.create(element)
        elements.push(htmlElement)
        result.push(htmlElement.toString())
      }

      //write file
    }

    return new Promise((resolve, reject) => {
      resolve(result)
    })
  }
}
