import { pick } from 'lodash'

import { WidgetConfig } from '../interfaces/app-config'
import { formatProperties } from '../utils/prop'

import HtmlWidget from './html-widget'

export default class Button extends HtmlWidget {
	constructor(props: any, name: string, config: WidgetConfig) {
		super(props, name, config)
		this.props.value = this.props.value || name
	}

	protected getFormattedProps(props: any): string {
		// Defines the properties that will be injected in the widget and its order.
		const VALID_PROPERTIES = ['id', 'type', 'disabled']

		props.type = this.getType(props.datatype)
		props.value = props.value || this.name

		const filteredProps = pick(props, VALID_PROPERTIES)

		return formatProperties(filteredProps)
	}

	private getType(datatype: string): string {
		return datatype || 'button'
	}
}
