import React from 'react'
import Image from "next/image";

export const PostMeta = ({author, date}) => {
    return (
        <>
            <div className="post-author flex items-center">
                <div className="post-author__image">
                    <Image
                        className="author__image"
                        width={10}
                        height={10}
                        src={author?.avatar}
                        alt={author?.name}
                    />
                </div>
                <p className="author__name">
                    {author?.name}
                </p>
                {date !== '' && (
                    <>
                        <span className="separator">
                          —
                        </span>
                        <p className="post__date">
                            {date}
                        </p>
                    </>
                )}
            </div>
        </>
    )
}
