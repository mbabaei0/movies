/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const response = groupBy<any>(data.items, (feature) => feature[data.key]);;
  postMessage({id: data.id , response});
});

/**
   * Groups a list of items by a specified key.
   *
   * @template T - The type of items in the list.
   * @param {Array<T>} list - The list of items to be grouped.
   * @param {function(T): string} keyGetter - A function that returns the key to group by for each item.
   * @returns {Map<string, T[]>} A map where the keys are the group identifiers and the values are arrays of grouped items.
   */
export function groupBy<T>(list: Array<T>, keyGetter: (a: T) => string) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}
