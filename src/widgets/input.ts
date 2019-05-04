import {Widget} from 'concordialang-ui-core'

import {formatProperties} from './prop'

const enum DataTypes {
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
		const input = properties ? `<input ${inputType} ${properties}/>\n` : `<input ${inputType}/>\n`
		const label = this.createLabel()
		return `<div>\n${label + input}</div>`
	}

	private getType(datatype: string): string {
		const typeProperty = this.typeForDataType(datatype)
		return `type="${typeProperty}"`
	}

	private typeForDataType(datatype: string): string {
		switch (datatype) {
			case DataTypes.INTEGER:
			case DataTypes.DOUBLE: return 'number'
			case DataTypes.TIME: return 'time'
			case DataTypes.DATETIME: return 'datetime-local'
		}
		return 'text'
	}

	private createLabel(): string {
		if (!this.name) return ''
		if (this.props.id) return `<label for="${this.props.id}">${this.name}</label>\n`
		return `<label>${this.name}</label>\n`
	}
}
