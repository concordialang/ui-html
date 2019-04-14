import {Widget} from 'concordialang-ui-core'

import {formatProperties} from './prop'

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
    const properties = formatProperties(this.props, this.VALID_PROPERTIES)
    const label = (this.name) ? `<label for="${this.name}">${this.name}</label>` : ''
    return `${label} <input ${inputType} ${properties}/>`
  }

  private getType(datatype: string): string {
    const typeProperty = this.typeForDataType(datatype)
    return `type="${typeProperty}"`
  }

  private typeForDataType(datatype: string): string {
    switch (datatype) {
      case DATA_TYPES.INTEGER:
      case DATA_TYPES.DOUBLE: return 'number'
      case DATA_TYPES.TIME: return 'time'
      case DATA_TYPES.DATETIME: return 'datetime-local'
    }
    return 'text'
  }

}
