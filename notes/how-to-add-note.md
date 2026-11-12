---
title: 怎么加一条笔记
tags: 维护
date: 2026-11-12
---

在 `notes/` 目录下新建一个 `.md` 文件，文件名建议用英文小写加连字符，例如 `pr-basics.md`。

文件开头必须有 front matter，用两行 `---` 包住：

    ---
    title: 标题
    tags: 标签1, 标签2
    date: 2026-11-12
    ---

下面写 Markdown 正文，支持：`##` 标题、`-` 列表、**加粗**、行内代码（反引号）。

提交后运行 `node tools/build-notes.mjs`，索引会重新生成。
