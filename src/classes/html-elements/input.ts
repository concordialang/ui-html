import {Widget} from 'concordialang-ui-core'

const enum DATA_TYPES {
  STRING = 'string',
  INTEGER = 'integer',
  DOUBLE = 'double',
  DATE = 'date',
  TIME = 'time',
  DATETIME = 'datetime'
}

export class Input extends Widget {
  private readonly VALID_PROPERTIES = ['id', 'editable', 'minlength', 'maxlength', 'required', 'format']

  constructor(props: any, name?: string) {
    super(props, name)
  }

  public renderToString(): string {
    const inputType = this.getType(this.props.datatype as string)
    const properties = this.getProperties()
    const label = (this.name) ? `<label for="${this.name}">${this.name}</label>` : ''

    return `${label} <input ${inputType} ${properties}/>`
  }

  private getType(datatype: string): string {
    let typeProperty = 'text'

    switch (datatype) {
    case DATA_TYPES.STRING:
      typeProperty = 'text'
      break
    case DATA_TYPES.INTEGER:
    case DATA_TYPES.DOUBLE:
      typeProperty = 'number'
      break
    case DATA_TYPES.TIME:
      typeProperty = 'time'
      break
    case DATA_TYPES.DATETIME:
      typeProperty = 'datetime-local'
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
