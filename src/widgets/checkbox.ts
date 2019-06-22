import {Widget} from 'concordialang-ui-core'

import {formatProperties} from '../utils/prop'

export default class Checkbox extends Widget {
	private readonly VALID_PROPERTIES = ['value', 'required']

	constructor(props: any, name: string) {
		super(props, name)
	}

	// TODO: remove \n
	public renderToString(): string {
		const properties = formatProperties(this.props, this.VALID_PROPERTIES)
		if (properties) return `<div>\n<input type="checkbox" ${properties}>${this.name}\n</div>`
		return `<div>\n<input type="checkbox">${this.name}\n</div>`
	}
}
