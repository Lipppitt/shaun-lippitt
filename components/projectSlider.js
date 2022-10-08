import ProjectSlide from "./projectSlide";
import {useContext} from "react";
import {PageContext} from "../pages/home";

export default function ProjectSlider({projectIds}) {
    const pageContext = useContext(PageContext);

    const getProjectFromContext = (id) => {
        let realId = id.replace(/(^_projects\/)/, '');
        realId = realId.replace(/\.md$/, '');
        return pageContext.projects.find(project => project.slug === realId);
    };

    return (
        <>
            {projectIds.length > 0 &&
                <div id="projects_slide">
                    <div className="projects-track">
                        <div className="row projects">
                            {projectIds.map((id, index) => {
                                let project = getProjectFromContext(id);
                                return <ProjectSlide
                                    key={index}
                                    title={project?.title}
                                    gallery={project?.gallery}
                                />
                            })}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
