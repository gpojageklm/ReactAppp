const path = require('path');

module.exports = function(config) {
  // Use your own ESLint file
  let eslintLoader = config.module.rules[0];
  eslintLoader.use[0].options.useEslintrc = true;

  // Add the SASS loader second-to-last
  // (last one must remain as the "file-loader")
  let loaderList = config.module.rules[1].oneOf;
  loaderList.splice(loaderList.length - 1, 0, {
    test: /\.scss$/,
    use: ["style-loader", "css-loader", "sass-loader", "node-sass"]
  });
  let babelLoader = config.module.rules[2];
  babelLoader.splice(babelLoader.length-1, 0, {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader"
    }
  });
  let htmlLoader = config.module.rules[3];
  htmlLoader.splice(htmlLoader.length-1, 0, {
    test: /\.html$/,
    use:
    [
      {
      loader: "html-loader"
      }
    ]
  });
  let urlLoader = config.module.rules[4];
  urlLoader.splice(urlLoader.length-1, 0, { 
    test: /\.(png|jpg|gif)$/,
    use: {
      loader: 'url-loader?limit=8192'
    }
  });
  let jsonLoader = config.module.rules[5];
  jsonLoader.splice(jsonLoader.length-1, 0, { 
    test: /\.json$/,
    use: {
      loader: 'json-loader'
    }
  });
}