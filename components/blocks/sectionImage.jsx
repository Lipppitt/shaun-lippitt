import Image from "next/image";
import {useEffect, useRef} from "react";

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

    return (
        <div className="section-image d-flex">
            <div className={`${containerClass}`} ref={el}>
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
