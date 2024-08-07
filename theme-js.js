/**
 * Theme Javascript - FM Webflow website
 */

/**
 * Init slider.
 * 
 * @param {String} slider
 * @returns {Void}
 */
function initSlider(container, options) {
    if (!container) {
        return;
    }

    const prevEl = container.querySelector('.slider__prev');
    const nextEl = container.querySelector('.slider__next');

    let swiper = new Swiper(container, {
        spaceBetween: 16,
        slidesPerView: 1,
        ...(prevEl && nextEl ? {
            navigation: {
                prevEl,
                nextEl
            }
        } : {}),
        ...options,
    });
}

initSlider(document.querySelector('.slider'), {
    effect: 'fade',
    autoHeight: true,
    fadeEffect: {
        crossFade: true,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
});

function initSliderWithNavigation() {
    const sliderContainer = document.querySelector('.slider-images.swiper');
    const nav = document.querySelector('.nav-slider');
    const prevEl = sliderContainer?.closest('.slider__wrapper').querySelector('.slider__navigation-prev');
    const nextEl = sliderContainer?.closest('.slider__wrapper').querySelector('.slider__navigation-next');

    if (!sliderContainer || !nav) {
        return;
    }

    const navLinks = nav.querySelectorAll('a');
    const sliderOptions = {
        effect: "cards",
        direction: "vertical",
        allowTouchMove: false,
        centeredSlides: true,
        navigation: {
            prevEl,
            nextEl
        },
        cardsEffect: {
            rotate: false,
            slideShadows: false,
            perSlideOffset: 9
        },

        on: {
            init: function() {
                initNavigation(this);
                updateNav(0);
            },
            slideChange: function(swiper) {
                updateNav(swiper.realIndex);
            }
        },
    }

    function initNavigation(slider) {
        nav.querySelectorAll('a').forEach(navLink => {
            navLink.addEventListener('mouseover', (e) => {
                handleLinkHover(e, slider)
            });
        });
    }

    /**
     * Init navigation.
     */
    function handleLinkHover(e, slider) {
        const nav = e.currentTarget.closest('.nav-slider');
        const activeItem = nav.querySelector('.is-active')
        const allItems = [...nav.querySelectorAll('.nav-slider__item')];
        const index = allItems.findIndex(el => el == e.currentTarget.parentNode);

        activeItem?.classList.remove('is-active');
        e.currentTarget.parentNode.classList.add('is-active');

        slider.slideTo(index);
    }

    /**
     * Update navigation.
     */
    function updateNav(index) {
        const activeItem = nav.querySelector('.is-active');
        const targetItem = [...nav.querySelectorAll('.nav-slider__item')][index];

        activeItem?.classList.remove('is-active');
        targetItem?.classList.add('is-active');

        if (window.innerWidth < 992) {
            const itemHeight = targetItem.offsetHeight;
            targetItem.closest('.nav-slider').style.minHeight = `${itemHeight}px`;
        }
    }

    /**
     * Init slider
     */

    initSlider(sliderContainer, sliderOptions);
}

initSliderWithNavigation();

/**
 * Handle nav trigger click.
 *
 * @param   {Event}  e
 * @returns {Void}
 */
const header = document.querySelector('[data-header]');
const navTrigger = document.querySelector('[data-nav-trigger]');

function handleNavTriggerClick(e) {
    e.preventDefault();
    header.classList.toggle('nav-is-open');
    document.documentElement.classList.toggle('scroll-lock');
}

function closeNav(e) {
    e.preventDefault();
    header.classList.remove('nav-is-open');
    document.documentElement.classList.remove('scroll-lock');
}

/**
 * Handle dropdown trigger click.
 *
 * @param  {Event}  e
 * @returns  {Void}
 */

function handleDropdownTriggerClick(e) {

    e.preventDefault();

    e.currentTarget.closest('.nav__link').classList.toggle('is-open');
    header.classList.toggle('dropdown-is-open');
}

/**
 * Init Nav.
 */
navTrigger.addEventListener('click', handleNavTriggerClick);
document.querySelectorAll('[data-nav-close]').forEach(closeBtn => closeBtn.addEventListener('click', closeNav));
document.querySelectorAll('[data-has-dropdown] .nav__link-icon').forEach(dropdownTrigger => dropdownTrigger.addEventListener('click', handleDropdownTriggerClick));

document.querySelector('[data-scrolltop]')?.addEventListener('click', (e) => {
    e.preventDefault();

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
});

function initScrollAnimation() {
    const animationContainer = document.querySelector('[data-animation-line-container]');
    const line = animationContainer?.querySelector('[data-animation-line]');
    const squares = [...document.querySelectorAll('[data-animation-square]')];

    if (!animationContainer) {
        return;
    }

    gsap.fromTo(line, {
        height: '0',
    }, {
        height: '100%',
        ease: "none",
        scrollTrigger: {
            trigger: animationContainer,
            start: 'top 40%',
            end: () => `+=${animationContainer.offsetHeight}`,
            scrub: true,
            onUpdate: () => checkLineTouch(),
        }
    });

    function checkLineTouch() {
        const lineRect = line.getBoundingClientRect();

        squares.forEach(square => {
            const squareRect = square.getBoundingClientRect();
            const isTouching = lineRect.bottom >= squareRect.top && lineRect.top <= squareRect.bottom;

            square.classList.toggle('is-active', isTouching);
        });
    }
}

initScrollAnimation();

function toggleVideoOnScroll() {
    const videos = document.querySelectorAll('.card-solution video');

    if (!videos) {
        return;
    }

    function callback(entries, observer) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.play();

            } else {
                entry.target.pause();
            }
        })
    }

    const intersectonObserver = new IntersectionObserver(callback, {
        rootMargin: '-400px',
        treshold: 1,
    });

    videos.forEach(video => {
        intersectonObserver.observe(video);
    });
}

toggleVideoOnScroll();

function toggleVideoOnScroll() {
    const videos = document.querySelectorAll('.card-solution video');

    if (!videos) {
        return;
    }

    function callback(entries, observer) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.play();

            } else {
                entry.target.pause();
            }
        })
    }

    const intersectonObserver = new IntersectionObserver(callback, {
        treshold: 0.5,
    });

    videos.forEach(video => {
        intersectonObserver.observe(video);
    });
}

toggleVideoOnScroll();

function scrollToTarget(e) {
    e.preventDefault();

    const target = e.currentTarget.dataset.scrollLink;
    const section = document.querySelector(`[data-scroll-target=${target}]`);

    if (!section) {
        return;
    }

    window.scrollTo({
        top: section.offsetTop + 80,
        left: 0,
        behavior: "smooth",
    });
}

document.querySelectorAll('[data-scroll-link]').forEach(link => {
    link?.addEventListener('click', scrollToTarget);
});

$('[data-video-player]').magnificPopup({
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
});

$('[data-gallery] img').each((index, image) => {
    $(image).wrap(`<a href="${image.src}"></a>`)
});

$('[data-gallery]').magnificPopup({
    delegate: 'a',
    type: 'image',
    mainClass: 'mfp-img-mobile',
    gallery: {
        enabled: true,
        navigateByImgClick: true,
    },
});

function handleAccordionTriggerClick() {
    const currentClickedSection = this.closest('.accordion__section');
    const currentActiveSection = this.closest('.js-accordion').querySelector('.is-active');

    if (currentActiveSection && currentActiveSection !== currentClickedSection) {
        currentActiveSection.classList.remove('is-active');
    }

    currentClickedSection.classList.toggle('is-active');
}

document
    .querySelectorAll('.js-accordion .accordion__head')
    .forEach(accordionTrigger => {
        accordionTrigger.addEventListener('click', handleAccordionTriggerClick);
    });

function initVimeoPlayer(videoParent) {
    const videoID = videoParent.dataset.vimeoId ?? videoParent.id;
    if (!videoID) {console.warn("no video id found",videoParent.dataset); return; }
    let videoPlayer = new Vimeo.Player(videoParent, {
        id: videoID,
    });


    let isPaused = false;
    const hasEndScreen = videoParent.hasAttribute('data-has-end-screen');

    videoPlayer.on('play', () => {
        videoParent.classList.add('is-playing');
    });

    if (hasEndScreen) {
        videoPlayer.on('play', onPlay);
    }

    fetch('https://vimeo.com/api/oembed.json?url=https://vimeo.com/' + videoID + '&width=1920')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
      		const thumbnail = videoParent.querySelector('[data-thumbnail]');
            const thumbnailUrl = data.thumbnail_url ?? false;
      		if (thumbnail && thumbnailUrl != false) {
            	thumbnail.src = thumbnailUrl;
            }
        });

    function onPlay() {
        requestAnimationFrame(onTimeUpdate);
    }

    function onTimeUpdate() {
        if (isPaused) {
            return;
        }

        videoPlayer.getCurrentTime().then((currentTime) => {
            videoPlayer.getDuration().then((duration) => {
                const threshold = 0.1;

                if (duration - currentTime <= threshold) {
                    videoPlayer.setCurrentTime(duration - 0.1).then(() => {
                        videoPlayer.pause();
                        videoPlayer.setLoop(false);
                        isPaused = true;
                    });
                } else {
                    requestAnimationFrame(onTimeUpdate);
                }
            });
        });
    }
}

document.querySelectorAll('[data-vimeo-player]').forEach(videoParent => {
    initVimeoPlayer(videoParent);
});

window.addEventListener('load', () => {
    document.body.classList.add('is-loaded');
})

function initGalleryLayout() {
    const gallery = document.querySelector('.gallery');

    if (!gallery) {
        return;
    }

    const imagesCount = gallery.querySelectorAll('.gallery__item').length;

    if (imagesCount < 4) {
        gallery.classList.add('gallery--small')
    }
}

initGalleryLayout();

function initMasonryLayout() {
    const grid = document.querySelector('[data-masonry-grid]');

    if (!grid) {
        return;
    }
    const masonry = new Masonry(grid, {
        itemSelector: '[data-masonry-grid-item]',
        percentPosition: true,
        horizontalOrder: true
    });
}

window.addEventListener('load', initMasonryLayout);

function loadTestimonials() {
    const testimonialItems = document.querySelectorAll('.testimonials .testimonials__item');
    const limit = testimonialItems.length - 6;
    const loadMoreBtn = document.querySelector('[data-loadmore]');

    if (!testimonialItems.length) {
        return;
    }

    if (testimonialItems.length <= limit) {
        loadMoreBtn.style.display = 'none';
    }

    testimonialItems.forEach((el, i) => {
        if (i >= limit) {
            el.classList.add('hidden');
        }
    });

    loadMoreBtn.addEventListener('click', () => {
        testimonialItems.forEach((el, i) => {
            el.classList.remove('hidden');
        });

        initMasonryLayout();
        loadMoreBtn.style.display = 'none';
    });
}

loadTestimonials();

function insertFeaturesLink() {
    const featuresWrapper = document.querySelector('.features');
    const featuresLink = document.querySelector('.features__link');

    if (!featuresWrapper || !featuresLink) {
        return;
    }

    featuresWrapper.append(featuresLink);


}

insertFeaturesLink();

function detectMacOS() {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    if (isMac) {
        document.body.classList.add('mac-os');
    }
}

detectMacOS();

window.addEventListener('orientationchange', sectionRedraw);


function sectionRedraw() {
    const sections = document.querySelectorAll('section');

    sections.forEach((section) => {
        section.style.display = 'none';
        section.offsetHeight;
        section.style.display = '';
    });
}

function initVideoSectionPopup() {
    const videoSection = document.querySelector('[data-section-video]');

    if (!videoSection) {
        return;
    }

    const backgroundVideo = videoSection.querySelector('video');

    videoSection?.addEventListener('click', (e) => {
        if (e.target.closest('[data-video-popup]')) {
            return;
        }
        videoSection.classList.add('is-playing');
        backgroundVideo.paused ? backgroundVideo.play() : backgroundVideo.pause();
    });

    const player = createCustomPlayer(videoSection.querySelector('[data-custom-player]'));

    const popupCallbacks = {
        open: function() {
            videoSection.classList.remove('is-playing');
            backgroundVideo.pause();
            player.play();
            document.body.classList.add('scroll-lock');
        },
        close: function() {
            player.stop();
            document.body.classList.remove('scroll-lock');
        }
    }

    createVideoPopup('[data-video-popup]', popupCallbacks);
}

initVideoSectionPopup();

function createVideoPopup(selector, callbacks) {
    $(selector).click(function() {
        const items = [];
        $($(this).data('video-popup')).each(function() {
            items.push({
                src: $(this)
            });
        });

        $.magnificPopup.open({
            items: items,
            midClick: true,
            removalDelay: 300,
            callbacks
        });
    });
}

function createCustomPlayer(videoContainer) {
    const playerControls = `
      <div class="plyr__controls">
              <button type="button" class="plyr__control" aria-label="Play, {title}" data-plyr="play">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
        <g id="Group_1624" data-name="Group 1624" transform="translate(-103 -966)">
          <circle id="Ellipse_31" data-name="Ellipse 31" cx="25" cy="25" r="25" transform="translate(103 966)" fill="#fff" opacity="0.2"/>
          <path id="Polygon_3" data-name="Polygon 3" d="M7.606,2.962a2,2,0,0,1,3.455,0l5.851,10.031A2,2,0,0,1,15.185,16H3.482a2,2,0,0,1-1.728-3.008Z" transform="translate(139 982) rotate(90)" fill="#fff"/>
        </g>
      </svg>
                  <span class="plyr__tooltip" role="tooltip">Play</span>
              </button>
              <button type="button" class="plyr__control" aria-label="Pause, {title}" data-plyr="pause">
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
        <g id="Group_1623" data-name="Group 1623" transform="translate(-175 -966)">
          <circle id="Ellipse_30" data-name="Ellipse 30" cx="25" cy="25" r="25" transform="translate(175 966)" fill="#fff" opacity="0.2"/>
          <g id="Group_1622" data-name="Group 1622">
            <line id="Line_281" data-name="Line 281" y2="14" transform="translate(205.5 984)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="5"/>
            <line id="Line_282" data-name="Line 282" y2="14" transform="translate(194.5 984)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="5"/>
          </g>
        </g>
      </svg>

        <span class="plyr__tooltip" role="tooltip">Pause</span>
    </button>
    <div class="plyr__progress">
        <input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek">
        <progress class="plyr__progress__buffer" min="0" max="100" value="0">% buffered</progress>
        <span role="tooltip" class="plyr__tooltip">00:00</span>
    </div>
    <div class="plyr__time plyr__time--current" aria-label="Current time">00:00</div>
    <div class="plyr__time plyr__time--duration" aria-label="Duration">00:00</div>
</div>`;

    const player = new Plyr(videoContainer, {
        controls: playerControls
    });

    document.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-plyr') === 'pause') {
            player.pause();
        }
    })

    return player;
}

document.querySelectorAll('[data-video-popup]').forEach(videoPopupTrigger => {
    const videoContainer = document.querySelector(`${videoPopupTrigger.getAttribute('data-video-popup')} video`);
    const player = createCustomPlayer(videoContainer);
    const popupCallbacks = {
        open: function() {
            player.play();
            document.body.classList.add('scroll-lock');
        },
        close: function() {
            player.stop();
            document.body.classList.remove('scroll-lock');
        }
    }
    createVideoPopup(videoPopupTrigger, popupCallbacks);
});

document.querySelectorAll('.video-mask').forEach(initMaskVideo);

function initMaskVideo(videoContainer) {
    const video = videoContainer.querySelector('video');

    videoContainer.addEventListener('click', (e) => {
        videoContainer.classList.add('is-playing');
        video.paused ? video.play() : video.pause();
    });
}
   
   
function initImageSizesFix() {
  	const imagesToFix = [
      { target: "[data-gallery] .gallery__item img", sizes: "(max-width: 479px) 43vw, (max-width: 991px) 45vw, (max-width: 1439px) 35vw, 35vw" },
      { target: ".list-cards .card-skewed__image-wrapper img", sizes: "(max-width: 767px) 50vw, (max-width: 991px) 50vw, (max-width: 1439px) 50vw, 50vw" },
    ];
  
  	imagesToFix.forEach(item => {
      const $imagesToFix = $(item.target);
      $imagesToFix.each((i,el) => {
      	$(el).attr("sizes", item.sizes);
      });
    });
}
initImageSizesFix();