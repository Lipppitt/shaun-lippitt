import SectionHeader from "./sectionHeader";
import SectionText from "./sectionText";
import ServicesGrid from "./servicesGrid";
import SectionImage from "./sectionImage";
import SectionGallery from "./sectionGallery";
import CustomForm from "./form";
import {Posts} from "../posts/posts";
import RecentPosts from "./recentPosts";
import {usePostContext} from "../../context/postsContext";

export default function SectionColumn({
    width,
    content,
}) {

    const posts = usePostContext();

    return (
        <div className={`${width}`}>
            {content?.map((content, index) => {
                let template = content.__typename;

                let templateParts = template.split(/(?=[A-Z])/);
                template = templateParts.slice(1).join("");

                switch (template) {
                    case "ContentSectionColumnColumn_contentSection_header" :
                        return <SectionHeader
                            key={index}
                            title={content.title}
                            lead={content.lead}
                        />
                    case "ContentSectionColumnColumn_contentSection_text":
                        return <SectionText
                            key={index}
                            text={content.text.children}/>
                    case "ContentSectionColumnColumn_contentSection_image" :
                        return <SectionImage
                            key={index}
                            image={content.image}
                            align={content.align}
                        />
                    case "ContentSectionColumnColumn_contentSection_gallery" :
                        return <SectionGallery
                            key={index}
                            gallery={content.gallery}
                        />
                    case "ContentSectionColumnColumn_contentServices_grid" :
                        return <ServicesGrid
                            key={index}
                            services={content.services}/>
                    case 'ContentSectionColumnColumn_contentForm' :
                        return <CustomForm
                            key={index}
                            fields={content.fields}/>
                    case 'ContentSectionColumnColumn_contentRecent_posts' :
                        return <RecentPosts
                            key={index}
                            posts={posts}
                        />
                }
            })}
        </div>
    )
}
