import SectionHeader from "./sectionHeader";
import SectionText from "./sectionText";
import ProjectSlider from "./projectSlider";
import ServicesGrid from "./servicesGrid";
import Form from "./form";
import SectionImage from "./sectionImage";
import {ScrollSlider} from "./scrollSlider";
import ProjectSlide from "./projectSlide";

export default function SectionColumn({
    width,
    content,
}) {
    return (
        <div className={`${width}`}>
            {content.map((content, index) => {
                let template = content.template;
                switch (template) {
                    case 'section-header' :
                        return <SectionHeader
                            key={index}
                            title={content.title}
                            lead={content.lead}
                        />
                    case 'section-text' :
                        return <SectionText
                            key={index}
                            text={content.text}/>
                    case 'section-image' :
                        return <SectionImage
                            key={index}
                            image={content.image}/>
                    case 'project-slider' :
                        return <ScrollSlider
                            key={index}
                            slides={content.projects}
                            SlideComponent={ProjectSlide}
                        />
                    case 'services-grid' :
                        return <ServicesGrid
                            key={index}
                            services={content.services}/>
                    case 'form' :
                        return <Form
                            key={index}
                            fields={content.fields}/>
                }
            })}
        </div>
    )
}
