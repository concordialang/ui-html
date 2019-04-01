import {HtmlElement} from './html-element'

export class Input extends HtmlElement {
  private readonly DATA_TYPES = ['string', 'integer', 'double', 'date', 'time', 'datetime']
  private readonly VALID_PROPERTIES = ['id', 'editable', 'minlength', 'maxlength', 'required', 'format', 'value']

  constructor(props: any) {
    super(props)
  }

  public toString(): string {
    const inputType = this.getType(this.props.datatype as string)
    const properties = this.getProperties()
    return `<input ${inputType} ${properties}/>`
  }

  private getType(datatype: string): string {
    let typeProperty = 'text'

    switch (datatype) {
    case 'string': typeProperty = 'text'; break
    case 'integer':
    case 'double': typeProperty = 'number'; break
    case 'time': typeProperty = 'time'; break
    case 'datetime': typeProperty = 'datetime-local'
    }

    return `type="${typeProperty}"`
  }

  private getProperties(): string {
    const getFormattedProp = (key: string) => (`${key}="${this.props[key]}" `)

    let strProps = Object.keys(this.props).reduce((result, key) => {
      return this.VALID_PROPERTIES.includes(key) ? result + getFormattedProp(key) : result
    }, '')

    return strProps
  }
}
