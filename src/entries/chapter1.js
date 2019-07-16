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
const sprites = {}

loader
  .add('cat', 'assets/cat.png')
  .load(() => {
    sprites.cat = new PIXI.Sprite(
      loader.resources.cat.texture
    )

    stage.addChild(sprites.cat)
    renderer.render(stage)
  })

// loader.onComplete
//   .add(() => {
//     console.log(sprites.cat)
//     stage.addChild(sprites.cat)
//     renderer.render(stage)
//   })
