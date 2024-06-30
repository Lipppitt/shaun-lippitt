import React from 'react'
import Link from 'next/link'
import {TinaMarkdown} from 'tinacms/dist/rich-text'
import format from 'date-fns/format'
import {PostMeta} from "./postMeta";
import Image from "next/image";
import {PostCard} from "./postCard";

export const Posts = ({data}) => {
    return (
        <>
            <div className={`posts-page row`}>
                {data.map((postData) => {
                   <PostCard postData={postData}/>
                })}
            </div>
        </>
    )
}
