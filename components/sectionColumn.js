import SectionHeader from "./sectionHeader";
import SectionText from "./sectionText";
import ProjectSlider from "./projectSlider";
import ServicesGrid from "./servicesGrid";
import Form from "./form";
import SectionImage from "./sectionImage";

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
                            title={content.title}
                            lead={content.lead}
                        />
                    case 'section-text' :
                        return <SectionText text={content.text}/>
                    case 'section-image' :
                        return <SectionImage image='content.image'/>
                    case 'project-slider' :
                        return <ProjectSlider projects={content.projects}/>
                    case 'services-grid' :
                        return <ServicesGrid services={content.services}/>
                    case 'form' :
                        return <Form fields={content.fields}/>
                }
            })}
        </div>
    )
}
