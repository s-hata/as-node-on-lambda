# Todos Client

Todos アプリケーション・クライアントです。
このプロジェクトは [Angular CLI](https://github.com/angular/angular-cli) version 7.0.1 によって生成されています。

## Requirement

  * [Node.js](https://nodejs.org/ja/) version 10.12.
  * [Yarn](https://yarnpkg.com/ja/) version 1.10.
  * [Angular CLI](https://github.com/angular/angular-cli) version 7.0.


## 利用方法

### 開発

依存関係するnpmモジュールを`yarn install`を実行しインストールします。

```
$ yarn install
```

`yarn server`を実行しREST APIモックを起動します。その後、クライアントのトランスパイルからパブリッシュまでを透過的に行う`yarn start`を実行します。ブラウザから`http://localhost:4200/`にアクセスするとクライアントアプリケーションにアクセスできます。ソースコードを変更するとブラウザはクライアントアプリケーションを自動でリロードします。

### アプリケーション・ビルド

アプリケーションをビルドするには、`yarn build`を実行します。アーティファクトは、`dist/`ディレクトリ配下にストアされます。

### ユニット・テストの実行

[Karma](https://karma-runner.github.io)を介してユニット・テストを実行するには、`yarn test`を実行します。

### エンド・ツー・エンドテストの実行

[Protractor](http://www.protractortest.org/)を介してエンド・ツー・エンドテストを実行するには、`yarn e2e`を実行します。
