export default (type) => {
  if (!/^[A-Z\_\.]+$/.test(type)) {
    throw new Error('Action definition object "type" property value must consist only of uppercase alphabetical characters and underscores.')
  }
}
