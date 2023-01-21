/**
 * Group data by menu category
 * @param {String} array ticker of the coin
 */

export const mutateData = (array) => array.reduce((grouped, element) => {
    const category = element?.category;
    if (grouped[category] == null) grouped[category] = [];
    grouped[category].push(element);
    return grouped;
  }, {});

export const objectToArray = (object) => {
  if (object) {
    return Object.entries(object);
  }
}