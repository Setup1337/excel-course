import {$} from '@core/dom'

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const indexForResizer = $parent.data.col
  const coords = $parent.getCoords()
  let value
  const type = $resizer.data.resize

  $resizer.css({
    opacity: 1,
    bottom: '-5000px',
  })

  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({right: -delta + 'px'})
      return null
    }
    const delta = e.pageY - coords.bottom
    value = coords.height + delta
    $resizer.css({bottom: -delta + 'px'})
  }


  document.onmouseup = (e) => {
    document.onmousemove = null
    document.onmouseup = null

    if (type === 'col') {
      $parent.css({width: value + 'px'})
      $root.findAll(`[data-col="${indexForResizer}"]`)
          .forEach((el) => el.style.width = value + 'px')
    }
    if (type === 'row') {
      $parent.css({height: value + 'px'})
      $root.findAll(`[data-col="${indexForResizer}"]`)
          .forEach((el) => el.style.height = value + 'px')
    }

    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0,
    })
  }
}