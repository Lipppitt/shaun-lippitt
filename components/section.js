export default function Section({
    title,
    lead,
    content,
    backgroundColour,
}) {
    return (
        <section id="about" className={`section section-about bg-${backgroundColour}-100`}>
            <div className="container section-inner">
                <div className="row align-items-center">
                    <div className="col-md-7">
                        <h2 className="section__title">
                            <span className="fadeInUp d-block section__title-text">{{title}}</span></h2>
                        <div className="section__content fadeIn">
                            {{content}}
                        </div>
                    </div>
                    <div className="col-md-5 justify-content-end">
                        {/*<img className="fadeInDown about-img" alt="Photo of Shaun Lippitt" src="assets/img/me.jpg">*/}
                    </div>
                </div>
            </div>
        </section>
    )
}
