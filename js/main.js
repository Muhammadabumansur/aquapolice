var wellBlock = document.querySelector('.well-illustration');
var tubeBlock = document.querySelector('.tube-block');
var interactiveBlocs = document.querySelectorAll('.interactive-block');
var tubeAnimatedBlock = document.querySelector('.tube-block-center');
var ventileContainer = document.querySelector('.tube-left');
var sliderMainTabs = document.querySelector('.slider-main-tabs');
var sliderMainTabsButtons = sliderMainTabs.children;
var sliderMainSlides = document.querySelectorAll('.slider-main__slide');
var infographicImgWrap = document.querySelector('.infographic-img-wrap');
var aboutCompanyThumbs = document.querySelector('.about-company-thumbs');
var aboutCompanyMainImage = document.querySelector('.about-company-main-photo img');

var infographicAnimate = function() {
    var pageHeight = document.documentElement.clientHeight;
    var infographicImgWrapTopOffset = infographicImgWrap.getBoundingClientRect().top;
    var infographicImgWrapBottomOffset = pageHeight - infographicImgWrapTopOffset;
    if (infographicImgWrapBottomOffset > 200) {
        infographicImgWrap.classList.add('animated');
        window.removeEventListener('scroll', infographicAnimate)
    }
}

var wellBlockAppear = function() {
    var pageHeight = document.documentElement.clientHeight;
    var wellBlockTopOffset = wellBlock.getBoundingClientRect().top;
    var wellBlockBottomOffset = pageHeight - wellBlockTopOffset;
    if (wellBlockBottomOffset > 550) {
        wellBlock.classList.add('animated');
        window.removeEventListener('scroll', wellBlockAppear)
    }
}

var wellImageUp = function(el, ind, arr) {
    arr[ind].classList.add('animated');
}

var wellInteractiveAnimate = function() {
    var pageHeight = document.documentElement.clientHeight;
    var wellBlockTopOffset = wellBlock.getBoundingClientRect().top;
    var wellBlockBottomOffset = pageHeight - wellBlockTopOffset;
    if (wellBlockBottomOffset > 700) {
        interactiveBlocs.forEach(wellImageUp)
        window.removeEventListener('scroll', wellInteractiveAnimate)
    }
}

var tubeAnimate = function() {
    var pageHeight = document.documentElement.clientHeight;
    var tubeBlockTopOffset = tubeBlock.getBoundingClientRect().top;
    var tubeBlockBottomOffset = pageHeight - tubeBlockTopOffset;
    if (tubeBlockBottomOffset > 500) {
        tubeBlock.classList.add('animated');
        window.removeEventListener('scroll', tubeAnimate)
    }
}

var ventileSpin = function() {
    ventileContainer.classList.add('animated');
}

var pickPhoto = function(e) {
    e.preventDefault();
    if (e.target.src) {
        aboutCompanyMainImage.src = e.target.src
    }
}

window.addEventListener('scroll', wellBlockAppear);
window.addEventListener('scroll', wellInteractiveAnimate);
window.addEventListener('scroll', tubeAnimate);
window.addEventListener('scroll', infographicAnimate);

tubeAnimatedBlock.addEventListener('transitionend', ventileSpin);

aboutCompanyThumbs.addEventListener('click', pickPhoto)

var certificatesSlider = document.querySelector('.certificates-slider');
if(certificatesSlider) {
    var certificatesSliderFlkty = new Flickity( certificatesSlider, {
      // options
      cellAlign: 'left',
      wrapAround: true,
      autoPlay: true,
      pageDots: false,
      groupCells: 1,
      arrowShape: { 
        x0: 15,
        x1: 55, y1: 50,
        x2: 60, y2: 45,
        x3: 25
      }
    });
}

var mainSliderActivate = function(e) {
    if (!e.target.id) {
        return
    }
    var currentSlideId = e.target.id;
    [].forEach.call(sliderMainTabsButtons, function(el, i, arr){
        if(arr[i].id == currentSlideId) {
            arr[i].classList.add('active')
        } else {
            arr[i].classList.remove('active')
        }
    });
    sliderMainSlides.forEach(function(el, i, arr){
        if(arr[i].dataset.name == currentSlideId) {
            arr[i].classList.add('active')
        } else {
            arr[i].classList.remove('active')
        }
    })
}

sliderMainTabs.addEventListener('click', mainSliderActivate )