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

  line.angleA += 0.5
  const rotatingA = rotateAroundPoint({
    point: {
      x: 300, y: 300
    },
    distance: {
      x: randomInt(80, 112), y: randomInt(80, 112)
    },
    angle: line.angleA
  })

  line.angleB -= 0.55
  const rotatingB = rotateAroundPoint({
    point: {
      x: 300, y: 300
    },
    distance: {
      x: randomInt(100, 700), y: randomInt(100, 700)
    },
    angle: line.angleB
  })

  // line.clear()
  line.lineStyle(30, 0xff4440, 0.005)
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

function randomInt (min, max) {
  var rand = min + Math.random() * (max + 1 - min)
  rand = Math.floor(rand)
  return rand
}
