// import { DragBar } from '../class-component/drag-bar.js'
import { DragBar } from '../class-component/drag-bar-pkg.js'

const buttons = ['do something', 'also this thing', 'and that one too']
  .map(label => Object.assign(document.createElement('button'), { innerText: label }))

const dragBar2 = new DragBar(body)
const dragBar1 = new DragBar(body)

dragBar2.insert(buttons.pop())
dragBar1.insert(...buttons)
