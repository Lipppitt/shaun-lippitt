import {Icon} from "../util/icon";
import {Container} from "../util/container";
import React, {useEffect, useRef} from "react";
import useGSAP from "../hooks/useGsap";
import { gsap } from "gsap/dist/gsap";
import SplitType from "split-type";
import {AnimatedLine} from "../util/animated-line";

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
        });
    }, []);


    function createMarkup() {
        return {__html: title};
    }

    return (
        <div className="hero">
            <Container className="container">
                <AnimatedLine/>
                <h1 className="hero-title" ref={el} dangerouslySetInnerHTML={createMarkup()}></h1>

                {lead && <p className="hero-lead fadeInUp">{lead}</p>}

                {children}
                <div className="hero-page-down fadeIn">
                    <span href="#site_content" className="hero-page-down-arrow">
                        <svg width="40px" height="100%" viewBox={"0 0 247 390"} version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path id="wheel" d="M123.359,79.775l0,72.843"/>
                            <path id="mouse" d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z"/>
                        </svg>
                    </span>
                </div>
            </Container>
            {/*<Background/>*/}
        </div>
    )
}
