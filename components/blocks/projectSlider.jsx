import SectionHeader from "./sectionHeader";
import {ScrollSlider} from "./scrollSlider";
import ProjectSlide from "./projectSlide";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function ProjectSlider({
    title,
    backgroundColour,
    projects
                                      }) {
    const [activeViewMode, setActiveViewMode] = useState('slider'); // Default to 'slider'

    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedViewMode = window.localStorage.getItem('projectViewMode');
            setActiveViewMode(storedViewMode ?? 'slider');
        }
    }, []);

    const toggleViewMode = () => {
        const type = activeViewMode === 'slider' ? 'grid' : 'slider'
        setActiveViewMode(type);
        window.localStorage.setItem('projectViewMode', type);
    }

    return (
        <section className={`section section-about bg-${backgroundColour}`}>
            <div className={'container'}>
                <SectionHeader
                    title={title}
                    lead=""
                />
            </div>
                {/*<button onClick={() => toggleViewMode()}>Grid mode</button>*/}
                <ScrollSlider slides={projects}
                              dispose={activeViewMode === 'grid'}
                              SlideComponent={(props) => <ProjectSlide {...props} router={router}
                  />}
                />
        </section>
    )
}
