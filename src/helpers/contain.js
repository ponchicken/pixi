export const contain = (target, {
  x = 0,
  y = 0,
  width = 0,
  height = 0
}) => {
  let collision = new Set()

  if (target.x < x) {
    target.x = x
    collision.add('left')
  }

  if (target.x + target.width > width) {
    target.x = width - target.width
    collision.add('right')
  }

  if (target.y < y) {
    target.y = y
    collision.add('top')
  }

  if (target.y + target.height > height) {
    target.y = height - target.height
    collision.add('bottom')
  }

  if (!collision.size) {
    collision = undefined
  }

  return collision
}
