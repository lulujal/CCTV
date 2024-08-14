const path = require('path');
module.exports = {
    entry: '/public/js/map.js', // The entry point of your application
    output: {
      filename: 'bundle.js', // The name of the bundled file
      path: path.resolve(__dirname, 'dist'), // The directory where the bundled file will be saved
    },
    mode: 'development', // The mode can be 'development' or 'production'
  };