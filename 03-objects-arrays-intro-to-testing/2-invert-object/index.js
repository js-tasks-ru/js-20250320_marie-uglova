/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
    const result = {};

    if(obj !== undefined) {
        for(let [a, b] of Object.entries(obj)) {
            result[b] = a;
        }
    } else {
        return undefined;
    }

    return result;
}
