
export default function SliderArrow({dir}) {
    return (
        <>
            <button className={`btn btn-arrow ${dir}-arrow`} data-action={dir}></button>
        </>
    );
}
