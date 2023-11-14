import React, { Fragment, useEffect, useState } from "react";
import { sidebarItems } from "../constants";
import Avatar from "../assets/avatar.jpg";
import { Dialog, Disclosure, Switch, Transition } from "@headlessui/react";

import { CiSearch } from "react-icons/ci";
import { BsChevronDown } from "react-icons/bs";
import { BsSun, BsFillCloudDownloadFill } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  useAddSessionMutation,
  useGetCsvQuery,
  useGetProjectsListQuery,
} from "../store/services/projectService";
import { useDispatch, useSelector } from "react-redux";
import {
  addSessionId,
  addSidebarProjectList,
} from "../store/slice/projectSlice";
import Papa from "papaparse";
import CreateSession from "./models/CreateSubject";

const Sidebar = ({ sidebarOpen, setSidebarOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [csvId, setCsvId] = useState(null);
  const { isLoading, isSuccess, isError, refetch, data } =
    useGetProjectsListQuery(null, {
      refetchOnMountOrArgChange: true,
    });

  const {
    isLoading: csvIsLoading,
    isSuccess: cvIsSuccess,
    data: csvData,
    status,
    error,
  } = useGetCsvQuery(csvId, {
    refetchOnMountOrArgChange: true,
    skip: !csvId,
  });

  const [enabled, setEnabled] = useState(false);
  const { sidebarProjectsList } = useSelector((state) => state.project);

  useEffect(() => {
    console.log(cvIsSuccess, csvData, "asdadasd");
    if (cvIsSuccess) {
      const parsedData = Papa.parse(csvData.csv_text, {
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
  }, [cvIsSuccess, error, csvId]);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(addSidebarProjectList(data));
    }
  }, [isSuccess, data]);

  console.log(addSidebarProjectList, "hgjhgg");
  return (
    <>
      {/* Mobile Sidebar */}

      {/* Desktop */}
      <section className="custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto p-4 pt-20  lg:w-[230px] max-md:hidden">
        <div className="flex flex-1 flex-col  gap-6">
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
            {sidebarProjectsList?.map?.((item, idx) => {
              return (
                <>
                  <Disclosure key={idx}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex flex-between w-full justify-between rounded-[16px]  secondary-background px-4 py-2 text-left text-sm font-medium focus:outline-none h-[56px]">
                          <span className="body-medium">
                            {item?.project_name}
                          </span>
                          <BsChevronDown
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-4 w-4 `}
                          />
                        </Disclosure.Button>

                        <Disclosure.Panel className="px-4 pt-4 pb-2 body-regular">
                          <p
                            className="cursor-pointer text-[#4444F4]"
                            onClick={() => {
                              dispatch(
                                addSessionId(item.session[0]?.session[0]?.id)
                              );
                              setIsOpen(true);
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

                          {item?.session?.map?.((item) =>
                            item.session.map((sess) => (
                              <p
                                className="cursor-pointer flex items-center justify-between gap-5"
                                onClick={() => navigate(`/person/${sess.id}`)}
                              >
                                {`${sess.session_name}`}
                                <BsFillCloudDownloadFill
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCsvId(sess.id);
                                  }}
                                />
                              </p>
                            ))
                          )}
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
