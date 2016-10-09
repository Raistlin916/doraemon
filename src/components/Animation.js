import { Rectangle, Sprite, Container } from 'pixi.js'

export default class Animation extends Container {
  constructor(texture, options) {
    super(texture)

    this.speed = options.speed
    this.frames = options.frames
    this.initialFrame = options.initialFrame

    this.texture = texture
    this.texture.frame = new Rectangle(0, 0, options.width, options.height)
    this.sprite = new Sprite(texture)
    this.addChild(this.sprite)

    this.play(this.initialFrame)
  }

  update(dt) {
    this.elapse += dt
    let frameIndex = parseInt(this.elapse / this.speed, 10)

    frameIndex %= this.rects.length

    this.texture.frame = this.rects[frameIndex]
  }

  play(frameName) {
    this.currentFrame = frameName
    this.elapse = 0

    let rectsData = this.frames[this.currentFrame]
    if (Array.isArray(rectsData)) {
      rectsData = {
        rects: rectsData
      }
    }
    if (rectsData.flip) {
      this.sprite.scale.x = rectsData.flip[0]
      this.sprite.x = this.width
    } else {
      this.sprite.scale.x = 1
      this.sprite.x = 0
    }
    this.rects = rectsData.rects
  }
}
