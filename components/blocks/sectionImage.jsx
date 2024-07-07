import Image from "next/image";
import {useEffect, useRef} from "react";
import useGSAP from "../hooks/useGsap";
import {gsap} from "gsap/dist/gsap";

export default function SectionImage({
                                        image,
                                        altTag,
                                        align,
                                        imageClassName,
                                        ...imageProps
                                    }) {

    let containerClass = "";

    if (align === "right") {
        containerClass = "ms-auto";
    } else if (align === "center") {
        containerClass = "mx-auto";
    }

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
                opacity: 0,
                visibility: 'visible',
                delay: 0.5
            });
        }

        return () => ctx?.revert();
    }, []);

    return (
        <div className="section-image d-flex" ref={el}>
            <div className={`${containerClass}`} >
                <Image
                    alt={altTag}
                    src={image}
                    title=""
                    width={450}
                    height={450}
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                    className={imageClassName}
                    {...imageProps}
                />
            </div>
        </div>
    );
}
