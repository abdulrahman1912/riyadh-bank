const path = require('path');
module.exports = {
  entry: './scripts/index.js',
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules']
  }
};