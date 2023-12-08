export default function getMediaType(path) {
    let result = path
    result = result.slice(1)
    result = result.slice(0, result.indexOf('/'))

    return result.charAt(0).toUpperCase() + result.slice(1)
}