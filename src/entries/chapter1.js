import * as PIXI from 'pixi.js'
import '../styles/main.css'

const renderer = PIXI.autoDetectRenderer({
  width: 256,
  height: 256
})

document.body.appendChild(renderer.view)

const stage = new PIXI.Container()

/**
 * loader
 */

const loader = new PIXI.Loader()

loader
  .add('cat', 'assets/cat.png')
  .add('catsTileset', 'assets/catsTileset.png')
  .load(() => {
    /** cat */
    const cat = new PIXI.Sprite(
      loader.resources.cat.texture
    )

    cat.anchor.set(0.5, 0.5)
    cat.position.set(128, 128)
    cat.scale.set(0.5, 0.5)
    cat.rotation = 0.3

    stage.addChild(cat)

    /** tileset */
    const catsSprite = new PIXI.Sprite(getFrame({
      source: 'catsTileset',
      x: 128,
      y: 128,
      width: 32,
      height: 32
    }))

    catsSprite.position.set(64, 64)

    stage.addChild(catsSprite)

    /** rerender */
    renderer.render(stage)
  })

/** Frame creator */
function getFrame ({
  source, x, y, width, height
}) {
  let texture = null

  if (typeof source === 'string') {
    if (loader.resources[source]) {
      texture = loader.resources[source].texture
    }
  } else if (source instanceof PIXI.BaseTexture) {
    texture = new PIXI.Texture(source)
  }

  if (!texture) {
    console.warn(`Load the ${source} texture into cache`)
  } else {
    const frame = new PIXI.Rectangle(x, y, width, height)
    texture.frame = frame
    return texture
  }
}
