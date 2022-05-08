const webpack = require('webpack')
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    new webpack.ProvidePlugin({
      mapboxgl: 'mapbox-gl',
    }),
  ]
}
