import { TinaMarkdown } from 'tinacms/dist/rich-text'
import Button from './rich-text/button';
import useGSAP from "../hooks/useGsap";
import {useEffect, useRef} from "react";
import {gsap} from "gsap/dist/gsap";

export default function SectionText({text}) {

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
                y: 10,
                opacity: 0,
                stagger: 0.025,
                visibility: 'visible',
                delay: .5,
            });
        }

        return () => ctx?.revert();
    }, []);


    const components = {
        Button: (props) => {
            return (
                <Button
                    label={props.button_label}
                    type={props.button_type}
                    link={props.button_link}
                    target={props.button_link_target}
                />
            )
        }
    }

    return (
        <div ref={el} className="section__content">
            <TinaMarkdown content={text} components={components}/>
        </div>
    )
}
