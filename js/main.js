var DESKTOP_MODE = window.innerWidth > 1300;
var TAB_MODE = window.innerWidth <= 1300 && window.innerWidth > 768;
var MOBILE_MODE = window.innerWidth <= 768;

var body = document.querySelector('body');
var main = document.querySelector('.main');
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
var mobileMenuBlock = document.querySelector('.main-menu-block');
var showMobileMenuBtn = document.querySelector('.hamburger');
var hideMobileMenuBtn = document.querySelector('.main-menu-close-mobile');
var mobileMenuHeight = parseInt(getComputedStyle(mobileMenuBlock).height);
var backCallers = document.querySelectorAll('.back-caller');
var popupСallback = document.querySelector('.popup-callback');
var popupСloseBtn = document.querySelector('.close-button');
var infographicButtons = document.querySelectorAll('.infographic-btn');
var topDocumentScroll;

var switchOffCallbackPopupVisibility = function() {
    popupСallback.style.visibility = "hidden";
    popupСallback.removeEventListener('transitionend', switchOffCallbackPopupVisibility);
}

var setOverlayBody = function() {
    topDocumentScroll = window.scrollY
    body.firstElementChild.style.marginTop = -topDocumentScroll + 'px';
    body.classList.add('overlay');
}

var removeOverlayBody = function() {
    body.classList.remove('overlay');
    body.firstElementChild.style.marginTop = '';
    window.scroll(0, topDocumentScroll);
}

var escapePopup = function(e) {
    if (e.target === popupСallback) {
        return
    }
    hideCallbackPopup();
    body.removeEventListener('click', escapePopup, true);
}

var showCallbackPopup = function() {
    popupСallback.style.visibility = "visible";
    popupСallback.classList.add('shown');
    setOverlayBody();
    body.addEventListener('click', escapePopup, true);
}

var hideCallbackPopup = function() {
    popupСallback.classList.remove('shown');
    popupСallback.addEventListener('transitionend', switchOffCallbackPopupVisibility);
    removeOverlayBody()
}

var closeInfographicPopup = function(e) {
    e.preventDefault();
    e.stopPropagation();
    var currentPopup = document.querySelector('.infographic-mobile-popup.opened')
    currentPopup.parentElement.style.zIndex = '';
    currentPopup.classList.remove('opened');
    removeOverlayBody();
    main.style.overflow = '';
    this.removeEventListener('click', closeInfographicPopup)
    body.removeEventListener('click', closeInfographicPopup);
}

var showInfographicPopup = function(e) {
    e.preventDefault();
    e.stopPropagation();
    var currentPopup = document.querySelector('[data-id=' + e.currentTarget.dataset.href + ']');
    var currentCloseBtn = currentPopup.querySelector('.close-infographic-popup');
    this.parentElement.style.zIndex = '6';
    console.log(currentPopup);
    currentPopup.classList.add('opened');
    console.log(currentPopup);
    setOverlayBody();
    main.style.overflow = "visible";
    // this.removeEventListener('click', showInfographicPopup, true)
    currentCloseBtn.addEventListener('click', closeInfographicPopup);
    body.addEventListener('click', closeInfographicPopup);
}

backCallers.forEach(function(el, ind, arr) {
    arr[ind].addEventListener('click', showCallbackPopup)
})

popupСloseBtn.addEventListener('click', hideCallbackPopup);

if (TAB_MODE) {
    infographicButtons.forEach(function(el, ind, arr) {
        arr[ind].addEventListener('click', showInfographicPopup, true)
    })
} else {
    infographicButtons.forEach(function(el, ind, arr) {
        arr[ind].addEventListener('click', function(e) {
            e.preventDefault();
        })
    })
}

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
    if (wellBlockBottomOffset > 750) {
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

Array.prototype.forEach.call(aboutCompanyThumbs.children, function(el, ind, arr){
    arr[ind].addEventListener('click', function(e) {
        Array.prototype.forEach.call(aboutCompanyThumbs.children, function(el, ind, arr){
            if (e.currentTarget === arr[ind]) {
                e.currentTarget.classList.add('active')
            } else {
                arr[ind].classList.remove('active')
            }
        })
    })
})

if (DESKTOP_MODE) {
    window.addEventListener('scroll', wellBlockAppear);
}

window.addEventListener('scroll', wellInteractiveAnimate);
window.addEventListener('scroll', tubeAnimate);
window.addEventListener('scroll', infographicAnimate);

tubeAnimatedBlock.addEventListener('transitionend', ventileSpin);

DESKTOP_MODE && aboutCompanyThumbs.addEventListener('click', pickPhoto)

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

var aboutCompanySlider = document.querySelector('.about-company-thumbs');
if(TAB_MODE && aboutCompanySlider) {
    var aboutCompanySliderFlkty = new Flickity( aboutCompanySlider, {
      // options
      cellAlign: 'left',
      wrapAround: true,
      autoPlay: true,
      groupCells: 1,
      arrowShape: { 
        x0: 15,
        x1: 55, y1: 50,
        x2: 60, y2: 45,
        x3: 25
      }
    });
}

var wellIllustrationSlider = document.querySelector('.well-illustration-list');
if(MOBILE_MODE && wellIllustrationSlider) {
    var wellIllustrationSliderFlkty = new Flickity( wellIllustrationSlider, {
      // options
      cellAlign: 'left',
      pageDots: false,
      groupCells: "100%",
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

sliderMainTabs.addEventListener('click', mainSliderActivate );

var fixBody = function(height) {
    body.style.height = height - 10 + 'px';
    body.style.overflow = 'hidden';
}

var unfixBody = function() {
    body.style.height = '';
    body.style.overflow = '';
}

var showMobileMenu = function(e) {
    e.preventDefault();
    mobileMenuBlock.style.visibility = "visible";
    mobileMenuBlock.classList.remove('closed');
    fixBody(mobileMenuHeight);
}

var switchOffMenuVisibility = function() {
    this.style.visibility = "hidden";
    mobileMenuBlock.removeEventListener('transitionend', switchOffMenuVisibility)
}

var hideMobileMenu = function(e) {
    e.preventDefault();
    mobileMenuBlock.classList.add('closed');
    mobileMenuBlock.addEventListener('transitionend', switchOffMenuVisibility)
    unfixBody();
}

showMobileMenuBtn.addEventListener('click', showMobileMenu);
hideMobileMenuBtn.addEventListener('click', hideMobileMenu);

$(document).ready(function() {
	$(".fancybox").fancybox({
		openEffect	: 'none',
		closeEffect	: 'none'
	});
});