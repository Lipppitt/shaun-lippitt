import {PostCard} from "../posts/postCard";
import React from "react";

function RecentPosts({ posts }) {
    return (
        <>
            <div className={`row`}>
                {posts.map((postData, index) => (
                    <div className={'col-md-6'} key={index}>
                        <PostCard postData={postData}/>
                    </div>
                ))}
            </div>
        </>
    );
}

export default RecentPosts;
