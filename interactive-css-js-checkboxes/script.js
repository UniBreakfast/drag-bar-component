const scripts = {
  '00000': script00000,
  '10000': script10000,
  '11000': script11000,
  '11100': script11100,
  '11110': script11110,
  '11111': script11111,
}
const codeBoxes = boxContainer.querySelectorAll('input')

let timerId

boxContainer.onchange = handleScriptChange

switchScript('11111')

function handleScriptChange(e) {
  const box = e.target
  const currentIndex = Array.prototype.indexOf.call(codeBoxes, box)

  clearTimeout(timerId)

  for (let i = 0; i < codeBoxes.length; i++) {
    if (i == currentIndex) continue

    codeBoxes[i].checked = i < currentIndex
  }

  const state = Array.prototype.map.call(codeBoxes, box => +box.checked)
    .join('')

  tearDown()

  switchScript(state)

  if (state == '00000') timerId = setTimeout(switchScript, 7000, '10000')
}

function switchScript(state) {
  for (let i = 0; i < codeBoxes.length; i++) {
    codeBoxes[i].checked = state[i] == '1'
  }

  tearDown()

  scripts[state]()

  codeBlock.innerText = '  ' + scripts[state].toString().slice(26, -2).trim()
}

function script00000() {
  onmousemove = e => {
    bar.style.left = e.clientX + 'px'
    bar.style.top = e.clientY + 'px'
  }
}

function script10000() {
  bar.onmousedown = () => {
    onmousemove = e => {
      bar.style.left = e.clientX + 'px'
      bar.style.top = e.clientY + 'px'
    }
  }
  onmouseup = () => onmousemove = null
}

function script11000() {
  bar.onmousedown = e0 => {
    if (e0.target == bar) onmousemove = e => {
      bar.style.left = e.clientX + 'px'
      bar.style.top = e.clientY + 'px'
    }
  }
  onmouseup = () => onmousemove = null
}

function script11100() {
  bar.onmousedown = e0 => {
    if (e0.target == bar) onmousemove = e => {
      bar.style.left = e.clientX - e0.offsetX + 'px'
      bar.style.top = e.clientY - e0.offsetY + 'px'
    }
  }
  onmouseup = () => onmousemove = null
}

function script11110() {
  bar.onmousedown = e0 => {
    if (e0.target == bar) onmousemove = e => {
      bar.style.left = normalize(e.clientX - e0.offsetX, innerWidth - bar.offsetWidth) + 'px'
      bar.style.top = normalize(e.clientY - e0.offsetY, innerHeight - bar.offsetHeight) + 'px'
    }
  }
  onmouseup = () => onmousemove = null

  const normalize = (value, max) => Math.max(0, Math.min(max, value))
}

function script11111() {
  bar.onmousedown = e0 => {
    if (e0.target == bar) onmousemove = e => {
      bar.style.left = normalize(e.clientX - e0.offsetX, innerWidth - bar.offsetWidth) + 'px'
      bar.style.top = normalize(e.clientY - e0.offsetY, innerHeight - bar.offsetHeight) + 'px'
    }
  }
  onmouseup = () => onmousemove = null

  const normalize = (value, max) => Math.max(0, Math.min(max, value))

  onresize = () => {
    bar.style.left = normalize(bar.offsetLeft, innerWidth - bar.offsetWidth) + 'px'
    bar.style.top = normalize(bar.offsetTop, innerHeight - bar.offsetHeight) + 'px'
  }
}

function tearDown() {
  bar.onmousedown = null
  onmousemove = null
  onmouseup = null
  onresize = null
}
