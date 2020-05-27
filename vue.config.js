module.exports = {
  pages: {
    index: {
      // 最初に実行されるファイル名
      entry: "src/main.js",
      // テンプレートファイル
      template: "public/index.html",
      // 出力されるファイル名
      filename: "index.html",
      // タイトルの設定
      // <title><%= htmlWebpackPlugin.options.title %></title>
      title: "Aws Amplify掲示板",
      // チャンクの指定
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
    // サブページをせっているするとエントリーページのファイル以外はこちらが参照される。
    // テンプレートファイルは、 `public/subpage.html`
    // public/subpage.htmlがなかったら `public/index.html`が呼び出される。
    // 出力されるファイル名は `subpage.html`となる。
    subpage: "src/main.js",
  },
};
