export interface CustomConfig {
	widgets?: {
		input?: WidgetConfig
	}
}

export interface WidgetConfig {
	opening: string,
	closure?: string,
	header?: string,
	footer?: string
}

// path for properties in WidgetConfig to by used in lodash "get" method
export const WIDGET_OPENING = 'opening'
export const WIDGET_CLOSURE = 'closure'
export const WIDGET_WRAPPER_OPENING = 'header'
export const WIDGET_WRAPPER_CLOSURE = 'footer'
