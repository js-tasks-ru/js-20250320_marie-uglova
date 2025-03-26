/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
    const objMatched = {};

    for(const [key, _] of Object.entries(obj)) {
        if (fields.includes(key)) {
            objMatched[key] = obj[key];
        }
    }

    return objMatched;
};
