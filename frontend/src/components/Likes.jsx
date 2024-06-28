import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { SessionContext } from '../context/Contexts';
import axios from 'axios';
import ProfileCard from './ProfileCard';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from 'react-fontawesome'

const Likes = ({ post, setDisplayLikes }) => {

    const [likes, setLikes] = useState([]);
    const { farmer } = useContext(SessionContext)

    const viewLikes = () => {
        axios.get(`api/posts/${post._id}/likes`)
            .then((response) => {
                setLikes(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const toggle = () => {
        setDisplayLikes(false);
    }

    useEffect(() => {
        viewLikes();
    }, [post, farmer]);

    return (

        <LikesWrapper $likes={likes}>
            <h3>Liked by {likes.length} farmers</h3>
            <Cross onClick={toggle}>
                <FontAwesomeIcon name="fa-solid fa-x" />
            </Cross>
            <ul>
                {likes.map((like) => (
                    <Link key={like._id} to={`/profile/${like.username}`} style={{ textDecoration: "none" }} >
                        <ProfileCard likedBy={like} />
                    </Link>
                ))}
            </ul>

        </LikesWrapper>
    )
}

export default Likes

const LikesWrapper = styled.div`
    position:relative;
    background-color: #e4e4e4;
    padding-top:10px;
    border-radius: 8px;
    z-index:100;
    height:${(props) => props.$likes.length*55 + 50}px;
    width: 100%;
    h3{
        text-align:center;
        font-family:sans-serif;
    }
`
const Cross = styled.div`
    position:absolute;
    top:10px;
    right:10px;
`