(function () {
  const HOVER_DELAY = 70
  const PREVIEW_DURATION = 500
  const images = Array.from(document.querySelectorAll('.hover-preview'))

  // singleton timeout object, only one timeout should be active at a time
  const timeout = {
    id: 0,
    /**
     * set a timeout
     * @param {Function} callback
     * @param {Number} time
     */
    set: function (callback, time) {
      clearTimeout(this.id)
      this.id = setTimeout(callback, time)
    },
    /**
     * clear a timeout
     */
    reset: function () {
      clearTimeout(this.id)
    }
  }

  const hoveredImg = {
    el: null,
    poster: null,
    index: null,
    images: null,
    setSrc: function () {
      if (this.el) this.el.setAttribute('src', this.images[this.index])
    },
    reset: function () {
      if (this.el) this.el.setAttribute('src', this.poster)
      this.el = this.poster = this.index = this.images = null
    }
  }

  const stopWatch = {
    previous: null,
    start: function () {
      this.previous = Date.now()
    },
    stop: function () {
      const diff = this.previous ? Date.now() - this.previous : 0
      this.previous = null
      return diff
    }
  }

  const prefetchImage = (url, successCallback, errorCallback) => {
    if (!url) return
    const img = new Image()
    img.src = url
    if (successCallback)
      img.onload = successCallback
    if (errorCallback)
      img.onerror = errorCallback
  }

  const previewImages = skipDelay => {
    if (!hoveredImg.el) return
    stopWatch.start()
    hoveredImg.index = (hoveredImg.index + 1) % hoveredImg.images.length
    prefetchImage(hoveredImg.images[hoveredImg.index], () => {
      const ms = stopWatch.stop()
      const setSrc = () => {
        hoveredImg.setSrc()
        previewImages()
      }
      if ((ms > PREVIEW_DURATION) | skipDelay) {
        setSrc()
      } else {
        timeout.set(setSrc, PREVIEW_DURATION - ms)
      }
    }, () => {
      previewImages()
    })
  }

  const mouseEnterListener = e => {
    hoveredImg.el = e.target
    hoveredImg.poster = hoveredImg.el.getAttribute('src')
    hoveredImg.index = -1
    hoveredImg.images = hoveredImg.el.getAttribute('data-preview').split('|')

    timeout.set(() => previewImages(true), HOVER_DELAY)
  }

  const mouseLeaveListener = () => {
    hoveredImg.reset()
    timeout.reset()
  }

  images.forEach(img => {
    img.addEventListener('mouseenter', mouseEnterListener)
    img.addEventListener('mouseleave', mouseLeaveListener)
  })
})()
