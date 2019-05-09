import {Widget} from 'concordialang-ui-core'

import {formatProperties} from './prop'

export class Select extends Widget {
	private readonly VALID_PROPERTIES = ['id']

	constructor(props: any, name?: string) {
		super(props, name || '')
	}

	public renderToString(): string {
		const properties = formatProperties(this.props, this.VALID_PROPERTIES)
		if (!properties) return '<div>\n<select></select>\n</div>'
		const options = this.getOptions()
		const select = `<select ${properties}>\n${options}\n</select>\n`
		const label = this.createLabel()
		return `<div>\n${label + select}</div>`
	}

	private getOptions(): string {
		let options: string[] = []
		for (let value of this.props.value) {
			let option = `<option value="${value.toLowerCase()}">${value}</option>`
			options.push(option)
		}
		return options.join('\n')
	}

	private createLabel(): string {
		if (!this.name) return ''
		if (this.props.id) return `<label for="${this.props.id}">${this.name}</label>\n`
		return `<label>${this.name}</label>\n`
	}
}
