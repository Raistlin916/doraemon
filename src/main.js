import world from './world'

const debounce = (function() {
  let tid = null;
  return (fn, delay) => {
    if (tid) {
      return
    }
    tid = setTimeout(() => {
      tid = null
    }, delay)
    fn()
  };
})()

const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min

world.addRule(({ createDoraemon }) => {
  const people = []
  const num = 30
  const r = 100
  const sx = 100
  const sy = 100

  for (let n = 0; n < num; n += 1) {
    const a = n / num * Math.PI * 2
    people.push(createDoraemon(Math.sin(a) * r + sx, Math.cos(a) * r + sy))
  }

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
})
