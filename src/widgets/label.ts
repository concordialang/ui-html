export function createLabel(name: string, id: string): string {
    const validIdPattern = /^(#|~|\d|\w).*/
    const labelFor = (validIdPattern.test(id)) ? `for="${id.replace(/^#|~/ , '')}"` : ''
    return `<label ${labelFor}>${name}</label>`
}
