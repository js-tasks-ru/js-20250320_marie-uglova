/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
    let object = Object.assign(obj);
    fields.forEach(el => {
        Object.entries(obj).forEach(i => {
            if(i.includes(el)) {
                delete object[el];
            }
        })
    })
    return object;
};
