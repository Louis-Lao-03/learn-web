const NOTES = window.NOTES || []
const list = document.getElementById('list')
const hint = document.getElementById('hint')
const input = document.getElementById('q')
const viewer = document.getElementById('note-body')

function matches(note, query) {
  const text = [note.title, (note.tags || []).join(' '), note.body].join(' ').toLowerCase()
  return text.includes(query.toLowerCase())
}

function show(note) {
  viewer.innerHTML = ''
  const title = document.createElement('h2')
  title.textContent = note.title
  viewer.appendChild(title)
  const meta = document.createElement('p')
  meta.textContent = `${note.date} · ${(note.tags || []).join('、')}`
  viewer.appendChild(meta)
  // 正文按空行分段，不依赖任何 markdown 库，保证离线可用。
  for (const paragraph of note.body.split('\n\n')) {
    const p = document.createElement('p')
    p.textContent = paragraph
    viewer.appendChild(p)
  }
}

function render(items) {
  list.innerHTML = ''
  for (const note of items) {
    const li = document.createElement('li')
    const link = document.createElement('a')
    link.href = '#'
    link.textContent = `${note.date} · ${note.title}`
    link.addEventListener('click', (event) => {
      event.preventDefault()
      show(note)
    })
    li.appendChild(link)
    list.appendChild(li)
  }
  hint.textContent = items.length ? `共 ${items.length} 条` : '没找到匹配的笔记'
}

function search(query) {
  const trimmed = query.trim()
  render(trimmed ? NOTES.filter(note => matches(note, trimmed)) : NOTES)
}

input.addEventListener('input', () => search(input.value))
render(NOTES)
