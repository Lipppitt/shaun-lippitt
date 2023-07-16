export default function ServiceGridItem({title, short_description}) {
    return (
        <div className="col-md-6">
            <div className="service">
                <h3>{title}</h3>
                <p>{short_description}</p>
            </div>
        </div>
    )
}
