module.exports = {
  plugins: [
    "uml", // PlantUml
    "mindmap",
    "mathjax", // 数式
    "anchor-navigation-ex-toc", // 章節番号自動付与
    "-sharing", // SNSマーク消し
    "hide-published-with", // Publishリンク消し
    "wide-page", // ページのWideを可変にする
    "expand-active-chapter"
  ],
  pluginsConfig: {
    uml: {
      charset: "utf-8",
      format: "svg"
    },
    "anchor-navigation-ex-toc": {
      associatedWithSummary: true,
      multipleH1: false,
      showLevel: true
    },
    mathjax: {
      forceSVG: true
    },
    "theme-default": {
      showLevel: true
    }
  }
};
