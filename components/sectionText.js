import { remark } from 'remark';
import html from 'remark-html';

export default function SectionText({text}) {


    // const processedContent = await remark()
    //     .use(html)
    //     .process(text);
    // const contentHtml = processedContent.toString();

    return (
        <div className="section__content fadeIn">
            {text}
        </div>
    )
}
