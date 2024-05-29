/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const response = groupBy<unknown>(data.items, (feature) => feature[data.key]);;
  postMessage({id: data.id , response});
});


function groupBy<T>(list: Array<T>, keyGetter: (a: T) => string) {
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
