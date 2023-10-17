import React from "react";
import CheckBox from "../CheckBox";
import BackButton from "../BackButton";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { instructionsSchema } from "../../utils/validations";
import Textarea from "../Textarea";

const Instructions = () => {
  const navigate = useNavigate();

  return (
    <>
      <Formik
        initialValues={{
          notes: "",
          randomizeCases: false,
          randomizeCat: false,
        }}
        validationSchema={instructionsSchema}
        onSubmit={(values) => {
          console.log(values, "valuess");
        }}
      >
        {() => (
          <Form>
            <div className="p-5 flex flex-col justify-between h-screen">
              <label htmlFor="" className="body-light text-[#4F4F4F]">
                Instruction notes
              </label>
              <Textarea name="notes" />
              <div className="mt-10 flex flex-col gap-4 ">
                <CheckBox
                  text="Randomize Cases"
                  id="randomCase"
                  name="randomizeCases"
                />
                <CheckBox
                  text="Randomize Categories"
                  id="randomCategory"
                  name="randomizeCat"
                />
              </div>

              <div className="flex-between relative bottom-0 mt-40">
                <BackButton />
                <div className="w-32">
                  <Button
                    type="button"
                    btnText="Finish"
                    icon
                    onClick={() => navigate("/person")}
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Instructions;
