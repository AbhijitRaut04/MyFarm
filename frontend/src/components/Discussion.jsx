import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SessionContext } from "../context/Contexts";
import Loading from "./Loading";

const Discussion = () => {
  const [chatProfiles, setChatProfiles] = useState();
  const navigate = useNavigate();
  const { farmer } = useContext(SessionContext);
  const [loading, setLoading] = useState(true);

  console.log("in discussion page");

  const fetchChatsAndFarmers = async () => {
    try {
      console.log("Fetching chats.......");
      const chatsResponse = await axios.get(`api/chats`);
      const chats = chatsResponse.data;
      console.log("calling api", chats);
      //here chats contains the chat model with participants and messages

      const chatsWithFarmerDataPromise = chats.map(async (chat) => {
        const otherFarmerId = chat.participants.find((id) => id !== farmer._id);

        try {
          const farmerResponse = await axios.get(
            `/api/farmers/${otherFarmerId}`
          );
          console.log("farmer response", farmerResponse);
          const farmerData = farmerResponse.data;
          return {
            ...farmerData,
            farmerId: farmerData.farmerId,
            chatId: chat._id,
          };
        } catch (error) {
          console.error(
            `Error fetching farmer data for ID ${otherFarmerId}: `,
            error
          );
          return null;
        }
      });

      const chatsWithFarmerData = await Promise.all(chatsWithFarmerDataPromise);

      const validChatsWithFarmerData = chatsWithFarmerData.filter(
        (chat) => chat !== null
      );

      setChatProfiles(validChatsWithFarmerData);
      setLoading(false);
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
  console.log(chatProfiles);

  const handleProfile = (profile) => {
    console.log(profile);
    // navigate(`/profile/${profile.farmerId}`, {
    //   state: { otherFarmer: profile },
    // });
    navigate(`/profile/${profile._id}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <DiscussionList>
      {(chatProfiles &&
        chatProfiles.length &&
        chatProfiles.map(
          (profile, index) =>
            profile && (
              <User key={index}>
                <ProfilePicture onClick={() => handleProfile(profile)}>
                  <img src={profile.profilePhoto} alt={profile.username} />
                </ProfilePicture>
                <UserInfo onClick={() => handleOnClick(profile)}>
                  <h2>{profile.username}</h2>
                </UserInfo>
              </User>
            )
        )) || (
        <NoChats>
          <h1>No chats available</h1>
        </NoChats>
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

const NoChats = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center; */
  margin-top: 40%;
  text-align: center;

  h1 {
    color: #666;
  }
`;
