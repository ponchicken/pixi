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
  .add('animals', 'assets/images/animals.json')
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
    const cat = new Sprite(
      loader.resources.animals.textures['cat.png']
    )
    const tiger = new Sprite(
      loader.resources.animals.textures['tiger.png']
    )

    cat.position.set(256, 256)
    cat.anchor.set(0.5, 0.5)
    cat.scale.set(0.5, 0.5)
    cat.rotation = 0.3

    tiger.position.set(16, 16)

    stage.addChild(cat)
    stage.addChild(tiger)

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
