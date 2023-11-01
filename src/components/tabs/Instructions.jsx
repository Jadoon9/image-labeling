import React from "react";
import CheckBox from "../CheckBox";
import BackButton from "../BackButton";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { instructionsSchema } from "../../utils/validations";
import Textarea from "../Textarea";
import { useDispatch, useSelector } from "react-redux";
import { addTaxonomyData } from "../../store/slice/layoutSlice";

const Instructions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { taxonomy } = useSelector((item) => item.layout);

  const handleChange = (name, value) => {
    dispatch(addTaxonomyData({ name, value }));
  };

  return (
    <>
      <Formik
      enableReinitialize={true}
        initialValues={{
          notes: taxonomy?.notes,
          randomizeCases: taxonomy?.randomizeCases,
          randomizeCat: taxonomy?.randomizeCat,
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
              <Textarea
                name="notes"
                rows={20}
                cols={40}
                valueHandler={handleChange}
              />
              <div className="mt-10 flex flex-col gap-4 ">
                <CheckBox
                  text="Randomize Cases"
                  id="randomCase"
                  name="randomizeCases"
                  valueHandler={handleChange}
                />
                <CheckBox
                  text="Randomize Categories"
                  id="randomCategory"
                  name="randomizeCat"
                  valueHandler={handleChange}
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
