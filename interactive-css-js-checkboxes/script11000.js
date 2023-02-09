bar.onmousedown = e0 => {
  if (e0.target == bar) onmousemove = e => {
    bar.style.left = e.clientX + 'px'
    bar.style.top = e.clientY + 'px'
  }
}
onmouseup = () => onmousemove = null
