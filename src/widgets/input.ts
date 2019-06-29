import { Widget } from 'concordialang-ui-core'
import { get } from 'lodash';

import { WidgetConfig } from '../interfaces/app-config'
import { formatProperties, PROPS_INJECTION_POINT } from '../utils/prop'
import { createLabel } from './label'

const enum DataTypes {
	STRING = 'string',
	INTEGER = 'integer',
	DOUBLE = 'double',
	DATE = 'date',
	TIME = 'time',
	DATETIME = 'datetime'
}

export default class Input extends Widget {
	private readonly VALID_PROPERTIES = ['id', 'editable', 'minlength', 'maxlength', 'required', 'format']

	constructor(props: any, name: string, private _config: WidgetConfig) {
		super(props, name)
	}

	public renderToString(): string {
		const inputType = this.getType(this.props.datatype as string)
		const properties = formatProperties(this.props, this.VALID_PROPERTIES)
		const input = this._config.opening.replace(PROPS_INJECTION_POINT, `${ inputType } ${ properties }`)
		const inputClosure = this._config.closure || ''
		const label = createLabel(this.name, this.props.id.toString(), this._config)
		return this.wrap(label + input + inputClosure)
	}

	private wrap(elements: string): string {
		if (this._config.wrapperOpening && this._config.wrapperClosure)
			return this._config.wrapperOpening + elements + this._config.wrapperClosure
		return elements
	}

	private getType(datatype: string): string {
		let typeProperty

		switch (datatype) {
			case DataTypes.INTEGER:
			case DataTypes.DOUBLE: typeProperty = 'number'; break
			case DataTypes.TIME: typeProperty = 'time'; break
			case DataTypes.DATETIME: typeProperty = 'datetime-local'; break
			default: typeProperty = 'text'
		}

		return `type="${typeProperty}"`
	}
}
