module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-tabs': 0,
    'no-mixed-spaces-and-tabs': 0,
    'indent':['off','tab'],
    'no-trailing-spaces': 0,
    'space-before-function-paren':0,
    'no-unused-vars': [0, {
      // 允许声明未使用变量
      'vars': 'local',
      // 参数不检查
      'args': 'none'
    }],
     "no-unused-vars": "off",
     "camelcase": [0, {"properties": "never"}]
    //  "camelcase": ["error", {"allow": ["aa_bb"]}]
  }
}
