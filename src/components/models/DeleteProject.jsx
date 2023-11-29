import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../store/services/authService";
import {
  useDeleteProjectMutation,
  useDeleteSessionMutation,
} from "../../store/services/projectService";
import { setProjectAdded } from "../../store/slice/layoutSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function DeleteProject({
  isOpen,
  handleOpen,
  handleOptions,
  setIsOpenDeleteModel,
  id,
}) {
  console.log(id, "89090");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [projectDeleted, setProjectDeleted] = useState(false);
  const [sessionDeleted, setSessionDeleted] = useState(false);

  const { deleteProjectId, deleteSessionId, sessionId, sidebarProjectsList } =
    useSelector((state) => state.project);
  const [deleteProject, { data, isSuccess, isError }] =
    useDeleteProjectMutation();

  const [
    deleteSession,
    { data: sessionData, isSuccess: sessionIsSuccess, isError: sessionIsError },
  ] = useDeleteSessionMutation();

  console.log(sessionIsSuccess, isSuccess, "sessionIsSuccess");

  useEffect(() => {
    if (isSuccess && projectDeleted) {
      const projectToDelete = sidebarProjectsList.find(
        (item) => item.id === deleteProjectId
      );
      if (projectToDelete) {
        const check = projectToDelete.session.some((sess) => sess.id === id);
        console.log(check, "checkooo");
        navigate("/");
      }

      toast.success("Successfully Deleted Project");
      dispatch(setProjectAdded());
      return;
    }
    if (sessionIsSuccess && sessionDeleted) {
      console.log(Number(id), Number(deleteSessionId), "asdasdasdasd");
      if (Number(sessionId) === Number(deleteSessionId)) {
        navigate("/");
      }
      toast.success("Successfully Deleted Session");
      dispatch(setProjectAdded());
      return;
    }
  }, [isSuccess, sessionIsSuccess]);

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
                    className="text-lg font-medium leading-6 text-gray-900 mb-10"
                  >
                    Are you sure you want to delete?
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
                          setSessionDeleted(false);
                          setProjectDeleted(true);
                          setIsOpenDeleteModel(false);
                        } else if (deleteSessionId) {
                          deleteSession(deleteSessionId);
                          setIsOpenDeleteModel(false);
                          setSessionDeleted(true);
                          setProjectDeleted(false);
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
