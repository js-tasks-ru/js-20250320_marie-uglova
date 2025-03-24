/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    let array = path.split('.');

    function getObject(object) {
        for (const el of array) {
            if (object.hasOwnProperty(el) && object[el] !== undefined) {
                object = object[el];
            } else {
                return undefined;
            }
        }
        return object;
    }

    return getObject;
}
