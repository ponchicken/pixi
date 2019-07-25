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
  .add('catsTileset', 'assets/catsTileset.json')
  .load(() => {
    /** tileset */
    const textures = {
      ...loader.resources.treasureHunter.textures,
      ...loader.resources.catsTileset.textures
    }

    setGameObjects(textures)
    setKeyboardEvents()
    gameLoop()
    renderer.render(stage)
  })

function setGameObjects (textures) {
  o.dungeon = new Sprite(textures['dungeon.png'])
  o.explorer = new Sprite(textures['explorer.png'])
  o.cat = new Sprite(textures['catDownStand.png'])

  const {
    dungeon,
    cat
  } = o

  stage.addChild(dungeon)

  cat.position.set(
    64,
    stage.height / 2 - cat.height / 2
  )
  stage.addChild(cat)

  cat.vx = 0
  cat.vy = 0
}

function setKeyboardEvents () {
  const {
    cat
  } = o

  const left = keyboard('ArrowLeft')
  const up = keyboard('ArrowUp')
  const right = keyboard('ArrowRight')
  const down = keyboard('ArrowDown')

  cat.accelerationX = 0
  cat.accelerationY = 0
  cat.frictionX = 1
  cat.frictionY = 1

  cat.speed = 0.5
  cat.drag = 0.999

  right.press = () => {
    cat.accelerationX = cat.speed
    cat.frictionX = 1
  }

  right.release = () => {
    if (!left.isDown) {
      cat.accelerationX = 0
      cat.frictionX = cat.drag
    }
  }

  left.press = () => {
    cat.accelerationX = -cat.speed
    cat.frictionX = 1
  }

  left.release = () => {
    if (!right.isDown) {
      cat.accelerationX = 0
      cat.frictionX = cat.drag
    }
  }

  up.press = () => {
    cat.accelerationY = -cat.speed
    cat.frictionY = 1
  }

  up.release = () => {
    if (!down.isDown) {
      cat.accelerationY = 0
      cat.frictionY = cat.drag
    }
  }

  down.press = () => {
    cat.accelerationY = cat.speed
    cat.frictionY = 1
  }

  down.release = () => {
    if (!up.isDown) {
      cat.accelerationY = 0
      cat.frictionY = cat.drag
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
    cat
  } = o

  // acceleration
  cat.vx += cat.accelerationX
  cat.vy += cat.accelerationY

  cat.vx *= cat.frictionX
  cat.vy *= cat.frictionY

  // gravity
  cat.vy += 0.15

  // move
  cat.x += cat.vx
  cat.y += cat.vy

  // collision
  let collision = contain(
    cat,
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
      cat.vx = -cat.vx / 1.05
    }
    // Reverse the sprite's `vy` value if it hits the top or bottom
    if (collision.has('top') || collision.has('bottom')) {
      cat.vy = -cat.vy / 1.05
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
