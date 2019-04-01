import {Element} from '/home/willian/Projects/tcc/ui-core'

import {HtmlElement, Input} from './html-elements'

export default class ElementFactory {
  public create(element: Element): HtmlElement {
    switch (element.widget) {
    case 'textbox':
      return new Input(element.props)
    default:
      return new Input(null)
    }
  }
}
