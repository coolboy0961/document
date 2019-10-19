# GitBookの利用について

1. 前提
    - package.jsonが入っているフォルダを testdir だとする
    - 下記記載コマンドの実行ディレクトリは全部 testdir の配下となる。

1. SUMMARY.mdにおいて、下記のように資料へのリンクを追加する。
    ```
    * [sample 対応](docs/設計資料/sample対応.md)
    ```
    *資料のタイプによって`## カテゴリ`でカテゴリを分ける。*

1. 下記コマンドを実行することで、`docs/設計資料/sample対応.md`のファイルが自動的に作成される。
    ```
    npm run gitbook init
    ```

1. 下記コマンドを実行することで、ビルド後の資料をプレビューすることができる。
    ```
    ./serve.sh
    ```
    ブラウザで`http://localhost:4000`にアクセスすれば、プレビューが表示される。

1. プレビューのために立てた Web Service を停止する方法
    ```
    ./serve.sh shutdown
    ```

1. おすすめのエディター
  [typora](https://typora.io/)というエディターはおすすめです。  
  特に表と画像の挿入に便利です。