export function formatProperties(props: any, validProperties: string[]): string {

    const getFormattedProp = (key: string) => `${key}="${props[key]}"`

	const formatValid = (result: string, prop: string) => {
        return validProperties.includes(prop)
            ? result + getFormattedProp(prop) + ' '
            : result
    }

    return Object.keys(props).reduce(formatValid, '').trimRight()
}
