module.exports = {
  presets: [['@babel/env', {
    useBuiltIns: 'usage',
    corejs: 3,
    targets: {
      browsers: ['last 3 versions', 'ie >= 11'],
      node: 'current'
    }
  }]]
}
