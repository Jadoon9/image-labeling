import { useState } from "react";
import { Tab } from "@headlessui/react";
import { tabItems } from "../constants";
import Data from "../components/tabs/Data";
import Taxonomy from "../components/tabs/Taxonomy";
import Instructions from "../components/tabs/Instructions";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <div className="w-full px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex max-w-md gap-2 rounded-xl">
          {tabItems.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-t-[15px] py-2.5 paragraph-regular focus:outline-none ",
                  selected ? "primary-background" : "bg-gray-200"
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
              {category === "Data" ? (
                <Data />
              ) : category === "Taxonomy" ? (
                <Taxonomy />
              ) : category === "Instructions" ? (
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
