import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { SessionContext } from '../context/Contexts'

const ProfileCard = ({likedBy}) => {
    const {farmer} = useContext(SessionContext);
    const [isFollowing, setFollowing] = useState(false);
    if(farmer.following.includes(likedBy._id)){
        setFollowing(true);
    }
    return (
        <Card>
            <Image>
                <img src={likedBy.profilePhoto} />
            </Image>
            <h4>{likedBy.username} </h4>
            {/* {isFollowing ? 
                <button>Unfollow</button>:
                <button>Follow</button>
            } */}
        </Card>
    )
}

export default ProfileCard


const Card = styled.div`
    padding:0 20px;
    height:50px;
    display:flex;
    align-items:center;
    border-radius: 8px;
    gap:20px;
    h4{
        color:#000;
        letter-spacing:1px;
        font-family:sans-serif;
    }
    button{
        margin-left:auto;
        padding:8px 10px;
        background-color:blue;
        outline:none;
        border:none;
        color:white;
        border-radius:8px;
        font-size:15px;
        font-weight:600;
        letter-spacing:1px;
        font-family:sans-serif;
    }
`
const Image = styled.div`
    width:40px;
    height:40px;
    img{
        width:100%;
        border-radius:50%;
        height:100%;
    }
`