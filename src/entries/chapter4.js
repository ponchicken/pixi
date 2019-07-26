import * as PIXI from 'pixi.js'
import '../styles/main.css'

const {
  Loader, Container, Graphics
} = PIXI

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

  stage.addChild(ctx)
}

function gameLoop () {
  requestAnimationFrame(gameLoop)
  game.state()
  renderer.render(stage)
}

function play () {

}
