(function () {
  const HOVER_DELAY = 70
  const PREVIEW_DURATION = 500
  const images = Array.from(document.querySelectorAll('img.hover-preview'))

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
      this.previous = new Date()
    },
    stop: function () {
      const diff = this.previous ? new Date() - this.previous : 0
      this.previous = null
      return diff
    }
  }

  function prefetchImage (url, callback) {
    if (!url) return
    const img = new Image()
    img.src = url
    if (callback) img.onload = callback
  }

  const previewImages = skipDelay => {
    if (!hoveredImg.el) return
    stopWatch.start()
    hoveredImg.index = (hoveredImg.index + 1) % hoveredImg.images.length
    prefetchImage(hoveredImg.images[hoveredImg.index], function () {
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
    })
  }

  const mouseEnterListener = e => {
    hoveredImg.el = e.target
    hoveredImg.poster = hoveredImg.el.getAttribute('src')
    hoveredImg.index = -1
    hoveredImg.images = hoveredImg.el.getAttribute('data-preview').split('|')

    timeout.set(() => previewImages(true), HOVER_DELAY)
    hoveredImg.el.addEventListener('mouseleave', () => {
      hoveredImg.reset()
      timeout.reset()
    })
  }

  images.forEach(img => {
    img.addEventListener('mouseenter', mouseEnterListener)
  })


  const almover = () => {
      let last_known_scroll_position = window.scrollY;
      images.forEach(img => {
        
        if((last_known_scroll_position >= (parseInt(img.dataset.posy) - 10)) &&  (last_known_scroll_position <= (parseInt(img.dataset.posy)  + 10)))
        {

          hoveredImg.el = img
          hoveredImg.poster = hoveredImg.el.getAttribute('src')
          hoveredImg.index = -1
          hoveredImg.images = hoveredImg.el.getAttribute('data-preview').split('|')

          timeout.set(() => previewImages(true), HOVER_DELAY)
          hoveredImg.el.addEventListener('mouseleave', () => {
            hoveredImg.reset()
            timeout.reset()
          })
          
          //console.log(img.id);
          //mouseEnterListener(img);
          //console.log(`${img.id}, img position :${img.dataset.posy} , scroll positions: ${last_known_scroll_position}`);
        }
      })
  }

  const setPosYImages = () => {
    images.forEach(img => {
      img.dataset.posy = img.getBoundingClientRect().y;
    })
  }

    window.addEventListener('scroll', function(){
      almover();
    })

    window.addEventListener('load', function(){
      setPosYImages();
    })


})()
