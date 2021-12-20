window.onload = () => {
  const { Scene, Sprite, Label } = spritejs

  const container = document.querySelector("#container")
  const scene = new Scene({
    container,
    width: 260,
    height: 160,
    padding: 0,
    mode: "stickyTop",
  })

  let move = false
  let out = 0
  let loaded = false
  let canMove = true
  let sliderItemLeft = 0
  let startTime = 0
  let endTime = 0
  fail2IdentifyingCode()

  const layer = scene.layer()

  const robot = new Sprite({
    texture: "https://s2.loli.net/2021/12/21/3mb1FoJfYDOMNK6.png",
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
  const sliderItemLayer = scene2.layer()

  const sliderBg = new Sprite({
    anchor: [0, 0.5],
    pos: [14, 63],
    texture: "https://s2.loli.net/2021/12/21/aAJMWvXn3KP7V9Z.png",
  })

  sliderItemLayer.append(sliderBg)

  loaded = true

  let item = document.querySelector("#slider-item")
  let sliderContainer = document.querySelector(".slider")

  item.onmousedown = function (ev) {
    move = true
    out = ev.pageX * 1
    item.style.transition = "unset"
    setStartTime()

    sliderContainer.onmousemove = function (e) {
      if (canMove && move) {
        sliderItemLeft = e.pageX - out // - document.querySelector(".slider").offsetLeft
        if (sliderItemLeft > 194) sliderItemLeft = 194
        if (sliderItemLeft < 13) sliderItemLeft = 13

        item.style.transform = `translateX(${sliderItemLeft + "px"})`
        sliderBg.attr("x", sliderItemLeft - 2)
      }
      document.onmouseup = function () {
        setEndTime()
        move && check(sliderItemLeft)
        move = false
        out = 0
        lastLeft = item.offsetLeft
      }
    }
  }

  item.ontouchstart = function (ev) {
    move = true
    item.style.transition = "unset"
    out = ev.touches[0].pageX
    setStartTime()

    sliderContainer.ontouchmove = function (e) {
      if (canMove && move) {
        sliderItemLeft = e.touches[0].pageX - out
        if (sliderItemLeft > 194) sliderItemLeft = 194
        if (sliderItemLeft < 13) sliderItemLeft = 13
        console.log(sliderItemLeft)
        item.style.transform = `translateX(${sliderItemLeft + "px"})`
        sliderBg.attr("x", sliderItemLeft - 2)
      }
      document.ontouchend = function () {
        setEndTime()
        move && check(sliderItemLeft)
        move = false
        out = 0
      }
    }
  }

  sliderBg.addEventListener("mousedown", function (e) {
    move = true
    out = e.originalX
    item.style.transition = "unset"
    setStartTime()

    sliderItemLayer.addEventListener("mousemove", function (ev) {
      if (canMove && move) {
        sliderItemLeft = ev.originalX - 25
        if (sliderItemLeft > 194) sliderItemLeft = 194
        if (sliderItemLeft < 13) sliderItemLeft = 13
        sliderBg.attr("x", sliderItemLeft)
        console.log(sliderItemLeft)

        document.querySelector("#slider-item").style.transform = `translateX(${
          sliderItemLeft + 2 + "px"
        })`
      }
      sliderItemLayer.addEventListener("mouseup", function () {
        setEndTime()
        move && check(sliderItemLeft)
        move = false
        out = 0
      })
    })
  })

  sliderBg.addEventListener("touchstart", function (e) {
    move = true
    out = e.originalX
    item.style.transition = "unset"
    setStartTime()

    sliderItemLayer.addEventListener("touchmove", function (ev) {
      if (canMove && move) {
        sliderItemLeft = ev.originalX - 25
        if (sliderItemLeft > 194) sliderItemLeft = 194
        if (sliderItemLeft < 13) sliderItemLeft = 13
        sliderBg.attr("x", sliderItemLeft)
        console.log(sliderItemLeft)

        document.querySelector("#slider-item").style.transform = `translateX(${
          sliderItemLeft + 2 + "px"
        })`
      }
      sliderItemLayer.addEventListener("touchend", function () {
        setEndTime()
        move && check(sliderItemLeft)
        move = false
        out = 0
      })
    })
  })

  async function fail2IdentifyingCode() {
    if (loaded) {
      move = false
      canMove = false
      let item = document.querySelector("#slider-item")
      item.style.transition = "all .3s linear"
      item.style.transform = "translateX(10px)"
      await sliderBg.transition(0.3).attr({
        x: 10,
      })
      canMove = true
    }
  }

  function showToast(content) {
    if (!canMove) return new Promise((resolve) => resolve(false))
    return new Promise((resolve) => {
      canMove = false
      let tipsBar = document.getElementById("tips-bar")
      tipsBar.innerHTML = `<div class="jiyan-code-tips in">${
        content || "请正确拼合图像"
      }</div>`
      setTimeout(() => {
        tipsBar.innerHTML = `<div class="jiyan-code-tips out">${
          content || "请正确拼合图像"
        }</div>`
        canMove = true
        resolve(true)
      }, 1000)
    })
  }

  function showSuccessToast() {
    if (!canMove) return new Promise((resolve) => resolve(false))
    return new Promise((resolve) => {
      canMove = false
      let tipsBar = document.getElementById("tips-bar")
      let timespan = getTimeSpan()
      tipsBar.innerHTML = `<div class="jiyan-code-tips success in">真棒，${timespan} 秒内拼完</div>`
      setTimeout(() => {
        tipsBar.innerHTML = `<div class="jiyan-code-tips success out">真棒，${timespan} 秒内拼完</div>`
        canMove = true
        resolve(true)
      }, 1000)
    })
  }

  function setStartTime() {
    startTime = Date.now()
  }

  function setEndTime() {
    endTime = Date.now()
  }

  function getTimeSpan() {
    return parseInt((endTime - startTime) / 100) / 10
  }

  function check(distance) {
    let timespan = getTimeSpan()
    if (timespan * 1 < 0.3) {
      showToast("时间间隔过短，请重试").then((res) => {
        res && fail2IdentifyingCode()
      })
      return
    }
    if (Math.abs(distance - 64) < 5) {
      showSuccessToast().then((res) => {
        res && fail2IdentifyingCode()
      })
    } else {
      showToast().then((res) => {
        res && fail2IdentifyingCode()
      })
    }
  }
}
