import React from 'react'
import Link from 'next/link'
import {TinaMarkdown} from 'tinacms/dist/rich-text'
import {PostMeta} from "./postMeta";
import Image from "next/image";
import useFormattedDate from "../hooks/useFormattedDate";

export const PostCard = ({postData}) => {
    const formattedDate = useFormattedDate(postData.date);

    return (
        <>
            <Link
                key={postData.slug}
                href={`/posts/` + postData.slug}
                passHref
                className={'post'}
            >
                    <div className={'d-flex flex-column h-100'}>
                        {postData.featured_image && (
                            <div className="post-thumbnail">
                                <Image
                                    src={postData.featured_image}
                                    title=""
                                    width={450}
                                    height={300}
                                    alt={postData.title}
                                />
                            </div>
                        )}
                        <h3>
                            {postData.title}{' '}
                        </h3>
                        <div>
                            <TinaMarkdown content={postData?.excerpt}/>
                        </div>
                        <PostMeta
                            author={postData.author}
                            date={formattedDate}
                        />
                    </div>
            </Link>
        </>
    )
}
