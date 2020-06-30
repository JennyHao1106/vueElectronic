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
    'no-console': 'off',
    'no-debugger': 'off',
    //设置方法后加空格 禁用
    'space-before-function-paren':0
  },

  'extends': [
    'plugin:vue/recommended',
    '@vue/standard'
  ]
}
