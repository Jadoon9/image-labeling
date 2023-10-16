import React from "react";
import bgImage from "../assets/loginbg.svg";
import Input from "../components/Input";
import Button from "../components/Button";
import { Form, Formik } from "formik";
import { loginValSchema } from "../utils/validations";
import { useDispatch } from "react-redux";
import { userLogin } from "../store/slice/authSlice";
import { useNavigate } from "react-router-dom";

const SignIn = ({ handleSignIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginValSchema}
        onSubmit={(values) => {
          console.log(values, "valuess");
          dispatch(userLogin());
          navigate("/");
        }}
      >
        {() => (
          <Form>
            <div className="flex flex-col bg-white justify-between custom-shadow h-[500px] w-[640px] p-10 rounded-[16px] ">
              <h2 className="h2-bold">Sign In to your account</h2>
              <Input
                type="text"
                placeholder="test"
                label="Email"
                name="email"
              />
              <Input
                type="password"
                placeholder="password"
                label="Password"
                name="password"
              />
              <p className="body-regular  primary-color cursor-pointer ">
                Forgot Password?
              </p>
              <Button type="submit" btnText="SIGN IN" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
