export default function filterArrayOfObjects(array, keys) {
  return array.map(obj =>
    Object.fromEntries(
      keys
        .map(key => Object.keys(obj).findIndex(e => e === key))
        .map(key => [Object.keys(obj)[key], Object.values(obj)[key]])
    )
  );
}
