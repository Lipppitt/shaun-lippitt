import { TinaMarkdown } from 'tinacms/dist/rich-text'
import Button from './rich-text/button';

export default function SectionText({text}) {

    const components = {
        Button: (props) => {
            return (
                <Button
                    label={props.button_label}
                    type={props.button_type}
                    link={props.button_link}
                    target={props.button_link_target}
                />
            )
        }
    }

    return (
        <div className="section__content fadeIn">
            <TinaMarkdown content={text} components={components}/>
        </div>
    )
}
