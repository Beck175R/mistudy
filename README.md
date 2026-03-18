# Mystery Study Quest

小学生から中学生向けの、推理アドベンチャー型学習アプリです。

## ローカル起動

```bash
.\start.ps1
```

または

```bash
node server.js
```

その後、`http://localhost:4173` を開きます。

## 公開向けの状態

このプロジェクトは、外部APIやデータベースを使わない完全静的サイトとして公開できます。

- 外部フォントを削除済み
- サーバーサイド処理なし
- 個人情報の送信なし
- 静的ホスティング向けのヘッダ設定ファイルを同梱

## 公開方法

### GitHub Pages

このプロジェクトは、`main` ブランチへ push すると GitHub Actions が自動で Pages へ公開する構成です。

#### いちばん簡単な流れ

1. GitHub にログイン
2. 右上の `+` から `New repository` を押す
3. Repository name を入れる
4. `Public` を選ぶ
5. `Add a README file` はオフのままにする
6. `Create repository` を押す
7. このフォルダで PowerShell を開く
8. 下のコマンドを上から順に貼る

```powershell
git init
git branch -M main
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/あなたのユーザー名/作ったリポジトリ名.git
git push -u origin main
```

9. GitHub のリポジトリ画面を開く
10. `Settings` を押す
11. 左の `Pages` を押す
12. `Build and deployment` の `Source` を `GitHub Actions` にする
13. 数分待つ
14. `Actions` タブで `Deploy to GitHub Pages` が緑になれば公開完了

公開URLは通常、次の形です。

```text
https://あなたのユーザー名.github.io/リポジトリ名/
```

#### もし push で止まったら

GitHub からユーザー名やパスワードではなく、ブラウザ認証やトークンを求められることがあります。その場合は GitHub の案内に従ってログインすれば大丈夫です。

#### 初心者向けの重要ポイント

- GitHub 上で README や .gitignore を先に作らない
- まず空リポジトリを作る
- このフォルダの内容をそのまま push する
- 公開先のURLは自動で決まる

### Netlify

1. Netlify にリポジトリを接続
2. Build command は空欄
3. Publish directory は `/`
4. デプロイ

`_headers` と `_redirects` がそのまま使えます。

## コンセプト

- 1回3問の短い学習ミッション
- 算数、国語、英語の問題を解くと手がかりが開く
- 4つの手がかりをそろえると事件の真相を推理できる

## 技術構成

- 依存なしの HTML / CSS / JavaScript
- ローカル確認用の Node.js 軽量サーバー
- GitHub Actions による GitHub Pages 自動デプロイ
