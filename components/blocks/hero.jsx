import {Icon} from "../util/icon";
import {Container} from "../util/container";
import React, {useEffect, useRef} from "react";
import useGSAP from "../hooks/useGsap";
import { gsap } from "gsap/dist/gsap";
import SplitType from "split-type";

export default function Hero({title, lead, children}) {
    const el = useRef(null);

    useGSAP();

    useEffect(() => {
        const text = new SplitType(el.current, { types: 'words, chars' })

        gsap.from(text.chars, {
            scrollTrigger: {
                trigger: el.current,
                scrub: false,
            },
            y: 10,
            opacity: 0,
            stagger: 0.025,
            visibility: 'visible',
            delay: 1
        });
    }, []);

    function createMarkup() {
        return {__html: title};
    }

    return (
        <div className="hero">
            <Container className="container">
                <h1 className="hero-title" ref={el} dangerouslySetInnerHTML={createMarkup()}></h1>

                {lead && <p className="hero-lead fadeInUp">{lead}</p>}

                {children}
                <div className="hero-page-down fadeIn">
                    <a href="#site_content" className="hero-page-down-arrow">
                        <Icon data={{name: 'DownArrow'}}/>
                    </a>
                </div>
            </Container>
            {/*<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 39.8 39.1" xmlSpace="preserve">*/}
            {/*    <g>*/}
            {/*        <path className="st0" d="M5.1,20.9c0.4,1.2,1.6,1.8,2.8,1.4l0.7-0.2c1.2-0.4,1.8-1.6,1.4-2.8l-1.6-4.9c-0.4-1.2,0.3-2.4,1.4-2.8l11.7-3.8c1.2-0.4,1.8-1.6,1.4-2.8l-0.2-0.7c-0.4-1.2-1.6-1.8-2.8-1.4L6.2,7.3L3.3,8.2C2.1,8.6,1.5,9.8,1.9,11l0.9,2.8L5.1,20.9z" />*/}
            {/*        <path className="st0" d="M27.4,21.5L27.4,21.5c-0.4-1.4-1.9-2.1-3.3-1.7L1.8,27c-1.4,0.4-2.1,1.9-1.7,3.3C0.6,31.7,2,32.4,3.4,32l22.3-7.2C27.1,24.4,27.9,22.9,27.4,21.5z" />*/}
            {/*        <path className="st0" d="M27.8,8c0.4,1.2-0.3,2.4-1.4,2.8l-11.7,3.8c-1.2,0.4-1.8,1.6-1.4,2.8l0.2,0.7c0.4,1.2,1.6,1.8,2.8,1.4l13.9-4.5l2.9-0.9c1.2-0.4,1.8-1.6,1.4-2.8l-0.9-2.8l-2.3-7c-0.4-1.2-1.6-1.8-2.8-1.4l-0.7,0.2c-1.2,0.4-1.8,1.6-1.4,2.8L27.8,8z" />*/}
            {/*        <path className="st0" d="M39.7,28l-0.9-2.8l-2.2-7c-0.4-1.2-1.6-1.8-2.8-1.4L33,17c-1.2,0.4-1.8,1.6-1.4,2.8l1.5,4.8c0.4,1.1-0.2,2.3-1.3,2.8L11.3,34c-1.4,0.4-2.1,1.9-1.7,3.3c0.4,1.4,1.9,2.1,3.3,1.7l8.6-2.8c0,0,0.1,0,0.1,0l13.9-4.5l2.9-0.9C39.5,30.4,40.1,29.2,39.7,28z" />*/}
            {/*    </g>*/}
            {/*</svg>*/}
        </div>
    )
}
