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

    const catsTexture = loader.resources.catsTileset.texture
    const rectangle = new PIXI.Rectangle(128, 128, 32, 32)
    catsTexture.frame = rectangle
    const catsSprite = new PIXI.Sprite(catsTexture)

    catsSprite.position.set(64, 64)

    stage.addChild(catsSprite)

    /** rerender */
    renderer.render(stage)
  })

// loader.onComplete
//   .add(() => {
//     console.log(sprites.cat)
//     stage.addChild(sprites.cat)
//     renderer.render(stage)
//   })
