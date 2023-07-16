import ProjectSlide from "./projectSlide";

export default function ProjectSlider({projects}) {
    return (
        <>
            {projects.length > 0 &&
                <div id="projects_slide">
                    <div className="projects-track">
                        <div className="row projects">
                            {projects.map((project, index) => {
                                return <ProjectSlide
                                    key={project.slug}
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
