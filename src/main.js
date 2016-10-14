import world from './world'

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

  world.canvas.addEventListener('click', e => {
    people[0].runTo(e.offsetX, e.offsetY, 1000)
  })

  world.canvas.addEventListener('mousedown', e => {
    console.log(1)
  })
})
