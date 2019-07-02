import { Widget } from 'concordialang-ui-core'
import { WidgetConfig } from '../interfaces/app-config'
import { formatProperties, PROPS_INJECTION_POINT } from '../utils/prop'
import { createLabel } from './label'
import { wrap } from './wrapper'

export default class Select extends Widget {
	private readonly SELECT_VALID_PROPERTIES = ['id', 'required']
	private readonly OPTION_VALID_PROPERTIES = ['value']

	constructor(props: any, name: string, private _config: WidgetConfig) {
		super(props, name)
	}

	public renderToString(): string {
		const properties = formatProperties(this.props, this.SELECT_VALID_PROPERTIES)
		const selectOpening = this._config.opening.replace(PROPS_INJECTION_POINT, properties)
		const selectClosure = this._config.closure
		const options = this.getOptions()
		const select = selectOpening + options + selectClosure
		const label = createLabel(this.name, this.props.id.toString(), this._config)
		return wrap(label + select, this._config)
	}

	private getOptions(): string {
		if (!this._config.optionOpening) return ''

		let options: string[] = []
		for (let value of this.props.value as Array<string>) {
			const optionProps = { value }
			const properties = formatProperties(optionProps, this.OPTION_VALID_PROPERTIES)
			const optionOpening = this._config.optionOpening.replace(PROPS_INJECTION_POINT, properties)
			const optionClosure = this._config.optionClosure
			options.push(optionOpening + value + optionClosure)
		}
		return options.join('')
	}
}
