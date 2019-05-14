import {UiElement, Widget} from 'concordialang-ui-core'

import {Button} from './button'
import {Input} from './input'
import {Checkbox} from './checkbox'
import {Select} from './select'

const enum Widgets {
	BUTTON = 'button',
	TEXTBOX = 'textbox',
	CHECKBOX = 'checkbox',
	SELECT = 'select'
}

export default class WidgetFactory {
	create(element: UiElement): Widget {
		switch (element.widget) {
			case Widgets.TEXTBOX: return new Input(element.props, element.name)
			case Widgets.BUTTON: return new Button(element.props, element.name)
			case Widgets.CHECKBOX: return new Checkbox(element.props, element.name)
			case Widgets.SELECT: return new Select(element.props, element.name)
			default: throw new Error(`Invalid widget type: ${element.widget}`)
		}
	}
}
