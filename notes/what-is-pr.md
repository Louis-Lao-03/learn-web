---
title: 什么是 Pull Request（PR）
tags: github, 流程
date: 2026-11-09
---

PR 是一张「申请把我的分支合并进 main」的单子。它包含：谁改的、改了什么（diff）、以及讨论记录。

合并一个 PR 就是把那条分支的内容并进 main。没合并之前，改动只存在于那条分支上，网站不会变。

在正文里写 `Closes #12`，合并时 GitHub 会自动关闭编号为 12 的 Issue。注意：Issue 和 PR 共用同一套编号。
