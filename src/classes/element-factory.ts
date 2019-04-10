import {UiElement, Widget} from 'concordialang-ui-core'

import {Input} from './html-elements'
import {Button} from './html-elements/button'

const enum WIDGETS {
  BUTTON = 'button',
  TEXTBOX = 'textbox'
}

export default class ElementFactory {
  public create(element: UiElement): Widget {
    switch (element.widget) {
    case WIDGETS.TEXTBOX:
      return new Input(element.props, element.name)
    case WIDGETS.BUTTON:
      return new Button(element.props, element.name)
    default:
      return new Input(null)
    }
  }
}
