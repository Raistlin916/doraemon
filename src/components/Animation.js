import { Rectangle, Sprite } from 'pixi.js'

export default class Animation {
  constructor(texture, sw, sh, dw, dh, speed) {
    this.texture = texture
    this.sw = sw
    this.sh = sh
    this.dw = dw
    this.dh = dh
    this.speed = speed
    this.elapse = 0
    this.rowNum = 4
    this.columnNum = 4
  }

  update(dt) {
    this.elapse += dt
    let frame = parseInt(this.elapse / this.speed, 10)
    frame %= this.rowNum
    this.texture.frame = new Rectangle(this.sw * frame, 0, this.sw, this.sh)
  }

  getSprite() {
    const sprite = new Sprite(this.texture)
    sprite.width = this.dw
    sprite.height = this.dh
    return sprite
  }

  play(animationName) {
    this.currentName = animationName
    this.elapse = 0
  }
}
