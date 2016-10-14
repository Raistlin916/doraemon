class Mission {
  constructor(sx, sy, dx, dy, time) {
    this.sx = sx
    this.sy = sy
    this.dx = dx
    this.dy = dy
    this.time = time
    this.elapse = 0
  }

  update(dt) {
    this.elapse += dt
  }

  getCurrent() {
    const p = Math.min((this.elapse / this.time), 1)
    return {
      x: p * (this.dx - this.sx) + this.sx,
      y: p * (this.dy - this.sy) + this.sy,
    }
  }
}

export default class Actor {
  constructor(animation, x, y) {
    this.animation = animation
    this.x = x
    this.y = y
    this.lastX = x
    this.lastY = y
    this.mission = null
    this.syncAnimation()
  }

  runTo(x, y, time) {
    this.mission = new Mission(this.x, this.y, x, y, time)
  }

  setPosition(x, y) {
    this.lastX = this.x
    this.lastY = this.y
    this.x = x
    this.y = y
  }

  update(dt) {
    if (this.mission) {
      this.mission.update(dt)
      const pt = this.mission.getCurrent()
      this.setPosition(pt.x, pt.y)
    }
    this.syncAnimation()
    this.animation.update(dt)
  }

  syncAnimation() {
    this.animation.x = this.x
    this.animation.y = this.y

    const dx = this.lastX - this.x
    const dy = this.lastY - this.y

    if (dx === 0 && dy === 0) {
      this.animation.play('idle')
      this.animation.freeze()
    } else if (Math.abs(dx) > Math.abs(dy)) {
      this.animation.play(dx > 0 ? 'left' : 'right')
    } else {
      this.animation.play(dy > 0 ? 'up' : 'down')
    }
  }
}
