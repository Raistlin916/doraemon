import { Rectangle, Sprite, Container } from 'pixi.js'

export default class Animation extends Container {
  constructor(texture, options) {
    texture = texture.clone()
    super(texture)

    this.speed = options.speed
    this.frames = options.frames
    this.initialFrame = options.initialFrame

    this.texture = texture
    this.sprite = new Sprite(texture)

    this.sw = options.sw || options.width
    this.sh = options.sh || options.height

    this.texture.frame = new Rectangle(0, 0, this.sw, this.sh)
    this.addChild(this.sprite)

    this.width = options.width
    this.height = options.height
    this.play(this.initialFrame)
  }

  update(dt) {
    this.elapse += dt
    let frameIndex = parseInt(this.elapse / this.speed, 10)

    frameIndex %= this.rects.length
    this.texture.frame = this.rects[frameIndex]
  }

  play(frameName) {
    if (frameName === this.currentFrame) {
      return
    }
    this.currentFrame = frameName
    this.elapse = 0

    let rectsData = this.frames[this.currentFrame]
    if (Array.isArray(rectsData)) {
      rectsData = {
        rects: rectsData
      }
    }
    if (rectsData.flip) {
      if (rectsData.flip[0] !== 1) {
        this.sprite.scale.x = rectsData.flip[0]
        this.sprite.x = this.sw
      }

      if (rectsData.flip[1] !== 1) {
        this.sprite.scale.y = rectsData.flip[1]
        this.sprite.y = this.sh
      }
    } else {
      this.sprite.scale.x = 1
      this.sprite.scale.y = 1
      this.sprite.x = 0
      this.sprite.y = 0
    }
    this.rects = rectsData.rects
  }

  freeze() {
    this.elapse = 0
  }
}
