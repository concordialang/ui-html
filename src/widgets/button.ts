import {Widget} from 'concordialang-ui-core'

import {formatProperties} from './prop'

export class Button extends Widget {
  private readonly VALID_PROPERTIES = ['id', 'disabled', 'value']

  constructor(props: any, name?: string) {
    super(props, name || '')
  }

  public renderToString(): string {
    // const inputType = this.getType(this.props.datatype as string)
    const properties = formatProperties(this.props, this.VALID_PROPERTIES)
    // return `<button ${inputType}${properties}>${this.name}</button>`
    return `<button ${properties}>${this.name}</button>`
  }

  private getType(datatype: string): string {
    return `type="${datatype || 'button'}"`
  }
}
