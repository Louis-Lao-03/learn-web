// 自动生成，请勿手改。修改 notes/*.md 后运行 node tools/build-notes.mjs，或由 GitHub Actions 生成。
window.NOTES = [
  {
    "title": "HTML 的标题层级：h1 到 h6",
    "tags": [
      "html",
      "基础"
    ],
    "date": "2026-11-09",
    "body": "<p><code>h1</code> 是一级标题，<code>h2</code> 是二级，一直到 <code>h6</code>。</p>\n<p>一个页面通常只放一个 <code>h1</code>，用来概括整页；分节的小标题用 <code>h2</code>，再往下用 <code>h3</code>。</p>\n<h2>常见错误</h2>\n<ul><li>层级跳着用（<code>h1</code> 直接跳到 <code>h3</code>），屏幕阅读器和搜索引擎读不懂结构</li><li>用标题来「让字变大」，那是 CSS 的工作</li></ul>\n<p>标题只负责结构，不负责好看。</p>"
  },
  {
    "title": "静态站能做什么、不能做什么",
    "tags": [
      "部署",
      "取舍"
    ],
    "date": "2026-11-09",
    "body": "<p>静态站只有 HTML / CSS / JavaScript 文件，没有服务器端程序。</p>\n<h2>能做的</h2>\n<ul><li>页面、样式、前端搜索</li><li>离线缓存</li></ul>\n<h2>做不到的</h2>\n<ul><li>登录、数据库</li><li>服务器端全文检索、实时抓取</li></ul>\n<p>代价：搜索用的数据要手工维护——每加一页，就得记得更新索引。</p>"
  },
  {
    "title": "什么是 Pull Request（PR）",
    "tags": [
      "github",
      "流程"
    ],
    "date": "2026-11-09",
    "body": "<p>PR 是一张「申请把我的分支合并进 main」的单子。它包含：谁改的、改了什么（diff）、以及讨论记录。</p>\n<p>合并一个 PR 就是把那条分支的内容并进 main。没合并之前，改动只存在于那条分支上，网站不会变。</p>\n<p>在正文里写 <code>Closes #12</code>，合并时 GitHub 会自动关闭编号为 12 的 Issue。注意：Issue 和 PR 共用同一套编号。</p>"
  }
]
