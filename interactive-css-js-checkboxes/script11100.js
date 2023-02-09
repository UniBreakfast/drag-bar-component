bar.onmousedown = e0 => {
  if (e0.target == bar) onmousemove = e => {
    bar.style.left = e.clientX - e0.offsetX + 'px'
    bar.style.top = e.clientY - e0.offsetY + 'px'
  }
}
onmouseup = () => onmousemove = null
