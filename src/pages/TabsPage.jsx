import { useState } from "react";
import { Tab } from "@headlessui/react";
import { tabItems } from "../constants";
import Data from "../components/tabs/Data";
import Taxonomy from "../components/tabs/Taxonomy";
import Instructions from "../components/tabs/Instructions";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTab } from "../store/slice/layoutSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const { selectedTab } = useSelector((state) => state.layout);
  const dispatch = useDispatch();
  const findTabIndexByName = (name) => {
    return tabItems.findIndex((tab) => tab === name);
  };

  const handleTabChange = (index) => {
    const selectedTab = tabItems[index];
    dispatch(setSelectedTab(selectedTab));
  };

  return (
    <div className="w-full px-2 py-16 sm:px-0">
      <Tab.Group
        defaultIndex={findTabIndexByName(selectedTab)}
        onChange={(index) => handleTabChange(index)}
      >
        <Tab.List className="flex max-w-md gap-2 rounded-xl">
          {tabItems.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-t-[15px] py-2.5 paragraph-regular focus:outline-none ",
                  category === selectedTab
                    ? "primary-background"
                    : "bg-gray-200"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className=" primary-border-color w-full h-full">
          {tabItems.map((category) => (
            <Tab.Panel key={category}>
              {selectedTab === "Data" ? (
                <Data />
              ) : selectedTab === "Taxonomy" ? (
                <Taxonomy />
              ) : selectedTab === "Instructions" ? (
                <Instructions />
              ) : (
                ""
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
