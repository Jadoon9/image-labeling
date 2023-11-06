import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Input from "../Input";
import Button from "../Button";
import { Form, Formik } from "formik";
import Checkbox from "../CheckBox";
import DropDown from "../DropDown";
import { drpItems } from "../../constants/index";
import Textarea from "../Textarea";
import NumberInput from "../NumberInput";

export default function CreateLabel({ isOpen, handleOpen, handleLabels }) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={handleOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create Label
                  </Dialog.Title>

                  <Formik
                    enableReinitialize={true}
                    initialValues={{
                      labelName: "",
                      numericalRange: false,
                      stringType: true,
                      maxVal: 0,
                      minVal: 0,
                    }}
                    // validationSchema={taxonomySchema}
                    onSubmit={(values) => {
                      console.log('v', values)
                      let data;
                      if (values.stringType) {
                        data = values.labelName;
                      } else if (values.numericalRange) {
                        data = `${values.minVal}-${values.maxVal}`;
                      }
                      handleLabels(data);
                      handleOpen();
                    }}
                  >
                    {({ values, setFieldValue }) => (
                      <Form>
                        <div className="flex flex-col gap-6 justify-center items-center mt-2">
                          <div className="flex w-full mt-2">
                            <Checkbox
                              id="numericalRange"
                              name="numericalRange"
                              handleHide={(value) => {
                                setFieldValue("stringType", value);
                              }}
                            />
                            <Checkbox
                              id="stringType"
                              name="stringType"
                              text="String"
                              handleHide={(value) => {
                                setFieldValue("numericalRange", value);
                              }}
                            />
                          </div>

                          {values.numericalRange && (
                            <>
                              {" "}
                              {/* <DropDown
                                name="maxVal"
                                options={drpItems}
                                placeholder="Max Value"
                              /> */}
                              <NumberInput name="minVal"  label="Min Value" />

                              <NumberInput name="maxVal" label="Max Value" />
                              {/* <DropDown
                                name="minVal"
                                options={drpItems}
                                placeholder="Min Value"
                              /> */}
                            </>
                          )}
                          {values.stringType && (
                            <>
                              <Textarea name="labelName" rows={2} cols={40} />
                            </>
                          )}

                          <div className="w-1/2 ">
                            <Button btnText="Create Label" />
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
