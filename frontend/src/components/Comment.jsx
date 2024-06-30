import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { SessionContext } from "../context/Contexts";
import { CardBody } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";

const Comment = ({ fetchRoute, comment }) => {
  const { farmer, setCheckout } = useContext(SessionContext);

  const deleteComment = () => {
    axios
      .patch(`${fetchRoute}/${comment._id}/delete`)
      .then((response) => {
        console.log(response);
        setCheckout(prev => !prev);
        toast.success("Comment deleted.")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (

    <Card >
      <CardBody>
        <CardTitle>
          <img src={`${comment.createdBy.profilePhoto}`} />
          <div>
          <h5>{`${comment.createdBy.username}`}</h5>
          <CardText>
            <h4>{`${comment.content}`}</h4>
          </CardText>
          </div>
          <Button onClick={deleteComment}>
            <i className="fa-regular fa-trash-can" ></i>
          </Button>
        </CardTitle>
        <hr />

      </CardBody>
    </Card>
  );
};

export default Comment;

const Card = styled.div`
   width: 100%;
   padding:10px;
`;

const Button = styled.button`
    background-color: #fff;
      border: none;
      color: #ff0000;
      font-size: 1rem;
      cursor: pointer;
      margin-left:auto;
      margin-right: 10px;
`

const CardTitle = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom:5px;
  div{
    display:flex;
    flex-direction:column;
  }
  img{ 
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
    }
    h5{
    margin-top:5px;
    font-family:sans-serif;
}
`
const CardText = styled.div`
  h4{
  margin-top: 10px;
  font-family: sans-serif;
}
`