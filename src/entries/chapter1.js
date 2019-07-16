import * as PIXI from 'pixi.js'
import '../styles/main.css'

const Sprite = PIXI.Sprite
const Rectangle = PIXI.Rectangle
const Texture = PIXI.Texture
const BaseTexture = PIXI.BaseTexture

const loader = new PIXI.Loader()
const stage = new PIXI.Container()

const renderer = PIXI.autoDetectRenderer({
  width: 256,
  height: 256
})

document.body.appendChild(renderer.view)

/**
 * loader
 */

loader
  .add('cat', 'assets/cat.png')
  .add('catsTileset', 'assets/catsTileset.png')
  .load(() => {
    /** cat */
    const cat = new Sprite(
      loader.resources.cat.texture
    )

    cat.anchor.set(0.5, 0.5)
    cat.position.set(128, 128)
    cat.scale.set(0.5, 0.5)
    cat.rotation = 0.3

    stage.addChild(cat)

    /** tileset */
    const catsSprite = new Sprite(getFrame('catsTileset', 128, 128, 32, 32))

    catsSprite.position.set(64, 64)

    stage.addChild(catsSprite)

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
  console.info('Completed!')
})

/** Frame creator */
function getFrame (source, x, y, width, height) {
  let texture = null

  if (typeof source === 'string') {
    if (loader.resources[source]) {
      texture = loader.resources[source].texture
    }
  } else if (source instanceof BaseTexture) {
    texture = new Texture(source)
  }

  if (!texture) {
    console.warn(`Load the ${source} texture into cache`)
  } else {
    const frame = new Rectangle(x, y, width, height)
    texture.frame = frame
    return texture
  }
}
