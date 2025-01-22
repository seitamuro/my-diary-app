cdkでバックグラウンド、フロントをvite+Reactで作成したwebアプリケーションのテンプレートです。

# セットアップ

```
pnpm run cdk:deploy # バックエンドのセットアップ
pnpm run web:deploy # フロントエンドをbuildしてs3にアップロード
pnpm run web:dev # フロントエンドの開発環境の立ち上げ
```

# フロントエンドの更新

```
pnpm run web:deploy
```

# コードのフォーマット

```
cd package/web
pnpm run format
pnpm run lint:fix
```

# アプリの削除

```
pnpm run web:remove
pnpm run cdk:destroy
```

# ローカルのAPIサーバーに接続する

```
pnpm run local-server
pnpm run web:local
```

上記のコマンドをそれぞれ別ターミナルで実行してください。
