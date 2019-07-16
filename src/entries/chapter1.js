import * as PIXI from 'pixi.js'
import '../styles/main.css'

const renderer = PIXI.autoDetectRenderer({
  width: 256,
  height: 256
})

document.body.appendChild(renderer.view)
