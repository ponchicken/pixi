import * as PIXI from 'pixi.js'
import '../styles/main.css'
import { contain } from '../helpers/contain'

const Sprite = PIXI.Sprite
const o = {}
const game = {
  state: play
}

const loader = new PIXI.Loader()
const stage = new PIXI.Container()

const renderer = PIXI.autoDetectRenderer({
  width: 512,
  height: 512
})

document.body.appendChild(renderer.view)

/**
 * loader
 */

loader
  .add('treasureHunter', 'assets/images/treasureHunter.json')
  .load(() => {
    /** tileset */
    const textures = loader.resources.treasureHunter.textures

    setGameObjects(textures)
    setKeyboardEvents()
    gameLoop()
    renderer.render(stage)
  })

function setGameObjects (textures) {
  o.dungeon = new Sprite(textures['dungeon.png'])
  o.explorer = new Sprite(textures['explorer.png'])

  const {
    dungeon,
    explorer
  } = o

  stage.addChild(dungeon)

  explorer.position.set(
    64,
    stage.height / 2 - explorer.height / 2
  )
  stage.addChild(explorer)

  explorer.vx = 0
  explorer.vy = 0
}

function setKeyboardEvents () {
  const {
    explorer
  } = o

  const left = keyboard('ArrowLeft')
  const up = keyboard('ArrowUp')
  const right = keyboard('ArrowRight')
  const down = keyboard('ArrowDown')

  explorer.accelerationX = 0
  explorer.accelerationY = 0
  explorer.frictionX = 1
  explorer.frictionY = 1

  explorer.speed = 0.5
  explorer.drag = 0.98

  right.press = () => {
    explorer.accelerationX = explorer.speed
    explorer.frictionX = 1
  }

  right.release = () => {
    if (!left.isDown) {
      explorer.accelerationX = 0
      explorer.frictionX = explorer.drag
    }
  }

  left.press = () => {
    explorer.accelerationX = -explorer.speed
    explorer.frictionX = 1
  }

  left.release = () => {
    if (!right.isDown) {
      explorer.accelerationX = 0
      explorer.frictionX = explorer.drag
    }
  }

  up.press = () => {
    explorer.accelerationY = -explorer.speed
    explorer.frictionY = 1
  }

  up.release = () => {
    if (!down.isDown) {
      explorer.accelerationY = 0
      explorer.frictionY = explorer.drag
    }
  }

  down.press = () => {
    explorer.accelerationY = explorer.speed
    explorer.frictionY = 1
  }

  down.release = () => {
    if (!up.isDown) {
      explorer.accelerationY = 0
      explorer.frictionY = explorer.drag
    }
  }
}

function gameLoop () {
  requestAnimationFrame(gameLoop)
  game.state()
  renderer.render(stage)
}

function play () {
  const {
    explorer
  } = o

  // acceleration
  explorer.vx += explorer.accelerationX
  explorer.vy += explorer.accelerationY

  explorer.vx *= explorer.frictionX
  explorer.vy *= explorer.frictionY

  // gravity
  explorer.vy += 0.15

  // move
  explorer.x += explorer.vx
  explorer.y += explorer.vy

  // collision
  let collision = contain(
    explorer,
    {
      x: 0,
      y: 0,
      width: renderer.view.width,
      height: renderer.view.height
    }
  )
  // Check for a collision. If the value of `collision` isn't
  // `undefined` then you know the sprite hit a boundary
  if (collision) {
    // Reverse the sprite's `vx` value if it hits the left or right
    if (collision.has('left') || collision.has('right')) {
      explorer.vx = -explorer.vx / 2
    }
    // Reverse the sprite's `vy` value if it hits the top or bottom
    if (collision.has('top') || collision.has('bottom')) {
      explorer.vy = -explorer.vy / 2
    }
  }
}

function keyboard (keyCode) {
  const key = {
    code: keyCode,
    isDown: false,
    isUp: true,
    press: undefined,
    release: undefined
  }

  // The `downHandler`
  key.downHandler = event => {
    if (event.key === key.code) {
      if (key.isUp && key.press) key.press()
      key.isDown = true
      key.isUp = false
      event.preventDefault()
    }
  }

  // The `upHandler`
  key.upHandler = event => {
    if (event.key === key.code) {
      if (key.isDown && key.release) key.release()
      key.isDown = false
      key.isUp = true
      event.preventDefault()
    }
  }

  // Attach event listeners
  const downListener = key.downHandler.bind(key)
  const upListener = key.upHandler.bind(key)

  window.addEventListener(
    'keydown', downListener, false
  )
  window.addEventListener(
    'keyup', upListener, false
  )

  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener('keydown', downListener)
    window.removeEventListener('keyup', upListener)
  }

  return key
}
