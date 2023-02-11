const html = `
  <div>
    <button>Do something</button>
    <button>Also this thing</button>
    <button>And that one too</button>
  </div>
`

const dragBar1 = makeDragBar(html)
const dragBar2 = makeDragBar(html)

body.append(dragBar1, dragBar2)
