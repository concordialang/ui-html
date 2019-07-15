import { WidgetConfig } from '../interfaces/app-config'

export function wrap(elements: string, widgetConfig: WidgetConfig): string {
	if (widgetConfig.wrapper) {
		return widgetConfig.wrapper.opening + elements + widgetConfig.wrapper.closure
	}
	return elements
}
