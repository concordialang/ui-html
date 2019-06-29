import { WidgetConfig } from '../interfaces/app-config'
import { PROPS_INJECTION_POINT } from '../utils/prop'

export function createLabel(widgetName: string, widgetId: string, widgetConfig: WidgetConfig): string {
	if (!widgetConfig.label) return ''

	const idPattern = /^(#|~|\d|\w).*/
	const labelFor = (widgetId.match(idPattern)) ? `for="${widgetId.replace(/^#|~/ , '')}"` : ''
	const labelOpening = widgetConfig.label.opening.replace(PROPS_INJECTION_POINT, labelFor)
	const labelClosure = widgetConfig.label.closure

	return labelOpening + widgetName + labelClosure
}
