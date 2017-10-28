function importAll(r) {
  let icons = {};
  r.keys().map(item => {
    icons[item.replace('./', '').replace('.png', '')] = r(item);
  });
  return icons;
}

const icons = require.context('img/icons', false, /^.*\.png$/);
export default importAll(icons);