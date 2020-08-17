// 这是项目发布阶段需要用到的 babel 插件
const prodPlugins = []
// 判断是开发还是发布阶段
if (process.env.NODE_ENV === 'production') {
  // 发布阶段
  prodPlugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
    // '@babel/preset-env'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    // 发布产品时候的插件数组，通过展开运算符追加
    ...prodPlugins,
    '@babel/plugin-syntax-dynamic-import'
  ]
}
