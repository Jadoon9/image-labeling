import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../store/services/authService";
import {
  useDeleteProjectMutation,
  useDeleteSessionMutation,
} from "../../store/services/projectService";
import {
  setAddedSession,
  setProjectAdded,
} from "../../store/slice/layoutSlice";

export default function DeleteProject({
  isOpen,
  handleOpen,
  handleOptions,
  setIsOpenDeleteModel,
}) {
  const dispatch = useDispatch();
  const { deleteProjectId, deleteSessionId } = useSelector(
    (state) => state.project
  );
  const [deleteProject, { data, isSuccess, isError }] =
    useDeleteProjectMutation();
  const [deleteSession, { sessionData, sessionIsSuccess, sessionIsError }] =
    useDeleteSessionMutation();

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleOpen}>
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
                    className="text-lg font-medium leading-6 text-gray-900 mb-10"
                  >
                    Are You sure you want to delete?
                  </Dialog.Title>
                  <div className="flex justify-between gap-4">
                    <Button btnText="Cancel" onClick={handleOpen} />
                    <Button
                      btnText="Delete"
                      className="bg-rose-700 text-white"
                      nobg
                      onClick={() => {
                        if (deleteProjectId) {
                          deleteProject(deleteProjectId);
                          setIsOpenDeleteModel(false);
                          dispatch(setProjectAdded());
                        } else if (deleteSessionId) {
                          deleteSession(deleteSessionId);
                          setIsOpenDeleteModel(false);
                          dispatch(setAddedSession());
                        }
                      }}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
