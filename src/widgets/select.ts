import {Widget} from 'concordialang-ui-core'

import {formatProperties} from '../utils/prop'
import {createLabel} from './label'

export default class Select extends Widget {
	private readonly VALID_PROPERTIES = ['id', 'required']

	constructor(props: any, name: string) {
		super(props, name)
	}

	// TODO: remove \n
	public renderToString(): string {
		const properties = formatProperties(this.props, this.VALID_PROPERTIES)
		if (!properties) return '<div>\n<select></select>\n</div>'
		const options = this.getOptions()
		const select = `<select ${properties}>\n${options}\n</select>\n`
		const label = createLabel(this.name, this.props.id.toString())
		return `<div>\n${label + select}</div>`
	}

	private getOptions(): string {
		let options: string[] = []
		for (let value of this.props.value as Array<string>) {
			let option = `<option value="${value.toLowerCase()}">${value}</option>`
			options.push(option)
		}
		return options.join('\n')
	}
}
