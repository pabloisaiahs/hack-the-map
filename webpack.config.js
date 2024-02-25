const path = require('path');

module.exports = {
  entry: {
    autocomplete: './autocomplete.js',
    calendar: './calendar.js',
    flights: './flights.js',
    form: './form.js',
    safetyInfo: './safetyInfo.js',
    hotelData: './hotelData.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
      },
    ],
  },
};
