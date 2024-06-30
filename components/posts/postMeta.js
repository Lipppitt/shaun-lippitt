import React from 'react'

export const PostMeta = ({author, date}) => {
    return (
        <>
            <div className="post-author flex items-center">
                <div className="post-author__image">
                    <img
                        className="author__image"
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
