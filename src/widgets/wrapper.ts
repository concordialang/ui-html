import { WidgetConfig } from '../interfaces/app-config'

export function wrap(elements: string, widgetConfig: WidgetConfig): string {
	if (widgetConfig.wrapperOpening && widgetConfig.wrapperClosure)
		return widgetConfig.wrapperOpening + elements + widgetConfig.wrapperClosure
	return elements
}
