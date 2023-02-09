bar.onmousedown = () => {
  onmousemove = e => {
    bar.style.left = e.clientX + 'px'
    bar.style.top = e.clientY + 'px'
  }
}
onmouseup = () => onmousemove = null
