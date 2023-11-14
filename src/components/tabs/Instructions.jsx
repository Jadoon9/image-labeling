import React, { useEffect } from "react";
import CheckBox from "../CheckBox";
import BackButton from "../BackButton";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { instructionsSchema } from "../../utils/validations";
import Textarea from "../Textarea";
import { useDispatch, useSelector } from "react-redux";
import {
  addTaxonomyData,
  resetTaxonomyData,
} from "../../store/slice/layoutSlice";
import { useCreateProjectMutation } from "../../store/services/projectService";
import { addProject } from "../../store/slice/projectSlice";
import Loader from "../Loader";
import { resetFolders } from "../../store/slice/foldersSlice";
import { toast } from "react-toastify";

const Instructions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createProject, { isLoading, isSuccess, isError, error, data }] =
    useCreateProjectMutation();
  const { taxonomy } = useSelector((item) => item.layout);
  const { foldersList } = useSelector((item) => item.folders);

  const handleChange = (name, value) => {
    dispatch(addTaxonomyData({ name, value }));
  };

  const transformedLabels = taxonomy?.label.map((item) => {
    return { value: item.value };
  });
  const transformedOptions = taxonomy?.options.map((item) => {
    return { value: item.value };
  });

  console.log(data, isSuccess, "chehce");

  useEffect(() => {
    if (isSuccess) {
      navigate(`/person/${data.session[0].id}`);
      toast.success("Project Created Successfully");
      dispatch(resetTaxonomyData());
      dispatch(resetFolders());
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, data, isError]);

  if (isLoading) {
    return <Loader />;
  }

  const uploadData = {
    rows_list: taxonomy?.rowlist,
    columns_list: taxonomy?.columnlist,
    case: [
      {
        labels: transformedLabels,
        options: transformedOptions,
        reference_folder: {
          reference_name: taxonomy?.referenceClass,
        },
        case_name: "test",
        notes: taxonomy?.notes,
        randomize_cases: taxonomy?.randomizeCases,
        randomize_categories: taxonomy?.randomizeCat,
        cols_number: taxonomy?.columns,
        rows_number: taxonomy?.rows,
      },
    ],
    zip_folder: foldersList?.result_lists?.zip_folder,
    project_name: taxonomy?.projectName,
    question: taxonomy?.question,
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
          createProject(uploadData);
        }}
      >
        {() => (
          <Form>
            <div className="p-5 flex flex-col justify-between h-full">
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

              <div className="flex-between relative bottom-0 mt-10">
                <BackButton />
                <div className="w-32">
                  <Button type="submit" btnText="Finish" icon />
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
