import {Feature, Prototyper} from '/Users/vcpablo/Code/concordia-ui/ui-core/src'

import ElementFactory from './element-factory'
import {HtmlElement} from './html-elements'

import * as fs from 'fs'

export default class Generator implements Prototyper {
  public write(feature: Feature, elements: HtmlElement[]) {
    const path = `./${feature.name}.html`
    fs.writeFile(path, '', () => {
      for(let element of elements) {
        fs.appendFileSync(path, `<div>${element.toString()}</div>`);
      }
    })
  }

  public async generate(features: Feature[]): Promise<HtmlElement[]> {
    const factory = new ElementFactory()
    // let result: string[] = [] // just to print the output
    const elements: HtmlElement[] = []

    for (let feature of features) {

      for (let element of feature.elements) {
        const htmlElement = factory.create(element)

        elements.push(htmlElement)
        // result.push(htmlElement.toString())
      }

      this.write(feature, elements)
    }

    return new Promise((resolve, reject) => {
      resolve(elements)
    })
  }
}
