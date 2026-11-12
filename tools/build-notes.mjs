import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const DIR = 'notes'
const files = (await readdir(DIR)).filter((file) => file.endsWith('.md'))

function parse(text, file) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) throw new Error(`${file}: 缺少 front matter（文件开头需要有 --- 包住的元数据）`)
  const meta = {}
  for (const line of match[1].split('\n')) {
    const at = line.indexOf(':')
    if (at > 0) meta[line.slice(0, at).trim()] = line.slice(at + 1).trim()
  }
  return {
    title: meta.title || file,
    tags: (meta.tags || '').split(/[,，]/).map((tag) => tag.trim()).filter(Boolean),
    date: meta.date || '',
    markdown: match[2].trim(),
  }
}

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function inline(text) {
  let out = escapeHtml(text)
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>')
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  return out
}

function render(markdown) {
  const html = []
  for (const block of markdown.split(/\n{2,}/)) {
    const lines = block.split('\n')
    const heading = lines[0].match(/^(#{1,6})\s+(.*)$/)
    if (heading) {
      const level = heading[1].length
      html.push(`<h${level}>${inline(heading[2])}</h${level}>`)
      if (lines.length > 1) html.push(`<p>${lines.slice(1).map(inline).join('<br>')}</p>`)
    } else if (lines.every((line) => /^[-*]\s/.test(line))) {
      html.push(`<ul>${lines.map((line) => `<li>${inline(line.replace(/^[-*]\s*/, ''))}</li>`).join('')}</ul>`)
    } else {
      html.push(`<p>${lines.map(inline).join('<br>')}</p>`)
    }
  }
  return html.join('\n')
}

const notes = []
for (const file of files.sort()) {
  const parsed = parse(await readFile(join(DIR, file), 'utf8'), file)
  notes.push({ title: parsed.title, tags: parsed.tags, date: parsed.date, body: render(parsed.markdown) })
}
notes.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

await writeFile(
  'notes-data.js',
  '// 自动生成，请勿手改。修改 notes/*.md 后运行 node tools/build-notes.mjs，或由 GitHub Actions 生成。\n'
    + 'window.NOTES = ' + JSON.stringify(notes, null, 2) + '\n',
)
console.log(`已生成 ${notes.length} 条笔记的索引`)
