let e0, bar, bars = []
let stylesAdded = false

function makeDragBar(innerHtml) {
  const bar = document.createElement('drag-bar')

  bar.innerHTML = innerHtml

  bar.addEventListener('mousedown', handleMousedown)

  if (!bars.length) window.addEventListener('resize', handleResize)

  bars.push(bar)

  if (!stylesAdded) {
    const sheet = document.styleSheets[0] 
      || document.head.appendChild(document.createElement('style')).sheet
    
    rules.forEach(rule => sheet.insertRule(rule, sheet.cssRules.length))
    stylesAdded = true
  }

  return bar
}

function handleMousedown(e) {
  if (e.target == this) {
    e0 = e
    bar = this.parentElement.appendChild(this)
    window.addEventListener('mousemove', handleDrag)
    window.addEventListener('mouseup', handleMouseup)
  }
}

function handleDrag(e) {
  bar.style.left = normalize(e.clientX - e0.offsetX, innerWidth - bar.offsetWidth) + 'px'
  bar.style.top = normalize(e.clientY - e0.offsetY, innerHeight - bar.offsetHeight) + 'px'
}

function handleMouseup() {
  window.removeEventListener('mousemove', handleDrag)
  window.removeEventListener('mouseup', handleMouseup)
}

function handleResize() {
  for (const bar of bars) {
    bar.style.left = normalize(bar.offsetLeft, innerWidth - bar.offsetWidth) + 'px'
    bar.style.top = normalize(bar.offsetTop, innerHeight - bar.offsetHeight) + 'px'
  }
}

function normalize(value, max) {
  return Math.max(0, Math.min(max, value))
}

const rules = `
drag-bar {
  position: fixed;
  width: 30vmin;
  height: 12vmin;
  background-color: plum;
  user-select: none;
  padding: 6px 40px;
}

drag-bar:hover:not(:has(:hover)) {
  cursor: grab;
}

drag-bar:active:not(:has(:active)) {
  cursor: grabbing;
}

drag-bar>:only-child {
  background: wheat;
  height: 100%;
  overflow: hidden;
}
`.split('\n\n')
