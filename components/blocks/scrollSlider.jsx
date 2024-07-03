import React, { useEffect, useRef } from 'react';
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

let id = 0;

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

export function ScrollSlider({ slides, SlideComponent, options, dispose = false }) {

    const elemRef = useRef(null);
    const sliderTrack = useRef(null);

    const defaultOptions = {
        autoWidth: false,
        containerWidth: '100%',
        slidesToShow: 1,
        mobileFirst: true,
        slidesToScroll: 1,
        sliderPadding: 24,
        slidePadding: 12,
        nextBtn: '<button class="btn btn-arrow next-arrow" data-action="next"></button>',
        prevBtn: '<button class="btn btn-arrow prev-arrow" data-action="prev"></button>',
        responsive: [
            {
                breakpoint: 1400,
                containerWidth: 1306,
            },
            {
                breakpoint: 1200,
                containerWidth: 1140,
            },
            {
                breakpoint: 992,
                containerWidth: 896,
            },
            {
                breakpoint: 768,
                containerWidth: 656,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 576,
                containerWidth: 492,
                settings: {
                    slidesToShow: 1,
                    sliderPadding: 0,
                },
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

        setWidths();
        setActiveSlides();
        initEventHandlers();

        __.el.classList.add('initialised');
    }

    function destroy() {
        removeEventListeners();

        const slider = __.el;
        const sliderNav = document.querySelector(`.slider-nav[data-slider-id="${__.sliderId}"]`);

        if (sliderTrack.current) {
            sliderTrack.current.style.width = 'auto';
        }

        if (slider) {
            slider.style = '';
            slider.classList.remove('initialised');
            slider.removeAttribute('data-slider-id');
        }

        if (sliderNav) {
            sliderNav.remove();
        }
    }

    function setWidths() {

        let windowWidth = window.innerWidth;

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
            if (responsive.breakpoint < windowWidth) {
                __.defaultOptions.containerWidth = responsive.containerWidth;
                if (responsive.settings) {
                    Object.keys(__.defaultOptions).forEach((option) => {
                        if (responsive.settings.hasOwnProperty(option)) {
                            __.defaultOptions[option] = responsive.settings[option];
                        }
                    });
                }
            }
        }

        // Fallback to window width if container width is greater than window width
        if (windowWidth < __.defaultOptions.containerWidth || __.defaultOptions.containerWidth === '100%') {
            __.defaultOptions.containerWidth = windowWidth;
        }

        const slider = __.el,
            sliderOffset = (windowWidth - __.defaultOptions.containerWidth) / 2,
            slideWidth = (__.defaultOptions.containerWidth / __.defaultOptions.slidesToShow) - __.defaultOptions.sliderPadding,
            slidesCount = __.slidesCount,
            padding = __.defaultOptions.slidePadding;

        slider.style.paddingLeft = sliderOffset + 'px';
        slider.style.paddingRight = sliderOffset + 'px';

        if (__.defaultOptions.sliderPadding > 0) {
            slider.style.paddingLeft = __.defaultOptions.sliderPadding + 'px';
            slider.style.paddingRight = __.defaultOptions.sliderPadding + 'px';
        }

        __.sliderOffset = sliderOffset;
        __.slideWidth = slideWidth;

        const trackWidth = slideWidth * slidesCount;
        const slides = slider.querySelectorAll('.scroll-slide');

        sliderTrack.current.style.width = trackWidth + 'px';

        const sliderNav = document.querySelector(`.slider-nav[data-slider-id="${__.sliderId}"]`);
        if (sliderNav) {
            sliderNav.style.width = __.defaultOptions.containerWidth + 'px';
            sliderNav.style.margin = '0 auto';
        }

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.width = slideWidth + 'px';
            slides[i].style.paddingLeft = padding + 'px';
            slides[i].style.paddingRight = padding + 'px';
        }
    }

    function initEventHandlers() {
        const slider = __.el;
        const sliderNav = document.querySelector(`.slider-nav[data-slider-id="${__.sliderId}"]`);

        if (sliderNav) {
            const sliderButtons = sliderNav.querySelector('.slide-nav-buttons');
            sliderButtons.addEventListener('click', (e) => clickHandler(e, slider));
        }

        slider.addEventListener('scroll', (e) => scrollHandler(e, slider));
        window.addEventListener('resize', (e) => resizeHandler(e, slider));
    }

    function removeEventListeners() {
        const slider = __.el;
        const sliderNav = document.querySelector(`.slider-nav[data-slider-id="${__.sliderId}"]`);

        if (sliderNav) {
            const sliderButtons = sliderNav.querySelector('.slide-nav-buttons');
            sliderButtons.removeEventListener('click', (e) => clickHandler(e, slider));
            slider.removeEventListener('scroll', (e) => scrollHandler(e, slider));
            window.removeEventListener('resize', (e) => resizeHandler(e, slider));
        }
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
        if (dispose) {
            destroy();
        } else {
            init();
        }
        return () => {
            destroy();
        };
    }, [dispose]);

    return (
        <div ref={elemRef} className={"scroll-slider"}>
            <div ref={sliderTrack} className={`slider-track`}>
                {slides.map((slide, index) => (
                    <div key={index} className="scroll-slide" data-slide-index={index}>
                        <SlideComponent slide={slide}/>
                    </div>
                ))}
            </div>
            {/*<div className={"slider-nav"}>*/}
            {/*    <div className={"slider-nav-buttons"}>*/}
            {/*        {__.defaultOptions.prevBtn}*/}
            {/*        { __.defaultOptions.nextBtn}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}
