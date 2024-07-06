import {useRef} from "react";
import { gsap } from "gsap/dist/gsap";

export default function ProjectSlide({slide, router}) {
    const slideRef = useRef(null);

    const handleOnClick = (slide) => {
        const thumbnailImage = slideRef.current.querySelector('.project-thumbnail__image');
        const clonedThumbnail = thumbnailImage.cloneNode(true);
        const rect = thumbnailImage.getBoundingClientRect();

        // Set the position and size of the cloned thumbnail
        clonedThumbnail.style.position = 'fixed';
        clonedThumbnail.style.left = rect.left + 'px'; // Adjust to be relative to the viewport
        clonedThumbnail.style.top = rect.top + 'px'; // Adjust to be relative to the viewport
        clonedThumbnail.style.width = rect.width + 'px'; // Copy over the width from the original thumbnail
        clonedThumbnail.style.height = rect.height + 'px'; // Copy over the height from the original thumbnail
        clonedThumbnail.style.paddingBottom = 0; // Copy over the padding from the original thumbnail

        const backdropElement = document.createElement('div');
        backdropElement.className = "animate-backdrop";

        document.body.appendChild(backdropElement);
        document.body.appendChild(clonedThumbnail);

        // Animate the cloned thumbnail
        setTimeout(() => {
            gsap.fromTo(clonedThumbnail, {
                left: rect.left + 'px', // Adjust to be relative to the viewport
                top: rect.top + 'px', // Adjust to be relative to the viewport
                width: rect.width + 'px',
            }, {
                left: 0,
                top: 0,
                width: "50%",
                height: "100%",
                marginTop: "5.5rem",
                onComplete: () => {
                    // Scroll the body to the top of the page
                    window.scrollTo({
                        top: 0,
                        behavior: "instant"
                    });
                    router.push({
                        pathname: `/projects/${slide.project._sys.filename}`,
                        query: { fromHome: '1' }
                    }).then(() => {
                        backdropElement.remove();
                        clonedThumbnail.remove();
                    });
                }
            });
        }, 10);
    };

    return (
        <>
            <div className="project" onClick={() => handleOnClick(slide)} ref={slideRef}>
                <div className="project-thumbnail">
                    <div
                        className="project-thumbnail__image"
                        style={{backgroundImage: `url(${slide.project.featured_image})`, backgroundSize: 'cover'}}
                    />
                    <header className="project-thumbnail__header">
                        <h3>{slide.project.title}</h3>

                        {slide.project.description &&
                            <span>{slide.project?.description}</span>
                        }
                    </header>
                </div>
            </div>
        </>
    );
}
