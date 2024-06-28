import React, { useContext } from 'react'
import Post from "./Post";
import { UserContext } from "../context/Contexts";

const AllPosts = () => {
    const { posts } = useContext(UserContext);
    return (
        <>
            {posts.map((post, index) => (
                <Post key={index} post={post} />
            )
            )}
        </>
    )
}

export default AllPosts
