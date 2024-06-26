import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SessionContext } from "../context/Contexts";

const Discussion = () => {
  const [chatProfiles, setChatProfiles] = useState();
  const navigate = useNavigate();
  const { farmer } = useContext(SessionContext);

  console.log("in discussion page");

  const fetchChatsAndFarmers = async () => {
    try {
      console.log("Fetching chats.......")
      const chatsResponse = await axios.get(`api/chats`);
      const chats = chatsResponse.data;
      console.log("calling api", chats);
      //here chats contains the chat model with participants and messages

      // const chatsWithFarmerDataPromise = chats.map(async (chat) => {
      //   const otherFarmerId = chat.participants.find((id) => id !== farmer._id);

      //   try {
      //     const farmerResponse = await axios.get(
      //       `/api/farmers/${otherFarmerId}`
      //     );
      //     const farmerData = farmerResponse.data;
      //     console.log("fetching farmer profiles");
      //     return {
      //       ...farmerData,
      //       chatId: chat._id,
      //     };
        // } catch (error) {
        //   console.error(
        //     `Error fetching farmer data for ID ${otherFarmerId}: `,
        //     error
        //   );
        //   return null;
        // }
      // });

      // const chatsWithFarmerData = await Promise.all(chatsWithFarmerDataPromise);

      // const validChatsWithFarmerData = chatsWithFarmerData.filter(
      //   (chat) => chat !== null
      // );

      // console.log(validChatsWithFarmerData);
      setChatProfiles(chats);
    } catch (error) {
      console.error("Error fetching chats: ", error);
    }
  };

  useEffect(() => {
    if (farmer) fetchChatsAndFarmers();
  }, [farmer]);

  const handleOnClick = (profile) => {
    navigate(`/discussion/${profile.chatId}`);
  };

  return (
    <DiscussionList>
      {chatProfiles &&
        chatProfiles.map(
          (profile, index) =>
            profile && (
              <User key={index} onClick={() => handleOnClick(profile)}>
                <ProfilePicture>
                  <img src={profile.profilePhoto} alt={profile.username} />
                </ProfilePicture>
                <UserInfo>
                  <h2>{profile.username}</h2>
                  {/* <p>{profile.location}</p> */}
                  <h2>
                    {/* Chat with{" "}
                {user.participants
                  .filter((member) => member !== farmer._id)
                  .join(", ")} */}
                  </h2>
                </UserInfo>
              </User>
            )
        )}
    </DiscussionList>
  );
};

export default Discussion;

const DiscussionList = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const User = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
`;

const ProfilePicture = styled.div`
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const UserInfo = styled.div`
  h2 {
    margin: 0;
    font-size: 1.5rem;
  }
  p {
    margin: 0;
    font-size: 1rem;
    color: #666;
  }
`;
