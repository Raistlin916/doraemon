import 'normalize.css'
import { autoDetectRenderer, loader, Container, Sprite, Rectangle } from 'pixi.js'
import Animation from './components/Animation'

const renderer = autoDetectRenderer(500, 500,
   { antialias: false, transparent: true, resolution: 1 }
)
document.body.appendChild(renderer.view)
const stage = new Container()


loader
  .add('assets/doraemon.png')
  .load(() => {
    const texture = loader.resources['assets/doraemon.png'].texture
    const doraemon = new Animation(texture, 64, 64, 64, 64, 100)

    stage.addChild(doraemon.getSprite())


    let last = Date.now()
    const r = () => {
      const now = Date.now()
      const dt = (now - last) * 1000
      last = now
      requestAnimationFrame(r)
      renderer.render(stage)
      doraemon.update(dt)
    }
    r()
  })
