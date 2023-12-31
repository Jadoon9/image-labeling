import React, { Fragment, useEffect, useState } from "react";
import Avatar from "../assets/avatar.jpg";
import { Disclosure, Switch } from "@headlessui/react";

import { CiSearch } from "react-icons/ci";
import { BsChevronDown } from "react-icons/bs";
import { BsSun, BsFillCloudDownloadFill } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import {
  addSessionId,
  addSidebarProjectList,
  deleteProject,
  deleteSession,
} from "../store/slice/projectSlice";
import Papa from "papaparse";
import CreateSession from "./models/CreateSubject";
import { baseUrl } from "../store/services/authService";
import { AiTwotoneDelete } from "react-icons/ai";
import { setOpenInfo, setSelectedTab } from "../store/slice/layoutSlice";
import NotesInfo from "./models/NotesInfo";
import DeleteProject from "./models/DeleteProject";
import { useGetProjectsListQuery } from "../store/services/projectService";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [csvId, setCsvId] = useState(null);
  const [apiCallCount, setApiCallCount] = useState(0);
  const [filter, setFilter] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const { projectAdded, selectedTab } = useSelector((state) => state.layout);
  const { sessionId } = useSelector((state) => state.project);
  const [enabled, setEnabled] = useState(false);
  const { sidebarProjectsList } = useSelector((state) => state.project);
  const [isOpenNotesMoadal, setIsOpenNotesModal] = useState(false);
  const [isOpenCreateSession, setIsOpenCreateSession] = useState(false);
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false);

  const { isLoading, isSuccess, isError, refetch, data } =
    useGetProjectsListQuery();

  useEffect(() => {
    console.log("data isSuccess && data", isSuccess && data);
    if (isSuccess && data) {
      console.log("data", data);
      dispatch(addSidebarProjectList(data));
    }
  }, [isSuccess, data]);

  useEffect(() => {
    refetch();
  }, [projectAdded]);

  // useEffect(() => {
  //   const getSidebarProjects = async () => {
  //     try {
  //       const response = await fetch(`${baseUrl}/project/`);

  //       // Check if the response status is OK (status code 200-299)
  //       if (!response.ok) {
  //         throw new Error(
  //           `Network response was not ok, status: ${response.status}`
  //         );
  //       }

  //       // Parse the response JSON
  //       const data = await response.json();
  //       console.log(data, "checkdata");
  //       if (data) {
  //         dispatch(addSidebarProjectList(data));
  //       }
  //     } catch (error) {
  //       // Handle errors during the fetch operation
  //       console.error("Error during fetch:", error.message);
  //     }
  //   };
  //   getSidebarProjects();
  // }, [projectAdded]);

  // const {
  //   isLoading: csvIsLoading,
  //   isSuccess: cvIsSuccess,
  //   data: csvData,
  //   status,
  //   error,
  // } = useGetCsvQuery(csvId, {
  //   refetchOnMountOrArgChange: true,
  //   skip: !csvId,
  // });

  useEffect(() => {
    const getCsv = async (id) => {
      try {
        const response = await fetch(`${baseUrl}/export_data/${id}/`);

        // Check if the response status is OK (status code 200-299)
        if (!response.ok) {
          throw new Error(
            `Network response was not ok, status: ${response.status}`
          );
        }

        // Parse the response JSON
        const data = await response.json();
        if (data) {
          const parsedData = Papa.parse(data.csv_text, {
            header: true,
            skipEmptyLines: true,
          }).data;
          const csv = Papa.unparse(parsedData);
          const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "data.csv");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } catch (error) {
        // Handle errors during the fetch operation
        console.error("Error during fetch:", error.message);
      }
    };
    // Check if csvId has changed or if the component is initially mounted
    if (csvId !== null && (isClicked || csvId !== sessionId)) {
      getCsv(csvId);
      // Increment the API call count only when csvId changes
      setIsClicked(false);
    }
  }, [csvId, isClicked, apiCallCount]);

  const handleDeleteProject = (e, id) => {
    e.stopPropagation();
    dispatch(deleteProject(id));
    setIsOpenDeleteModel(true);
  };
  const handleDeleteSession = (e, id) => {
    e.stopPropagation();
    dispatch(deleteSession(id));
    setIsOpenDeleteModel(true);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleNotesOpen = () => {
    setIsOpenNotesModal(!isOpenNotesMoadal);
  };
  const handleCreateSession = () => {
    setIsOpenCreateSession(!isOpenCreateSession);
  };

  return (
    <>
      <CreateSession
        isOpen={isOpenCreateSession}
        handleOpen={handleCreateSession}
        refetch={refetch}
      />
      <NotesInfo isOpen={isOpenNotesMoadal} handleOpen={handleNotesOpen} />
      <DeleteProject
        isOpen={isOpenDeleteModel}
        handleOpen={() => setIsOpenDeleteModel(!isOpenDeleteModel)}
        setIsOpenDeleteModel={setIsOpenDeleteModel}
        refetch={refetch}
      />
      <section className="custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto p-4 pt-20  lg:w-[230px] max-md:hidden">
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex gap-2">
            <img src={Avatar} alt="avatar" className="w-10 h-10" />
            <div className="flex flex-col">
              <p className="paragraph-regular">Name</p>
              <p className="body-light">Username</p>
            </div>
          </div>
          <div class="flex gap-1 rounded-[16px] items-center border secondary-background p-2">
            <CiSearch />
            <input
              class="outline-none py-2 body-regular focus:outline-none secondary-background"
              type="text"
              placeholder="Search..."
              value={filter}
              onChange={handleFilter}
            />
          </div>
          {/* =============================== */}
          <div className=" flex flex-col flex-1 gap-3">
            <div className="mt-10">
              <h3 className="h3-bold">Projects</h3>
              <p
                className="body-regular cursor-pointer"
                onClick={() => navigate("/")}
              >
                Create New Project +
              </p>
            </div>
            {sidebarProjectsList
              ?.filter(
                (item) =>
                  item.project_name
                    .toLowerCase()
                    .includes(filter.toLowerCase()) ||
                  item.session.some((sess) =>
                    sess.session_name
                      .toLowerCase()
                      .includes(filter.toLowerCase())
                  )
              )
              .map?.((item, idx) => {
                console.log(item, "checkitem");
                return (
                  <>
                    <Disclosure key={idx}>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex flex-between w-full justify-between rounded-[16px]  secondary-background px-4 py-2 text-left text-sm font-medium focus:outline-none h-[56px]">
                            <span className="body-medium">
                              {item?.project_name}
                            </span>
                            <div className="flex justify-between gap-3">
                              <BsInfoCircle
                                className=" h-4 w-4"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dispatch(
                                    setOpenInfo(item?.session?.[0]?.notes)
                                  );
                                  setIsOpenNotesModal(!isOpenNotesMoadal);
                                }}
                              />
                              <AiTwotoneDelete
                                className=" h-4 w-4 text-red-400"
                                onClick={(e) => handleDeleteProject(e, item.id)}
                              />
                              <BsChevronDown
                                className={`${
                                  open ? "rotate-180 transform" : ""
                                } h-4 w-4 `}
                              />
                            </div>
                          </Disclosure.Button>

                          <Disclosure.Panel className="px-4 pt-4 pb-2 body-regular">
                            <p
                              className="cursor-pointer text-[#4444F4] px-2 py-2"
                              onClick={() => {
                                dispatch(addSessionId(item?.session[0]?.id));
                                setIsOpenCreateSession(true);
                                // setIsOpen(true);
                              }}
                            >
                              Create a Session +
                            </p>
                            {/* <p
                            className="cursor-pointer flex items-center justify-between gap-2"
                            onClick={() =>
                              navigate(
                                `/person/${item.session[0]?.session[0]?.id}`
                              )
                            }
                          >
                            {item?.project_name}
                            <BsFillCloudDownloadFill
                              onClick={(e) => {
                                e.stopPropagation();
                                setCsvId(item.id);
                              }}
                            />
                          </p> */}

                            {item.session.map((sess) => (
                              <p
                                key={sess.id}
                                className={`${
                                  sess.id === selectedTab
                                    ? "bg-[#9f7aea] text-white"
                                    : ""
                                } cursor-pointer flex items-center justify-between mt-2 py-2 px-2 rounded-lg`}
                                onClick={() => {
                                  dispatch(setSelectedTab(sess.id));
                                  dispatch(addSessionId(sess.id));
                                  navigate(`/person/${sess.id}`);
                                }}
                                style={{
                                  transition: "background-color 0.3s",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "#b091ee";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = "";
                                }}
                              >
                                {console.log(sess, "suib7877")}
                                {`${sess.session_name}`}
                                <div className="flex justify-between items-center gap-2">
                                  <AiTwotoneDelete
                                    className=" h-4 w-4 text-red-400"
                                    onClick={(e) =>
                                      handleDeleteSession(e, sess.id)
                                    }
                                  />
                                  <BsFillCloudDownloadFill
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setCsvId(sess.id);
                                      setIsClicked(!isClicked);
                                    }}
                                  />
                                </div>
                              </p>
                            ))}
                            {/* {item?.session[0]?.session?.map?.((item) => (
                            <p className="cursor-pointer flex items-center justify-between gap-5">
                              {`${item.session_name}`}
                              <BsFillCloudDownloadFill
                                onClick={(e) => handleCsv(e, item.id)}
                              />
                            </p>
                          ))} */}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </>
                );
              })}
          </div>

          {/* =============================== */}

          <div className="mt-5 flex-column gap-5 align-middle justify-center">
            <div className="flex align-middle gap-5 cursor-pointer">
              <TbLogout />
              <p className="body-regular ">Logout</p>
            </div>
            <div className="flex align-middle gap-5 mt-10 cursor-pointer">
              <BsSun />
              <p className="body-regular flex-1">Light Mode</p>

              <Switch.Group>
                <div className="flex items-center">
                  <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={`${
                      enabled ? "primary-background" : ""
                    } relative inline-flex h-6 w-11 primary-border-color items-center rounded-full transition-colors focus:outline-none `}
                  >
                    <span
                      className={`${
                        enabled ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-black transition-transform`}
                    />
                  </Switch>
                </div>
              </Switch.Group>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
