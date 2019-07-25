export const contain = (sprite, {
  x = 0,
  y = 0,
  width = 0,
  height = 0
}) => {
  let collision = new Set()

  if (sprite.x < x) {
    sprite.x = x
    collision.add('left')
  }

  if (sprite.x + sprite.width > width) {
    sprite.x = width - sprite.width
    collision.add('right')
  }

  if (sprite.y < y) {
    sprite.y = y
    collision.add('top')
  }

  if (sprite.y + sprite.height > height) {
    sprite.y = height - sprite.height
    collision.add('bottom')
  }

  if (!collision.size) {
    collision = undefined
  }

  return collision
}
