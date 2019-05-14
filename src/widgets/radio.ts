import {Widget} from 'concordialang-ui-core'

import {formatProperties} from './prop'

export class Radio extends Widget {
	private readonly VALID_PROPERTIES = ['value']

	constructor(props: any, name?: string) {
		super(props, name || '')
	}

	public renderToString(): string {
		const properties = formatProperties(this.props, this.VALID_PROPERTIES)
		let inputs: String[] = []
		const label = this.createLabel()
		const inputName = this.name.toLowerCase()

		if (properties) {
			for (let value of this.props.value) {
				let input = `<input type="radio" name="${inputName}" value="${value.toLowerCase()}">${value}`
				inputs.push(input)
			}
			return `<div>\n${label + inputs.join('\n')}\n</div>`
		}
		return '<div>\n<input type="radio">\n</div>'
	}

	private createLabel(): string {
		if (!this.name) return ''
		if (this.props.id) return `<label for="${this.props.id}">${this.name}</label>\n`
		return `<label>${this.name}</label>\n`
	}
}

