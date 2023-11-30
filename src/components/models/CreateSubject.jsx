import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import Input from "../Input";
import Button from "../Button";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addSession } from "../../store/slice/projectSlice";
import { useAddSessionMutation } from "../../store/services/projectService";
import { toast } from "react-toastify";
import { setProjectAdded } from "../../store/slice/layoutSlice";
import Loader from "../Loader";

export default function CreateSession({ isOpen, handleOpen, refetch }) {
  const dispatch = useDispatch();
  const { sessionId } = useSelector((state) => state.project);
  const [createProject, { isLoading, isSuccess, data }] =
    useAddSessionMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Session Created");
      refetch();
      dispatch(setProjectAdded());
    }
  }, [isSuccess, isLoading]);

  // if (isLoading) {
  //   return <Loader />;
  // }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={handleOpen}>
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
                    Enter Name of Session
                  </Dialog.Title>

                  <Formik
                    initialValues={{
                      sessionNamee: "",
                    }}
                    // validationSchema={taxonomySchema}
                    onSubmit={(values) => {
                      createProject({
                        session_id: sessionId,
                        session_name: values.sessionNamee,
                      });

                      handleOpen();
                    }}
                  >
                    {() => (
                      <Form>
                        <div className="flex flex-col gap-6 justify-center items-center mt-2">
                          <Input
                            label="Enter Name of Session"
                            name="sessionNamee"
                          />
                          <div className="w-1/2 ">
                            <Button btnText="Create Session" />
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
