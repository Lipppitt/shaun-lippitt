import ServiceGridItem from "./serviceGridItem";

export default function ServicesGrid({services}) {
    return (
        <div className="row services">
            {services.map((service, index) => {
                return <ServiceGridItem
                    key={index}
                    title={service?.service.title}
                    icon={service?.service.icon}
                    short_description={service?.service.short_description}
                    link={service?.service?._sys?.filename}
                />
            })}
        </div>
    )
}
