const path = require('path');
module.exports = {
    entry: {
      // The entry point of your application
      map: '/public/js/map.js',
      mapPublic: '/public/js/map-public.js',
    },
    output: {
      filename: '[name].bundle.js', // The name of the bundled file
      path: path.resolve(__dirname, 'dist'), // The directory where the bundled file will be saved
    },
    mode: 'development', // The mode can be 'development' or 'production'
  };