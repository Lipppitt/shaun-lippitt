export default function SectionHeader({
    title,
    lead
}) {
    return (
        <>
            <h2 className="section__title"><span className="fadeInUp d-block section__title-text drawIn">{title}</span></h2>
            {lead.length > 0 && <p className="section__lead">{lead}</p>}
        </>
    )
}
