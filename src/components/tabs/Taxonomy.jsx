import React, { useState } from "react";
import Input from "../Input";
import NumberInput from "../NumberInput";
import DropDown from "../DropDown";
import { drpItems } from "../../constants";
import BackButton from "../BackButton";
import Button from "../Button";
import { HiOutlineFolder } from "react-icons/hi2";
import { Form, Formik } from "formik";
import { taxonomySchema } from "../../utils/validations";
import CreateOption from "../models/CreateOption";
import CreateLabel from "../models/CreateLabel";
import DynamicTable from "../DynamicTable";
import { useSelector } from "react-redux";

const Taxonomy = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLabelModal, setIsOpenLabelModal] = useState(false);
  const { columns, rows } = useSelector((item) => item.layout);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleOpeLabeln = () => {
    setIsOpenLabelModal(!isOpenLabelModal);
  };

  return (
    <>
      <CreateOption isOpen={isOpen} handleOpen={handleOpen} />
      <CreateLabel isOpen={isOpenLabelModal} handleOpen={handleOpeLabeln} />
      <Formik
        initialValues={{
          projectName: "",
          options: "",
          question: "",
          referenceClass: "",
          label: "",
          rows: 0,
          columns: 0,
          cat1: "",
          cat2: "",
          type1: "",
          type2: "",
          type3: "",
        }}
        validationSchema={taxonomySchema}
        onSubmit={(values) => {
          console.log(values, "valuess");
        }}
      >
        {(data) => (
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
                      <p
                        className="body-light mt-1 cursor-pointer"
                        onClick={handleOpen}
                      >
                        Add another option +
                      </p>
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
                      <DropDown
                        options={drpItems}
                        label="Labels"
                        name="label"
                        icon={
                          <HiOutlineFolder
                            className=" h-5 w-5 text-right text-secondary-500 "
                            aria-hidden="true"
                          />
                        }
                      />
                      <p
                        className="body-light mt-1 cursor-pointer"
                        onClick={handleOpeLabeln}
                      >
                        Add Another label +
                      </p>
                    </div>
                  </div>

                  <div className="w-full flex-between  align-middle">
                    <div className="flex justify-between align-top  w-full  md:w-[49%] gap-2">
                      <div className="w-full md:w-[49%] ">
                        <NumberInput
                          label="Evaluation Page Layout"
                          name="rows"
                        />
                      </div>
                      <div className=" md:w-[49%] w-full ">
                        <NumberInput name="columns" />
                      </div>
                    </div>

                    {/* <div className="flex justify-between align-top  w-full  md:w-[49%] gap-2 mt-8">
                      <div className="w-full md:w-[49%] ">
                        <Button
                          btnText="Generate Grid"
                          onClick={generateGrid}
                        />
                      </div>
                    </div> */}
                  </div>
                </div>

                {/* <div className="flex gap-10 px-5  w-1/2">
                  <div className="w-1/3"></div>
                  <div className="w-2/3 flex gap-2 ">
                    <div className="w-1/2">
                      <DropDown
                        options={drpItems}
                        name="cat1"
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
                        name="cat2"
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
                </div> */}

                {/* <div className="flex gap-10 px-5 w-1/2 mt-4">
                  <div className="w-1/3 ">
                    <div className="w-full">
                      <DropDown
                        options={drpItems}
                        name="type1"
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
                        name="type2"
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
                        name="type3"
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
                </div> */}
              </div>

              <div className="w-full p-5">
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-collapse border-gray-200">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border body-light border-gray-200">
                          {/* Empty header for the first column */}
                        </th>
                        {/* Header cells for other columns */}
                        {Array.from(
                          { length: data.values.columns },
                          (_, colIndex) => (
                            <th
                              key={colIndex}
                              className="py-2 px-4 border body-light border-gray-200"
                            >
                              <DropDown
                                name={`headerItem${colIndex}`}
                                options={drpItems}
                              />
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from(
                        { length: data.values.rows },
                        (_, rowIndex) => (
                          <tr key={rowIndex}>
                            {/* First cell with dropdown in the first column */}
                            <td className="py-1 px-4 border body-light border-gray-200">
                              <DropDown
                                name={`item${rowIndex + 1}`}
                                options={drpItems}
                              />
                            </td>
                            {/* Data cells for other columns */}
                            {Array.from(
                              { length: data.values.columns },
                              (_, colIndex) => (
                                <td
                                  key={colIndex}
                                  className={`py-1 px-4 border primary-background body-light border-gray-200 ${
                                    colIndex === 0 ? "empty-cell" : "" // Apply a class for empty
                                  }`}
                                >
                                  {/* Input field for data cells */}
                                </td>
                              )
                            )}
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex-between relative bottom-0 mt-auto p-5">
                <BackButton />
                {/* <div className="w-32">
                  <Button type="button" btnText="Next" icon />
                </div> */}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Taxonomy;
