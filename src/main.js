import world from './world'
import { debounce, getRandomInt } from './utils'

const initInput = people => {
  let isActive = false
  window.addEventListener('mousedown', () => {
    isActive = true
  })

  window.addEventListener('mouseup', () => {
    isActive = false
  })

  window.addEventListener('mousemove', e => {
    if (isActive) {
      debounce(() => {
        people[getRandomInt(0, people.length - 1)].runTo(e.offsetX, e.offsetY, 1000)
      }, 100)
    }
  })
}

world.addRule(({ createActor }) => {
  const clock = {
    r: (window.innerWidth - 30) / 2
  }
  const initCircle = () => {
    const people = []
    const num = 30
    const r = clock.r
    const rx = clock.r
    const ry = clock.r

    for (let n = 0; n < num; n += 1) {
      const a = n / num * Math.PI * 2
      people.push(createActor('doraemon', Math.sin(a) * r + rx, Math.cos(a) * r + ry))
    }

    let offset = 0
    setInterval(() => {
      offset += 1
      for (let n = 0; n < num; n += 1) {
        const a = (n - offset) / num * Math.PI * 2
        people[n].runTo(Math.sin(a) * r + rx, Math.cos(a) * r + ry, 500)
      }
    }, 1000)
    return people
  }


  const initLine = getAngle => {
    const r = clock.r - 10
    const sx = clock.r + 10
    const sy = clock.r - 10
    const num = 5
    const people = []

    const getTargetPt = () => {
      const a = getAngle()
      return {
        x: Math.cos(a) * r,
        y: Math.sin(a) * r
      }
    }

    let targetPt = getTargetPt()
    for (let n = 0; n < num; n += 1) {
      const p = n / num
      people.push(createActor('nobita', sx + targetPt.x * p, sy + targetPt.y * p))
    }

    setInterval(() => {
      targetPt = getTargetPt()
      for (let n = 0; n < num; n += 1) {
        const p = n / num
        people[n].runTo(sx + targetPt.x * p, sy + targetPt.y * p, 500)
      }
    }, 1000)

    return people
  }

  const circle = initCircle()
  initLine(() => new Date().getMinutes() / 60 * Math.PI * 2)
  initLine(() => new Date().getSeconds() / 60 * Math.PI * 2)
  initInput(circle)
})
