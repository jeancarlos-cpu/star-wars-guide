export default function filterObjectByKeys(obj, keys) {
  return Object.fromEntries(
    keys
      .map(key => Object.keys(obj).findIndex(e => e === key))
      .map(key => [Object.keys(obj)[key], Object.values(obj)[key]])
  );
}
