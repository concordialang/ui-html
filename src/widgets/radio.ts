import {Widget} from 'concordialang-ui-core'

import {formatProperties, createLabel} from './prop'

export class Radio extends Widget {
	private readonly VALID_PROPERTIES = ['value']

	constructor(props: any, name: string) {
		super(props, name)
	}

	public renderToString(): string {
		const properties = formatProperties(this.props, this.VALID_PROPERTIES)
		let inputs: String[] = []
		const label = createLabel(this.name, this.props.id.toString())
		const inputName = this.name.toLowerCase()

		if (properties) {
			for (let value of this.props.value as Array<string>) {
				let input = `<input type="radio" name="${inputName}" value="${value.toLowerCase()}">${value}`
				inputs.push(input)
			}
			return `<div>\n${label + inputs.join('\n')}\n</div>`
		}
		return '<div>\n<input type="radio">\n</div>'
	}
}

