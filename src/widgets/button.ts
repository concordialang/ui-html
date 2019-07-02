import { Widget } from 'concordialang-ui-core'
import { WidgetConfig } from '../interfaces/app-config'
import { formatProperties, PROPS_INJECTION_POINT } from '../utils/prop'

export default class Button extends Widget {
	private readonly VALID_PROPERTIES = ['id', 'disabled', 'value']

	constructor(props: any, name: string, private _config: WidgetConfig) {
		super(props, name || '')
	}

	public renderToString(): string {
		const buttonType = this.getType(this.props.datatype as string)
		let properties = formatProperties(this.props, this.VALID_PROPERTIES)
		properties = `${ buttonType } ${ properties }`
		const buttonOpening = this._config.opening.replace(PROPS_INJECTION_POINT, properties)
		const buttonClosure = this._config.closure
		return buttonOpening + this.name + buttonClosure
	}

	private getType(datatype: string): string {
		return `type="${datatype || 'button'}"`
	}
}
