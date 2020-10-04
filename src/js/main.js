var move = false
var out = 0
window.onload = () => {
  const { Scene, Sprite } = spritejs

  const container = document.querySelector("#container")
  const scene = new Scene({
    container,
    width: 260,
    height: 160,
    padding: 0,
    mode: "stickyTop",
  })

  const layer = scene.layer()

  const robot = new Sprite({
    texture: "https://img.meek3n.cn/code-bg.png",
  })

  layer.append(robot)

  const container2 = document.querySelector("#code")

  const scene2 = new Scene({
    container: container2,
    width: 260,
    height: 160,
    mode: "stickyTop",
    padding: 0,
  })
  const layer2 = scene2.layer()

  const s1 = new Sprite({
    anchor: [0, 0.5],
    pos: [14, 60],
    texture: "https://img.meek3n.cn/slice.png",
  })

  layer2.append(s1)

  let item = document.querySelector("#slider-item")
  let sliderContainer = document.querySelector(".slider")
  item.onmousedown = function (ev) {
    move = true
    out = ev.offsetX
    sliderContainer.onmousemove = function (e) {
      if (move) {
        let left = e.clientX - out
        if (left > 198) left = 198
        if (left < 13) left = 13
        item.style.left = left + "px"
        s1.attr("x", left - 2)
      }
      document.onmouseup = function () {
        move = false
        out = 0
      }
    }
  }

  item.ontouchstart = function (ev) {
    move = true
    sliderContainer.ontouchmove = function (e) {
      if (move) {
        let left = e.touches[0].clientX
        if (left > 198) left = 198
        if (left < 13) left = 13
        item.style.left = left + "px"
        s1.attr("x", left - 2)
      }
      document.ontouchend = function () {
        move = false
        out = 0
      }
    }
  }

  s1.addEventListener("mousedown", function (e) {
    move = true
    out = e.originalX
    layer2.addEventListener("mousemove", function (ev) {
      if (move) {
        let left = ev.originalX - 25
        if (left > 198) left = 198
        if (left < 13) left = 13
        s1.attr("x", left)
        document.querySelector("#slider-item").style.left = left + 2 + "px"
      }
      layer2.addEventListener("mouseup", function () {
        move = false
        out = 0
      })
    })
  })

  s1.addEventListener("touchstart", function (e) {
    move = true
    out = e.originalX
    layer2.addEventListener("touchmove", function (ev) {
      if (move) {
        let left = ev.originalX - 25
        if (left > 198) left = 198
        if (left < 13) left = 13
        s1.attr("x", left)
        document.querySelector("#slider-item").style.left = left + 2 + "px"
      }
      layer2.addEventListener("touchend", function () {
        move = false
        out = 0
      })
    })
  })
}
