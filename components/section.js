import SectionColumn from "./sectionColumn";

export default function Section({
    columns,
    backgroundColour,
}) {
    return (
        <section id="about" className={`section section-about bg-${backgroundColour}`}>
            <div className="container section-inner">
                <div className="row align-items-center">
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
