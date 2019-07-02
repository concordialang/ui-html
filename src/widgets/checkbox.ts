import { Widget } from 'concordialang-ui-core'
import { WidgetConfig } from '../interfaces/app-config'
import { formatProperties, PROPS_INJECTION_POINT } from '../utils/prop'
import { wrap } from './wrapper'

export default class Checkbox extends Widget {
	private readonly VALID_PROPERTIES = ['value', 'required']

	constructor(props: any, name: string, private _config: WidgetConfig) {
		super(props, name)
	}

	public renderToString(): string {
		const inputType = 'type="checkbox"'
		let properties = formatProperties(this.props, this.VALID_PROPERTIES)
		properties = `${inputType} ${properties}`
		const inputOpening = this._config.opening.replace(PROPS_INJECTION_POINT, properties)
		const inputClosure = this._config.closure || ''
		return wrap(inputOpening + this.name + inputClosure, this._config)
	}
}
