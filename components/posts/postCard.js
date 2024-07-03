import React from 'react'
import Link from 'next/link'
import {TinaMarkdown} from 'tinacms/dist/rich-text'
import format from 'date-fns/format'
import {PostMeta} from "./postMeta";
import Image from "next/image";

export const PostCard = ({postData}) => {
    const post = postData;
    const date = new Date(post.date)
    let formattedDate = ''
    if (!isNaN(date.getTime())) {
        formattedDate = format(date, 'MMM dd, yyyy')
    }

    return (
        <>
            <Link
                key={post.slug}
                href={`/posts/` + post.slug}
                passHref
                className={'post'}
            >
                    <div className={'d-flex flex-column h-100'}>
                        {post.featured_image && (
                            <div className="post-thumbnail">
                                <Image
                                    src={post.featured_image}
                                    title=""
                                    width={450}
                                    height={300}
                                    alt={post.title}
                                />
                            </div>
                        )}
                        <h3>
                            {post.title}{' '}
                        </h3>
                        <div>
                            <TinaMarkdown content={post?.excerpt}/>
                        </div>
                        <PostMeta
                            author={post.author}
                            date={formattedDate}
                        />
                    </div>
            </Link>
        </>
    )
}
