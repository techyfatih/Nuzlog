export default str => {
  if (typeof str == 'string')
    return str.trim().toLowerCase()
      .replace(/é/g, 'e')
      .replace(/[.'-\s:]/g, '')
      .replace('♀', 'f')
      .replace('♂', 'm');
  return '';
}