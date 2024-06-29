import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { SessionContext } from "../context/Contexts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Comment = ({ fetchRoute, showComment }) => {
  const { farmer } = useContext(SessionContext);
  // const [isFollower, setIsFollower] = useState(false);

  // const navigate = useNavigate();

  const deleteComment = () => {
    axios
      .delete(`${fetchRoute}/${showComment._id}/delete`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   return (
  //     <Card>
  //       <div>
  //         <Image onClick={() => navigate(`/profile/${showComment.createdBy}`)}>
  //           <img src={showFarmer.profilePhoto} alt={showFarmer.username} />
  //         </Image>
  //         <h4 onClick={() => navigate(`/profile/${showFarmer._id}`)}>
  //           {showFarmer.username}
  //         </h4>
  //       </div>

  //       {showFarmer._id !== farmer._id && (
  //         <button className="follow" onClick={toggleFollow}>
  //           {isFollower ? "Unfollow" : "Follow"}
  //         </button>
  //       )}
  //     </Card>
  //   );

  return (
    <Card>
      <div className="info"></div>
      <div className="content">
        <h4>{showComment.content}</h4>
        {showComment.createdBy === farmer._id && (
          <button className="delete" onClick={deleteComment}>
            <i class="fa-regular fa-trash-can"></i>
          </button>
        )}
      </div>
    </Card>
  );
};

export default Comment;

const Card = styled.div`
  /* background-color: #d58c8c; */
  margin: 0 10px;
  padding: 5px 10px;
  height: 50px;
  border-bottom: 1px solid #eaeaea;
  .content {
    display: flex;
    justify-content: space-between;
    h4 {
      font-size: 1.3rem;
    }
    button {
      background-color: #fff;
      border: none;
      color: #ff0000;
      font-size: 1rem;
      cursor: pointer;
    }
  }
`;
