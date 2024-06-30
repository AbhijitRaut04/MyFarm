import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { SessionContext } from "../context/Contexts";
import axios from "axios";
import FontAwesomeIcon from "react-fontawesome";
import Loading from "./Loading";
import { toast } from "react-toastify";
import Comment from "./Comment";

const CommentsPopup = ({ fetchRoute, setDisplay, type }) => {
  const [comments, setComments] = useState([]);
  const { farmer } = useContext(SessionContext);
  const [loading, setLoading] = useState(true);

  const commentsEndRef = useRef(null);
  console.log(fetchRoute);

  const showContainer = () => {
    axios
      .get(`${fetchRoute}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error fetching farmers");
      })
      .finally(() => setLoading(false));
  };

  const toggle = () => {
    setDisplay(false);
  };

  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  useEffect(() => {
    showContainer();
  }, [farmer, comments]);

  const handlePostComment = (e) => {
    e.preventDefault();
    let message = e.target.elements["commentMessage"].value;
    message = message.trim();
    if (!message) {
      return;
    }
    axios
      .patch(`${fetchRoute}`, { content: message })
      .then((response) => {
        console.log(response);
        setComments([...comments, response.data]);
        e.target.elements["commentMessage"].value = "";
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error posting comment");
      });
  };

  return (
    <ContainerWrapper>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Container $count={comments?.length || 0}>
            <div className="header">
              <h3>{comments.length} Comments</h3>
              <Cross onClick={toggle}>
                <FontAwesomeIcon name="fa-solid fa-x" />
              </Cross>
            </div>

            {comments &&
              comments.map((comment, index) => (
                <div>
                  <Comment
                    fetchRoute={fetchRoute}
                    comment={comment}
                    key={index}
                  />
                </div>
              ))}
            <div ref={commentsEndRef} />
            <WriteComment onSubmit={handlePostComment}>
              <input
                name="commentMessage"
                type="text"
                placeholder="Write a comment"
              />
              <button type="submit">Send</button>
            </WriteComment>
          </Container>
        </>
      )}
    </ContainerWrapper>
  );
};

export default CommentsPopup;

const ContainerWrapper = styled.div`
  width: 600px;
  height: 100vh;
  background-color: rgba(18, 8, 8, 0.1);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;
  @media (max-width: 600px) {
    padding-bottom: 7rem;
    width: 100%;
  }
`;

const Container = styled.div`
  position: relative;
  background-color: #fff;
  height: ${(props) => props.$count * 55 + 150}px;
  // height:500px;
  min-height: 110px;
  max-height: 80vh;
  overflow-y: auto;
  width: 450px;
  border-radius: 1rem;
  /* padding-top: 1rem; */
  margin: 10rem 2rem;

  .header {
    position: sticky;
    padding-top: 1rem;
    top: 0;
    background-color: #fff;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    color: #5a5a5a;
  }
  @media (max-width: 600px) {
    width: 95%;
    margin: 0;
    max-height: 70vh;
    h3 {
      font-size: 1.7rem;
    }
  }
`;
const Cross = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 0.8rem;
  cursor: pointer;
`;
const WriteComment = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border-top: 1px solid #dadada;

  position: sticky;
  bottom: 0;

  input {
    font-size: 1.2em;
    background-color: #eee;
    width: 80%;
    height: 40px;
    padding: 5px;
    border: none;
    border-radius: 5px;
    outline: none;
  }
  button {
    padding: 10px 20px;
    font-size: 1.2rem;
    background-color: #ae2328;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;
