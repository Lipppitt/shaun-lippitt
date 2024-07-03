import React from 'react'
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
