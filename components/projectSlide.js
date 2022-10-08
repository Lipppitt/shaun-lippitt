export default function ProjectSlide(
    {
        key,
        title,
        gallery
    }) {
    return (
        <>
            <div className="col-sm-6 project">
                <a className="project-thumbnail" href="">
                    <div className="project-thumbnail__image"/>
                    <header className="project-thumbnail__header">
                        <h3>{title}</h3>
                        <span></span>
                    </header>
                </a>
            </div>
        </>
    )
}
