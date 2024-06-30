import Image from "next/image";
import SectionImage from "./sectionImage";

export default function SectionGallery({
                                        gallery,
                                    }) {

    return (
        <div className="section-gallery d-flex">
            {gallery.map((image, index) => {
                return (
                    <SectionImage
                        key={index}
                        image={image}
                    />
                )
            })}
        </div>
    );
}
