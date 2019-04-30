export function formatProperties(props: any, validProperties: string[]): string {

    const getFormattedProp = (key: string) => `${key}="${props[key]}"`

    const formatValid = function (result: string, key: string) {
        return validProperties.includes(key)
            ? result + getFormattedProp(key)
            : result
    }

    const output = Object.keys(props).reduce(formatValid, '').trim()
    return output ? ` ${output}` : ''
}