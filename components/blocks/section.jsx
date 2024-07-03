import SectionColumn from "./sectionColumn";

export default function Section({
    id,
    columns,
    backgroundColour,
    align
}) {

    let alignClass = 'center';
    if (align === 'Center') {
        alignClass = 'center'
    } else {
        alignClass = 'start'
    }

    return (
        <section id={id} className={`section section-about bg-${backgroundColour}`}>
            <div className="container section-inner">
                <div className={`row align-items-${alignClass}`}>
                    {columns.map((col, index) => {
                        return <SectionColumn
                            key={index}
                            width={col.column_width}
                            content={col.column_content}
                        />
                    })}
                </div>
            </div>
        </section>
    )
}
