function isObjectEmpty(obj: any) {
  return Object.keys(obj || {}).length === 0;
}
export default isObjectEmpty;
