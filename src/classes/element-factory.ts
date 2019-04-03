import {Element} from '/Users/vcpablo/Code/concordia-ui/ui-core/src'

import {HtmlElement, Input} from './html-elements'
import { Button } from './html-elements/button';

export default class ElementFactory {
  public create(element: Element): HtmlElement {
    console.log(element.widget)
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
