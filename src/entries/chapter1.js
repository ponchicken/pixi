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
  .load(() => {
    const cat = new PIXI.Sprite(
      loader.resources.cat.texture
    )

    cat.position.set(96, 96)
    cat.scale.set(0.5, 0.5)
    cat.anchor.set(0.5, 0.5)
    cat.rotation = 1

    stage.addChild(cat)
    renderer.render(stage)
  })

// loader.onComplete
//   .add(() => {
//     console.log(sprites.cat)
//     stage.addChild(sprites.cat)
//     renderer.render(stage)
//   })
