export default (c1, c2) => {
  if (!c1) c1 = '';
  if (!c2) c2 = '';

  if (Array.isArray(c1)) c1 = c1.filter(c => c === 0 || c);
  if (Array.isArray(c2)) c2 = c2.filter(c => c === 0 || c);
  
  if (c1.length != c2.length) return false;

  for (let i in c1)
    if (c1[i] != c2[i]) return false;

  return true;
}