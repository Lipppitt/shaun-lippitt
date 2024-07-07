import SectionHeader from "./sectionHeader";
import {ScrollSlider} from "./scrollSlider";
import ProjectSlide from "./projectSlide";
import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap/dist/gsap";
import useGSAP from "../hooks/useGsap";

export default function ProjectSlider({
    title,
    backgroundColour,
    projects
                                      }) {
    const [activeViewMode, setActiveViewMode] = useState('slider'); // Default to 'slider'

    const router = useRouter();

    const el = useRef(null);

    useGSAP();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedViewMode = window.localStorage.getItem('projectViewMode');
            setActiveViewMode(storedViewMode ?? 'slider');
        }

        let ctx;

        if (el.current !== null) {
            ctx = gsap.from(el.current, {
                scrollTrigger: {
                    start: "top 50%", // Adjust as needed
                    trigger: el.current,
                    scrub: false,
                },
                opacity: 1,
                visibility: 'visible',
            });
        }

        return () => ctx?.revert();
    }, []);

    const toggleViewMode = () => {
        const type = activeViewMode === 'slider' ? 'grid' : 'slider'
        setActiveViewMode(type);
        window.localStorage.setItem('projectViewMode', type);
    }

    return (
        <section  className={`section section-about bg-${backgroundColour}`}>
            <div className={'container'}>
                <SectionHeader
                    title={title}
                    lead=""
                />
            </div>
                {/*<button onClick={() => toggleViewMode()}>Grid mode</button>*/}
                <div ref={el}>
                    <ScrollSlider slides={projects}
                                  dispose={activeViewMode === 'grid'}
                                  SlideComponent={(props) => <ProjectSlide {...props} router={router}
                                  />}
                    />
                </div>
        </section>
    )
}
