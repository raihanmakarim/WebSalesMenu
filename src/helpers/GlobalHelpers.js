/**
 * Group data by menu category
 * @param {String} array ticker of the coin
 */

export const mutateData = (array) =>
  array.reduce((grouped, element) => {
    const category = element?.category;
    if (grouped[category] == null) grouped[category] = [];
    grouped[category].push(element);
    return grouped;
  }, {});

export const objectToArray = (object) => {
  if (object) {
    return Object.entries(object);
  }
};

export const numberToCurrency = (number) => {
  return Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
