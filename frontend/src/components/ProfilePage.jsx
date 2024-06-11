import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  background-color: #1a1a1a;
  color: #fff;
  width: 100%;
  margin: 0 auto;
  padding: 16px 5%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  img {
    width: 24px;
    height: 24px;
  }

  h1 {
    position: absolute;
    left:50%;
    transform: translateX(-50%);
}
`;

// const BackButton = styled.div`
//   font-size: 18px;
//   cursor: pointer;
// `;
const ProfilePicDiv = styled.div`
    margin: 0 auto;
    width: 80px;
    `;

const ProfilePic = styled.img`
    margin: 30px 0;
  width: 80px;
  height: 80px;
  border-radius: 50%;

`;

const Username = styled.h2`
  text-align: center;
`;

const Handle = styled.p`
  text-align: center;
  color: #888;
`;

const FollowInfo = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 16px 0;
`;

const FollowItem = styled.div`
  text-align: center;
`;

const Bio = styled.p`
  text-align: center;
  color: #888;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 16px 0;
`;

const Tab = styled.div`
  text-align: center;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${props => props.active ? '#ffc107' : '#333'};
`;

const DraftsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
  padding: 8px;
  background-color: #333;
  border-radius: 8px;
`;

const DraftsInfo = styled.div`
  color: #888;
`;

const DraftsButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #fff;
  color: #333;
`;

const PostCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PostCard = styled.div`
  width: 48%;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`;

const PostThumbnail = styled.img`
  width: 100%;
  height: auto;
`;

const PostOverlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 8px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
`;

const ProfilePage = () => {

    const navigate = useNavigate();

    fetch('/api/verify', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(
      (data) => {
        console.log(data);
        if(!data.isLoggedIn) {
          navigate('/signin');
        }
      }
    )
    .catch((error) => {
      console.error('Error:', error);
    })



  return (
    <ProfileContainer>
      <Header>
        <img src="./src/assets/burger-menu.svg" alt="" />
        <h1>Profile</h1>
        {/* <BackButton></BackButton> */}
      </Header>
      <ProfilePicDiv>
        <ProfilePic src="https://via.placeholder.com/80" alt="Profile" />
      </ProfilePicDiv>
      <Username>James Bond</Username>
      <Handle>@jamesbond007</Handle>
      <FollowInfo>
        <FollowItem>
          <div>178</div>
          <div>Following</div>
        </FollowItem>
        <FollowItem>
          <div>2.1M</div>
          <div>Followers</div>
        </FollowItem>
      </FollowInfo>
      <Bio>CEO @ColambiaPictures / past creative director of @aba / Stundmen</Bio>
      <Tabs>
        <Tab active>Posts 128</Tab>
        <Tab>Videos 56</Tab>
      </Tabs>
      <DraftsContainer>
        <DraftsInfo>
          <div>6 Posts</div>
          <div>In Your Draft</div>
        </DraftsInfo>
        <DraftsButton>Take a look</DraftsButton>
      </DraftsContainer>
      <PostCardContainer>
        <PostCard>
          <PostThumbnail src="https://via.placeholder.com/150" alt="Post 1" />
          <PostOverlay>
            <div>542K</div>
            <div>Dreams come true</div>
            <div>#freedom #ocean #weekend</div>
          </PostOverlay>
        </PostCard>
        <PostCard>
          <PostThumbnail src="https://via.placeholder.com/150" alt="Post 2" />
          <PostOverlay>
            <div>120K</div>
            <div>Relax&work</div>
            <div>#work #BA #CEO</div>
          </PostOverlay>
        </PostCard>
      </PostCardContainer>
    </ProfileContainer>
  );
};

export default ProfilePage;
