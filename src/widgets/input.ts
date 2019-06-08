import { Widget } from 'concordialang-ui-core'
import { get } from 'lodash';

import { formatProperties, createLabel } from '../utils'
import {
	WidgetConfig,
	WIDGET_OPENING,
	WIDGET_CLOSURE,
	WIDGET_WRAPPER_OPENING,
	WIDGET_WRAPPER_CLOSURE
} from '../interfaces/custom_config'

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

	constructor(props: any, name: string, private _customDefinition?: WidgetConfig) {
		super(props, name)
	}

	public renderToString(): string {
		const input = this.createInput()
		const label = createLabel(this.name, this.props.id.toString())
		return this.wrap(label + input)
	}

	private createInput(): string {
		const inputType = this.getType(this.props.datatype as string)
		const inputOpening = get(this._customDefinition, WIDGET_OPENING, 'input')
		const inputClosure = get(this._customDefinition, WIDGET_CLOSURE)
		const properties = formatProperties(this.props, this.VALID_PROPERTIES)

		if (inputClosure) {
			return `<${inputOpening} ${inputType} ${properties}></${inputClosure}>`
		} else {
			return `<${inputOpening} ${inputType} ${properties}>`
		}
	}

	private wrap(elements: string): string {
		const wrapperOpening = get(this._customDefinition, WIDGET_WRAPPER_OPENING, '<div>')
		const wrapperEnclosing = get(this._customDefinition, WIDGET_WRAPPER_CLOSURE, '</div>')
		return wrapperOpening + elements + wrapperEnclosing
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
