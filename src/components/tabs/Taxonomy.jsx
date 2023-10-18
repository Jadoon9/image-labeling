import React from "react";
import Input from "../Input";
import NumberInput from "../NumberInput";
import DropDown from "../DropDown";
import { drpItems } from "../../constants";
import BackButton from "../BackButton";
import Button from "../Button";
import { HiOutlineFolder } from "react-icons/hi2";
import { Form, Formik } from "formik";
import { taxonomySchema } from "../../utils/validations";
import Checkbox from "../CheckBox";

const Taxonomy = () => {
  return (
    <>
      <Formik
        initialValues={{
          projectName: "",
          options: "",
          question: "",
          referenceClass: "",
          label: "",
          evaluationPageLayout: "",
          selectOptions: "",
        }}
        validationSchema={taxonomySchema}
        onSubmit={(values) => {
          console.log(values, "valuess");
        }}
      >
        {() => (
          <Form>
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <div className="p-5 flex-between flex-wrap gap-5 w-full">
                  <div className="flex justify-between align-top  flex-wrap w-full ">
                    <div className="w-full md:w-[49%]">
                      <Input label="Project Name" name="projectName" />
                    </div>
                    <div className=" flex flex-col align-center justify-center w-full md:w-[49%]">
                      <DropDown
                        options={drpItems}
                        label="Options"
                        name="options"
                      />
                      <p className="body-light mt-1">Add another option +</p>
                    </div>
                  </div>

                  <div className="flex justify-between align-top flex-wrap w-full">
                    <div className="w-full   md:w-[49%]">
                      <Input label="Question" name="question" />
                    </div>
                    <div className="w-full md:w-[49%]">
                      <DropDown
                        options={drpItems}
                        label="Reference Class"
                        name="referenceClass"
                        icon={
                          <HiOutlineFolder
                            className=" h-5 w-5 text-right text-secondary-500 "
                            aria-hidden="true"
                          />
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-between align-top  flex-wrap  w-full">
                    <div className="w-full md:w-[49%] ">
                      <Input label="Label" name="label" />
                      <p className="body-light mt-1">Add another option +</p>
                    </div>
                  </div>
                  <div className="flex justify-between align-top  w-full  md:w-[49%] gap-2">
                    <div className="w-full md:w-[49%] ">
                      <NumberInput
                        label="Evaluation Page Layout"
                        name="evaluationPageLayout"
                      />
                    </div>
                    <div className=" md:w-[49%] w-full ">
                      <NumberInput name="evaluationPageLayout" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-10 px-5  w-1/2">
                  <div className="w-1/3"></div>
                  <div className="w-2/3 flex gap-2 ">
                    <div className="w-1/2">
                      <DropDown
                        options={drpItems}
                        name="referenceClass"
                        placeholder="Cat 1"
                        icon={
                          <HiOutlineFolder
                            className=" h-5 w-5 text-right text-secondary-500 "
                            aria-hidden="true"
                          />
                        }
                      />
                    </div>
                    <div className="w-1/2">
                      <DropDown
                        options={drpItems}
                        name="referenceClass"
                        placeholder="Cat 2"
                        icon={
                          <HiOutlineFolder
                            className=" h-5 w-5 text-right text-secondary-500 "
                            aria-hidden="true"
                          />
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-10 px-5 w-1/2 mt-4">
                  <div className="w-1/3 ">
                    <div className="w-full">
                      <DropDown
                        options={drpItems}
                        name="referenceClass"
                        placeholder="Type 1"
                        icon={
                          <HiOutlineFolder
                            className=" h-5 w-5 text-right text-secondary-500 "
                            aria-hidden="true"
                          />
                        }
                      />
                    </div>
                  </div>
                  <div className="w-2/3 flex gap-2 ">
                    <Checkbox />
                    <Checkbox />
                  </div>
                </div>

                <div className="flex gap-10 px-5 w-1/2 mt-4">
                  <div className="w-1/3">
                    <div className="w-full">
                      <DropDown
                        options={drpItems}
                        name="referenceClass"
                        placeholder="Type 2"
                        icon={
                          <HiOutlineFolder
                            className=" h-5 w-5 text-right text-secondary-500 "
                            aria-hidden="true"
                          />
                        }
                      />
                    </div>
                  </div>
                  <div className="w-2/3 flex gap-2 ">
                    <Checkbox />
                    <Checkbox />
                  </div>
                </div>

                <div className="flex gap-10 px-5 w-1/2 mt-4">
                  <div className="w-1/3 ">
                    <div className="w-full">
                      <DropDown
                        options={drpItems}
                        name="referenceClass"
                        placeholder="Type 3"
                        icon={
                          <HiOutlineFolder
                            className=" h-5 w-5 text-right text-secondary-500 "
                            aria-hidden="true"
                          />
                        }
                      />
                    </div>
                  </div>
                  <div className="w-2/3 flex gap-2 "></div>
                </div>
              </div>

              <div className="flex-between relative bottom-0 mt-auto p-5">
                <BackButton />
                <div className="w-32">
                  <Button type="button" btnText="Next" icon />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Taxonomy;
