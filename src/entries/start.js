import * as PIXI from 'pixi.js'
import './styles/main.css'

const app = new PIXI.Application()

document.body.appendChild(app.view)

// load the texture we need
app.loader.add('hypnocircle', 'assets/hyp2.png').load((loader, resources) => {
  // This creates a texture from a 'hypnocircle.png' image
  const hypnocircle = new PIXI.Sprite(resources.hypnocircle.texture)

  app.renderer.backgroundColor = 0x000000

  // Setup the position of the hypnocircle
  hypnocircle.x = app.renderer.width / 2
  hypnocircle.y = app.renderer.height / 2

  // Rotate around the center
  hypnocircle.anchor.x = 0.5
  hypnocircle.anchor.y = 0.5

  // Add the hypnocircle to the scene we are building
  app.stage.addChild(hypnocircle)

  // Listen for frame updates
  app.ticker.add(() => {
    // each frame we spin the hypnocircle around a bit
    hypnocircle.rotation -= 0.2
  })
})
