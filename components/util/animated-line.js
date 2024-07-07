import React, {useEffect, useRef} from 'react'
import useGSAP from "../hooks/useGsap";
import {gsap} from "gsap/dist/gsap";

export const AnimatedLine = () => {
    const el = useRef(null);

    useGSAP();

    useEffect(() => {
        let ctx;

        if (el.current !== null) {
            ctx = gsap.from(el.current, {
                scrollTrigger: {
                    start: "top 80%", // Adjust as needed
                    trigger: el.current,
                    scrub: false,
                },
                width: 0,
                y: 0,
                visibility: 'visible',
                delay: .5,
            });
        }
        return () => ctx?.revert();
    }, []);

    return (
        <span ref={el} class={"animated-line"}></span>
    )
}
