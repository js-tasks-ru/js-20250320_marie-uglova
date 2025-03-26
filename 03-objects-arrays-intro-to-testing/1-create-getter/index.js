/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const arrayKeys = path.split('.');

  function getObject(object) {
    for (const el of arrayKeys) {
      if (object.hasOwnProperty(el) && object[el] !== undefined) {
        object = object[el];
      } else {
        return;
      }
    }
    return object;
  }

  return getObject;
}
