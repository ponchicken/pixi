import * as PIXI from 'pixi.js'
import '../styles/main.css'
import { contain } from '../helpers/contain'
import { randomInt } from '../helpers/randomInt'

const {
  Loader, Container, Graphics
} = PIXI

const o = {}
const ball = {
  moveX: 4,
  moveY: 5
}
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
  o.ball = new Graphics()

  o.ball.beginFill(0x3399ff)
  o.ball.drawCircle(16, 16, 16)
  o.ball.endFill()

  stage.addChild(o.ball)
}

function gameLoop () {
  requestAnimationFrame(gameLoop)
  game.state()
  renderer.render(stage)
}

function play () {
  const collision = contain(o.ball, {
    width: renderer.view.width,
    height: renderer.view.height
  })

  if (collision) {
    if (collision.has('left') || collision.has('right')) {
      ball.moveX = -Math.sign(ball.moveX) * randomInt(3, 6)
    }
    if (collision.has('top') || collision.has('bottom')) {
      ball.moveY = -Math.sign(ball.moveY) * randomInt(3, 6)
    }
  }

  const {
    x, y
  } = o.ball.position

  o.ball.position.set(
    x + ball.moveX,
    y + ball.moveY
  )
}
