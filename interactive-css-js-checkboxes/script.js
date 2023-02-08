const normalize = (value, max) => Math.max(0, Math.min(max, value))

bar.onmousedown = e0 => {
  if (e0.target == bar) onmousemove = e => {
    bar.style.left = normalize(e.clientX - e0.offsetX, innerWidth - bar.offsetWidth) + 'px'
    bar.style.top = normalize(e.clientY - e0.offsetY, innerHeight - bar.offsetHeight) + 'px'
  }
}
onmouseup = () => onmousemove = null

onresize = () => {
  bar.style.left = normalize(bar.offsetLeft, innerWidth - bar.offsetWidth) + 'px'
  bar.style.top = normalize(bar.offsetTop, innerHeight - bar.offsetHeight) + 'px'
}

onmousemove = e => {
  bar.style.left = normalize(e.clientX - e0.offsetX, innerWidth - bar.offsetWidth) + 'px'
  bar.style.top = normalize(e.clientY - e0.offsetY, innerHeight - bar.offsetHeight) + 'px'
}
