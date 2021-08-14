const fs = require('fs');

exports.writeFile = (path, name, content) => {
  if (!fs.existsSync(path)){
    fs.mkdirSync(path);
  }

  fs.writeFileSync(`${path}/${name}`, content);
}
