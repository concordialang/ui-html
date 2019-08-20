import { pick } from 'lodash'

import { WidgetConfig } from '../interfaces/app-config'
import { formatProperties } from '../utils/prop'

import HtmlWidget from './html-widget'

const enum DataTypes {
	STRING = 'string',
	INTEGER = 'integer',
	DOUBLE = 'double',
	DATE = 'date',
	TIME = 'time',
	DATETIME = 'datetime'
}

export default class Input extends HtmlWidget {
	constructor(props: any, name: string, config: WidgetConfig) {
		super(props, name, config)
	}

	protected getFormattedProps(props: any): string {
		// Defines the properties that will be injected in the widget and its order.
		const VALID_PROPERTIES = ['id', 'type', 'name', 'editable', 'minlength', 'maxlength', 'required', 'format']

		props.type = this.getType(props.datatype)
		props.name = this.name

		const filteredProps = pick(props, VALID_PROPERTIES)

		return formatProperties(filteredProps)
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

		return typeProperty
	}
}
