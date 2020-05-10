// Pluralize a noun based on count, defaults to 's'
export default (count: number, noun: string, suffix: string = 's') => `${ count } ${ noun }${ count !== 1 ? suffix : '' }`