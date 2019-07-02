import { Widget } from 'concordialang-ui-core'
import { WidgetConfig } from '../interfaces/app-config'
import { formatProperties, PROPS_INJECTION_POINT } from '../utils/prop'
import { createLabel } from './label'
import { wrap } from './wrapper'

export default class Radio extends Widget {
	private readonly VALID_PROPERTIES = [ 'value' ]

	constructor(props: any, name: string, private _config: WidgetConfig) {
		super(props, name)
	}

	public renderToString(): string {
		const inputType = 'type="radio"'
		const label = createLabel(this.name, '', this._config)
		let inputs: String[] = []

		for (let value of this.props.value as Array<string>) {
			// TODO: o que fazer no formatProperties em relação ao value?
			// provavelmente terei que instalar o pacote "case"
			// para ter 'value="algumaCoisa"', quando value for "Alguma Coisa"
			//
			// TODO: adicionar propriedades 'id' e 'nome'

			const props = Object.assign({}, this.props, { value })
			let properties = formatProperties(props, this.VALID_PROPERTIES)
			properties = `${inputType} ${properties}`
			const inputOpening = this._config.opening.replace(PROPS_INJECTION_POINT, properties)
			const inputClosure = this._config.closure || ''
			inputs.push(inputOpening + value + inputClosure)
		}

		return wrap(label + inputs.join(''), this._config)
	}
}

