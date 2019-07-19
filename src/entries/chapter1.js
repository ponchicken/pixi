import * as PIXI from 'pixi.js'
import '../styles/main.css'

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
  .add('cat', 'assets/cat.png')
  .add('treasureHunter', 'assets/images/treasureHunter.json')
  .load(() => {
    /** tileset */
    const textures = loader.resources.treasureHunter.textures

    arrangeGameObjects(textures)

    gameLoop()
    /** rerender */
    renderer.render(stage)
  })

loader.onLoad.add((loader, resource) => {
  console.info({
    progress: `${loader.progress}%`,
    loading: resource.url
  })
})

loader.onComplete.add(() => {
  console.log(stage.height)
  console.info('Completed!')
})

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function arrangeGameObjects (textures) {
  o.dungeon = new Sprite(textures['dungeon.png'])
  o.door = new Sprite(textures['door.png'])
  o.treasure = new Sprite(textures['treasure.png'])
  o.explorer = new Sprite(textures['explorer.png'])

  const {
    dungeon,
    door,
    treasure,
    explorer
  } = o

  stage.addChild(dungeon)

  o.door.position.set(32, 0)
  explorer.position.set(
    64,
    stage.height / 2 - explorer.height / 2
  )
  treasure.position.set(
    stage.width - 96,
    stage.height / 2 - treasure.height / 2
  )

  stage.addChild(door)
  stage.addChild(treasure)

  /** blobs */
  const blobsCount = 6
  const blobsSpacing = 48
  const blobsXOffset = 150

  for (let i = 0; i < blobsCount; i++) {
    const blob = new Sprite(textures['blob.png'])
    blob.position.set(
      blobsSpacing * i + blobsXOffset,
      getRandomInt(32, stage.height - blob.height - 32)
    )
    stage.addChild(blob)
  }

  stage.addChild(explorer)

  explorer.vx = 0
  explorer.vy = 0
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

  if (explorer.x > renderer.view.width - 32) {} else if (explorer.x < 0) {}
  explorer.x += explorer.vx
  explorer.y += explorer.vy
}
