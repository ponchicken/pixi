import * as PIXI from 'pixi.js'
import '../styles/main.css'

const Sprite = PIXI.Sprite
const Rectangle = PIXI.Rectangle
const Texture = PIXI.Texture
const BaseTexture = PIXI.BaseTexture

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
    /** cat */
    // const cat = new Sprite(
    //   loader.resources.cat.texture
    // )

    // cat.anchor.set(0.5, 0.5)
    // cat.position.set(128, 128)
    // cat.scale.set(0.5, 0.5)
    // cat.rotation = 0.3

    // stage.addChild(cat)

    /** tileset */
    const id = loader.resources.treasureHunter.textures

    const dungeon = new Sprite(id['dungeon.png'])
    const door = new Sprite(id['door.png'])
    const explorer = new Sprite(id['explorer.png'])
    const treasure = new Sprite(id['treasure.png'])

    stage.addChild(dungeon)

    door.position.set(32, 0)
    explorer.position.set(
      64,
      stage.height / 2 - explorer.height / 2
    )
    treasure.position.set(
      stage.width - 96,
      stage.height / 2 - treasure.height / 2
    )

    stage.addChild(door)
    stage.addChild(explorer)
    stage.addChild(treasure)

    /** blobs */
    const blobsCount = 6
    const blobsSpacing = 48
    const blobsXOffset = 150

    for (let i = 0; i < blobsCount; i++) {
      const blob = new Sprite(id['blob.png'])
      blob.position.set(
        blobsSpacing * i + blobsXOffset,
        getRandomInt(32, stage.height - blob.height - 32)
      )
      stage.addChild(blob)
    }

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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
