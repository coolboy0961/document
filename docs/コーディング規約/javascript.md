# SpringBoot(Thymeleaf) + Vue の JavaScript 静的チェックの設定方法

## 前提
VSCodeを利用していること

## 必要な拡張機能
- ESLint
- Prettier - Code formatter

## 必要なnpm modules
```json
  "devDependencies": {
    "eslint": "^5.16.0",
    "eslint-config-eslint": "^5.0.1",
    "eslint-config-prettier": "^4.2.0",
    "eslint-plugin-html": "^5.0.3",
    "eslint-plugin-prettier": "^3.0.1",
    "eslint-plugin-vue": "^5.2.2",
    "prettier": "^1.17.0"
  }
```

## VSCodeのSettings.json
```json
  // Javascript
  "javascript.referencesCodeLens.enabled": true, // Javascriptの コード参照機能を有効化
  "prettier.eslintIntegration": true, //prettier-eslintを使うようになる、これでprettierで整形するときに、eslintでチェックエラーとなる部分も一緒に直してくれる
  // 適応するファイルタイプを決定
  "eslint.validate": [
    "javascript",
    {
      "language": "vue",
      "autoFix": true
    },
    "html"
  ],
  // プロジェクト配下のeslintrc.jsを読み込み
  "eslint.options": {
    "configFile": ".eslintrc.js"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
```

## .eslintrc.js
```javascript
module.exports = {
    "env": {
        "browser": true, // ブラウザのライブラリを利用する
        "es6": true      // es6のライブラリを利用する
    },
    "extends": [
        "eslint:recommended",// eslint推奨チェック
        "plugin:prettier/recommended",// prettier推奨チェック
        "plugin:vue/recommended"// vue推奨チェック
    ],
    "globals": { // グローバル変数の定義、設定しないと not defined と怒られる
        "Vue": true,
        "WinForm": true
    },
    "parserOptions": {
        "ecmaVersion": 6, // 利用するJavascriptの文法バージョン
        "sourceType": "module" // import/export の javascript moduleを利用
    },
    "plugins": [
        "prettier", // eslintでprettierのルールを入れるプラグイン
        "vue",      // eslintでvueのルールを入れるプラグイン
        "html"      // htmlにあるjavascriptをチェックできるようにするプラグイン
    ],
    "rules": {
    }
};
```