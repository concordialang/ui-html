import {Widget} from 'concordialang-ui-core'

import {formatProperties} from './prop'

export class Checkbox extends Widget {
	private readonly VALID_PROPERTIES = ['value', 'required']

	constructor(props: any, name?: string) {
		super(props, name || '')
	}

	public renderToString(): string {
		const properties = formatProperties(this.props, this.VALID_PROPERTIES)
		if (properties) return `<div>\n<input type="checkbox" ${properties}>${this.name}\n</div>`
		return `<div>\n<input type="checkbox">${this.name}\n</div>`
	}
}
