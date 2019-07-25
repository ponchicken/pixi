import * as PIXI from 'pixi.js'
import '../styles/main.css'
import { contain } from '../helpers/contain'
import { keyboard } from '../helpers/keyboard'

const {
  Loader, Container, Sprite, Graphics
} = PIXI

const o = {}
const game = {
  state: play
}

const loader = new Loader()
const stage = new Container()

const renderer = PIXI.autoDetectRenderer({
  width: 512,
  height: 512
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
  const circle = new Graphics()
  const square = new Graphics()

  circle.beginFill(0xffaa44)
  circle.lineStyle(1, 0xffffff, 0.5)
  circle.drawCircle(32, 32, 16)
  circle.endFill()

  square.beginFill(0x44aaff)
  square.lineStyle(1, 0xffffff, 0.5)
  square.drawRect(32, 32, 128, 16)
  square.endFill()

  circle.position.set(64, 64)
  square.position.set(128, 400)

  stage.addChild(circle)
  stage.addChild(square)
}

function gameLoop () {
  requestAnimationFrame(gameLoop)
  game.state()
  renderer.render(stage)
}

function play () {

}
