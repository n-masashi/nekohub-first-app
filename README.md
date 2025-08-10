# nekohub-first-app

## 概要

このアプリは学習と並行して作成した初めてのウェブアプリ。<br>
主な機能は、新規ユーザ登録とログイン認証機能あり(MySQLデータベースと連携)のツールボックス　※のつもり。<br>
Todo管理とQRコード生成しかまだツールはないですが、学習と並行していくつか追加更新する予定。

## セットアップ方法

1. リポジトリをクローンまたはダウンロード。

2. プロジェクト直下に `.env` ファイルを作成し、以下の内容を設定。

```env
SESSION_SECRET=ランダムシークレット値
DB_USER=DBユーザ名
DB_PASSWORD=DBパスワード
```

3. MySQLで `nekohub` データベースを作成して、`/db/schema.sql` をインポート。

```bash
mysql -u <DB_USER> -p
CREATE DATABASE nekohub;
exit
mysql -u <DB_USER> -p nekohub < db/schema.sql
```

4. 必要なパッケージをインストール。

```bash
npm install
```

5. アプリを起動。
   ※ユーザはない状態なので、必ずユーザ登録して（Signup）利用する。

```bash
npm start
```

---

## 作成につかった（学んだ）技術

- Node.js
- Express.js
- MySQL
- Knex.js (SQLクエリビルダー)
- EJS (テンプレートエンジン)
- Bootstrap (CSSフレームワーク)
- JavaScript, HTML, CSS

---

## 備考

- カスタマイズはしてもいいですが、セッションの秘密鍵は `.env` で管理して、Gitに含めないこと。  
- データベースのユーザ名やパスワードも `.env` で管理すること。  
- 初期データは `/db/schema.sql` で定義していますが、ユーザ登録は実際にアプリ上で行ってください。
