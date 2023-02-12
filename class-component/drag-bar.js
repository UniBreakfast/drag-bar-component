export { DragBar }

class DragBar {
  static e0
  static current
  static bars = []

  constructor(parent) {
    const bar = document.createElement('drag-bar')
    const div = document.createElement('div')

    parent.appendChild(bar).append(div)

    this.element = div
    
    this.assignListeners()
    
    DragBar.bars.push(bar)
  }

  insert(...children) {
    this.element.append(...children)
  }

  assignListeners() {
    this.element.parentElement.addEventListener('mousedown', DragBar.handleMousedown)

    if (!DragBar.bars.length) {
      window.addEventListener('resize', DragBar.handleResize)
    }
  }

  static handleMousedown(e) {
    if (e.target == this) {
      DragBar.e0 = e
      DragBar.current = this.parentElement.appendChild(this)
      window.addEventListener('mousemove', DragBar.handleDrag)
      window.addEventListener('mouseup', DragBar.handleMouseup)
    }
  }

  static handleDrag(e) {
    DragBar.current.style.left = normalize(
      e.clientX - DragBar.e0.offsetX,
      innerWidth - DragBar.current.offsetWidth
    ) + 'px'

    DragBar.current.style.top = normalize(
      e.clientY - DragBar.e0.offsetY,
      innerHeight - DragBar.current.offsetHeight
    ) + 'px'
  }

  static handleMouseup() {
    window.removeEventListener('mousemove', DragBar.handleDrag)
    window.removeEventListener('mouseup', DragBar.handleMouseup)
  }

  static handleResize() {
    for (const bar of DragBar.bars) {
      bar.style.left = normalize(bar.offsetLeft, innerWidth - bar.offsetWidth) + 'px'
      bar.style.top = normalize(bar.offsetTop, innerHeight - bar.offsetHeight) + 'px'
    }
  }
}

function normalize(value, max) {
  return Math.max(0, Math.min(max, value))
}
