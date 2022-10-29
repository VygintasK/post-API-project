

let a = document.createElement('a')
let img = document.createElement('img')
img.setAttribute('src','./123small.jpg')
a.setAttribute('href','./123.jpg')
a.setAttribute('data-pswp-width','1669')
a.setAttribute('data-pswp-height','2500')
a.setAttribute('target','_blank')
let wrap = document.querySelector('#gallery--getting-started')
a.append(img)
wrap.prepend(a)

// Include Lightbox 
import PhotoSwipeLightbox from '/photoswipe/dist/photoswipe-lightbox.esm.js';

const lightbox = new PhotoSwipeLightbox({
  // may select multiple "galleries"
  gallery: '#gallery--getting-started',

  // Elements within gallery (slides)
  children: 'a',

  // setup PhotoSwipe Core dynamic import
  pswpModule: () => import('/photoswipe/dist/photoswipe.esm.js')
});
lightbox.init();