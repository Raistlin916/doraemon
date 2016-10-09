import 'normalize.css'
import { autoDetectRenderer, loader, Container, Rectangle } from 'pixi.js'
import Animation from './components/Animation'

const renderer = autoDetectRenderer(500, 500,
   { antialias: false, transparent: true, resolution: 1 }
)
document.body.appendChild(renderer.view)
const stage = new Container()

const rectsCreator = rowIndex => {
  const rects = []
  for (let n = 0; n < 4; n += 1) {
    rects.push(new Rectangle(64 * n, 64 * rowIndex, 64, 64))
  }
  return rects
}


loader
  .add('assets/doraemon.png')
  .load(() => {
    const texture = loader.resources['assets/doraemon.png'].texture
    const doraemon = new Animation(texture, {
      width: 64,
      height: 64,
      speed: 100,
      initialFrame: 'left',
      frames: {
        down: rectsCreator(0),
        up: rectsCreator(1),
        right: rectsCreator(2),
        left: { rects: rectsCreator(2), flip: [-1, 1] }
      }
    })

    stage.addChild(doraemon)

    let last = Date.now()
    const r = () => {
      const now = Date.now()
      const dt = now - last
      last = now
      requestAnimationFrame(r)
      renderer.render(stage)

      doraemon.update(dt)
    }
    r()
  })
