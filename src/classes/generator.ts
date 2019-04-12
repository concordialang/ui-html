import {createFile, Feature, Prototyper, Widget} from 'concordialang-ui-core'
const pretty = require('pretty')

import ElementFactory from './element-factory'

export default class Generator implements Prototyper {
  public generate(features: Feature[]): Promise<string[]> {
    const factory = new ElementFactory()
    let outputFiles: Promise<string>[] = []

    for (let feature of features) {
      const elements: Widget[] = feature.uiElements.map(uiElement => (factory.create(uiElement)))
      outputFiles.push(this.createHtmlFile(feature.name, elements))
    }

    return Promise.all(outputFiles)
  }

  private createHtmlFile(fileName: string, elements: Widget[]): Promise<string> {
    const fileExtension = '.html'

    //TODO format content
    let content = elements.reduce((result, element) => {
      return result + element.renderToString() + '\n'
    }, '')

    content = pretty(`<div>${content}</div>`, {ocd: true})

    return createFile(fileName, content, fileExtension)
  }
}
