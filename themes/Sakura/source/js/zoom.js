window.zoomImages = function () {
    $('.entry-content img').each(function () { $(this).wrap('<a data-fancybox="images" href=' + this.getAttribute('src') + '></a>') })
}
window.zoomImages()