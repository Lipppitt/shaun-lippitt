import React, { createContext, useContext } from 'react';

const PostContext = createContext();

export const usePostContext = () => useContext(PostContext);

export const PostProvider = ({ children, posts }) => (
    <PostContext.Provider value={posts}>{children}</PostContext.Provider>
);
