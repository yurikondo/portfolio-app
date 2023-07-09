
# AMAPOST

Amazon商品URLとコメントを投稿して、おすすめの商品をユーザーとシェアできるSNSアプリです。


## テスト用アカウント
ユーザー名：テストユーザー

パスワード：test2023

(新規アカウントを作成いただいても構いません)


## 使用技術
#### バックエンド

- Node.js : 16.13.1
- Express : ^4.18.2
- mongoDB
- mongoose : ^7.0.3
- crypto-js : ^4.1.1

#### フロントエンド
- React : ^17.0.2
- axios : ^1.3.5
- emoji-mart : ^5.5.2
- react-redux : ^8.0.5
- timeago.js : ^4.0.0-beta.3
- react-router-dom : ^6.10.0

## 利用方法
アカウント作成 or ログインをするとホーム画面にみんなの投稿が表示されます。
フォームにAmazonのURLを入力すると商品画像も取得できます。

## 機能一覧
#### 投稿に関する機能
- ユーザー登録・ログイン(JWT)
- 投稿機能
    - アマゾンURLから商品画像を取得
- いいね機能
- 自分の投稿の削除機能
- 何時間前、何ヶ月前に投稿したか表示(timeago.js)
- 商品画像をクリックするとAmazonの商品ページを表示

#### ホーム
- 新規の５ユーザーを表示
- 新規投稿順に投稿を表示

#### プロフィールページ
- 背景画像ピッカー(pixabayAPI)
- Emojiピッカー(emoji-mart)
- 自分の投稿を新規順に表示
- 投稿数を表示
- フォロワーを表示

#### お気に入りページ
- いいねした投稿を新規順に表示

#### フォローページ
- フォローしているユーザーとその投稿を新規順に表示

## データベース構造
![DB](https://i.gyazo.com/93b2d01d0e399320ddea1596b003bb83.png)