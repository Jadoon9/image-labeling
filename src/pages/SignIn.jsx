import React from "react";
import bgImage from "../assets/loginbg.svg";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate("/");
  };
  return (
    <div
      class="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex flex-col bg-white justify-between custom-shadow h-[500px] w-[640px] p-10 rounded-[16px] ">
        <h2 className="h2-bold">Sign In to your account</h2>
        <Input type="text" placeholder="test" label="Email" />
        <Input type="password" placeholder="password" label="Password" />
        <p className="body-regular  primary-color ">Forgot Password?</p>
        <Button btnText="SIGN IN" onClick={handleSignIn} />
      </div>
    </div>
  );
};

export default SignIn;
