export default str => {
  if (typeof str == 'string')
    return str.toLowerCase()
      .replace(/é/g, 'e')
      .replace(/[.'-\s:]/g, '')
      .replace(/♀/g, 'f')
      .replace(/♂/g, 'm');
  return '';
}