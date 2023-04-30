import React, { useEffect } from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { CheckIcon } from "@heroicons/react/24/solid";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import useAuth from "../../../hooks/useAuth";
import {
  CheckBadgeIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Alert } from "@mui/material";

const CompleteProfile = () => {
  const { user } = useAuth();

  const namesArray = user?.displayName?.split(" ");
  const firstname = namesArray[0];
  const lastname = namesArray[namesArray.length - 1];

  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const [avatar, setAvatar] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const [tempAvatar, setTempAvatar] = useState(null);
  const [tempCoverPhoto, setTempCoverPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  //

  useEffect(() => {
    const imageUrl = user.photoURL;
    if (user.photoURL && tempAvatar == null) {
      fetch(imageUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const file = new File([blob], "image.jpg", { type: blob.type });
          setAvatar(file);
        })
        .catch((error) => console.error(error));
    }
  }, [user?.photoURL]);
  //

  const [checkUserName, setCheckUserName] = useState(
    firstname.toLowerCase() +
      lastname.toLowerCase() +
      Math.floor(Math.random() * 10000)
  );
  const [userNameAvailable, setUserNameAvailable] = useState(true);

  const [personalData, setPersonalData] = useState({
    firstName: firstname,
    lastName: lastname,
  });

  useEffect(() => {
    fetch(`https://link-depo.vercel.app/profile/user/${checkUserName}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setUserNameAvailable(false);
        } else {
          setUserNameAvailable(true);
        }
      });
  }, [checkUserName]);

  const handleOnChangeUserName = (e) => {
    const value = e.target.value.toLowerCase();
    const regex = /^[a-z0-9_.]*$/; // regular expression for alphanumeric
    if (regex.test(value)) {
      setCheckUserName(value);
      setUserNameAvailable(true);
    } else {
      setUserNameAvailable(false);
    }
  };

  // const handleSetAvatar = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setTempAvatar(reader.result);
  //   };
  //   reader.readAsDataURL(file);
  // };

  // const handleSetCoverPhoto = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setTempCoverPhoto(reader.result);
  //   };
  //   reader.readAsDataURL(file);
  // };

  const handleOnChangeData = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newInfo = { ...personalData };
    newInfo[field] = value;
    setPersonalData(newInfo);
  };

  const handleRequestSubmit = (e) => {
    setLoading(true);
    // collect data
    const formData = new FormData();

    formData.append("firstName", personalData.firstName);
    formData.append("lastName", personalData.lastName);
    formData.append("email", user.email);
    formData.append("userName", checkUserName);
    formData.append("profilePic", avatar);
    formData.append("coverPhoto", coverPhoto);

    // console.log(formData);

    fetch("https://link-depo.vercel.app/profile", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setErrorMessage(false);
          setLoading(false);
          window.location.reload();
        } else {
          setErrorMessage(true);
          setLoading(false);
        }
      });

    e.preventDefault();
  };

  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => {
            setOpen(true);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-800 bg-opacity-100 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <form onSubmit={handleRequestSubmit}>
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                        <CheckIcon
                          className="h-6 w-6 text-green-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center ml-4">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Complete Your Profile
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Your profile is not complete! Please complete your
                            profile for access your profile and other settings.
                          </p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="space-y-12">
                          <div className="border-b border-gray-900/10 pb-12">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              <div className="sm:col-span-3">
                                <label
                                  htmlFor="first-name"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  First name
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="firstName"
                                    id="first-name"
                                    autoComplete="given-name"
                                    defaultValue={firstname}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleOnChangeData}
                                  />
                                </div>
                              </div>

                              <div className="sm:col-span-3">
                                <label
                                  htmlFor="last-name"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Last name
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="lastName"
                                    id="last-name"
                                    autoComplete="family-name"
                                    defaultValue={lastname}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleOnChangeData}
                                  />
                                </div>
                              </div>

                              <div className="sm:col-span-4">
                                <label
                                  htmlFor="email"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Email address
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={user.email}
                                    disabled
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div className="sm:col-span-4">
                                <label
                                  htmlFor="username"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Username
                                </label>
                                <div className="mt-2">
                                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                                      workcation.com/
                                    </span>
                                    <input
                                      type="text"
                                      name="username"
                                      id="username"
                                      autoComplete="username"
                                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                      placeholder="israkkayum"
                                      required
                                      defaultValue={
                                        firstname.toLowerCase() +
                                        lastname.toLowerCase() +
                                        Math.floor(Math.random() * 10000)
                                      }
                                      onChange={handleOnChangeUserName}
                                    />
                                  </div>
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600 flex">
                                  {userNameAvailable ? (
                                    <>
                                      {" "}
                                      <div className="flex h-6 w-6 flex-shrink-0 rounded-full bg-green-100 items-center justify-center">
                                        <CheckBadgeIcon
                                          className="h-5 w-5 text-green-600"
                                          aria-hidden="true"
                                        />
                                      </div>
                                      <span className="ml-2 text-green-600">
                                        Username Available
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <div className="flex h-6 w-6 flex-shrink-0 rounded-full bg-red-100 items-center justify-center">
                                        <ExclamationTriangleIcon
                                          className="h-5 w-5 text-red-600"
                                          aria-hidden="true"
                                        />
                                      </div>
                                      <span className="text-red-600 ml-2">
                                        Username Not Available
                                      </span>
                                    </>
                                  )}
                                </p>
                              </div>

                              <div className="col-span-full">
                                <label
                                  htmlFor="photo"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Photo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                  {tempAvatar ? (
                                    <img
                                      className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                                      src={tempAvatar}
                                      alt=""
                                    />
                                  ) : (
                                    <img
                                      className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                                      src={user?.photoURL}
                                      alt=""
                                    />
                                  )}
                                  <label
                                    htmlFor="photo-upload"
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
                                  >
                                    <input
                                      id="photo-upload"
                                      name="photo-upload"
                                      type="file"
                                      className="sr-only"
                                      accept="image/*"
                                      required
                                      defaultValue={avatar}
                                      onChange={(e) => {
                                        setAvatar(e.target.files[0]);

                                        //...
                                        const file = e.target.files[0];
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                          setTempAvatar(reader.result);
                                        };
                                        reader.readAsDataURL(file);
                                      }}
                                    />
                                    <span>Change</span>
                                  </label>
                                </div>
                              </div>

                              <div className="col-span-full">
                                <label
                                  htmlFor="cover-photo"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Cover photo
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                  <div className="text-center">
                                    {tempCoverPhoto ? (
                                      <img
                                        className="mx-auto h-100 w-100 text-gray-300"
                                        src={tempCoverPhoto}
                                        alt=""
                                      />
                                    ) : (
                                      <PhotoIcon
                                        className="mx-auto h-12 w-12 text-gray-300"
                                        aria-hidden="true"
                                      />
                                    )}
                                    <div className="mt-4 flex item-center justify-center text-sm leading-6 text-gray-600">
                                      <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                      >
                                        <span>Upload a file</span>
                                        <input
                                          id="file-upload"
                                          name="file-upload"
                                          type="file"
                                          className="sr-only"
                                          accept="image/*"
                                          required
                                          onChange={(e) => {
                                            setCoverPhoto(e.target.files[0]);

                                            //
                                            const file = e.target.files[0];
                                            const reader = new FileReader();
                                            reader.onload = () => {
                                              setTempCoverPhoto(reader.result);
                                            };
                                            reader.readAsDataURL(file);
                                          }}
                                        />
                                      </label>
                                      <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">
                                      PNG, JPG, GIF up to 10MB
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {errorMessage && (
                              <Alert className="mt-5" severity="error">
                                Somethings Wrong!
                              </Alert>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      {loading ? (
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                          disabled
                        >
                          <div
                            class="animate-ping h-5 w-5 mr-3 bg-white rounded-lg"
                            viewBox="0 0 24 24"
                          ></div>
                          Processing...
                        </button>
                      ) : (
                        <>
                          {userNameAvailable ? (
                            <button
                              type="submit"
                              className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                            >
                              Complete
                            </button>
                          ) : (
                            <button
                              type="submit"
                              className="inline-flex w-full justify-center rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 sm:ml-3 sm:w-auto"
                              disabled
                            >
                              Complete
                            </button>
                          )}
                        </>
                      )}

                      <NavLink to="/home">
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          //   onClick={() => setOpen(false)}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                      </NavLink>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default CompleteProfile;
