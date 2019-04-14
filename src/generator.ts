import { Feature, Prototyper, Widget } from 'concordialang-ui-core'
import * as fs from 'fs'
import { promisify } from 'util'

import WidgetFactory from './widgets/widget-factory'

export default class Generator implements Prototyper {

  constructor(private _fs: any = fs) {
  }

  public async generate(features: Feature[]): Promise<string[]> {
    const factory = new WidgetFactory()
    let createFilePromises: Promise<string>[] = []

    for (let feature of features) {
      const widgets: Widget[] = []

      for (let element of feature.uiElements) {
        const widget = factory.create(element)
        widgets.push(widget)
      }

      const createFilePromise: Promise<string> = this.createHtmlFile(feature.name, widgets)
      createFilePromises.push(createFilePromise)
    }

    return Promise.all(createFilePromises)
  }

  private async createHtmlFile(fileName: string, widgets: Widget[]): Promise<string> {

    //TODO format content
    let content = widgets.reduce((result, widget) => {
      return result + widget.renderToString() + '\n'
    }, '')

    content = `<div>${content}</div>`

    const writeF = promisify(this._fs.writeFile)
    const fullName = fileName + '.html'
    await writeF(fullName, content)
    return fullName
  }

}
