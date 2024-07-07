import ServiceGridItem from "./serviceGridItem";
import {useEffect, useRef} from "react";
import useGSAP from "../hooks/useGsap";
import {gsap} from "gsap/dist/gsap";

export default function ServicesGrid({services}) {
    const el = useRef(null);

    useGSAP();

    useEffect(() => {
        let animations = [];
        if (el.current !== null) {
            const services = el.current.querySelectorAll('.service');

            services.forEach((service, index) => {
                const animation = gsap.from(service, {
                    scrollTrigger: {
                        start: "top 80%", // Adjust as needed
                        trigger: el.current,
                        scrub: false,
                    },
                    opacity: 0,
                    visibility: 'visible',
                    delay: .5,
                });
                animations.push(animation);
            });
        }

        return () => {
            animations.forEach(animation => animation.revert());
        };
    }, []);

    return (
        <div ref={el} className="row services">
            {services.map((service, index) => {
                return <ServiceGridItem
                    key={index}
                    title={service?.service.title}
                    icon={service?.service.icon}
                    short_description={service?.service.short_description}
                    link={service?.service?._sys?.filename}
                />
            })}
        </div>
    )
}
