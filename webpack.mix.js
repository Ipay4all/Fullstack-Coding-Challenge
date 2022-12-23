const path = require('path')
const fs = require('fs-extra')
const mix = require('laravel-mix')
require('laravel-mix-versionhash')
const tailwindcss = require('tailwindcss')


mix
  .js('resources/js/app.js', 'public/dist/js').vue()
  .sass('resources/sass/app.scss', 'public/dist/css')
  .options({
    processCssUrls: false,
    postCss: [tailwindcss('./tailwind.config.js')]
  })

  .disableNotifications()

if (mix.inProduction()) {
  mix.versionHash()
} else {
  mix.sourceMaps()
}

mix.webpackConfig({
  plugins: [
    // new BundleAnalyzerPlugin()
  ],
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      '~': path.join(__dirname, './resources/js')
    }
  },
  output: {
    chunkFilename: 'dist/js/[chunkhash].js',
    path: path.resolve(__dirname, mix.inProduction() ? './public/build' : './public')
  }
})

mix.then(() => {
  if (mix.inProduction()) {
    process.nextTick(() => publishAssets())
  }
})

function publishAssets () {
  const publicDir = path.resolve(__dirname, './public')

  fs.removeSync(path.join(publicDir, 'dist'))
  fs.copySync(path.join(publicDir, 'build', 'dist'), path.join(publicDir, 'dist'))
  fs.removeSync(path.join(publicDir, 'build'))
}
