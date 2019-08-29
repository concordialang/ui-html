import { Widget } from 'concordialang-ui-core'

export default class Body extends Widget {
	constructor(private _widgets: Widget[]) {
		super(null, '')
	}

	public renderToString(): string {
		let content = this._widgets.reduce((result, widget) => {
			return result + widget.renderToString()
		}, '')
		return '<body><form>' + content + '</form></body>'
	}
}
