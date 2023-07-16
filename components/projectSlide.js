export default function ProjectSlide(
    {
        slide,
    }) {
    return (
        <>
            <div className="project">
                <a className="project-thumbnail" href="">
                    <div className="project-thumbnail__image"/>
                    <header className="project-thumbnail__header">
                        <h3>{slide.title}</h3>
                        <span></span>
                    </header>
                </a>
            </div>
        </>
    )
}
