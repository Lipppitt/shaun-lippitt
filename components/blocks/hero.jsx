import {Icon} from "../util/icon";
import {Container} from "../util/container";
import React, {useEffect, useRef} from "react";
import useGSAP from "../hooks/useGsap";
import { gsap } from "gsap/dist/gsap";
import SplitType from "split-type";
import Background from "../hero/background";
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
                    <a href="#site_content" className="hero-page-down-arrow">
                        <Icon data={{name: 'DownArrow'}}/>
                    </a>
                </div>
            </Container>
            {/*<Background/>*/}
        </div>
    )
}
