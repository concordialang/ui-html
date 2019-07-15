import { pick } from 'lodash'

import { WidgetConfig } from '../interfaces/app-config'
import { formatProperties } from '../utils/prop'

import HtmlWidget from './html-widget'

export default class Radio extends HtmlWidget {
	constructor(props: any, name: string, config: WidgetConfig) {
		super(props, name, config)
	}

	protected getFormattedProps(props: any): string {
		// Defines the properties that will be injected in the widget and its order.
		const VALID_PROPERTIES = ['type', 'name', 'value']

		props.type = 'radio'
		props.name = this.name

		const filteredProps = pick(props, VALID_PROPERTIES)

		return formatProperties(filteredProps)
	}
}
