import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import "@fortawesome/fontawesome-free/css/all.min.css";
import backgroundImage from "../assets/signinimg.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import { SessionContext } from "../context/Contexts";
import { ToastContainer, toast } from "react-toastify";

const Signin = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState(""); // State to store login error message

  const { setCheckout } = useContext(SessionContext);
  //navigate to home page if user is already logged in
  useEffect(() => {
    setLoading(true);
    axios
    .get("/api/verify")
    .then((response) => {
      setLoading(false);
      if (response.data.isLoggedIn) {
          toast.info("Farmer already loggedIn");
          navigate("/home");
          setCheckout((prev) => !prev); // to refresh the sessionContextProvider
        }
      })
      .catch((error) => {
        toast.error("Internal server error");
        setLoading(false);
      });
  }, [navigate]);

  //submitting the form
  const onSubmit = async (data) => {
    // console.log(data);
    try {
      // console.log("trying to send data");
      const response = await axios.post("api/farmers/login", data);

      // console.log("Login Success:", response);
      if (!response.data.message) {
        // console.log(response.message);
        const temp = setTimeout(() => {
          toast.success("Farmer loggedIn 🎉")
        }, 500)
        navigate("/home");
        setCheckout((prev) => !prev); // to refresh the sessionContextProvider
      } else {
        console.log(response);
        toast.error("Invalid credentials!");
        setLoginError(response.data.message); // Set login error message
      }
    } catch (error) {
      toast.error("Invalid credentials!");
      setLoginError(error.response.data.message); // Set login error message for any error
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <ToastContainer />
      <ImageSection />
      <FormSection>
        <FormWrapper>
          <div className="logo-div">
            <Logo src="./src\assets\shop.jpg" alt="Logo" />
            <h1>sneat</h1>
          </div>
          <Title>Welcome to Sneat! 👋</Title>
          <Subtitle>
            Please sign-in to your account and start the adventure
          </Subtitle>
          {/* {loginError && <ErrorMessage>{loginError}</ErrorMessage>}{" "} */}
          {/* Display login error message */}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
              required
            />
            <Input
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
              required
            />
            <CheckboxWrapper>
              <label>
                <Checkbox type="checkbox" />
                Remember Me
              </label>
              <a>Forgot Password?</a>
            </CheckboxWrapper>
            <Button type="submit">SIGN IN</Button>
            <TextLink>
              New on our platform? <Link to={"/signup"}>Create an account</Link>
            </TextLink>
          </Form>
          <Divider>or</Divider>
          <SocialIcons>
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-github"></i>
            </a>
            <a href="#">
              <i className="fab fa-google"></i>
            </a>
          </SocialIcons>
        </FormWrapper>
      </FormSection>
    </Container>
  );
};

export default Signin;

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const ImageSection = styled.div`
  flex: 1;
  background: url(${backgroundImage}) no-repeat center center;
  background-size: cover;
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f8f9fa;
  a {
    cursor: pointer;
    color: #6366f1;
    text-decoration: none;
  }
`;

const FormWrapper = styled.div`
  max-width: 400px;
  width: 100%;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  .logo-div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    img {
      height: 40px;
      margin-right: 0.5rem;
    }
    h1 {
      font-size: rem;
      color: #333;
    }
  }
`;

const Logo = styled.img`
  height: 40px;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  margin-bottom: 0.5rem;
  color: #333;
`;

const Subtitle = styled.p`
  margin-bottom: 1.5rem;
  color: #777;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
  color: #777;
  /* a{
    cursor: pointer;
    color: #6366F1;
    text-decoration: none;
  } */
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #6366f1;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4f46e5;
  }
`;

const TextLink = styled.p`
  color: #777;
  margin-top: 1rem;
  display: inline-block;

  /* a{
    cursor: pointer;
    color: #6366F1;
    text-decoration: none;
  } */
`;

const Divider = styled.div`
  width: 100%;
  margin: 1.5rem 0;
  display: flex;
  align-items: center;
  text-align: center;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #ccc;
  }

  &::before {
    margin-right: 0.5em;
  }

  &::after {
    margin-left: 0.5em;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  a {
    color: #6366f1;
    font-size: 1.5rem;
  }
`;
