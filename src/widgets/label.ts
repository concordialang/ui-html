import * as Mustache from 'mustache'

import { WidgetConfig } from '../interfaces/app-config'
import { formatHtml } from '../utils'

export function createLabel(widgetName: string, widgetId: string | undefined, widgetConfig: WidgetConfig): string {
	if (!widgetConfig.label) return ''

	const idPattern = /^(#|~|\d|\w).*/
	const labelFor = widgetId && widgetId.match(idPattern) ? `for="${widgetId.replace(/^#|~/ , '')}"` : ''
	widgetConfig.label.opening = Mustache.render(widgetConfig.label.opening, { props: labelFor })

	return formatHtml(widgetConfig.label.opening + widgetName + widgetConfig.label.closure)
}
