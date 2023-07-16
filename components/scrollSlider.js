import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

let id = 0;

export function ScrollSlider({ slides, SlideComponent, options }) {
    const elemRef = useRef(null);

    const defaultOptions = {
        containerWidth: 540,
        slidesToShow: 1,
        mobileFirst: true,
        slidesToScroll: 1,
        slidePadding: 20,
        nextBtn: '<button class="btn btn-arrow next-arrow" data-action="next"></button>',
        prevBtn: '<button class="btn btn-arrow prev-arrow" data-action="prev"></button>',
        responsive: [
            {
                breakpoint: 1400,
                containerWidth: 1320,
            },
            {
                breakpoint: 1200,
                containerWidth: 1140,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 992,
                containerWidth: 960,
            },
            {
                breakpoint: 768,
                containerWidth: 720,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 576,
                containerWidth: 540,
            },
        ],
    };

    const optionsMerged = {
        ...defaultOptions,
        ...options,
        responsive: [...defaultOptions.responsive, ...(options?.responsive || [])],
    };

    const __ = {
        el: null,
        slidesCount: slides.length,
        sliderId: ++id,
        activeSlides: [],
        slideWidth: 0,
        sliderOffset: 0,
        defaultOptions: optionsMerged,
    };

    function init() {
        const elem = elemRef.current;

        if (typeof elem === 'undefined' || elem === null) {
            console.error('Failed to initialise scroll slider as the DOM element does not exist');
            return;
        }

        __.el = elem;

        build();
        setWidths();
        setActiveSlides();
        initEventHandlers();
    }

    function build() {
        const ele = __.el;

        ele.classList.add('scroll-slider', 'scroll-slider-initialised');
        ele.dataset.sliderId = __.sliderId;

        const track = document.createElement('div');
        track.classList.add('slider-track');
        track.style.overflow = 'visible';

        slides.forEach((slideData, index) => {
            const slide = document.createElement('div');
            slide.classList = 'scroll-slide';
            slide.dataset.slideIndex = index;

            // Render the shared SlideComponent for each slide
            ReactDOM.render(<SlideComponent slide={slideData} />, slide);

            track.appendChild(slide);
        });

        ele.innerHTML = ''; // Clear any existing content
        ele.appendChild(track);

        const sliderNav = document.createElement('div');
        sliderNav.classList = 'slider-nav';
        sliderNav.dataset.sliderId = __.sliderId;

        const sliderNavBtns = document.createElement('div');
        sliderNavBtns.classList = 'slide-nav-buttons';

        sliderNavBtns.insertAdjacentHTML('afterbegin', __.defaultOptions.prevBtn + __.defaultOptions.nextBtn);
        sliderNav.appendChild(sliderNavBtns);

        ele.after(sliderNav);
    }

    function unmountSlides() {
        const slider = __.el;
        const sliderTrack = slider.querySelector('.slider-track');

        Array.from(sliderTrack.children).forEach((slide) => {
            ReactDOM.unmountComponentAtNode(slide);
        });

        ReactDOM.unmountComponentAtNode(sliderTrack);
    }

    function destroy() {
        unmountSlides();

        const slider = __.el;
        const sliderNav = document.querySelector(`.slider-nav[data-slider-id="${__.sliderId}"]`);

        slider.style = '';
        slider.classList.remove('scroll-slider', 'scroll-slider-initialised');
        slider.removeAttribute('data-slider-id');

        sliderNav.remove();
    }

    function setWidths() {
        // sort breakpoints
        let breakpoints = __.defaultOptions.responsive.sort((a, b) => {
            if (a['breakpoint'] > b['breakpoint']) {
                return 1;
            }
            if (a['breakpoint'] < b['breakpoint']) {
                return -1;
            }
            return 0;
        });

        // get settings from breakpoint
        for (let responsive of breakpoints) {
            if (responsive.breakpoint < window.innerWidth) {
                __.defaultOptions.containerWidth = responsive.containerWidth;

                if (responsive.settings && responsive.settings.hasOwnProperty('slidesToShow')) {
                    __.defaultOptions.slidesToShow = responsive.settings.slidesToShow;
                }
            }
        }

        // Fallback to window width if container width is greater than window width
        if (window.innerWidth < __.defaultOptions.containerWidth) {
            __.defaultOptions.containerWidth = window.innerWidth;
        }

        const slider = __.el,
            sliderOffset = (window.innerWidth - __.defaultOptions.containerWidth) / 2,
            slideWidth = __.defaultOptions.containerWidth / __.defaultOptions.slidesToShow,
            slidesCount = __.slidesCount,
            padding = __.defaultOptions.slidePadding;

        slider.style.paddingLeft = sliderOffset + 'px';
        slider.style.paddingRight = sliderOffset + 'px';

        __.sliderOffset = sliderOffset;
        __.slideWidth = slideWidth;

        const trackWidth = slideWidth * slidesCount;
        const slides = slider.querySelectorAll('.scroll-slide');
        const sliderNav = document.querySelector(`.slider-nav[data-slider-id="${__.sliderId}"]`);

        slider.querySelector('.slider-track').style.width = trackWidth + 'px';

        sliderNav.style.width = __.defaultOptions.containerWidth + 'px';
        sliderNav.style.margin = '0 auto';

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.width = slideWidth + 'px';
            slides[i].style.paddingLeft = padding + 'px';
            slides[i].style.paddingRight = padding + 'px';
        }
    }

    function initEventHandlers() {
        const slider = __.el;
        const sliderNav = document.querySelector(`.slider-nav[data-slider-id="${__.sliderId}"]`);
        const sliderButtons = sliderNav.querySelector('.slide-nav-buttons');

        sliderButtons.addEventListener('click', (e) => clickHandler(e, slider));
        slider.addEventListener('scroll', (e) => scrollHandler(e, slider));

        window.addEventListener('resize', (e) => resizeHandler(e, slider));
    }

    function resizeHandler(event, slider) {
        setWidths();
        setActiveSlides();
    }

    function clickHandler(event, slider) {
        if (event.target.nodeName === 'BUTTON') {
            let scrollPos = slider.scrollLeft;

            const sliderOffset = __.sliderOffset,
                slidesToScroll = __.defaultOptions.slidesToScroll;

            let activeSlides = __.activeSlides.sort((a, b) => {
                if (a < b) {
                    return -1;
                }
                if (a > b) {
                    return 1;
                }
                return 0;
            });

            switch (event.target.dataset.action) {
                case 'next':
                    for (let i = 0; i < activeSlides.length; i++) {
                        // get next slide closest to current slide scroll position
                        const slide = getSlideById(activeSlides[i]);
                        const offsetLeft = slide.offsetLeft - sliderOffset + slide.clientWidth * slidesToScroll;

                        if (offsetLeft > scrollPos) {
                            slider.scrollLeft = offsetLeft;
                            break;
                        }
                    }
                    break;

                case 'prev':
                    const prevSlide = getSlideById(activeSlides[0] - __.defaultOptions.slidesToScroll);
                    if (!prevSlide) return;
                    slider.scrollLeft = prevSlide.offsetLeft - sliderOffset;
                    break;
            }
        }
    }

    function scrollHandler(event, slider) {
        setActiveSlides();
    }

    function setActiveSlides() {
        const ele = __.el;
        const slides = ele.querySelectorAll('.scroll-slider .scroll-slide');

        for (let i = 0; i < slides.length; i++) {
            let slide = slides[i],
                slideId = parseInt(slide.dataset.slideIndex);

            if (isVisible(slide)) {
                slide.classList.add('slide-active');
                if (!__.activeSlides.includes(slideId)) {
                    __.activeSlides.push(slideId);
                }
            } else {
                slide.classList.remove('slide-active');
                const index = __.activeSlides.indexOf(slideId);
                if (index > -1) {
                    __.activeSlides.splice(index, 1);
                }
            }
        }
    }

    function getSlideById(slideId) {
        return __.el.querySelector(`.scroll-slide[data-slide-index="${slideId}"]`);
    }

    function isVisible(slide) {
        const width = __.defaultOptions.containerWidth;
        const offset = Math.floor(Math.abs(__.el.scrollLeft));
        const left = Math.floor(slide.offsetLeft - __.sliderOffset + slide.clientWidth);
        const right = Math.floor(left - __.sliderOffset - offset);

        return left > 0 && offset < left && right <= width;
    }

    useEffect(() => {
        init();

        return () => {
            destroy();
        };
    }, [slides, SlideComponent, options]);

    return <div ref={elemRef} />;
}
