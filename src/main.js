import 'normalize.css'
import { autoDetectRenderer, loader, Container, Sprite, Rectangle } from 'pixi.js'

const renderer = autoDetectRenderer(500, 500,
   { antialias: false, transparent: true, resolution: 1 }
)
document.body.appendChild(renderer.view)
const stage = new Container()


loader
  .add('assets/doraemon.png')
  .load(() => {
    const texture = loader.resources['assets/doraemon.png'].texture
    const rectangle = new Rectangle(0, 0, 64, 64)
    texture.frame = rectangle
    const doraemon = new Sprite(texture)

    stage.addChild(doraemon)

    doraemon.width = 64
    doraemon.height = 64
    renderer.render(stage)


    let n = 0
    setInterval(() => {
      n ++
      if (n > 3) {
        n = 0
      }
      texture.frame = new Rectangle(64 * n, 0, 64, 64)
    }, 100)
  })


const r = () => {
  requestAnimationFrame(r)
  renderer.render(stage)
}
r()
