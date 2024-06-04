import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.min.css';
import backgroundImage from '../assets/signupimg.png';
import logoImg from '../assets/react.svg';


const Signin = ({changePerson}) => {
  const { register, handleSubmit } = useForm();
  
  const onSubmit = async (data) => {
    console.log(data);
    try {
      console.log("trying to send data");
      const response = await fetch("api/farmers/", {
        method: "POST",
        headers: {
          "Content-type" : "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log("Success:", result);
    }
    catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Container>
      <ImageSection />
      <FormSection>
        <FormWrapper>
          <div className='logo-div'>
              <h1>SignUp</h1>
              <h1>SignUp</h1>
          </div>
          <Title>Adventure starts here 🚀</Title>
          <Subtitle>Make your app management easy and fun!</Subtitle>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input {...register("username", { required: true })} type="text" placeholder="Username" required />
            
            <Input {...register("email", { required: true })} type="email" placeholder="Email" required />
            
            <Input {...register("password", { required: true })} type="password" placeholder="Password" required />

            <Input {...register("age", { required: true })} type="number" placeholder="Age" required />

            <Input {...register("location", { required: true })} type="text" placeholder="Location" required />

            <Input {...register("age", { required: true })} type="number" placeholder="Age" required />

            <Input {...register("location", { required: true })} type="text" placeholder="Location" required />

            <CheckboxWrapper>
              <label>
                <Checkbox type="checkbox" required />
                <a href=""> I agree to privacy policy & terms</a>
              </label>

            </CheckboxWrapper>
            <Button type="submit">SIGN UP</Button>
            
            <TextLink>
                Already have an account? <a onClick={changePerson}>Sign in instead</a>
            </TextLink>
          </Form>
          <Divider>or</Divider>
          <SocialIcons>
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-github"></i></a>
            <a href="#"><i className="fab fa-google"></i></a>
          </SocialIcons>
        </FormWrapper>
      </FormSection>
    </Container>
  );
};

export default Signin;





const Container = styled.div`
  display: flex;
  // height: 100vh;
  // height: 100vh;
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
  a{
    cursor: pointer;
    color: #6366F1;
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
  .logo-div{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    img{
      height: 40px;
      margin-right: 0.5rem;
    }
    h1{
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
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #6366F1;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4F46E5;
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

  &::before, &::after {
    content: '';
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
    color: #6366F1;
    font-size: 1.5rem;
  }
`;
