var wellBlock = document.querySelector('.well-illustration');
var tubeBlock = document.querySelector('.tube-block');
var interactiveBlocs = document.querySelectorAll('.interactive-block');
var tubeAnimatedBlock = document.querySelector('.tube-block-center');
var ventileContainer = document.querySelector('.tube-left');
var sliderMainTabs = document.querySelector('.slider-main-tabs');
var sliderMainTabsButtons = sliderMainTabs.children;
var sliderMainSlides = document.querySelectorAll('.slider-main__slide');

var wellBlockAppear = function() {
    var pageHeight = document.documentElement.clientHeight;
    var wellBlockTopOffset = wellBlock.getBoundingClientRect().top;
    var wellBlockBottomOffset = pageHeight - wellBlockTopOffset;
    if (wellBlockBottomOffset > 250) {
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
    if (wellBlockBottomOffset > 600) {
        interactiveBlocs.forEach(wellImageUp)
        window.removeEventListener('scroll', wellInteractiveAnimate)
    }
}

var tubeAnimate = function() {
    var pageHeight = document.documentElement.clientHeight;
    var tubeBlockTopOffset = tubeBlock.getBoundingClientRect().top;
    var tubeBlockBottomOffset = pageHeight - tubeBlockTopOffset;
    if (tubeBlockBottomOffset > 450) {
        tubeBlock.classList.add('animated');
        window.removeEventListener('scroll', tubeAnimate)
    }
}

var ventileSpin = function() {
    ventileContainer.classList.add('animated');
}

window.addEventListener('scroll', wellBlockAppear);
window.addEventListener('scroll', wellInteractiveAnimate);
window.addEventListener('scroll', tubeAnimate);

tubeAnimatedBlock.addEventListener('transitionend', ventileSpin);

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