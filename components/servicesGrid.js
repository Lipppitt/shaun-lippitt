import ServiceGridItem from "./serviceGridItem";

export default function ServicesGrid({services}) {
    return (
        <div className="row services">
            {services.map((service, index) => {
                return <ServiceGridItem
                    key={service.slug}
                    title={service?.title}
                    short_description={service?.short_description}
                />
            })}
        </div>
    )
}
