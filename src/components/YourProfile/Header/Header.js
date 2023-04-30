import React from "react";
import banner from "../../../images/banner.png";
import logo from "../../../images/logo.jpeg";
import { ShareIcon } from "@heroicons/react/24/solid";
import {
  ClipboardDocumentCheckIcon,
  EyeSlashIcon,
  FolderPlusIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

const Header = ({ profile }) => {
  const { firstName, lastName, userName, profilePic, coverPhoto } = profile;
  return (
    <div
      class="relative bg-white h-80 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl m-2 object-cover"
      style={{ backgroundImage: `url(data:image/png;base64,${coverPhoto})` }}
    >
      <div className="absolute inset-x-0 text-center lg:left-10 lg:text-left top-64">
        <img
          className="inline-block h-40 w-40 rounded-full ring-2 ring-white"
          src={`data:image/png;base64,${profilePic}`}
          alt=""
        />
      </div>
      <div class="absolute bottom-0 left-0 right-0 top-96 mt-10 text-center lg:left-60 lg:right-auto lg:top-80 lg:mt-5 lg:text-left">
        <p class="font-mono text-xl">{firstName + " " + lastName}</p>
        <p>
          <span class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500 mt-2">
            @{userName}
          </span>
        </p>
      </div>
      <div class="absolute bottom-0 top-96 mt-32 left-0 right-0 text-center lg:left-auto lg:top-80 lg:mt-5 lg:text-left pt-2">
        <button
          type="button"
          className="rounded-full bg-gray-800 p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 focus:ring-offset-blue p-1 mx-1"
        >
          <span className="sr-only">View notifications</span>
          <FolderPlusIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="rounded-full bg-gray-800 p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 focus:ring-offset-blue p-1 mx-1"
        >
          <span className="sr-only">View notifications</span>
          <ShareIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="rounded-full bg-gray-800 p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 focus:ring-offset-blue p-1 mx-1"
        >
          <span className="sr-only">View notifications</span>
          <ClipboardDocumentCheckIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="rounded-full bg-gray-800 p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 focus:ring-offset-blue p-1 mx-1"
        >
          <span className="sr-only">View notifications</span>
          <PencilSquareIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="rounded-full bg-gray-800 p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 focus:ring-offset-blue p-1 mx-1"
        >
          <span className="sr-only">View notifications</span>
          <EyeSlashIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default Header;
