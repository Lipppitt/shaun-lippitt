import {useEffect, useLayoutEffect, useRef} from "react";
import useGSAP from "../hooks/useGsap";
import SplitType from "split-type";
import {gsap} from "gsap/dist/gsap";
import {AnimatedLine} from "../util/animated-line";

export default function SectionHeader({
    title,
    lead
}) {
    const el = useRef(null);

    useGSAP();

    useEffect(() => {
        let ctx;

        if (el.current !== null) {
            const text = new SplitType(el.current, {types: 'words, chars'})

            ctx = gsap.from(text.chars, {
                scrollTrigger: {
                    start: "top 80%", // Adjust as needed
                    trigger: el.current,
                    scrub: false,
                },
                y: 10,
                opacity: 0,
                stagger: 0.025,
                visibility: 'visible',
                delay: .5,
            });
        }

        return () => ctx?.revert();
    }, []);

    return (
        <>
            <h2 className="section__title">
                <AnimatedLine/>
                <span ref={el} className="d-block section__title-text">
                    {title}
                </span>
            </h2>
            {lead?.length > 0 && <p className="section__lead">{lead}</p>}
        </>
    )
}

