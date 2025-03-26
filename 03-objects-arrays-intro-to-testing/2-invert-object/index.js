/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
  const invertedResult = {};

  if (!obj) {
    return;
  }

  for (const [a, b] of Object.entries(obj)) {
    invertedResult[b] = a;
  }

  return invertedResult;
}
