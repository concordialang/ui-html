import {Widget} from 'concordialang-ui-core'

export class Button extends Widget {
  private readonly DATA_TYPES = ['button', 'submit', 'reset']
  private readonly VALID_PROPERTIES = ['id', 'disabled', 'value']

  constructor(props: any, name?: string) {
    super(props, name)
  }

  public renderToString(): string {
    const inputType = this.getType(this.props.datatype as string)
    const properties = this.getProperties()

    return `<button ${inputType} ${properties}>${this.name}</button>`
  }

  private getType(datatype: string): string {
    return `type="${datatype || 'button'}"`
  }

  private getProperties(): string {
    const getFormattedProp = (key: string) => (`${key}="${this.props[key]}"`)

    let strProps = Object.keys(this.props).reduce((result, key) => {
      return this.VALID_PROPERTIES.includes(key) ? result + getFormattedProp(key) : result
    }, '')

    return strProps
  }
}
