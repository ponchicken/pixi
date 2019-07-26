import * as PIXI from 'pixi.js'
import '../styles/main.css'
// import { contain } from '../helpers/contain'
// import { keyboard } from '../helpers/keyboard'

const {
  Loader, Container, Graphics
} = PIXI

const o = {}
const game = {
  state: play
}

const loader = new Loader()
const stage = new Container()

const renderer = PIXI.autoDetectRenderer({
  width: 640,
  height: 640
})

document.body.appendChild(renderer.view)

/**
 * loader
 */

loader
  .load(() => {
    setGameObjects()
    gameLoop()
    renderer.render(stage)
  })

function setGameObjects () {
  const ctx = new Graphics()
  o.line = new Graphics()

  ctx.lineStyle(1, 0xffffff, 0.3)

  // ctx.beginFill(0xff6644)
  // ctx.drawCircle(200, 230, 8)
  // ctx.endFill()

  // ctx.beginFill(0xff6644)
  // ctx.drawCircle(312, 230, 8)
  // ctx.endFill()

  // ctx.beginFill(0x44aaff)
  // ctx.arc(256, 256, 48, 1, 2)
  // ctx.endFill()

  o.line.angleA = 0
  o.line.angleB = 0

  // ctx.beginFill(0x44aaff)
  // ctx.lineStyle(1, 0xffffff, 0.3)
  // ctx.drawRoundedRect(196, 400, 128, 16, 6)
  // ctx.endFill()

  stage.addChild(ctx)
  stage.addChild(o.line)
}

function gameLoop () {
  requestAnimationFrame(gameLoop)
  game.state()
  renderer.render(stage)
}
/**
 *
 *
 */
function play () {
  const { line } = o

  line.angleA += 0.02
  const rotatingA = rotateAroundPoint({
    point: {
      x: 100, y: 100
    },
    distance: {
      x: 80, y: 80
    },
    angle: line.angleA
  })

  line.angleB -= 0.03
  const rotatingB = rotateAroundPoint({
    point: {
      x: 400, y: 400
    },
    distance: {
      x: 100, y: 100
    },
    angle: line.angleB
  })

  line.clear()
  line.lineStyle(3, 0xff4440, 0.5)
  line.moveTo(rotatingA.x, rotatingA.y)
  line.lineTo(rotatingB.x, rotatingB.y)
}

function rotateAroundPoint ({
  point,
  distance,
  angle
}) {
  const result = {}
  result.x = point.x + Math.cos(angle) * distance.x
  result.y = point.y + Math.sin(angle) * distance.y
  return result
}
