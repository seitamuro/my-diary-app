# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `npx cdk deploy` deploy this stack to your default AWS account/region
- `npx cdk diff` compare deployed stack with current state
- `npx cdk synth` emits the synthesized CloudFormation template

## APIの追加方法

APIは[Lambda-lith](https://aws.amazon.com/jp/blogs/news/comparing-design-approaches-for-building-serverless-microservices/)で実装されています。
コードは[Hono](https://hono.dev/)を使って実装しており、cognitoにログインしているユーザーのみにアクセスを制限するmiddlewareとして`auth`ミドルウェアをセルフ実装しています。
APIで利用したい環境変数は`lib/api-stack.ts`の`NodejsFunction`の`environment`プロパティに渡してください。

## 開発中のAPIサーバーを立ち上げる

Lambda-lithを利用することで、honoをローカル環境で動かすことでAPIを迅速に解決することができるようになりました。
ローカルサーバーのコードは`lambda/development/`に配置してあります。
APIに渡す環境変数は`lambda/development/setup-env.sh`に追加することを忘れないようにしてください。
