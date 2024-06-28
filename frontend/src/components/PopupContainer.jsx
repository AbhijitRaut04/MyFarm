import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { SessionContext } from '../context/Contexts';
import axios from 'axios';
import ProfileCard from './ProfileCard';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from 'react-fontawesome'

const PopupContainer = ({ fetchRoute, setDisplay, Title }) => {

    const [farmers, setFarmers] = useState([]);
    const { farmer } = useContext(SessionContext)

    const showContainer = () => {
        axios.get(`${fetchRoute}`)
            .then((response) => {
                setFarmers(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const toggle = () => {
        setDisplay(false);
    }

    useEffect(() => {
        showContainer();
    }, [farmer]);

    return (

        <Container $count={farmers}>
            <h3>{Title}</h3>
            <Cross onClick={toggle}>
                <FontAwesomeIcon name="fa-solid fa-x" />
            </Cross>
            <ul>
                {farmers.map((farmer) => (
                    <Link key={farmer._id} to={`/profile/${farmer._id}`} style={{ textDecoration: "none" }} >
                        <ProfileCard farmerId={farmer} />
                    </Link>
                ))}
            </ul>

        </Container>
    )
}

export default PopupContainer

const Container = styled.div`
    position:relative;
    background-color: #e4e4e4;
    padding-top:10px;
    border-radius: 8px;
    z-index:100;
    height:${(props) => props.$count.length*55 + 50}px;
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