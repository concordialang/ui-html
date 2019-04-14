import {UiElement, Widget} from 'concordialang-ui-core'

import {Button} from './button'
import {Input} from './input'

const enum WIDGETS {
  BUTTON = 'button',
  TEXTBOX = 'textbox'
}

export default class WidgetFactory {

  create(element: UiElement): Widget {
    switch (element.widget) {
      case WIDGETS.TEXTBOX: return new Input(element.props, element.name)
      case WIDGETS.BUTTON: return new Button(element.props, element.name)
      default: return new Input(null)
    }
  }

}
