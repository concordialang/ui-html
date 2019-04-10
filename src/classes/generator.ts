import {createFile, Feature, Prototyper, Widget} from 'concordialang-ui-core'

import ElementFactory from './element-factory'

export default class Generator implements Prototyper {
  public async generate(features: Feature[]): Promise<string[]> {
    const factory = new ElementFactory()
    let outputFiles: Promise<string>[] = []

    for (let feature of features) {
      const elements: Widget[] = []

      for (let element of feature.uiElements) {
        const htmlElement = factory.create(element)
        elements.push(htmlElement)
      }

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

    content = `<div>${content}</div>`

    return createFile(fileName, content, fileExtension)
  }
}
