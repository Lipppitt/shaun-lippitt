import Image from "next/image";
export default function SectionImage({
    image,
    altTag
}) {
    return (
        <Image alt={altTag} src={''} layout='fill'/>
    )
}
