import {UiElement, Widget} from 'concordialang-ui-core'

import {Input} from './html-elements'
import {Button} from './html-elements/button'

export default class ElementFactory {
  public create(element: UiElement): Widget {
    switch (element.widget) {
    case 'textbox':
      return new Input(element.props, element.name)
    case 'button':
      return new Button(element.props, element.name)
    default:
      return new Input(null)
    }
  }
}
