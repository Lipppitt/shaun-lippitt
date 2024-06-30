export default function Button({label, type, link, target}) {
    return (
        <>
            <p>
                <a href={link} className={`btn`} target={target}>
                    {label}
                </a>
            </p>
        </>
    )
}
